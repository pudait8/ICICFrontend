import React, { useEffect, useState } from "react"
import { Col, Form, Row, notification, Button, Input, Space, Tag } from "antd"
import { connect } from "react-redux"
import { CheckOutlined, UndoOutlined, MobileOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Link, Redirect } from "react-router-dom"

// Component
import SecurityCheck from "../../components/SecurityCheck/SecurityCheck"
//Style Component
import { Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer, TabContainer } from './ECLUStyle'
//Others
import { getOrgId } from '../../utils'
import { BackIcon } from "../../components/CustomIcons"
import { FlexDiv, XTabs } from "../../components/Xcomponents"
import ApplicantDetails from "../../components/ECLU/ApplicantDetails/ApplicantDetails"
import BusinessEntityDetails from "../../components/ECLU/BusinessEntityDetails/BusinessEntityDetails"
import ProjectDetails from '../../components/ECLU/ProjectDetails/ProjectDetails'
import ProjectSiteDetails from '../../components/ECLU/ProjectSiteDetails/ProjectSiteDetails'

// Actions
import { getEcluDetail, getEcluDetailResetState } from '../../actions/getEcluDetailAction'


const ECLU = props => {
    // Variables
    const OrgId = getOrgId()
    const serviceId = props.match.params.id
    const {
        verifyUpnAndMobileSubmitOtpState,
        saveEcluApplicantState,
        saveEcluProjectDetailsState,
        saveEcluBussinessDetailsState,
        getEcluDetail, getEcluDetailResetState, getEcluDetailState,
    } = props
    const [securityCheck, setSecurityCheck] = useState({
        open: false
    })
    const [openTab, setOpenTab] = useState(false)
    const [activeTab, setActiveTab] = useState("Applicant Details")
    const [applicantId, setApplicantId] = useState(0)
    const [projectId, setProjectId] = useState(0)
    const [bussinessId, setBussinessId] = useState(0)

    //Callback
    useEffect(() => {
        return (() => {
            getEcluDetailResetState()
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
        }
        else {
            setSecurityCheck({ ...securityCheck, ['open']: true })
        }

    }, [securityCheck])

    useEffect(() => {
        if (verifyUpnAndMobileSubmitOtpState.apiState === "success") {
            getEcluDetail({
                OrgId: OrgId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
            setOpenTab(true)
        }

    }, [verifyUpnAndMobileSubmitOtpState])

    useEffect(() => {
        if (saveEcluApplicantState.apiState === "success") {
            setApplicantId(saveEcluApplicantState.data.ApplicantId)
            setActiveTab("Business Entity Details")
            getEcluDetail({
                OrgId: OrgId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
        }
        else if (saveEcluBussinessDetailsState.apiState === "success") {
            setBussinessId(saveEcluBussinessDetailsState.data.BussinessId)
            setActiveTab("Project Details")
            getEcluDetail({
                OrgId: OrgId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
        }
        else if (saveEcluProjectDetailsState.apiState === "success") {
            setProjectId(saveEcluProjectDetailsState.data.ProjectId)
            setActiveTab("Project Site/Land Details")
            getEcluDetail({
                OrgId: OrgId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
        }
    }, [saveEcluApplicantState, saveEcluProjectDetailsState, saveEcluBussinessDetailsState])

    useEffect(() => {
        if (getEcluDetailState.apiState === "success") {
            setApplicantId(getEcluDetailState.data.ApplicantId)
            if (getEcluDetailState.data.BussinessEntityDetails) {
                setBussinessId(getEcluDetailState.data.BussinessEntityDetails.BusinessId)
            }
            if (getEcluDetailState.data.ProjectDetails) {
                setProjectId(getEcluDetailState.data.ProjectDetails.ProjectId)
            }
        }
    }, [getEcluDetailState])

    return (
        <Container>
            <ServiceBar>
                <LeftSection>
                    <Link to="/" >
                        <BackIcon style={{ marginTop: 5 }} />
                    </Link>
                </LeftSection>
                <RightSection>
                    <ServiceName>Change of Land Use (e-CLU)</ServiceName>
                </RightSection>
            </ServiceBar>
            <DetailContainer>
                {securityCheck.open &&
                    <>
                        <SecurityCheck serviceId={serviceId} />
                    </>
                }
                {openTab &&
                    <>
                        <XTabs activeKey={activeTab} onChange={key => setActiveTab(key)} >
                            <XTabs.TabPane key="Applicant Details" tab={<FlexDiv>1. Applicant Details</FlexDiv>} />
                            <XTabs.TabPane key="Business Entity Details" disabled={applicantId === 0} tab={<FlexDiv>2. Business Entity Details</FlexDiv>} />
                            <XTabs.TabPane key="Project Details" disabled={bussinessId === 0} tab={<FlexDiv>3. Project Details</FlexDiv>} />
                            <XTabs.TabPane key="Project Site/Land Details" disabled={projectId === 0} tab={<FlexDiv>4. Project Site/Land Details</FlexDiv>} />
                        </XTabs>
                        <TabContainer>
                            {(() => {
                                switch (activeTab) {
                                    case 'Applicant Details':
                                        return <ApplicantDetails />
                                    case 'Business Entity Details':
                                        return <BusinessEntityDetails />
                                    case 'Project Details':
                                        return <ProjectDetails />
                                    case 'Project Site/Land Details':
                                        return <ProjectSiteDetails />
                                }
                            })()}
                        </TabContainer>
                    </>
                }
            </DetailContainer>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveEcluApplicantState: state.saveEcluApplicant,
    saveEcluProjectDetailsState: state.saveEcluProjectDetails,
    getEcluDetailState: state.getEcluDetail,
    saveEcluBussinessDetailsState: state.saveEcluBussinessDetails,
})
const mapDispatchToProps = (dispatch) => ({
    getEcluDetail: (params) => dispatch(getEcluDetail(params)),
    getEcluDetailResetState: () => dispatch(getEcluDetailResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ECLU)