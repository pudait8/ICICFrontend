import React, { useState, useEffect } from "react"
import { Radio, Form, Input, DatePicker, Space, Button, notification } from "antd"
import { connect } from "react-redux"
import moment from 'moment'
import { Link, Redirect } from "react-router-dom"

// components
import { Container, Heading, RadioContainer, FormContainer } from "./ForgotPasswordStyle"
import { BlueButton } from '../../components/Xcomponents'

// actions
import { forgotPasswordSendOtp, forgotPasswordSendOtpResetState } from '../../actions/forgotPasswordSendOtpAction'
import { forgotPasswordValidateOtp, forgotPasswordValidateOtpResetState } from '../../actions/forgotPasswordValidateOtpAction'
import { setAuthTransactionNumber } from '../../actions/setNewPasswordAction'

const ForgotPassword = props => {
    // variables
    const {
        forgotPasswordSendOtp, forgotPasswordSendOtpResetState, forgotPasswordSendOtpState,
        forgotPasswordValidateOtp, forgotPasswordValidateOtpResetState, forgotPasswordValidateOtpState,
        setAuthTransactionNumber
    } = props
    const [form] = Form.useForm()
    const [displayInput, setDisplayInput] = useState("mobile")
    const [formData, setFormData] = useState({
        Mobile: "",
        Username: "",
        dob: "",
        otp: "",
    })
    const [redirect, setRedirect] = useState([false, ""])

    // callbacks
    useEffect(() => {
        return () => {
            forgotPasswordSendOtpResetState()
            forgotPasswordValidateOtpResetState()
        }
    }, [])

    useEffect(() => {
        if (displayInput === "mobile") {
            form.setFieldsValue({
                Username: null,
            })
            setFormData({ ...formData, ["Username"]: null })
        }

        if (displayInput === "username") {
            form.setFieldsValue({
                Mobile: null,
            })
            setFormData({ ...formData, ["Mobile"]: null })
        }
    }, [displayInput])

    useEffect(() => {
        if (forgotPasswordSendOtpState.apiState === "error" || forgotPasswordSendOtpState.apiState === "alert") {
            notification.error({
                message: forgotPasswordSendOtpState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (forgotPasswordSendOtpState.apiState === "success") {
            notification.success({
                message: forgotPasswordSendOtpState.apiMessage,
                placement: "bottomRight"
            })
        }
    }, [forgotPasswordSendOtpState])


    useEffect(() => {
        if (forgotPasswordValidateOtpState.apiState === "error" || forgotPasswordValidateOtpState.apiState === "alert") {
            notification.error({
                message: forgotPasswordValidateOtpState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (forgotPasswordValidateOtpState.apiState === "success") {
            notification.success({
                message: forgotPasswordValidateOtpState.apiMessage,
                placement: "bottomRight"
            })
            setAuthTransactionNumber(forgotPasswordValidateOtpState.data.AuthTransactionNumber)
            setRedirect([true, "/set-new-password"])
        }
    }, [forgotPasswordValidateOtpState])

    // functions
    const onFinish = () => {
        if (forgotPasswordSendOtpState.apiState === "success") {
            let obj = forgotPasswordSendOtpState.data
            obj.OTP = formData.otp
            forgotPasswordValidateOtp(obj)
        } else {
            forgotPasswordSendOtp({
                "LoginId": formData.Username,
                "MobileNumber": formData.Mobile,
                "DateOfBirth": formData.dob
            })
        }
    }

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDatePickerChange = (date, dateString) => {
        setFormData({ ...formData, ["dob"]: moment(date).format('DD-MMM-YYYY') })
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />
            }
            <Container>
                <Heading>Forgot Password</Heading>
                <RadioContainer>
                    <Radio.Group defaultValue="mobile" buttonStyle="solid" size="large" onChange={e => setDisplayInput(e.target.value)}>
                        <Radio.Button value="mobile">Mobile</Radio.Button>
                        <Radio.Button value="username">Username</Radio.Button>
                    </Radio.Group>
                </RadioContainer>
                <FormContainer>
                    <Form form={form} layout="vertical" onFinish={onFinish} >
                        <Form.Item
                            name="Mobile"
                            label="Mobile"
                            rules={displayInput === "mobile" ? [{ required: true, message: 'Required' }, { pattern: '^[0-9]{10}$', message: 'Mobile number is not valid' }] : []}
                            style={displayInput === "mobile" ? { display: "block" } : { display: "none" }}
                        >
                            <Input size="large" name="Mobile" onChange={handleOnChange} />
                        </Form.Item>
                        <Form.Item
                            name="Username"
                            label="Username"
                            rules={displayInput === "username" ? [{ required: true, message: 'Required' }] : []}
                            style={displayInput === "username" ? { display: "block" } : { display: "none" }}
                        >
                            <Input size="large" name="Username" onChange={handleOnChange} />
                        </Form.Item>
                        <Form.Item
                            name="DateOfBirth"
                            label="Date of Birth"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <DatePicker
                                size="large"
                                name="DateOfBirth"
                                format="DD-MM-YYYY"
                                style={{ width: "100%" }}
                                placeholder=""
                                onChange={handleDatePickerChange}
                            />
                        </Form.Item>
                        {forgotPasswordSendOtpState.apiState === "success" &&
                            <Form.Item
                                name="otp"
                                label="OTP"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input size="large" name="otp" onChange={handleOnChange} />
                            </Form.Item>
                        }
                        <Space direction="vertical" >
                            <Button htmlType="submit" type="primary" size="large"
                                loading={(forgotPasswordSendOtpState.apiState === "loading" || forgotPasswordValidateOtpState.apiState === "loading") ? true : false}
                            >
                                {forgotPasswordSendOtpState.apiState === "success"
                                    ? "VALIDATE OTP"
                                    : "GET OTP"}
                            </Button>
                        </Space>
                    </Form>
                </FormContainer>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    forgotPasswordSendOtpState: state.forgotPasswordSendOtp,
    forgotPasswordValidateOtpState: state.forgotPasswordValidateOtp,
})
const mapDispatchToProps = (dispatch) => ({
    forgotPasswordSendOtp: (params) => dispatch(forgotPasswordSendOtp(params)),
    forgotPasswordValidateOtp: (params) => dispatch(forgotPasswordValidateOtp(params)),
    forgotPasswordSendOtpResetState: () => dispatch(forgotPasswordSendOtpResetState()),
    forgotPasswordValidateOtpResetState: () => dispatch(forgotPasswordValidateOtpResetState()),
    setAuthTransactionNumber: (AuthTransactionNumber) => dispatch(setAuthTransactionNumber(AuthTransactionNumber)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)