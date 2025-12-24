import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CheckOutlined } from "@ant-design/icons"
import { Skeleton, Space } from 'antd'
import { Link } from "react-router-dom"

// components
import {
    Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer,
    Title, Xsteps, Xstep, DocumentUl, DocumentLi, IconContainer, DocumentTitle
} from './BuildingDetailsPrivatePropertiesStyles'
import { BackIcon } from '../../components/CustomIcons'
import { BlueButton, GhostButton } from '../../components/Xcomponents'
import NdcFormReadOnly from '../../components/NdcFormReadOnly/NdcFormReadOnly'
import SecurityCheck from '../../components/SecurityCheck/SecurityCheck'
import NdcForm from '../../components/NdcForm/NdcForm'

// actions
import { getServiceDetail, getServiceDetailResetState } from '../../actions/getServiceDetailAction'
import { applyForApplication } from '../../actions/otherAction'
import ApplicationForm from "../../components/ApplicationForm.js/ApplicationForm"

import { getOrgId } from '../../utils'
import BuildingDetailsPrivatePropertiesForm from "../../components/BuildingDetailsPrivatePropertiesForm/BuildingDetailsPrivatePropertiesForm"

const BuildingDetailsPrivatePropertiesPage = props => {
    // variables
    const {
        getServiceDetail, getServiceDetailState, getServiceDetailResetState,
        verifyUpnAndMobileSubmitOtpState,
        getPropertyDetailByNocNumberState,

    } = props
    const serviceId = props.match.params.id
    const [securityCheck, setSecurityCheck] = useState(false)

    // callbacks
    useEffect(() => {
        getServiceDetailResetState()
        window.scrollTo(0, 2)
    }, [])
    useEffect(() => {
        if (serviceId !== '27') {
            window.onbeforeunload = () => {
                return true
            }
            return () => {
                window.onbeforeunload = null
            }
        }
    }, [])

    useEffect(() => {
        getServiceDetail({
            serviceId: serviceId,
            OrgId: getOrgId()
        })
    }, [])

    useEffect(() => {
        if (securityCheck) {
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
                            <Link to="/architect-dashboard" >
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

                        {getServiceDetailState.data.ApplicationDocumentList &&
                            <>
                                <Title>Required Documents</Title>
                                <DocumentUl>
                                    {getServiceDetailState.data.ApplicationDocumentList.map(document => (
                                        <DocumentLi>
                                            <IconContainer>
                                                <CheckOutlined style={{ color: "#fff" }} />
                                            </IconContainer>
                                            <DocumentTitle>{document.DocumentName}</DocumentTitle>
                                        </DocumentLi>
                                    ))}
                                </DocumentUl>
                            </>
                        }

                        <Space size="middle" >
                            <Link to={{ pathname: getServiceDetailState.data.DocumentLink }} target="_blank" ><BlueButton >PRINT BLANK FORM</BlueButton></Link>
                            {getServiceDetailState.data.AllowOnline === "Y" &&
                                <BlueButton onClick={() => setSecurityCheck(true)} >APPLY ONLINE</BlueButton>
                            }
                            <Link to="/" ><GhostButton >GO BACK TO MAIN PAGE</GhostButton></Link>
                        </Space>

                        {getServiceDetailState.data.AllowOnline !== "Y" &&
                            <div style={{ color: "red", marginTop: 20 }}>Online application submission shall be available soon.</div>
                        }
                        {securityCheck &&
                            <SecurityCheck serviceId={serviceId} />
                        }

                        {verifyUpnAndMobileSubmitOtpState.apiState != "success" &&
                            <NdcFormReadOnly serviceId={serviceId} changeOfOwnerShip={(serviceId === '1509' || serviceId === '1508' || serviceId === '26' || serviceId === '25' || serviceId === '32') ? true : false} />
                        }

                        {verifyUpnAndMobileSubmitOtpState.apiState === "success" &&
                            <BuildingDetailsPrivatePropertiesForm serviceId={serviceId} />
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
    getServiceDetailResetState: () => dispatch(getServiceDetailResetState())
})

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetailsPrivatePropertiesPage)