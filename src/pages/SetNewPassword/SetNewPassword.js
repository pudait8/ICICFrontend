import React, { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Form, Input, Space, Button, notification } from "antd"

// component
import { Container, Heading, FormContainer } from "./SetNewPasswordStyle"

// actions
import { setNewPassword, setNewPasswordResetState } from '../../actions/setNewPasswordAction'
import { forgotPasswordSendOtpResetState } from '../../actions/forgotPasswordSendOtpAction'
import { forgotPasswordValidateOtpResetState } from '../../actions/forgotPasswordValidateOtpAction'

const SetNewPassword = props => {
    // variables
    const [redirect, setRedirect] = useState([false, ""])
    const {
        forgotPasswordValidateOtpState,
        forgotPasswordSendOtpState,
        setNewPassword, setNewPasswordResetState, setNewPasswordState,
        forgotPasswordSendOtpResetState,
        forgotPasswordValidateOtpResetState
    } = props
    const [formData, setFormData] = useState({
        NewPassword: "",
        ConfirmPassword: "",
    })
    const [form] = Form.useForm()

    // callbacks
    useEffect(() => {
        return () => {
            setNewPasswordResetState()
        }
    }, [])

    useEffect(() => {
        if (!setNewPasswordState.AuthTransactionNumber) {
            setRedirect([true, '/'])
            forgotPasswordSendOtpResetState()
            forgotPasswordValidateOtpResetState()
        }
    }, [])

    useEffect(() => {
        if (setNewPasswordState.apiState === "error" || setNewPasswordState.apiState === "alert") {
            notification.error({
                message: setNewPasswordState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (setNewPasswordState.apiState === "success") {
            notification.success({
                message: setNewPasswordState.apiMessage,
                placement: "bottomRight"
            })
            setRedirect([true, '/'])
            setNewPasswordResetState()
            forgotPasswordSendOtpResetState()
            forgotPasswordValidateOtpResetState()
        }
    }, [setNewPasswordState])

    // functions
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onFinish = () => {
        setNewPassword({
            "AuthTransactionNumber": setNewPasswordState.AuthTransactionNumber,
            "NewPassword": formData.NewPassword,
            "ConfirmNewPassword": formData.ConfirmPassword
        })
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />
            }
            <Container>
                <Heading>Set New Password</Heading>
                <FormContainer>
                    <Form form={form} layout="vertical" onFinish={onFinish} style={{ width: "100%" }} >
                        <Form.Item name="NewPassword" label={"New Password"}
                            rules={[
                                { required: true, message: 'Required' },
                                { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})", message: 'Password should be at least 8 characters long with lowercase, uppercase, numeric character,and special symbol characters' }
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input.Password size="large" name="NewPassword" placeholder="Enter new password" onChange={handleOnChange} />
                        </Form.Item>

                        <Form.Item name="ConfirmPassword" label={"Confirm Password"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm your password',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('NewPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Passwords do not match');
                                    },
                                }),
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input.Password size="large" name="ConfirmPassword" placeholder="Confirm password" onChange={handleOnChange} />
                        </Form.Item>
                        <Space>
                            <Button htmlType="submit" size="large" type="primary" loading={setNewPasswordState.apiState === "loading" ? true : false}  >SUBMIT</Button>
                            <Link to="/"><Button type="link" >Cancel</Button></Link>
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
    setNewPasswordState: state.setNewPassword,
})
const mapDispatchToProps = (dispatch) => ({
    setNewPassword: (params) => dispatch(setNewPassword(params)),
    setNewPasswordResetState: () => dispatch(setNewPasswordResetState()),
    forgotPasswordSendOtpResetState: () => dispatch(forgotPasswordSendOtpResetState()),
    forgotPasswordValidateOtpResetState: () => dispatch(forgotPasswordValidateOtpResetState()),
})
export default connect(mapStateToProps, mapDispatchToProps)(SetNewPassword)