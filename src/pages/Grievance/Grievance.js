import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Form, Col, Row, Input, Select, Tooltip, notification, Space, Button, Alert } from 'antd'
import { CheckCircleFilled, CloseCircleOutlined, InfoCircleOutlined, UndoOutlined } from '@ant-design/icons'

import { LeftSection, RightSection, ServiceBar, ServiceName, DetailContainer, Container } from '../ServiceDetailPage/ServiceDetailPageStyle'
import { BackIcon } from '../../components/CustomIcons'
import GrievanceSecurityCheck from '../../components/GrievanceSecurityCheck/GrievanceSecurityCheck'
import GrievanceFormReadOnly from '../../components/GrievanceFormReadOnly/GrievanceFormReadOnly'
import GrievanceForm from '../../components/GrievanceForm/GrievanceForm'


const Grievance = props => {
    // VARIABLES
    const {
        verifyUpnAndMobileSubmitOtpState,

    } = props
    const [securityCheck, setSecurityCheck] = useState({ open: false })
    const [OrgId, setOrgId] = useState("")

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
        else {
            setSecurityCheck({ ...securityCheck, ['open']: true })
        }

    }, [securityCheck])

    //Function
    const handleOrgId = (value) => {
        setOrgId(value)
    }
    return (
        <Container>
            <ServiceBar>
                <LeftSection>
                    <Link to="/" >
                        <BackIcon style={{ marginTop: 5 }} />
                    </Link>
                </LeftSection>
                <RightSection>
                    <ServiceName>Register for Grievance</ServiceName>
                </RightSection>
            </ServiceBar>
            <DetailContainer>
                {securityCheck.open &&
                    <GrievanceSecurityCheck onSelectOrgId={handleOrgId} />
                }
                {verifyUpnAndMobileSubmitOtpState.apiState != "success" &&
                    <GrievanceFormReadOnly />
                }
                {verifyUpnAndMobileSubmitOtpState.apiState === "success" &&
                    <GrievanceForm OrgId={OrgId} />
                }
            </DetailContainer>
        </Container>
    )
}


const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Grievance);