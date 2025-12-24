import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Row, Col, Form, Skeleton, Input, Select, notification, List } from "antd"

// components
import {
    Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer,
} from './EditApplicationStyle'
import { BackIcon } from '../../components/CustomIcons'
import { BlueButton, GhostButton } from '../../components/Xcomponents'
import EditApplicationSecurity from "../../components/EditApplicationSecurity/EditApplicationSecurity"
import { viewEditApplication, viewEditApplicationResetState } from '../../actions/viewEditApplicationAction'
import { getOrgId, getAuthData } from '../../utils'
import EditNdcForm from "../../components/EditNdcForm/EditNdcForm"
import EditApplicationForm from "../../components/EditApplicationForm.js/EditApplicationForm"
const EditApplication = props => {
    // variables
    const OrgId = getOrgId()
    const ApplicationId = props.match.params.ApplicationId
    const {
        verifyUpnAndMobileSubmitOtpState,
        viewEditApplication, viewEditApplicationState, viewEditApplicationResetState,


    } = props
    const [securityCheck, setSecurityCheck] = useState(true)
    const [serviceId, setServiceId] = useState()
    const [token, setToken] = useState({
        AuthToken: getAuthData().AuthId,
        AuthTokenKey: getAuthData().AuthKey
    })
    // useState
    // callbacks


    useEffect(() => {
        verifyUpnAndMobileSubmitOtpState.AuthToken = token.AuthToken
        verifyUpnAndMobileSubmitOtpState.AuthTokenKey = token.AuthTokenKey
        viewEditApplication({
            OrgId: OrgId,
            ApplicationId: parseInt(ApplicationId),
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
        })

        return (() => {
            viewEditApplicationResetState()
        })
    }, [])

    useEffect(() => {
        if (viewEditApplicationState.apiState === "success") {
            setServiceId(viewEditApplicationState.data.ApplicationTypeId.toString())
            localStorage.removeItem('PudaAuthTokenKey')
            localStorage.removeItem('PudaAuthToken')
        }

    }, [viewEditApplicationState.apiState])

    const fetchNdcApplication = () => {
        viewEditApplication({
            OrgId: OrgId,
            ApplicationId: parseInt(ApplicationId),
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
            ApiKey: 'ViewEditApplication'
        })
    }

    // Function 
    return (
        <Container>
            <>

                <ServiceBar>
                    <LeftSection>
                        <Link to="/" >
                            <BackIcon style={{ marginTop: 5 }} />
                        </Link>
                    </LeftSection>
                    <RightSection>
                        <ServiceName>Edit For Submit Application</ServiceName>
                    </RightSection>
                </ServiceBar>
                {viewEditApplicationState.apiState === "loading" &&
                    <Skeleton active />
                }
                <DetailContainer>
                    {/* {securityCheck &&
                        <EditApplicationSecurity />
                    } */}

                    {(viewEditApplicationState.apiState === "success" && serviceId) &&
                        [(serviceId === '21' || serviceId === '1048' || serviceId === '20' || serviceId === '1509' || serviceId === '1508' || serviceId === '26' || (viewEditApplicationState.data.Source === 'Old' && serviceId === '25') ? true : false || (viewEditApplicationState.data.Source === 'Old' && serviceId === '32') ? true : false) ?
                            <EditApplicationForm fetchNdcApplication={fetchNdcApplication} serviceId={serviceId} changeOfOwnerShip={(serviceId === '1509' || serviceId === '1508' || serviceId === '26' || serviceId === '25' || serviceId === '32') ? true : false} token={token} />
                            : <EditNdcForm fetchNdcApplication={fetchNdcApplication} serviceId={serviceId} />
                        ]
                    }

                </DetailContainer>
            </>
        </Container >
    )
}

const mapStateToProps = (state) => ({
    viewEditApplicationState: state.viewEditApplication,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
})
const mapDispatchToProps = (dispatch) => ({
    viewEditApplication: (params) => dispatch(viewEditApplication(params)),
    viewEditApplicationResetState: () => dispatch(viewEditApplicationResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditApplication)