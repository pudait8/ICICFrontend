import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CheckOutlined, DownOutlined } from "@ant-design/icons"
import { Skeleton, Space, Menu, Dropdown } from 'antd'
import { Link } from "react-router-dom"

// components
import {
    Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer,
    Title, Xsteps, Xstep, DocumentUl, DocumentLi, IconContainer, DocumentTitle
} from './ServiceDetailOfEstateAgentPageStyle'
import { BackIcon } from '../../components/CustomIcons'
import { BlueButton, GhostButton } from '../../components/Xcomponents'
import SecurityCheck from '../../components/SecurityCheck/SecurityCheck'

// actions
import { getServiceDetail } from '../../actions/getServiceDetailAction'
import { applyForApplication } from '../../actions/otherAction'
import EstateAgentFormReadOnly from "../../components/EstateAgentFormReadOnly/EstateAgentFormReadOnly"
import EstateAgentForm from "../../components/EstateAgentForm/EstateAgentForm"
import { getOrgId } from '../../utils'

const ServiceDetailOfEstateAgentPage = props => {
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

    const handleMenuClick = (e) => {
        if (verifyUpnAndMobileSubmitOtpState.apiState !== "success") {
            setSecurityCheck({ ...securityCheck, ['open']: true, ['type']: e.key })
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            {verifyUpnAndMobileSubmitOtpState.apiState !== "success" &&
                <>
                    <Menu.Item key="N">
                        APPLY FOR NEW
                    </Menu.Item>
                    <Menu.Item key="Y">
                        APPLY FOR RENEWAL
                    </Menu.Item>
                </>
            }
        </Menu>
    )

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
                                <>
                                    <Dropdown overlay={menu}>
                                        <BlueButton>
                                            {securityCheck.type === "N" ? "APPLY FOR NEW" : securityCheck.type === "Y" ? "APPLY FOR RENEWAL" : "APPLY NOW"} <DownOutlined />
                                        </BlueButton>
                                    </Dropdown>
                                    {/* <BlueButton onClick={verifyUpnAndMobileSubmitOtpState.apiState !== "success" ? () => setSecurityCheck({ ...securityCheck, ['open']: true, ['type']: 'N' }) : ""} >APPLY FOR NEW</BlueButton>
                                    <BlueButton onClick={verifyUpnAndMobileSubmitOtpState.apiState !== "success" ? () => setSecurityCheck({ ...securityCheck, ['open']: true, ['type']: 'Y' }) : ""} >APPLY FOR RENEWAL</BlueButton> */}
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

                        {verifyUpnAndMobileSubmitOtpState.apiState !== "success" &&
                            <EstateAgentFormReadOnly serviceId={serviceId} />
                        }

                        {(verifyUpnAndMobileSubmitOtpState.apiState === "success") &&
                            <EstateAgentForm serviceId={serviceId} IsRenewal={securityCheck.type} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailOfEstateAgentPage)