import React, { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { Space, } from 'antd'
import { connect } from "react-redux"


// components
import {
    ButtonContainer,
    Container,
    TextContainer
} from './ArchitectHeaderStyle'

// actions
import { logout } from '../../actions/logoutAction'
import { verifyPanSubmitOtpResetState } from '../../actions/verifyPanSubmitOtpAction'
import { BlueButton, RedButton } from "../Xcomponents"


const ArchitectHeader = props => {
    // variables
    const {
        verifyPanSubmitOtpState,
        logout,
        verifyPanSubmitOtpResetState,
        logoutState
    } = props
    const [redirect, setRedirect] = useState([false, ""])


    useEffect(() => {
        if (logoutState.apiState === "success") {
            verifyPanSubmitOtpResetState()
            // setRedirect([true, "/"])
        }
    }, [logoutState])

    //Functions
    const logoutCall = () => {
        localStorage.removeItem("PudaArchitectToken")
        localStorage.removeItem("PudaArchitectTokenKey")
        localStorage.removeItem("PudaEnterprenurId")
        localStorage.removeItem("puda_architect_service_id_logged_in")
        verifyPanSubmitOtpResetState()
        setRedirect([true, "/"])
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />
            }
            {verifyPanSubmitOtpState.isUserLoggedIn &&
                <Container width={props.width}>
                    <TextContainer >
                        <span>You are currently logged in as architect.</span>
                    </TextContainer>
                    <ButtonContainer>
                        <Space>
                            <BlueButton style={{ display: props.hideDashboardButton ? "none" : "block" }}>
                                <Link to="/architect-dashboard">Architect Dashboard</Link>
                            </BlueButton>
                            <RedButton>
                                <Link onClick={() => logoutCall()} >Logout</Link>
                            </RedButton>
                        </Space>
                    </ButtonContainer>
                </Container>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    logoutState: state.logout,
    verifyPanSubmitOtpState: state.verifyPanSubmitOtp,
})
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    verifyPanSubmitOtpResetState: () => dispatch(verifyPanSubmitOtpResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArchitectHeader)