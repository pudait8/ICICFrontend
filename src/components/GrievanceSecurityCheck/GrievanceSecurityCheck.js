import React, { useEffect, useState } from "react"
import { Col, Form, Row, notification, Button, Input, Select } from "antd"
import { connect } from "react-redux"
import { UndoOutlined } from "@ant-design/icons"

// components
import { Container, Heading, Description } from './GrievanceSecurityCheckStyle'
import { FormItem, BlueButton, Xlink, BlankSpace } from '../Xcomponents'

// others
import { getOrgId } from '../../utils'

// actions
import { verifyUpnAndMobile, verifyUpnAndMobileResetState } from '../../actions/verifyUpnAndMobileAction'
import { verifyUpnAndMobileSubmitOtp, verifyUpnAndMobileSubmitOtpResetState } from '../../actions/verifyUpnAndMobileSubmitOtpAction'
import _ from "lodash"

const Option = Select.Option


const GrievanceSecurityCheck = props => {
    // variables
    const {
        verifyUpnAndMobile, verifyUpnAndMobileResetState, verifyUpnAndMobileState,
        verifyUpnAndMobileSubmitOtp, verifyUpnAndMobileSubmitOtpResetState, verifyUpnAndMobileSubmitOtpState,
        getAuthorityListState
    } = props
    let initialFormData = {
        upn: "",
        mobile: "",
        otp: "",
        OrgId: getOrgId(),
        ApplicationType: props.serviceId,
        AuthToken: null,
        AuthTokenKey: null,
        ContextType: 'POS',
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
    const [DevelopmentAuthorityOptions, setDevelopmentAuthorityOptions] = useState([])

    useEffect(() => {

        verifyUpnAndMobileResetState()
        return (() => {
            verifyUpnAndMobileSubmitOtpState.apiState = ""
            verifyUpnAndMobileSubmitOtpResetState()
            verifyUpnAndMobileResetState()
        })
    }, [])

    // callbacks

    useEffect(() => {
        if (getAuthorityListState.apiState === "success") {

            let options = []
            getAuthorityListState.list.map(item => {
                options.push(<Option key={item.Id} value={item.Id}>{item.Name}</Option>)
            })
            setDevelopmentAuthorityOptions(options)
            let authority = _.find(getAuthorityListState.list, { Id: +getOrgId() })
            form.setFieldsValue({
                OrgId: authority.Name
            })
        }
    }, [getAuthorityListState])

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
        if (verifyUpnAndMobileSubmitOtpState.apiState === "alert" || verifyUpnAndMobileSubmitOtpState.apiState === "error") {
            notification["error"]({
                message: verifyUpnAndMobileSubmitOtpState.apiMessage,
                placement: "bottomRight",
            })

            verifyUpnAndMobileSubmitOtpResetState()
        }

        if (verifyUpnAndMobileSubmitOtpState.apiState === "success") {

            notification["success"]({
                message: verifyUpnAndMobileSubmitOtpState.apiMessage,
                placement: "bottomRight"
            })
            props.onSelectOrgId(formData.OrgId)
            setFormData({
                ...formData,
                ['AuthToken']: verifyUpnAndMobileSubmitOtpState.AuthToken,
                ['AuthTokenKey']: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
            verifyUpnAndMobileSubmitOtpState.nocNumber = formData.TransferPermissionNo
            verifyUpnAndMobileState.apiState = ""
            setApiSuccess(true)
            const timer = setTimeout(() => {
                verifyUpnAndMobileSubmitOtpState.apiState = ""
            }, 1000);
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


    const handleOnChangeSelect = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }

    return (
        <Container id="security-check-section">
            <Heading>Mobile Verification</Heading>

            <>
                {!apiSuccess &&
                    <>
                        <Description>For security reasons we need to verify your mobile number. Please enter mobile number  below and click on Get OTP. This mobile number will be used for any future authentication.</Description>

                        <Form
                            layout="vertical"
                            requiredMark={false}
                            onFinish={handleSubmit}
                            form={form}
                        >
                            <Row gutter="24" >
                                <Col span="8">
                                    <FormItem
                                        name="OrgId"
                                        label="Select Authority"
                                        rules={[{ required: true, message: 'Required' }]}
                                        className="round-select"
                                    >
                                        <Select name="OrgId"
                                            disabled={verifyUpnAndMobileState.apiState === "success"}
                                            size="large"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            notFoundContent={<span>Not Found</span>}
                                            onSelect={(v) => handleOnChangeSelect(v, 'OrgId')}
                                            autoComplete="dontshow"
                                        >
                                            {DevelopmentAuthorityOptions}
                                        </Select>
                                    </FormItem>
                                </Col>
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
                                    <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={handleResendOtp} icon={<UndoOutlined />} loading={verifyUpnAndMobileState.apiState === "loading" ? true : false} >
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
                    <Description>You've successfully verified your Mobile number. <b>{formData.mobile}</b></Description>
                }
            </>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileState: state.verifyUpnAndMobile,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getAuthorityListState: state.getAuthorityList,
})
const mapDispatchToProps = (dispatch) => ({
    verifyUpnAndMobile: (params) => dispatch(verifyUpnAndMobile(params)),
    verifyUpnAndMobileResetState: () => dispatch(verifyUpnAndMobileResetState()),
    verifyUpnAndMobileSubmitOtp: (params) => dispatch(verifyUpnAndMobileSubmitOtp(params)),
    verifyUpnAndMobileSubmitOtpResetState: () => dispatch(verifyUpnAndMobileSubmitOtpResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GrievanceSecurityCheck)