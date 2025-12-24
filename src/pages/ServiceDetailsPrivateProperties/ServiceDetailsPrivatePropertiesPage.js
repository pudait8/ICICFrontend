import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Skeleton, Space, Menu, Dropdown, notification } from 'antd'
import { CheckOutlined, DownOutlined } from "@ant-design/icons"
import { Link, Redirect } from "react-router-dom"
import { saveNdcApplication, saveNdcApplicationResetState } from '../../actions/saveNdcApplicationAction'
import { saveOwnerPrivatePropertiesResetState, } from '../../actions/saveOwnerPrivatePropertiesAction'
// components
import {
    Container, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer,
    Title, Xsteps, Xstep, DocumentUl, DocumentLi, IconContainer, DocumentTitle
} from './ServiceDetailsPrivatePropertiesPageStyle'
import { BackIcon } from '../../components/CustomIcons'
import { BlueButton, GhostButton } from '../../components/Xcomponents'
import NdcFormReadOnly from '../../components/NdcFormReadOnly/NdcFormReadOnly'
import SecurityCheck from '../../components/SecurityCheck/SecurityCheck'
import NdcForm from '../../components/NdcForm/NdcForm'
import ServiceDetailsPrivatePropertiesForm from "../../components/ServiceDetailsPrivatePropertiesForm/ServiceDetailsPrivatePropertiesForm"
import ServiceDetailsPrivatePropertiesFormReadOnly from "../../components/ServiceDetailsPrivatePropertiesForm/ServiceDetailsPrivatePropertiesFormReadOnly"

import { getOrgId } from '../../utils'
import { getServiceDetail, getServiceDetailResetState } from '../../actions/getServiceDetailAction'
import { Heading } from "../../components/ServiceDetailsPrivatePropertiesForm/ServiceDetailsPrivatePropertiesFormStyle"
import { verifyUpnAndMobile, verifyUpnAndMobileResetState } from '../../actions/verifyUpnAndMobileAction'

const ServiceDetailsPrivatePropertiesPage = (props) => {
    const {
        verifyUpnAndMobileSubmitOtpState,
        getServiceDetailState,
        saveNdcApplicationResetState,
        getServiceDetail,
        getServiceDetailResetState,
        verifyUpnAndMobileResetState,
        saveNdcApplicationState,
        saveOwnerPrivatePropertiesResetState
    } = props
    const serviceId = props.match.params.id
    const [securityCheck, setSecurityCheck] = useState(false);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        getServiceDetailResetState();
        getServiceDetail({
            serviceId: serviceId,
            OrgId: getOrgId()
        })
    }, [])

    useEffect(() => {
        if (saveNdcApplicationState.apiState === "success") {
            setRedirect(true);
        }
    }, [saveNdcApplicationState])

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
                    <ServiceBar >
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
                            <Link to={{}} target="_blank" ><BlueButton >PRINT BLANK FORM</BlueButton></Link>
                            {getServiceDetailState.data.AllowOnline === "Y" &&
                                <BlueButton disabled={verifyUpnAndMobileSubmitOtpState.apiState === "success"} onClick={() => setSecurityCheck(true)}>
                                    APPLY FOR NEW
                                </BlueButton>
                            }

                            <Link to="/" ><GhostButton >GO BACK TO MAIN PAGE</GhostButton></Link>
                        </Space>

                        {getServiceDetailState.data.AllowOnline !== "Y" &&
                            <div style={{ color: "red", marginTop: 20 }}>Online application submission shall be available soon.</div>
                        }

                        {securityCheck &&
                            <SecurityCheck
                                serviceId={serviceId}
                                IsRenewal={securityCheck.type}
                                allowOnline={getServiceDetailState.data.AllowOnline}
                            />
                        }

                        {(verifyUpnAndMobileSubmitOtpState.apiMessage == 'Mobile Number verified successfully.') ?
                            <ServiceDetailsPrivatePropertiesForm
                                serviceId={serviceId}
                                IsRenewal={securityCheck.type}
                                listofDocuments={getServiceDetailState.data.ApplicationDocumentList}

                            />
                            :
                            <ServiceDetailsPrivatePropertiesFormReadOnly
                                serviceId={serviceId}
                                listofDocuments={getServiceDetailState.data.ApplicationDocumentList}
                            />
                        }
                    </DetailContainer>
                </>
                // }</>
            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    getServiceDetailState: state.getServiceDetail,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveNdcApplicationState: state.saveNdcApplication,

})
const mapDispatchToProps = (dispatch) => ({
    getServiceDetail: (params) => dispatch(getServiceDetail(params)),
    getServiceDetailResetState: () => dispatch(getServiceDetailResetState()),
    verifyUpnAndMobileResetState: () => dispatch(verifyUpnAndMobileResetState()),
    saveNdcApplicationResetState: () => dispatch(saveNdcApplicationResetState()),
    saveOwnerPrivatePropertiesResetState: () => dispatch(saveOwnerPrivatePropertiesResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailsPrivatePropertiesPage)