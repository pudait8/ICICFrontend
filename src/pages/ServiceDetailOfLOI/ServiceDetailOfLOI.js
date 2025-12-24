import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Skeleton, Space } from 'antd'
import { Link } from "react-router-dom"

// components
import {
    Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer,
} from './ServiceDetailOfLOIStyle'
import { BackIcon } from '../../components/CustomIcons'
import SecurityCheck from '../../components/SecurityCheck/SecurityCheck'

// actions
import { getServiceDetail } from '../../actions/getServiceDetailAction'
import LetterOfIntent from "../LetterOfIntent/LetterOfIntent"
import { getOrgId } from '../../utils'


const ServiceDetailOfLOI = props => {
    // variables
    const {
        getServiceDetail, getServiceDetailState,
        verifyUpnAndMobileSubmitOtpState,

    } = props
    const serviceId = props.match.params.id
    const [securityCheck, setSecurityCheck] = useState({
        open: false
    })
    // callbacks
    useEffect(() => {
        window.scrollTo(0, 2)
    }, [])
    useEffect(() => {
        window.onbeforeunload = () => {
            return true
        }
        return () => {
            window.onbeforeunload = null
        }
    }, [])

    useEffect(() => {
        getServiceDetail({
            serviceId: serviceId,
            OrgId: getOrgId()
        })

    }, [])

    useEffect(() => {
        if (getServiceDetailState.apiState === "success") {
            setSecurityCheck({ ...securityCheck, ['open']: true })
        }
    }, [getServiceDetailState])

    useEffect(() => {
        if (securityCheck.open) {
            if (document.getElementById("security-check-section")) {
                document.getElementById("security-check-section").style.height = "auto";
                document.getElementById('security-check-section').scrollIntoView({
                    behavior: 'smooth',
                    block: "center"
                })
            }
            // applyForApplicationReset()
        }
    }, [securityCheck])

    // Function 

    return (
        <Container>
            {getServiceDetailState.apiState === "loading" &&
                <>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </>
            }

            {getServiceDetailState.apiState === "success" &&
                <>
                    <ServiceBar>
                        <LeftSection>
                            <Link to="/" >
                                <BackIcon style={{ marginTop: 5 }} />
                            </Link>
                        </LeftSection>
                        <RightSection>
                            <ServiceName>{getServiceDetailState.data.Name}</ServiceName>
                        </RightSection>
                    </ServiceBar>
                    <DetailContainer>

                        {securityCheck.open &&
                            <>
                                <SecurityCheck serviceId={serviceId} />
                            </>
                        }


                        {verifyUpnAndMobileSubmitOtpState.apiState === "success" &&
                            <LetterOfIntent serviceId={serviceId} />
                        }

                    </DetailContainer>
                </>
            }
        </Container >
    )
}

const mapStateToProps = (state) => ({
    getServiceDetailState: state.getServiceDetail,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
})
const mapDispatchToProps = (dispatch) => ({
    getServiceDetail: (params) => dispatch(getServiceDetail(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailOfLOI)