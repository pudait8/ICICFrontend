import React, { useEffect } from 'react'
import { connect } from "react-redux"

import { BlueButton } from '../../components/Xcomponents'
import { Link, Redirect } from "react-router-dom"
import { Container, Heading } from '../../components/ServiceDetailsPrivatePropertiesForm/ServiceDetailsPrivatePropertiesFormStyle'
import { saveNdcApplicationResetState } from '../../actions/saveNdcApplicationAction'
import { saveOwnerPrivatePropertiesResetState } from '../../actions/saveOwnerPrivatePropertiesAction'

const SuccesApplicationPage = (props) => {

    const { saveNdcApplicationResetState, saveOwnerPrivatePropertiesResetState, saveOwnerPrivatePropertiesState } = props;

    useEffect(() => {
        // saveNdcApplicationResetState();
        // saveOwnerPrivatePropertiesResetState();
    }, [])

    // console.log(saveOwnerPrivatePropertiesState);
    return (
        <Container >
            <Heading>Your Application has been submitted successfully</Heading>
            <b> Your Application No is : </b> {props.appId}
            <br />
            {/* <br />
            <Link to="/" ><BlueButton>GO TO MAIN PAGE</BlueButton></Link> */}
        </Container>
    )
}


const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveOwnerPrivatePropertiesState: state.saveOwnerPrivateProperties,
    getSalutationListState: state.getSalutationList,
    getOwnerListState: state.getOwnerList,
    saveNdcApplicationState: state.saveNdcApplication,

})

const mapDispatchToProps = (dispatch) => ({
    // saveNdcApplicationResetState: () => dispatch(saveNdcApplicationResetState()),
    // saveOwnerPrivatePropertiesResetState: () => dispatch(saveOwnerPrivatePropertiesResetState()),
})

export default connect(null, mapDispatchToProps)(SuccesApplicationPage)

