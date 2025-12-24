import React, { useEffect } from "react"
import { connect } from "react-redux"

// components
import { Container, Heading, WelcomeText } from './WelcomeSectionStyle'
import { BlueButton } from '../Xcomponents'

// actions
import { logout } from '../../actions/logoutAction'

// others
import { getAuthUser } from "../../utils"

const WelcomeSection = props => {
    // variables
    const name = (getAuthUser() && getAuthUser().PersonalDetails) ? getAuthUser().PersonalDetails.Name : ""
    const {
        logout,
    } = props



    return (
        <Container id="welcome-section">
            <Heading>Login to Apply for Application</Heading>
            <WelcomeText>Welcome <b>{name}</b>. You may proceed to next step of Property Verification. </WelcomeText>
            <BlueButton onClick={() => logout()} >LOGOUT</BlueButton>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(WelcomeSection)