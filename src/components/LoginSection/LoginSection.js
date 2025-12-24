import React, { useEffect, useState } from "react"
import { Form, Alert, notification, Input } from "antd"
import { connect } from "react-redux"
import { PropTypes } from 'prop-types'

// components
import {
    Container, Heading, LoginContainer, LeftSection, RightSection, Title,
    Description, ForgotPaswordText
} from './LoginSectionStyle'
import {
    BlueButton, CenteredColumn, BlankSpace,
    BlueLink
} from '../Xcomponents'

// actions
import { login, loginResetState } from '../../actions/loginAction'
import { openRegistrationSection } from '../../actions/otherAction'


const LoginSection = props => {
    // variables
    const { login, loginResetState, loginState,
        openRegistrationSection } = props
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    // callbacks
    useEffect(() => {
        if (loginState.apiState === "error") {
            notification["error"]({
                message: loginState.apiMessage,
                placement: "bottomRight"
            })
            loginResetState()
        }
        if (loginState.apiState === "alert") {
            setTimeout(() => loginResetState(), 10000)
        }
    }, [loginState.apiState])

    // functions
    const handleOnchange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        login(formData)
    }

    return (
        <Container id="login-section" >
            <Heading>{props.loginSectionTitle}</Heading>
            <LoginContainer>
                <LeftSection>
                    <Title>Registered User!</Title>

                    {loginState.apiState === "alert" &&
                        <Alert message={loginState.apiMessage} type="error" showIcon style={{ marginBottom: 24 }} />
                    }
                    <Form onFinish={handleSubmit} >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input size="large" name="username" placeholder="Enter Email" onChange={handleOnchange} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input.Password size="large" name="password" placeholder="Enter Password" onChange={handleOnchange} />
                        </Form.Item>
                        <CenteredColumn>
                            <BlueButton
                                htmlType="submit"
                                loading={loginState.apiState === "loading" ? true : false}
                            >LOGIN</BlueButton>
                            <ForgotPaswordText>Forget Password? <BlueLink to="/forgot-password" >Click here</BlueLink></ForgotPaswordText>
                        </CenteredColumn>
                    </Form>

                </LeftSection>
                <RightSection>
                    <Title>Not Registered Yet?</Title>
                    <Description>{"Register with Punjab Urban Planning & Development Authority Online Portal and get access to 30+ Services"}</Description>
                    <BlueButton onClick={() => openRegistrationSection()} >Register Now</BlueButton>
                    <BlankSpace />
                    {/* <Description >{"Contact our common Service Portal Help-Line 1800000000 for further Information."}</Description> */}
                </RightSection>
            </LoginContainer>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    loginState: state.login,
})
const mapDispatchToProps = (dispatch) => ({
    login: (params) => dispatch(login(params)),
    loginResetState: () => dispatch(loginResetState()),
    openRegistrationSection: () => dispatch(openRegistrationSection()),
})

LoginSection.propTypes = {
    loginSectionTitle: PropTypes.string,
}

LoginSection.defaultProps = {
    loginSectionTitle: "Login to Apply for Application",
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection)