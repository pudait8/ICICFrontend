import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CheckOutlined, UndoOutlined } from "@ant-design/icons"
import { Skeleton, Space, Col, Form, Row, notification, Button, Input, Select } from 'antd'
import { Link, Redirect } from "react-router-dom"

// components
import {
    Container, Heading, Description, LeftSection, ServiceBar, RightSection, ServiceName, DetailContainer
} from './ArchitectLoginStyle'
import { BackIcon } from '../../components/CustomIcons'
import { FormItem, BlueButton, GhostButton } from '../../components/Xcomponents'

// actions
import { verifyPan, verifyPanResetState } from '../../actions/verifyPanAction'
import { verifyPanSubmitOtp, verifyPanSubmitOtpResetState } from '../../actions/verifyPanSubmitOtpAction'
import { getServiceDetail } from '../../actions/getServiceDetailAction'

//Others
import { getOrgId } from '../../utils'

const ArchitectLogin = props => {
    // variables
    const {
        getServiceDetail, getServiceDetailState,
        verifyPanSubmitOtp, verifyPanSubmitOtpState, verifyPanSubmitOtpResetState,
        verifyPan, verifyPanState, verifyPanResetState

    } = props
    let initialFormData = {
        PAN: "",
        OTP: "",
        OrgId: getOrgId(),
        ContextType: 'Architect',
        EnterprenurId: 0,
    }
    const serviceId = props.match.params.id
    const [formData, setFormData] = useState(initialFormData)
    const [form] = Form.useForm()
    const [resendOtpTimer, setResendOtpTimer] = useState(0)
    const [apiSuccess, setApiSuccess] = useState(false)
    const [redirect, setRedirect] = useState([false, ""])
    // callbacks

    useEffect(() => {
        getServiceDetail({
            serviceId: serviceId,
            OrgId: getOrgId()
        })
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
        verifyPanResetState()
        verifyPanSubmitOtpResetState()
        return (() => {
            verifyPanResetState()
            verifyPanSubmitOtpResetState()
        })
    }, [])

    useEffect(() => {
        if (verifyPanState.apiState === "alert" || verifyPanState.apiState === "error") {
            notification["error"]({
                message: verifyPanState.apiMessage,
                placement: "bottomRight"
            })
            verifyPanResetState()
        }
        if (verifyPanState.apiState === "success") {
            notification["success"]({
                message: verifyPanState.apiMessage,
                placement: "bottomRight"
            })
            setResendOtpTimer(29)
        }

    }, [verifyPanState])

    useEffect(() => {
        if (verifyPanSubmitOtpState.apiState === "alert" || verifyPanSubmitOtpState.apiState === "error") {
            notification["error"]({
                message: verifyPanSubmitOtpState.apiMessage,
                placement: "bottomRight",
            })

            verifyPanSubmitOtpResetState()
        }

        if (verifyPanSubmitOtpState.apiState === "success") {
            localStorage.setItem("puda_architect_service_id_logged_in", serviceId);
            notification["success"]({
                message: verifyPanSubmitOtpState.apiMessage,
                placement: "bottomRight"
            })
            localStorage.setItem("PudaArchitectToken", verifyPanSubmitOtpState.ArchitectToken)
            localStorage.setItem("PudaArchitectTokenKey", verifyPanSubmitOtpState.ArchitectTokenKey)
            localStorage.setItem("PudaEnterprenurId", verifyPanSubmitOtpState.data.EnterprenurId)
            setApiSuccess(true)
            setRedirect([true, "/architect-dashboard"])

        }
    }, [verifyPanSubmitOtpState])


    // Resend Otp Timer
    useEffect(() => {
        if (resendOtpTimer > 0) {
            const timer = setTimeout(() => {
                setResendOtpTimer(resendOtpTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendOtpTimer])




    // functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (verifyPanState.apiState === "success") {
            verifyPanSubmitOtp({
                OrgId: formData.OrgId,
                MobileNumber: verifyPanState.data.MobileNumber,
                PAN: formData.PAN,
                TransactionNumber: verifyPanState.data.TransactionNumber,
                EnterprenurId: verifyPanState.data.EnterprenurId,
                OTP: formData.OTP,
                ContextType: formData.ContextType,
                ArchitectName: verifyPanState.data.ArchitectName,
            })
        } else {
            verifyPan(formData)
        }
    }

    const handleResendOtp = () => {
        setFormData({
            ...formData,
            ['OTP']: "",
        })
        verifyPanState.apiState = ""
        handleSubmit()
    }

    const resetForm = () => {
        setFormData(initialFormData)
        form.resetFields()
    }

    return (
        <>
            {
                redirect[0] &&
                <Redirect to={redirect[1]} />
            }
            <Container>
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

                        <>
                            <Description>Enter your registered PAN and click on get OTP. (Architects Only)</Description>

                            <Form
                                layout="vertical"
                                requiredMark={false}
                                onFinish={handleSubmit}
                                form={form}
                            >
                                <Row gutter="24" align="middle">
                                    <Col span="8">
                                        <FormItem
                                            label="Registered PAN"
                                            name="PAN"
                                            rules={[
                                                { required: true, message: 'Required' },
                                                {
                                                    pattern: '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$',
                                                    message: 'PAN is not valid'
                                                }
                                            ]}
                                        >
                                            <Input size="large" name="PAN" onChange={handleOnChange} readOnly={verifyPanState.apiState === "success"} />
                                        </FormItem>
                                    </Col>

                                    {verifyPanState.apiState === "success" &&
                                        <Col span="8">
                                            <FormItem
                                                label="Enter OTP"
                                                name="OTP"
                                                rules={[{ required: true, message: 'Required' }]}
                                            >
                                                <Input size="large" name="OTP" onChange={handleOnChange} />
                                            </FormItem>
                                        </Col>
                                    }
                                    <Col span="8">
                                        <BlueButton htmlType="submit" loading={
                                            (verifyPanState.apiState === "loading" || verifyPanSubmitOtpState.apiState === "loading") ? true : false
                                        } >
                                            {verifyPanState.apiState === "success" ? "VERIFY" : "GET OTP"}
                                        </BlueButton>
                                    </Col>
                                </Row>
                                {verifyPanState.apiState === "success" &&
                                    <>
                                        <Button type="link" onClick={() => {
                                            verifyPanResetState()
                                            resetForm()
                                        }} icon={<UndoOutlined />} >Change PAN Number</Button>
                                        <Button type="link" disabled={resendOtpTimer > 0 ? true : false}
                                            onClick={handleResendOtp}
                                            icon={<UndoOutlined />} loading={verifyPanState.apiState === "loading" ? true : false} >
                                            Resend OTP
                                            {resendOtpTimer > 0 &&
                                                <> ({resendOtpTimer})</>
                                            }
                                        </Button>
                                    </>
                                }
                            </Form>
                        </>


                    </DetailContainer>
                </>
            </Container >
        </>
    )
}

const mapStateToProps = (state) => ({
    verifyPanSubmitOtpState: state.verifyPanSubmitOtp,
    verifyPanState: state.verifyPan,
    getServiceDetailState: state.getServiceDetail,

})
const mapDispatchToProps = (dispatch) => ({
    getServiceDetail: (params) => dispatch(getServiceDetail(params)),
    verifyPan: (params) => dispatch(verifyPan(params)),
    verifyPanResetState: () => dispatch(verifyPanResetState()),
    verifyPanSubmitOtp: (params) => dispatch(verifyPanSubmitOtp(params)),
    verifyPanSubmitOtpResetState: () => dispatch(verifyPanSubmitOtpResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArchitectLogin)