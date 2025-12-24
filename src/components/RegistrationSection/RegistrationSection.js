import React, { useEffect, useState } from "react"
import { Row, Col, Form, Select, DatePicker, Input, Tooltip, Button, notification, Space } from "antd"
import moment from 'moment'
import { connect } from "react-redux"

// component
import { Container, Heading } from "./RegistrationSectionStyle"
import { BlueButton } from '../Xcomponents'

// actions
import { openLoginSection } from '../../actions/otherAction'
import { citizenSignup, citizenSignupResetState } from '../../actions/citizenSignupAction'
import { citizenSignupVerifyOtp, citizenSignupVerifyOtpResetState } from '../../actions/citizenSignupVerifyOtpAction'
import { citizenSignupResendOtp, citizenSignupResendOtpResetState } from '../../actions/citizenSignupResendOtpAction'

const Option = Select

const RegistrationSection = props => {
    // variables
    let initialState = {
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        mobile: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
        otp: "",
    }
    const [formData, setFormData] = useState(initialState)
    const {
        openLoginSection,
        citizenSignup,
        citizenSignupResetState,
        citizenSignupState,
        citizenSignupVerifyOtp,
        citizenSignupVerifyOtpResetState,
        citizenSignupVerifyOtpState,
        citizenSignupResendOtp,
        citizenSignupResendOtpResetState,
        citizenSignupResendOtpState
    } = props
    const [signupToast, setSignupToast] = useState(false)
    const [signupOtpToast, setSignupOtpToast] = useState(false)
    const [signupResendOtpToast, setSignupResendOtpToast] = useState(false)

    //  callbacks
    useEffect(() => {
        return () => {
            // citizenSignupResetState()
            // citizenSignupVerifyOtpResetState()
            // citizenSignupResendOtpResetState()
        }
    }, [])


    useEffect(() => {
        if (citizenSignupState.apiState === "alert") {
            notification["error"]({
                message: citizenSignupState.apiMessage,
                placement: "bottomRight"
            })
            citizenSignupResetState()
        }

        if (citizenSignupState.apiState === "success") {
            setSignupToast(true)
        }
    }, [citizenSignupState])

    useEffect(() => {
        if (signupToast) {
            notification["success"]({
                message: citizenSignupState.apiMessage,
                placement: "bottomRight"
            })
            setSignupToast(false)
        }
    }, [signupToast])

    useEffect(() => {
        if (citizenSignupVerifyOtpState.apiState === "alert") {
            notification["error"]({
                message: citizenSignupVerifyOtpState.apiMessage,
                placement: "bottomRight"
            })
            citizenSignupVerifyOtpResetState()
        }

        if (citizenSignupVerifyOtpState.apiState === "success") {
            setSignupOtpToast(true)
        }
    }, [citizenSignupVerifyOtpState])

    useEffect(() => {
        if (signupOtpToast) {
            notification["success"]({
                message: citizenSignupVerifyOtpState.apiMessage,
                placement: "bottomRight"
            })
            setSignupOtpToast(false)
        }
    }, [signupOtpToast])

    useEffect(() => {
        if (citizenSignupResendOtpState.apiState === "alert") {
            notification["error"]({
                message: citizenSignupResendOtpState.apiMessage,
                placement: "bottomRight"
            })
            citizenSignupResendOtpResetState()
        }

        if (citizenSignupResendOtpState.apiState === "success") {
            setSignupResendOtpToast(true)
        }
    }, [citizenSignupResendOtpState])

    useEffect(() => {
        if (signupResendOtpToast) {
            notification["success"]({
                message: citizenSignupResendOtpState.apiMessage,
                placement: "bottomRight"
            })
            setSignupResendOtpToast(false)
        }
    }, [signupResendOtpToast])


    // functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSelect = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleDateChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: moment(value).format('DD-MMM-YYYY')
        })
    }

    const disabledDate = (current) => {
        var tillDate = moment().subtract(13, 'years')
        return !(tillDate.isAfter(current));
    }

    const handleSubmit = () => {
        if (citizenSignupState.apiState === "success") {
            let payload = citizenSignupState.data
            payload.OTP = formData.otp
            citizenSignupVerifyOtp(payload)
        } else {
            citizenSignup(formData)
        }
    }

    const handleResendOtp = () => {
        citizenSignupResendOtp(citizenSignupState.data)
    }

    return (
        <Container id="registration-section">
            <Heading>Citizen Signup</Heading>
            <Form
                layout="vertical"
                hideRequiredMark={true}
                onFinish={handleSubmit}
            >
                <Row gutter="32">
                    <Col span="12">
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input
                                name="first_name"
                                size="large"
                                onChange={handleOnChange} />
                        </Form.Item>
                    </Col>
                    <Col span="12">
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input
                                name="last_name"
                                size="large"
                                onChange={handleOnChange} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter="32">
                    <Col span="8">
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select
                                name="gender"
                                size="large"
                                onSelect={(v) => handleOnSelect("gender", v)}>
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span="8">
                        <Form.Item
                            name="dob"
                            label="Date of Birth"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <DatePicker
                                name="dob"
                                format="DD-MM-YYYY"
                                placeholder=""
                                size="large"
                                style={{ width: "100%" }}
                                disabledDate={disabledDate}
                                defaultPickerValue={moment('2000/01/01')}
                                onChange={(date, dateString) => handleDateChange("dob", date)} />
                        </Form.Item>
                    </Col>
                    <Col span="8">
                        <Tooltip title="dot (.) and underscore (_) allowed with minimum 8 characters and max 15 charaters." placement="top" trigger="focus">
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { pattern: '^(?=.{8,15}$)[a-zA-Z0-9._]+$', message: 'Username is not valid' },
                                ]}
                            >
                                <Input
                                    name="username"
                                    size="large"
                                    onChange={handleOnChange} />
                            </Form.Item>
                        </Tooltip>
                    </Col>
                </Row>

                <Row gutter="32">
                    <Col span="12">
                        <Form.Item
                            name="mobile"
                            label="Mobile"
                            rules={[
                                { required: true, message: 'Required' },
                                { pattern: '^[0-9]{10}$', message: 'Mobile number is not valid' }
                            ]}
                        >
                            <Input
                                type="number"
                                name="mobile"
                                addonBefore="+91"
                                size="large"
                                onChange={handleOnChange} />
                        </Form.Item>
                    </Col>
                    <Col span="12">
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Required' },
                                { type: 'email', message: 'Email is not valid' },
                            ]}
                        >
                            <Input
                                name="email"
                                size="large"
                                onChange={handleOnChange} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter="32">
                    <Col span="12">
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: 'Required' },
                                { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})", message: 'Password should be at least 8 characters long with lowercase, uppercase, numeric character,and special symbol characters' }
                            ]}
                        >
                            <Input.Password
                                name="password"
                                size="large"
                                onChange={handleOnChange} />
                        </Form.Item>
                    </Col>
                    <Col span="12">
                        <Form.Item
                            name="confirm_password"
                            label="Confirm Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm your password',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Passwords do not match');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                name="confirm_password"
                                size="large"
                                onChange={handleOnChange} />
                        </Form.Item>
                    </Col>
                </Row>

                {
                    citizenSignupState.apiState === "success" &&
                    <div>
                        <Space>
                            <Form.Item
                                label="Enter OTP"
                                name="otp"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input size="large" name="otp" onChange={handleOnChange} />
                            </Form.Item>
                            <Button type="link" onClick={handleResendOtp} loading={citizenSignupResendOtpState.apiState === "loading" ? true : false} >Resend OTP</Button>
                        </Space>
                    </div>
                }

                <BlueButton htmlType="submit" loading={(citizenSignupState.apiState === "loading" || citizenSignupVerifyOtpState.apiState === "loading") ? true : false} >
                    {
                        citizenSignupState.apiState === "success"
                            ? "SIGNUP"
                            : "GET OTP"
                    }
                </BlueButton>
                <p>
                    Already registered?
                        <Button type="link" onClick={() => openLoginSection()} ><b>Login Now</b></Button>
                </p>



            </Form>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    citizenSignupState: state.citizenSignup,
    citizenSignupVerifyOtpState: state.citizenSignupVerifyOtp,
    citizenSignupResendOtpState: state.citizenSignupResendOtp,
})
const mapDispatchToProps = (dispatch) => ({
    openLoginSection: () => dispatch(openLoginSection()),
    citizenSignup: (params) => dispatch(citizenSignup(params)),
    citizenSignupVerifyOtp: (params) => dispatch(citizenSignupVerifyOtp(params)),
    citizenSignupResendOtp: (params) => dispatch(citizenSignupResendOtp(params)),
    citizenSignupResetState: () => dispatch(citizenSignupResetState()),
    citizenSignupVerifyOtpResetState: () => dispatch(citizenSignupVerifyOtpResetState()),
    citizenSignupResendOtpResetState: () => dispatch(citizenSignupResendOtpResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationSection)