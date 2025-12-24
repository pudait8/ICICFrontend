import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CheckOutlined } from "@ant-design/icons"
import { Skeleton, Space } from 'antd'
import { Link } from "react-router-dom"

// components
import {
    Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer,
    Title, Xsteps, Xstep, DocumentUl, DocumentLi, IconContainer, DocumentTitle
} from './ServiceDetailOfEmpanellmentPageStyle'
import { BackIcon } from '../../components/CustomIcons'
import { BlueButton, GhostButton } from '../../components/Xcomponents'
import NdcFormReadOnly from '../../components/NdcFormReadOnly/NdcFormReadOnly'
import SecurityCheck from '../../components/SecurityCheck/SecurityCheck'
import NdcForm from '../../components/NdcForm/NdcForm'

// actions
import { getServiceDetail } from '../../actions/getServiceDetailAction'
import { applyForApplication } from '../../actions/otherAction'
import ApplicationForm from "../../components/ApplicationForm.js/ApplicationForm"
import EmpanellmentFormReadOnly from "../../components/EmpanellmentFormReadOnly/EmpanellmentFormReadOnly"
import EmpanellmentForm from "../../components/EmpanellmentForm/EmpanellmentForm"
import { getOrgId } from '../../utils'


const ServiceDetailOfEmpanellmentPage = props => {
    // variables
    const {
        getServiceDetail, getServiceDetailState,
        verifyUpnAndMobileSubmitOtpState,
        getPropertyDetailByNocNumberState,

    } = props
    const serviceId = props.match.params.id
    const [securityCheck, setSecurityCheck] = useState({
        open: false,
        type: ''
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

                        {(getServiceDetailState.data.Process && getServiceDetailState.data.Process.length > 0) &&
                            <>
                                <Title>Process (Application disposal time is {getServiceDetailState.data.TAT} Days)</Title>
                                <Xsteps progressDot direction="vertical" className="xtabs">
                                    {getServiceDetailState.data.Process.map(item => (
                                        <Xstep title={item} />
                                    ))}
                                </Xsteps>
                            </>
                        }

                        <Space size="middle" >
                            <Link to={{ pathname: getServiceDetailState.data.DocumentLink }} target="_blank" ><BlueButton >PRINT BLANK FORM</BlueButton></Link>
                            {getServiceDetailState.data.AllowOnline === "Y" &&
                                <>
                                    <BlueButton onClick={verifyUpnAndMobileSubmitOtpState.apiState !== "success" ? () => setSecurityCheck({ ...securityCheck, ['open']: true, ['type']: 'N' }) : ""} >APPLY FOR NEW</BlueButton>
                                    {/* <BlueButton onClick={verifyUpnAndMobileSubmitOtpState.apiState !== "success" ? () => setSecurityCheck({ ...securityCheck, ['open']: true, ['type']: 'Y' }) : ""} >APPLY FOR RENEWAL</BlueButton> */}
                                </>
                            }
                            <Link to="/" ><GhostButton >GO BACK TO MAIN PAGE</GhostButton></Link>
                        </Space>

                        {getServiceDetailState.data.AllowOnline !== "Y" &&
                            <div style={{ color: "red", marginTop: 20 }}>Online application submission shall be available soon.</div>
                        }

                        {securityCheck.open &&
                            <SecurityCheck serviceId={serviceId} IsRenewal={securityCheck.type} />
                        }

                        {verifyUpnAndMobileSubmitOtpState.apiState != "success" &&
                            <EmpanellmentFormReadOnly />
                        }

                        {verifyUpnAndMobileSubmitOtpState.apiState === "success" &&
                            <EmpanellmentForm serviceId={serviceId} />
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
    getPropertyDetailByNocNumberState: state.getPropertyDetailByNocNumber,
})
const mapDispatchToProps = (dispatch) => ({
    getServiceDetail: (params) => dispatch(getServiceDetail(params)),
    applyForApplication: () => dispatch(applyForApplication()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailOfEmpanellmentPage)