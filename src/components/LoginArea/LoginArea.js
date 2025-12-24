import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { notification } from "antd"
import { PropTypes } from 'prop-types'

// components
import LoginSection from '../LoginSection/LoginSection'
import WelcomeSection from '../WelcomeSection/WelcomeSection'
import RegistrationSection from '../RegistrationSection/RegistrationSection'

// actions
import { applyForApplicationReset, openLoginSectionReset, openRegistrationSectionReset } from '../../actions/otherAction'
import { loginResetState } from '../../actions/loginAction'

// others
import { isUserLoggedIn } from '../../utils'

const LoginArea = props => {
    // variables
    const {
        loginState, otherState, applyForApplicationReset,
        loginResetState,
        openLoginSectionReset,
        openRegistrationSectionReset
    } = props

    // callbacks
    useEffect(() => {
        if (otherState.applyForApplication) {
            if (loginState.isUserLoggedIn) {
                if (document.getElementById("welcome-section")) {
                    document.getElementById("welcome-section").style.height = "150px";
                }

                if (document.getElementById("security-check-section")) {
                    document.getElementById("security-check-section").style.height = "auto";
                    document.getElementById('security-check-section').scrollIntoView({
                        behavior: 'smooth',
                        block: "center"
                    })
                }
            } else {
                document.getElementById('login-section').scrollIntoView({
                    behavior: 'smooth',
                    block: "center"
                })
                document.getElementById("login-section").style.height = "400px";
                document.getElementById("registration-section").style.height = "0px";
            }
            applyForApplicationReset()
        }

        if (otherState.openLoginSection) {
            if (loginState.isUserLoggedIn) {
                if (document.getElementById('security-check-section')) {
                    document.getElementById('security-check-section').scrollIntoView({
                        behavior: 'smooth',
                        block: "center"
                    })
                }
            } else {
                if (document.getElementById('login-section')) {
                    document.getElementById('login-section').scrollIntoView({
                        behavior: 'smooth',
                        block: "center"
                    })
                    document.getElementById("login-section").style.height = "400px";
                    openLoginSectionReset()
                }
                if (document.getElementById('registration-section')) {
                    document.getElementById("registration-section").style.height = "0px";
                }
            }
        }

        if (loginState.apiState === "success") {
            notification["success"]({
                message: loginState.apiMessage,
                placement: "bottomRight"
            })
            if (document.getElementById("welcome-section")) {
                document.getElementById("welcome-section").style.height = "150px";
            }
            if (document.getElementById("security-check-section")) {
                document.getElementById("security-check-section").style.height = "auto";
                document.getElementById('security-check-section').scrollIntoView({
                    behavior: 'smooth',
                    block: "center"
                })
            }

            localStorage.setItem("PudaAuthUser", JSON.stringify(loginState.data))
            localStorage.setItem("PudaAuthId", loginState.AuthId)
            localStorage.setItem("PudaAuthKey", loginState.AuthKey)
            loginResetState()
        }

        if (otherState.openRegistrationSection) {
            document.getElementById("login-section").style.height = "0px";
            document.getElementById("registration-section").style.height = "auto";
            openRegistrationSectionReset()
        }
    }, [otherState, loginState])

    return (
        <>
            {!loginState.isUserLoggedIn &&
                <LoginSection loginSectionTitle={props.loginSectionTitle} />
            }

            {(loginState.isUserLoggedIn && !props.hideWelcomeSection) &&
                <WelcomeSection />
            }

            <RegistrationSection />
        </>
    )
}

const mapStateToProps = (state) => ({
    loginState: state.login,
    otherState: state.other,
})
const mapDispatchToProps = (dispatch) => ({
    applyForApplicationReset: () => dispatch(applyForApplicationReset()),
    openLoginSectionReset: () => dispatch(openLoginSectionReset()),
    loginResetState: () => dispatch(loginResetState()),
    openRegistrationSectionReset: () => dispatch(openRegistrationSectionReset()),
})

LoginArea.propTypes = {
    loginSectionTitle: PropTypes.string,
    hideWelcomeSection: PropTypes.bool,
}

LoginArea.defaultProps = {
    loginSectionTitle: "Login to Apply for Application",
    hideWelcomeSection: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginArea)