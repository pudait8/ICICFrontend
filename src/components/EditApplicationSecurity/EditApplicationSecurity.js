import React, { useEffect, useState } from "react"
import { Col, Form, Row, notification, Button, Input, Select } from "antd"
import { connect } from "react-redux"
import { UndoOutlined } from "@ant-design/icons"

// components
import { Container, Heading, Description } from './EditApplicationSecurityStyle'
import { FormItem, BlueButton, Xlink, BlankSpace } from '../Xcomponents'

// others
import { getOrgId } from '../../utils'

// actions
import { verifyUpnAndMobile, verifyUpnAndMobileResetState } from '../../actions/verifyUpnAndMobileAction'
import { verifyUpnAndMobileSubmitOtp, verifyUpnAndMobileSubmitOtpResetState } from '../../actions/verifyUpnAndMobileSubmitOtpAction'


const EditApplicationSecurity = props => {
    // variables
    const {
        verifyUpnAndMobile, verifyUpnAndMobileResetState, verifyUpnAndMobileState,
        verifyUpnAndMobileSubmitOtp, verifyUpnAndMobileSubmitOtpResetState, verifyUpnAndMobileSubmitOtpState,
    } = props
    const OrgId = getOrgId()
    const [redirect, setRedirect] = useState([false, ""])
    let initialFormData = {
        upn: "",
        mobile: "",
        otp: "",
        OrgId: getOrgId(),
        ApplicationType: "0",
        AuthToken: null,
        AuthTokenKey: null,
        ContextType: 'View',
        ApplicationId: "0",
        OwnerName: "",
    }
    const [formData, setFormData] = useState(initialFormData)
    const [form] = Form.useForm()
    const [resendOtpTimer, setResendOtpTimer] = useState(0)
    const [apiSuccess, setApiSuccess] = useState(false)

    //Callback
    useEffect(() => {
        verifyUpnAndMobileSubmitOtpResetState()
        verifyUpnAndMobileResetState()
        resetForm()
        return (() => {
            verifyUpnAndMobileResetState()
        })
    }, [])



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
                ['OwnerName']: verifyUpnAndMobileState.data.OwnerName,
                ['mobile']: verifyUpnAndMobileState.data.MobileNumber,
                ['upn']: verifyUpnAndMobileState.data.UPN,
            })
        }

    }, [verifyUpnAndMobileState])

    // Resend Otp Timer
    useEffect(() => {
        if (resendOtpTimer > 0) {
            const timer = setTimeout(() => {
                setResendOtpTimer(resendOtpTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendOtpTimer])


    useEffect(() => {
        if (verifyUpnAndMobileSubmitOtpState.apiState === "alert" || verifyUpnAndMobileSubmitOtpState.apiState === "error") {
            notification["error"]({
                message: verifyUpnAndMobileSubmitOtpState.apiMessage,
                placement: "bottomRight"
            })
            // verifyUpnAndMobileState.data.TransactionNumber = verifyUpnAndMobileSubmitOtpState.data.TransactionNumber
            verifyUpnAndMobileSubmitOtpResetState()
        }

        if (verifyUpnAndMobileSubmitOtpState.apiState === "success") {
            notification["success"]({
                message: verifyUpnAndMobileSubmitOtpState.apiMessage,
                placement: "bottomRight"
            })
            setFormData({
                ...formData,
                ['AuthToken']: verifyUpnAndMobileSubmitOtpState.AuthToken,
                ['AuthTokenKey']: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
            verifyUpnAndMobileState.apiState = ""
            setApiSuccess(true)
            // if (verifyUpnAndMobileState.apiState === "success") {
            //     setRedirect([true, `/ndc-details/${verifyUpnAndMobileSubmitOtpState.data.ApplicationId}`])
            // }

            verifyUpnAndMobileSubmitOtpState.apiState = ""
        }
    }, [verifyUpnAndMobileSubmitOtpState])

    // Functions
    const handleSubmit = () => {
        if (verifyUpnAndMobileState.apiState === "success") {
            verifyUpnAndMobileSubmitOtp({
                OrgId: formData.OrgId,
                PropertyRefId: verifyUpnAndMobileState.data.PropertyRefId,
                OwnerId: verifyUpnAndMobileState.data.OwnerId,
                MobileNumber: formData.mobile,
                upn: formData.upn,
                ApplicationType: formData.ApplicationType,
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

    const resetForm = () => {
        setFormData(initialFormData)
        form.resetFields()
    }


    const handleOnchange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleResendOtp = () => {
        setFormData({
            ...formData,
            ['otp']: "",
        })
        verifyUpnAndMobileState.apiState = ""
        handleSubmit()
    }

    return (
        <Container id="security-check-section">
            <Heading>Security Check</Heading>
            {!apiSuccess &&
                <>
                    <Description>For security reasons we need to verify that you are authorised to apply for services for the property. Please enter following details to verify authorisation.</Description>
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        form={form}
                        requiredMark={false}
                    >
                        <Row gutter="24" >
                            <Col span="8">
                                <FormItem
                                    name="ApplicationId"
                                    rules={[
                                        { required: true, message: 'Required' },
                                        {
                                            pattern: new RegExp("^[0-9]+$"),
                                            message: 'Enter valid application number.',
                                        }]}
                                >
                                    <Input size="large" maxLength={8} name="ApplicationId" onChange={handleOnchange} placeholder="Enter application no." readOnly={verifyUpnAndMobileState.apiState === "success"} />
                                </FormItem>
                            </Col>
                            {verifyUpnAndMobileState.apiState === "success" &&
                                <Col span="8">
                                    <FormItem
                                        name="otp"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Input size="large" name="otp" onChange={handleOnchange} placeholder="Enter OTP" />
                                    </FormItem>
                                </Col>
                            }
                        </Row>
                        <BlueButton htmlType="submit" loading={
                            (verifyUpnAndMobileState.apiState === "loading" || verifyUpnAndMobileSubmitOtpState.apiState === "loading") ? true : false
                        } >
                            {verifyUpnAndMobileState.apiState === "success" ? "VERIFY" : "GET OTP"}
                        </BlueButton>
                        {verifyUpnAndMobileState.apiState === "success" &&
                            <>
                                <Button style={{ padding: '0px' }} type="link" onClick={() => {
                                    verifyUpnAndMobileResetState()
                                    resetForm()
                                }} icon={<UndoOutlined />} >Change Application No.</Button>
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
                <Description>You've successfully verified your authorisation on NOC Number <b>{formData.TransferPermissionNo}</b></Description>
            }


        </Container>
    )
}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileState: state.verifyUpnAndMobile,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
})
const mapDispatchToProps = (dispatch) => ({
    verifyUpnAndMobile: (params) => dispatch(verifyUpnAndMobile(params)),
    verifyUpnAndMobileResetState: () => dispatch(verifyUpnAndMobileResetState()),
    verifyUpnAndMobileSubmitOtp: (params) => dispatch(verifyUpnAndMobileSubmitOtp(params)),
    verifyUpnAndMobileSubmitOtpResetState: () => dispatch(verifyUpnAndMobileSubmitOtpResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditApplicationSecurity)