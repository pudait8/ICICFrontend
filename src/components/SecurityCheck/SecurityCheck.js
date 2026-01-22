import React, { useEffect, useState } from "react"
import { Col, Form, Row, notification, Button, Input, Select } from "antd"
import { connect } from "react-redux"
import { UndoOutlined } from "@ant-design/icons"

// components
import { Container, Heading, Description } from './SecurityCheckStyle'
import { FormItem, BlueButton, Xlink, BlankSpace } from '../Xcomponents'

// others
import { getOrgId } from '../../utils'

// actions
import { verifyUpnAndMobile, verifyUpnAndMobileResetState } from '../../actions/verifyUpnAndMobileAction'
import { verifyUpnAndMobileSubmitOtp, verifyUpnAndMobileSubmitOtpResetState } from '../../actions/verifyUpnAndMobileSubmitOtpAction'
import { getPropertyDetailByNocNumber, getPropertyDetailByNocNumberResetState } from '../../actions/getPropertyDetailByNocNumberActions'
import { mobileNo } from '../../actions/mobileNoAction'
const Option = Select.Option


const SecurityCheck = props => {
    // variables
    const {
        verifyUpnAndMobile, verifyUpnAndMobileResetState, verifyUpnAndMobileState,
        verifyUpnAndMobileSubmitOtp, verifyUpnAndMobileSubmitOtpResetState, verifyUpnAndMobileSubmitOtpState,
        getPropertyDetailByNocNumber, getPropertyDetailByNocNumberResetState, getPropertyDetailByNocNumberState, mobileNo, defaultUpn
    } = props
    let initialFormData = {
        upn: "",
        mobile: "",
        otp: "",
        OrgId: getOrgId(),
        ApplicationType: props.serviceId,
        AuthToken: null,
        AuthTokenKey: null,
        ContextType: 'Submit',
        ApplicationId: "0",
        OwnerName: "",
        PurchaserId: "0",
        TransferPermissionNo: "0",
        ProfessionalName: "",
    }
    const [formData, setFormData] = useState(initialFormData)
    const [form] = Form.useForm()
    const [resendOtpTimer, setResendOtpTimer] = useState(0)
    const [apiSuccess, setApiSuccess] = useState(false)
    useEffect(() => {
        verifyUpnAndMobileResetState()
        getPropertyDetailByNocNumberResetState()
        return (() => {
            verifyUpnAndMobileResetState()
            // verifyUpnAndMobileSubmitOtpResetState()
        })
    }, [])

    // callbacks

    useEffect(() => {
        verifyUpnAndMobileResetState()
        resetForm()
    }, [props.IsRenewal])
    useEffect(() => {
        if (verifyUpnAndMobileState.apiState === "alert" || verifyUpnAndMobileState.apiState === "error") {
            notification["error"]({
                message: verifyUpnAndMobileState.apiMessage,
                placement: "bottomRight"
            })
            verifyUpnAndMobileResetState()
        }
        if (verifyUpnAndMobileState.apiState === "success") {
            notification["success"]({
                message: verifyUpnAndMobileState.apiMessage,
                placement: "bottomRight"
            })
            mobileNo({ mobile: formData.mobile });
            setResendOtpTimer(29)
            setFormData({
                ...formData,
                ['ContextType']: verifyUpnAndMobileState.data.ContextType,
                ['ApplicationId']: verifyUpnAndMobileState.data.ApplicationId,
                ['OwnerName']: verifyUpnAndMobileState.data.OwnerName
            })

        }

    }, [verifyUpnAndMobileState])
    useEffect(() => {
        if (getPropertyDetailByNocNumberState.apiState === "alert" || getPropertyDetailByNocNumberState.apiState === "error") {
            notification["error"]({
                message: getPropertyDetailByNocNumberState.apiMessage,
                placement: "bottomRight"
            })
            getPropertyDetailByNocNumberResetState()
        }

    }, [getPropertyDetailByNocNumberState])

    useEffect(() => {
        if (verifyUpnAndMobileSubmitOtpState.apiState === "alert" || verifyUpnAndMobileSubmitOtpState.apiState === "error") {
            notification["error"]({
                message: verifyUpnAndMobileSubmitOtpState.apiMessage,
                placement: "bottomRight",
            })

            verifyUpnAndMobileSubmitOtpResetState()
        }

        if (verifyUpnAndMobileSubmitOtpState.apiState === "success") {
            if (verifyUpnAndMobileSubmitOtpState.data.IsConveyanceDeedTaken === 'Yes' && props.serviceId == '21') {
                notification["error"]({
                    message: "Conveyance Deed is already issued for this property.",
                    placement: "bottomRight",
                    duration: 5,
                })

                verifyUpnAndMobileResetState()
                verifyUpnAndMobileSubmitOtpResetState()
                resetForm()
            }
            else if (verifyUpnAndMobileSubmitOtpState.data.IsProvisional === 'No' && props.serviceId == '1048') {
                notification["error"]({
                    message: "This application is not applicable for Non-Provisional properties.",
                    placement: "bottomRight",
                    duration: 5,
                })

                verifyUpnAndMobileResetState()
                verifyUpnAndMobileSubmitOtpResetState()
                resetForm()
            }
            else if (verifyUpnAndMobileSubmitOtpState.data.IsConveyanceDeedTaken === 'No' && props.serviceId == '20') {
                notification["error"]({
                    message: "Conveyance Deed is not issued for this property.",
                    placement: "bottomRight",
                    duration: 5,
                })
                verifyUpnAndMobileResetState()
                verifyUpnAndMobileSubmitOtpResetState()
                resetForm()
            }
            else {
                notification["success"]({
                    message: verifyUpnAndMobileSubmitOtpState.apiMessage,
                    placement: "bottomRight"
                })
                setFormData({
                    ...formData,
                    ['AuthToken']: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    ['AuthTokenKey']: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                })
                verifyUpnAndMobileSubmitOtpState.nocNumber = formData.TransferPermissionNo
                verifyUpnAndMobileState.apiState = ""
                setApiSuccess(true)
                // verifyUpnAndMobileResetState()
            }
            const timer = setTimeout(() => {
                verifyUpnAndMobileSubmitOtpState.apiState = ""
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [verifyUpnAndMobileSubmitOtpState])

    // Resend Otp Timer
    useEffect(() => {
        if (resendOtpTimer > 0) {
            const timer = setTimeout(() => {
                setResendOtpTimer(resendOtpTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendOtpTimer])

    // functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (verifyUpnAndMobileState.apiState === "success") {
            verifyUpnAndMobileSubmitOtp({
                OrgId: formData.OrgId,
                PropertyRefId: verifyUpnAndMobileState.data.PropertyRefId,
                OwnerId: verifyUpnAndMobileState.data.OwnerId,
                MobileNumber: formData.mobile,
                upn: formData.upn,
                ApplicationType: props.serviceId,
                TransactionNumber: verifyUpnAndMobileState.data.TransactionNumber,
                OTP: formData.otp,
                ContextType: formData.ContextType,
                ApplicationId: formData.ApplicationId,
                OwnerName: formData.OwnerName,
            })
        } else {
            verifyUpnAndMobile(formData)
        }
    }

    const handleEmpnellmentSubmit = () => {
        if (verifyUpnAndMobileState.apiState === "success") {
            verifyUpnAndMobileSubmitOtp({
                upn: formData.upn,
                OrgId: formData.OrgId,
                PropertyRefId: verifyUpnAndMobileState.data.PropertyRefId,
                OwnerId: verifyUpnAndMobileState.data.OwnerId,
                MobileNumber: formData.mobile,
                ApplicationType: props.serviceId,
                TransactionNumber: verifyUpnAndMobileState.data.TransactionNumber,
                OTP: formData.otp,
                ContextType: formData.ContextType,
                ApplicationId: formData.ApplicationId,
                ProfessionalName: formData.ProfessionalName,
                IsRenewal: props.IsRenewal,
            })
        } else {
            verifyUpnAndMobile({
                upn: formData.upn,
                OrgId: formData.OrgId,
                mobile: formData.mobile,
                ApplicationType: props.serviceId,
                ContextType: "POS",
                IsRenewal: props.IsRenewal,
                ProfessionalName: props.serviceId === '2000' ? 'Applicant' : formData.ProfessionalName,
            })
        }
    }


    useEffect(() => {
        if (verifyUpnAndMobileState.apiState === "") {

            setApiSuccess(false)
            resetForm();
        }
    }, [verifyUpnAndMobileState])
    const handleNocSubmit = () => {
        if (verifyUpnAndMobileState.apiState === "success") {

            verifyUpnAndMobileSubmitOtp({
                OrgId: formData.OrgId,
                PropertyRefId: verifyUpnAndMobileState.data.PropertyRefId,
                OwnerId: verifyUpnAndMobileState.data.OwnerId,
                MobileNumber: verifyUpnAndMobileState.data.MobileNumber,
                upn: formData.upn,
                ApplicationType: props.serviceId,
                TransactionNumber: verifyUpnAndMobileState.data.TransactionNumber,
                OTP: formData.otp,
                ContextType: formData.ContextType,
                ApplicationId: formData.ApplicationId,
                OwnerName: formData.OwnerName,
                PurchaserId: formData.PurchaserId,
                TransferPermissionNo: formData.TransferPermissionNo,
                IsRenewal: props.IsRenewal,
            })
        }
        else if (getPropertyDetailByNocNumberState.apiState === "success") {
            verifyUpnAndMobile({
                OrgId: formData.OrgId,
                ApplicationType: props.serviceId,
                ContextType: "NOC",
                PurchaserId: formData.PurchaserId,
                TransferPermissionNo: formData.TransferPermissionNo,
                IsRenewal: props.IsRenewal,
                mobile: formData.mobile,
            })
        }
        else {
            getPropertyDetailByNocNumber({
                OrgId: formData.OrgId,
                ApplicationTypeId: props.serviceId,
                TransferPermissionNo: formData.TransferPermissionNo,
            })
        }
    }

    const handleResendOtpForChangeOfOwnership = () => {
        setFormData({
            ...formData,
            ['otp']: "",
        })
        verifyUpnAndMobileState.apiState = ""
        getPropertyDetailByNocNumberResetState()
        handleNocSubmit()
    }

    const handleResendOtpForEmpnellment = () => {
        setFormData({
            ...formData,
            ['otp']: "",
        })
        verifyUpnAndMobileState.apiState = ""
        handleEmpnellmentSubmit()
    }

    const handleResendOtp = () => {
        setFormData({
            ...formData,
            ['otp']: "",
        })
        verifyUpnAndMobileState.apiState = ""
        handleSubmit()
    }

    const resetForm = () => {
        setFormData(initialFormData)
        form.resetFields()
    }

    const handlePurchaserSelect = (PurchaserId) => {
        setFormData({ ...formData, ["PurchaserId"]: PurchaserId })
    }
    useEffect(() => {
        setFormData({
            ...formData,
            ['upn']: defaultUpn,
        })
    }, []);
    return (
        <Container id="security-check-section">
            <Heading>{props.serviceId === '1000' ? "Applicant's Authentication" : "Security Check"} </Heading>
            {(props.serviceId === '25' || props.serviceId === '32') ?
                <>
                    {!apiSuccess &&
                        <>
                            <Description>For security reasons we need to verify that you are authorised to apply for services for the property. Please enter following details to verify authorisation.</Description>

                            <Form
                                layout="vertical"
                                requiredMark={false}
                                onFinish={handleNocSubmit}
                                form={form}
                            >
                                <Row gutter="24" >
                                    <Col span="8">
                                        <FormItem
                                            label={props.serviceId === "32" ? "Transfer Permission Number" : "NOC Number"}
                                            name="TransferPermissionNo"
                                            rules={[
                                                { required: true, message: 'Required' },
                                                {
                                                    pattern: new RegExp("^[0-9]+$"),
                                                    message: 'Enter valid NOC number.',
                                                }
                                            ]}
                                        >
                                            <Input size="large" maxLength={8} name="TransferPermissionNo" onChange={handleOnChange} readOnly={getPropertyDetailByNocNumberState.apiState === "success"} />
                                        </FormItem>
                                    </Col>
                                    {(getPropertyDetailByNocNumberState.apiState === "success" && getPropertyDetailByNocNumberState.data.Source === 'New') &&
                                        <Col span="8">
                                            <FormItem
                                                name="PurchaserId"
                                                label={"Purchaser's"}
                                                rules={[{ required: false, message: 'Required' }]}
                                            >
                                                <Select name="PurchaserId" size="large" style={{ width: '100%' }} onSelect={handlePurchaserSelect} >
                                                    {getPropertyDetailByNocNumberState.data.TransfereeDetails
                                                        && getPropertyDetailByNocNumberState.data.TransfereeDetails.length > 0
                                                        && getPropertyDetailByNocNumberState.data.TransfereeDetails.map(purchaser => (
                                                            <Option key={purchaser.PurchaserId} value={purchaser.PurchaserId}>{`${purchaser.Name} (${purchaser.MobileNumber})`}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    }
                                    {(getPropertyDetailByNocNumberState.apiState === "success" && getPropertyDetailByNocNumberState.data.Source === 'Old') &&
                                        <Col span="8">
                                            <FormItem
                                                label="Registered Mobile Number"
                                                name="mobile"
                                                rules={[
                                                    { required: true, message: 'Required' },
                                                    {
                                                        pattern: new RegExp('^[6-9]\\d{9}$'),
                                                        message: 'Mobile number is not valid',
                                                    }
                                                ]}
                                            >
                                                <Input size="large" name="mobile" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                            </FormItem>
                                        </Col>
                                    }
                                </Row>
                                {verifyUpnAndMobileState.apiState === "success" &&
                                    <Row gutter="24" >
                                        <Col span="8">
                                            <FormItem
                                                label="Enter OTP"
                                                name="otp"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input size="large" name="otp" onChange={handleOnChange} />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                }

                                <BlueButton htmlType="submit" loading={
                                    (getPropertyDetailByNocNumberState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading" || verifyUpnAndMobileState.apiState === "loading") ? true : false
                                } >
                                    {getPropertyDetailByNocNumberState.apiState === "success" ? (verifyUpnAndMobileState.apiState === "success" ? "VERIFY" : "GET OTP") : props.serviceId === '25' ? "VERIFY NOC NUMBER" : "VERIFY TRANSFER PERMISSION NUMBER"}
                                </BlueButton>
                                {verifyUpnAndMobileState.apiState === "success" &&
                                    <>
                                        <Button type="link" onClick={() => {
                                            verifyUpnAndMobileResetState()
                                            getPropertyDetailByNocNumberResetState()
                                            resetForm()
                                        }} icon={<UndoOutlined />} >Change NOC Number</Button>
                                        <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtpForChangeOfOwnership} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
                                            Resend OTP
                                            {resendOtpTimer > 0 &&
                                                <> ({resendOtpTimer})</>
                                            }
                                        </Button>
                                    </>
                                }
                            </Form>
                            <BlankSpace />
                            <div>Don't remember your NOC Number? <Xlink to="/get-noc-by-upn" target="_blank">Know your NOC Number from this page.</Xlink></div>
                        </>
                    }
                    {apiSuccess &&
                        <Description>You've successfully verified your authorisation on {props.serviceId === '25' ? "NOC Number" : "Transfer Permission Number"} <b>{formData.TransferPermissionNo}</b></Description>
                    }
                </>
                :
                (props.serviceId === '1626' || props.serviceId === '1625' || props.serviceId === '951' ||props.serviceId === '1788' || props.serviceId === '1796' ) ?
                    <>
                        {!apiSuccess ?
                            <Form
                                layout="vertical"
                                requiredMark={false}
                                onFinish={handleEmpnellmentSubmit}
                                form={form}
                            >
                                <Description>Please enter your Mobile Number below.</Description>
                                <Row gutter="24" >
                                    <Col span="8">
                                        <FormItem
                                            label="Enter Mobile Number"
                                            name="mobile"
                                            rules={[
                                                { required: true, message: 'Required' },
                                                {
                                                    pattern: new RegExp('^[6-9]\\d{9}$'),
                                                    message: 'Mobile number is not valid',
                                                }
                                            ]}
                                        >
                                            <Input size="large" name="mobile" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                        </FormItem>
                                    </Col>
                                    {verifyUpnAndMobileState.apiState === "success" &&
                                        <Col span="8">
                                            <FormItem
                                                label="Enter OTP"
                                                name="otp"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input size="large" name="otp" onChange={handleOnChange} />
                                            </FormItem>
                                        </Col>}
                                </Row>
                                <BlueButton htmlType="submit" loading={
                                    (verifyUpnAndMobileState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading") ? true : false
                                }   >
                                    {verifyUpnAndMobileState.apiState === "success" ? "Verify" : "GET OTP"}
                                </BlueButton>
                                {verifyUpnAndMobileState.apiState === "success" &&
                                    <>
                                        <Button type="link" onClick={() => {
                                            verifyUpnAndMobileResetState()
                                            resetForm()
                                        }} icon={<UndoOutlined />} >Change Mobile Number</Button>
                                        <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtpForEmpnellment} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
                                            Resend OTP
                                            {resendOtpTimer > 0 &&
                                                <> ({resendOtpTimer})</>
                                            }
                                        </Button>
                                    </>
                                }
                            </Form> :
                            <Description>You've successfully verified your authorisation on <b>{formData.mobile}</b></Description>

                        }
                    </>
                    :
                    (props.serviceId === '1679' || props.serviceId === '1710' || props.serviceId === '1727') ?
                        <>
                            {!apiSuccess &&
                                <>
                                    <Description>For security reasons we need to verify your mobile number. Please enter mobile number below and click on Get OTP. This mobile number will be used for any future authentication.</Description>

                                    <Form
                                        layout="vertical"
                                        requiredMark={false}
                                        onFinish={handleEmpnellmentSubmit}
                                        form={form}
                                    >
                                        <Row gutter="24" >
                                            <Col span="8">
                                                <FormItem
                                                    label="Mobile Number"
                                                    name="mobile"
                                                    rules={[
                                                        { required: true, message: 'Required' },
                                                        {
                                                            pattern: new RegExp('^[6-9]\\d{9}$'),
                                                            message: 'Mobile number is not valid',
                                                        }
                                                    ]}
                                                >
                                                    <Input size="large" name="mobile" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem
                                                    label="Applicant Name"
                                                    name="ProfessionalName"
                                                    rules={[
                                                        { required: true, message: 'Required' },
                                                    ]}
                                                >
                                                    <Input size="large" name="ProfessionalName" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        {verifyUpnAndMobileState.apiState === "success" &&
                                            <Row gutter="24" >
                                                <Col span="8">
                                                    <FormItem
                                                        label="Enter OTP"
                                                        name="otp"
                                                        rules={[{ required: true, message: 'Required' }]}
                                                    >
                                                        <Input size="large" name="otp" onChange={handleOnChange} />
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        }
                                        <BlueButton htmlType="submit" loading={
                                            (verifyUpnAndMobileState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading") ? true : false
                                        } >
                                            {verifyUpnAndMobileState.apiState === "success" ? "VERIFY" : "GET OTP"}
                                        </BlueButton>
                                        {verifyUpnAndMobileState.apiState === "success" &&
                                            <>
                                                <Button type="link" onClick={() => {
                                                    verifyUpnAndMobileResetState()
                                                    resetForm()
                                                }} icon={<UndoOutlined />} >Change Mobile Number</Button>
                                                <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtpForEmpnellment} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
                                                    Resend OTP
                                                    {resendOtpTimer > 0 &&
                                                        <> ({resendOtpTimer})</>
                                                    }
                                                </Button>
                                            </>
                                        }
                                    </Form>
                                </>
                            }

                            {apiSuccess &&
                                <Description>You've successfully verified your Mobile No. <b>{formData.mobile}</b> and Applicant Name <b>{formData.ProfessionalName}</b>.</Description>
                            }
                        </>
                        :
                        props.serviceId === '2000' ?
                            <>
                                {!apiSuccess &&
                                    <>

                                        <Description>Please enter LOI reference number and mobile number provided at time of LOI.</Description>

                                        <Form
                                            layout="vertical"
                                            requiredMark={false}
                                            onFinish={handleEmpnellmentSubmit}
                                            form={form}
                                        >
                                            <Row gutter="24" >
                                                <Col span="8">
                                                    <FormItem
                                                        label="LOI Reference Number"
                                                        name="upn"
                                                        rules={[{ required: true, message: 'Required' }, {
                                                            pattern: new RegExp("^[0-9]+$"),
                                                            message: 'Enter valid LOI reference number.',
                                                        }]}
                                                    >
                                                        <Input size="large" maxLength={8} name="upn" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem
                                                        label="Mobile Number"
                                                        name="mobile"
                                                        rules={[
                                                            { required: true, message: 'Required' },
                                                            {
                                                                pattern: new RegExp('^[6-9]\\d{9}$'),
                                                                message: 'Mobile number is not valid',
                                                            }
                                                        ]}
                                                    >
                                                        <Input size="large" name="mobile" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            {verifyUpnAndMobileState.apiState === "success" &&
                                                <Row gutter="24" >
                                                    <Col span="8">
                                                        <FormItem
                                                            label="Enter OTP"
                                                            name="otp"
                                                            rules={[{ required: true, message: 'Required' }]}
                                                        >
                                                            <Input size="large" name="otp" onChange={handleOnChange} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            }
                                            <BlueButton htmlType="submit" loading={
                                                (verifyUpnAndMobileState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading") ? true : false
                                            } >
                                                {verifyUpnAndMobileState.apiState === "success" ? "VERIFY" : "GET OTP"}
                                            </BlueButton>
                                            {verifyUpnAndMobileState.apiState === "success" &&
                                                <>
                                                    <Button type="link" onClick={() => {
                                                        verifyUpnAndMobileResetState()
                                                        resetForm()
                                                    }} icon={<UndoOutlined />} >Change Mobile Number</Button>
                                                    <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtpForEmpnellment} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
                                                        Resend OTP
                                                        {resendOtpTimer > 0 &&
                                                            <> ({resendOtpTimer})</>
                                                        }
                                                    </Button>
                                                </>
                                            }
                                        </Form>
                                    </>
                                }

                                {apiSuccess &&
                                    <Description>LOI reference number and mobile number successfully verified.</Description>
                                }
                            </>
                            :
                            (props.serviceId === '28' || props.serviceId === '29' || props.serviceId === '1721' || props.serviceId === '1726') ?
                                <>
                                    {!apiSuccess &&
                                        <>
                                            <Description>Please enter your PAN and Mobile Number below.</Description>

                                            <Form
                                                layout="vertical"
                                                requiredMark={false}
                                                onFinish={handleEmpnellmentSubmit}
                                                form={form}
                                            >
                                                <Row gutter="24" >
                                                    <Col span="8">
                                                        <FormItem
                                                            label="PAN"
                                                            name="upn"
                                                            rules={[
                                                                { required: true, message: 'Required' },
                                                                {
                                                                    pattern: '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$',
                                                                    message: 'PAN is not valid'
                                                                }
                                                            ]}
                                                        >
                                                            <Input size="large" name="upn" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8">
                                                        <FormItem
                                                            label="Mobile Number"
                                                            name="mobile"
                                                            rules={[
                                                                { required: true, message: 'Required' },
                                                                {
                                                                    pattern: new RegExp('^[6-9]\\d{9}$'),
                                                                    message: 'Mobile number is not valid',
                                                                }
                                                            ]}
                                                        >
                                                            <Input size="large" name="mobile" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                        </FormItem>
                                                    </Col>

                                                </Row>

                                                {verifyUpnAndMobileState.apiState === "success" &&
                                                    <Row gutter="24" >
                                                        <Col span="8">
                                                            <FormItem
                                                                label="Enter OTP"
                                                                name="otp"
                                                                rules={[{ required: true, message: 'Required' }]}
                                                            >
                                                                <Input size="large" name="otp" onChange={handleOnChange} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                }
                                                <BlueButton htmlType="submit" loading={
                                                    (verifyUpnAndMobileState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading") ? true : false
                                                } >
                                                    {verifyUpnAndMobileState.apiState === "success" ? "VERIFY" : "GET OTP"}
                                                </BlueButton>
                                                {verifyUpnAndMobileState.apiState === "success" &&
                                                    <>
                                                        <Button type="link" onClick={() => {
                                                            verifyUpnAndMobileResetState()
                                                            resetForm()
                                                        }} icon={<UndoOutlined />} >Change Mobile Number</Button>
                                                        <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtpForEmpnellment} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
                                                            Resend OTP
                                                            {resendOtpTimer > 0 &&
                                                                <> ({resendOtpTimer})</>
                                                            }
                                                        </Button>
                                                    </>
                                                }
                                            </Form>
                                        </>
                                    }

                                    {apiSuccess &&
                                        <Description>You've successfully verified your PAN <b>{formData.upn}.</b> Application is applying for {props.IsRenewal === "N" ? "new" : "renewal"} certificate.</Description>
                                    }
                                </>
                                :
                                props.serviceId === '1000' ?
                                    <>
                                        {!apiSuccess &&
                                            <>

                                                <Description>
                                                    For security reasons we need to verify mobile number. Please mobile number below and click on Get OTP. This mobile number will be used for any future authentication.
                                                </Description>

                                                <Form
                                                    layout="vertical"
                                                    requiredMark={false}
                                                    onFinish={handleEmpnellmentSubmit}
                                                    form={form}
                                                >
                                                    <Row gutter="24" >
                                                        <Col span="8">
                                                            <FormItem
                                                                label="Mobile Number"
                                                                name="mobile"
                                                                rules={[
                                                                    { required: true, message: 'Required' },
                                                                    {
                                                                        pattern: new RegExp('^[6-9]\\d{9}$'),
                                                                        message: 'Mobile number is not valid',
                                                                    }
                                                                ]}
                                                            >
                                                                <Input size="large" name="mobile" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>

                                                    {verifyUpnAndMobileState.apiState === "success" &&
                                                        <Row gutter="24" >
                                                            <Col span="8">
                                                                <FormItem
                                                                    label="Enter OTP"
                                                                    name="otp"
                                                                    rules={[{ required: true, message: 'Required' }]}
                                                                >
                                                                    <Input size="large" name="otp" onChange={handleOnChange} />
                                                                </FormItem>
                                                            </Col>
                                                        </Row>
                                                    }
                                                    <BlueButton htmlType="submit" loading={
                                                        (verifyUpnAndMobileState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading") ? true : false
                                                    } >
                                                        {verifyUpnAndMobileState.apiState === "success" ? "VERIFY" : "GET OTP"}
                                                    </BlueButton>
                                                    {verifyUpnAndMobileState.apiState === "success" &&
                                                        <>
                                                            <Button type="link" onClick={() => {
                                                                verifyUpnAndMobileResetState()
                                                                resetForm()
                                                            }} icon={<UndoOutlined />} >Change Mobile Number</Button>
                                                            <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtpForEmpnellment} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
                                                                Resend OTP
                                                                {resendOtpTimer > 0 &&
                                                                    <> ({resendOtpTimer})</>
                                                                }
                                                            </Button>
                                                        </>
                                                    }
                                                </Form>
                                            </>
                                        }

                                        {apiSuccess &&
                                            <Description>You've successfully verified your authorisation on Mobile No. <b>{formData.mobile}</b></Description>
                                        }
                                    </>
                                    :
                                    <>
                                        {!apiSuccess &&
                                            <>
                                                <Description>For security reasons we need to verify that you are authorised to apply for services for the property. Please enter following details to verify authorisation.</Description>

                                                <Form
                                                    layout="vertical"
                                                    requiredMark={false}
                                                    onFinish={handleSubmit}
                                                    form={form}
                                                >
                                                    <Row gutter="24" >
                                                        <Col span="8">
                                                            <FormItem
                                                                label="UPN"
                                                                name="upn"
                                                                rules={[{ required: true, message: 'Required' }]}
                                                                initialValue={defaultUpn ? defaultUpn : ""}
                                                            >
                                                                <Input size="large" defaultValue={defaultUpn ? defaultUpn : ""} name="upn" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8">
                                                            <FormItem
                                                                label="Registered Mobile Number"
                                                                name="mobile"
                                                                rules={[
                                                                    { required: true, message: 'Required' },
                                                                    {
                                                                        pattern: new RegExp('^[6-9]\\d{9}$'),
                                                                        message: 'Mobile number is not valid',
                                                                    }
                                                                ]}
                                                            >
                                                                <Input size="large" name="mobile" onChange={handleOnChange} readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>

                                                    {verifyUpnAndMobileState.apiState === "success" &&
                                                        <Row gutter="24" >
                                                            <Col span="8">
                                                                <FormItem
                                                                    label="Enter OTP"
                                                                    name="otp"
                                                                    rules={[{ required: true, message: 'Required' }]}
                                                                >
                                                                    <Input size="large" name="otp" onChange={handleOnChange} />
                                                                </FormItem>
                                                            </Col>
                                                        </Row>
                                                    }
                                                    <BlueButton htmlType="submit" loading={
                                                        (verifyUpnAndMobileState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading") ? true : false
                                                    } >
                                                        {verifyUpnAndMobileState.apiState === "success" ? "VERIFY" : "GET OTP"}
                                                    </BlueButton>
                                                    {verifyUpnAndMobileState.apiState === "success" &&
                                                        <>
                                                            <Button type="link" onClick={() => {
                                                                verifyUpnAndMobileResetState()
                                                                resetForm()
                                                            }} icon={<UndoOutlined />} >Change UPN</Button>
                                                            <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtp} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
                                                                Resend OTP
                                                                {resendOtpTimer > 0 &&
                                                                    <> ({resendOtpTimer})</>
                                                                }
                                                            </Button>
                                                        </>
                                                    }


                                                </Form>
                                                <BlankSpace />
                                                <div>Don't remember your UPN? <Xlink to="/get-upn" target="_blank">Know your UPN from this page.</Xlink></div>
                                                <div>Mobile number not registered with UPN? <Xlink to="/link-mobile" target="_blank">Register mobile number from this page.</Xlink></div>

                                            </>
                                        }

                                        {apiSuccess &&
                                            <Description>You've successfully verified your authorisation on Property No. <b>{formData.upn}</b></Description>
                                        }
                                    </>

            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileState: state.verifyUpnAndMobile,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getPropertyDetailByNocNumberState: state.getPropertyDetailByNocNumber,
})
const mapDispatchToProps = (dispatch) => ({
    verifyUpnAndMobile: (params) => dispatch(verifyUpnAndMobile(params)),
    verifyUpnAndMobileResetState: () => dispatch(verifyUpnAndMobileResetState()),
    verifyUpnAndMobileSubmitOtp: (params) => dispatch(verifyUpnAndMobileSubmitOtp(params)),
    verifyUpnAndMobileSubmitOtpResetState: () => dispatch(verifyUpnAndMobileSubmitOtpResetState()),
    getPropertyDetailByNocNumber: (params) => dispatch(getPropertyDetailByNocNumber(params)),
    getPropertyDetailByNocNumberResetState: () => dispatch(getPropertyDetailByNocNumberResetState()),
    mobileNo: (params) => dispatch(mobileNo(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SecurityCheck)