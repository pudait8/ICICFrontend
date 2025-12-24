import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CheckOutlined } from "@ant-design/icons"
import { Skeleton, Space } from 'antd'
import { Link } from "react-router-dom"

// components
import {
    Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer,
    Title, Xsteps, Xstep, DocumentUl, DocumentLi, IconContainer, DocumentTitle
} from './PermissionForSaleApplicationStyle'
import { BackIcon } from '../../components/CustomIcons'
import { BlueButton, GhostButton } from '../../components/Xcomponents'
import NdcFormReadOnly from '../../components/NdcFormReadOnly/NdcFormReadOnly'
import SecurityCheck from '../../components/SecurityCheck/SecurityCheck'
import ApplicationForm from "../../components/ApplicationForm.js/ApplicationForm"

// actions
import { getServiceDetail } from '../../actions/getServiceDetailAction'

const PermissionForSaleApplication = props => {
    // variables
    const {
        getServiceDetail, getServiceDetailState,
        verifyUpnAndMobileSubmitOtpState,
    } = props
    const serviceId = props.match.params.id
    const [securityCheck, setSecurityCheck] = useState(false)
    // callbacks

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
            serviceId: serviceId
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
                        <Title>Process (Application disposal time is {getServiceDetailState.data.TAT} Days)</Title>
                        {(getServiceDetailState.data.Process && getServiceDetailState.data.Process.length > 0) &&
                            <Xsteps progressDot direction="vertical" className="xtabs">
                                {getServiceDetailState.data.Process.map(item => (
                                    <Xstep title={item} />
                                ))}
                            </Xsteps>
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
                            <BlueButton onClick={() => setSecurityCheck(true)} >APPLY ONLINE</BlueButton>
                            <Link to="/" ><GhostButton >GO BACK TO MAIN PAGE</GhostButton></Link>
                        </Space>


                        {securityCheck &&
                            <SecurityCheck serviceId={serviceId} />
                        }

                        {verifyUpnAndMobileSubmitOtpState.apiState != "success" &&
                            <NdcFormReadOnly serviceId={serviceId} />
                        }

                        {verifyUpnAndMobileSubmitOtpState.apiState === "success" &&
                            <ApplicationForm serviceId={serviceId}
                            // refreshApplication={() => setRefreshApplication(refreshApplication + 1)}
                            // triggerDraftSave={onSave}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(PermissionForSaleApplication)