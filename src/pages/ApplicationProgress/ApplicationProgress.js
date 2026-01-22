import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Skeleton, Space, Button, notification, Modal } from "antd"
import { ReloadOutlined, PrinterFilled, EyeFilled, DownloadOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons"
import Lottie from 'react-lottie'
import { Link, useLocation } from "react-router-dom"

import { XSteps, XDotSteps, GreenButton, OrangeButton, FlexDiv, BlueButton, Xtable, BlankSpace, DocumentUploadSingle } from '../../components/Xcomponents'
import { getApplicationProgress } from '../../actions/getApplicationProgressAction'
import StatusCard from '../../components/StatusCard/StatusCard'
import ErrorAnimation from '../../Lottie/empty-animation.json'
import { useMediaQuery } from 'react-responsive'
import { getPaymentIntegrationPayload, paymentIntegrationStatusCheck } from '../../actions/duePaymentsAction'
import paymentProcessingAnimation from '../../Lottie/payment-processing.json'
import paymentSuccessAnimation from '../../Lottie/payment-success.json'
import paymentFailAnimation from '../../Lottie/payment-fail.json'
import { SendIcon } from '../../components/CustomIcons'
import { Label, Lvalue, PaymentContainer, DemandNoteDate, Footer, TotalLabel, TotalAmount, ClarificationDiv, ClarificationAction, ClarificationTextarea, Xspace } from './ApplicationProgressStyle'
import { inr, getOrgId } from '../../utils'
import conf from '../../config'
import { saveWorkFlow, saveWorkFlowrRsetState } from '../../actions/saveWorkFlowAction'
import { Heading } from "../NdcDetails/NdcDetailsStyle"
import { postAutoDCR, postAutoDCRResetState } from '../../actions/postAutoDCRAction'


const ApplicationProgress = props => {

    const { getApplicationProgress, getApplicationProgressState,
        getPaymentIntegrationPayload, PropertyDuePaymentsState, paymentIntegrationStatusCheck, saveWorkFlow, saveWorkFlowState, saveWorkFlowrRsetState, verifyUpnAndMobileSubmitOtpState,
        postAutoDCR, postAutoDCRState, postAutoDCRResetState, ApplicationTypeId
    } = props


    const headers = {
        'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
        'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
        'ArchitectToken': verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
        'ArchitectTokenKey': verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
    }
    // let query = new URLSearchParams(useLocation().search)
    let OrgId = getOrgId()

    const [refresh, setRefresh] = useState(0)

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const [stepDirection, setStepDirection] = useState("horizontal")
    const [demandNoteVisible, setDemandNoteVisible] = useState({})
    const [currentStep, setCurrentStep] = useState(0)
    const [displayPaymentStatusModal, setDisplayPaymentStatusModal] = useState(false)
    const [displayFileValidation, setDisplayFileValidation] = useState(false)
    const [documentLoading, setDocumentLoading] = useState(false)
    const [formData, setFormData] = useState({
        ClearificationUploaded: false,
        EntityId: 0,
        DocumentId: 0,
        Remarks: "",
        OrgId: getOrgId(),
        ApplicationId: parseInt(props.ApplicationId),
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
        ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
        ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""

    })
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        isMobile ? setStepDirection("vertical") : setStepDirection("horizontal")
    }, [isMobile])


    useEffect(() => {
        if (refresh > 0) {
            props.getNdcDetailsFunction()
            getApplicationProgress({
                ApplicationId: parseInt(props.ApplicationId),
                OrgId: getOrgId(),
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
            })
            setRefresh(0)
        }
    }, [refresh])

    useEffect(() => {
        getApplicationProgress({
            ApplicationId: parseInt(props.ApplicationId),
            OrgId: getOrgId(),
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
            ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
            ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
        })
    }, [])

    useEffect(() => {
        if (ApplicationTypeId !== 1727 && ApplicationTypeId !== 1710) {
            if (getApplicationProgressState.uiState === "ideal") {
                let currStep = 0
                getApplicationProgressState.ProgressSummary.forEach(item => {
                    if (item.active === "true") {
                        currStep = currStep + 1
                    }
                    if (item.active === "true" && item.status === "Disposed" && props.DownloadCertificateLink) {
                        window.open(props.DownloadCertificateLink, "_blank")
                    }
                })
                setCurrentStep(currStep)
            }
        }
    }, [getApplicationProgressState.uiState])

    useEffect(() => {
        if (PropertyDuePaymentsState.paymentIntegrationApiState === "ideal") {
            // acknowledgement()
            window.location = `${PropertyDuePaymentsState.paymentIntegrationPayload.URL}?UniqueId=${PropertyDuePaymentsState.paymentIntegrationPayload.UniqueId}&UserId=${PropertyDuePaymentsState.paymentIntegrationPayload.UserId}&Amount=${PropertyDuePaymentsState.paymentIntegrationPayload.Amount}&AuthTokenKey=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.AuthTokenKey)}&AuthToken=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.AuthToken)}&ArchitectToken=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.ArchitectToken)}&ArchitectTokenKey=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey)}`
        }
    }, [PropertyDuePaymentsState.paymentIntegrationApiState])

    useEffect(() => {
        if (["Success", "Failed", "In-Progress", "Cancelled"].includes(PropertyDuePaymentsState.paymentStatus)) {
            if (props.ApplicationId === "27") {
                if (["Success"].includes(PropertyDuePaymentsState.paymentStatus)) {
                    postAutoDCR({
                        OrgId: OrgId,
                        ApplicationId: props.ApplicationId,
                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                        ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                        ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
                    })
                }
            }

            setDisplayPaymentStatusModal(true)
        }
    }, [PropertyDuePaymentsState.paymentStatus])

    useEffect(() => {
        if (props.uniqueKey) {
            paymentIntegrationStatusCheck({
                UniqueId: props.uniqueKey,
                OrgId: OrgId,
            })
        }
    }, [])

    useEffect(() => {
        if (saveWorkFlowState.apiState === "alert") {
            saveWorkFlowState.apiState = ""
            notification.error({
                message: saveWorkFlowState.alertMessage,
                placement: "bottomRight"
            })
        }

        if (saveWorkFlowState.apiState === "error") {
            saveWorkFlowState.apiState = ""
            notification.error({
                message: "Something is not right. Please try again.",
                placement: "bottomRight"
            })
        }

        if (saveWorkFlowState.apiState === "success") {
            let message = formData.ClearificationUploaded ? "Document and remark submitted successfully" : "Remark submitted successfully"
            notification.success({
                message: message,
                placement: "bottomRight"
            })
            saveWorkFlowrRsetState()
            setFormData({ ...formData, ["ClearificationUploaded"]: false, ["EntityId"]: 0, ["DocumentId"]: 0, ["Remarks"]: "" })
            setRefresh(refresh + 1)
        }
    }, [saveWorkFlowState])
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const errorAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: ErrorAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const paymentProcessingAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: paymentProcessingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },
    }

    const paymentSuccessAnimationOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentSuccessAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const paymentFailAnimationOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentFailAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const DemandNote = (props) => {
        let columns = [
            {
                title: "Payment Head",
                dataIndex: "PaymentHead",
                width: '70%',
            },
            {
                title: "Amount (₹)",
                dataIndex: "Amount",
                align: "right"
            }
        ]

        let dataSource = props.rows.map((item) => {

            return {
                PaymentHead: item.HeadName,
                Amount: inr(item.TobePaidAmount),
            }
        })
        return (
            <>
                <Xtable dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: 300 }} />
                <Footer>
                    <TotalLabel>Total Amount:</TotalLabel>
                    <TotalAmount>₹ {inr(props.amount)}</TotalAmount>
                </Footer>
            </>
        )
    }

    const saveWorkFlowAction = () => {
        if (formData.Remarks != "") {
            saveWorkFlow(formData)
        }
    }

    const DownloadFile = (DocumentId, FileName) => {
        fetch(`${conf.api.base_url}DMS_DocumentService/GetActionDocument?ApiKey=GetActionDocument&OrgId=${OrgId}&DocumentId=${DocumentId}`, {
            method: 'POST',
            headers: headers
        })
            .then(res => {
                if (res.status === 200) {
                    return res.blob()
                } else {
                    return null
                }
            })
            .then(blob => {
                if (blob) {
                    var url = window.URL.createObjectURL(blob)
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = FileName
                    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                    a.click()
                    a.remove()  //afterwards we remove the element again    
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const acknowledgement = () => {
        localStorage.setItem("PudaAuthToken", verifyUpnAndMobileSubmitOtpState.AuthToken)
        localStorage.setItem("PudaAuthTokenKey", verifyUpnAndMobileSubmitOtpState.AuthTokenKey)
    }
    const setDemandNoteVisibleFunc = (index, value) => {
        setDemandNoteVisible({ ...demandNoteVisible, [index]: value })
    }
    return (
        <>
            {
                getApplicationProgressState.uiState === "loading" &&
                <>
                    <Skeleton active />
                    <Skeleton active />
                </>
            }

            {
                getApplicationProgressState.uiState === "error" &&
                <StatusCard
                    graphics={
                        <Lottie
                            options={errorAnimationOptions}
                            height={"auto"}
                            width={250}
                        />
                    }
                    title="Something is not right"
                    action={<BlueButton icon={<ReloadOutlined />} onClick={() => setRefresh(refresh + 1)}>Try Again</BlueButton>}
                />
            }

            {
                getApplicationProgressState.uiState === "ideal" &&
                <>
                    <Heading>Progress History</Heading>
                    <BlankSpace style={{ height: '14px' }} id="ProgressHistory" />
                    <XSteps current={currentStep} labelPlacement="vertical" direction={stepDirection}>
                        {
                            (getApplicationProgressState.ProgressSummary || []).map((item, index) => (
                                <XSteps.Step icon=
                                    {
                                        (currentStep === index) ? <LoadingOutlined style={{ color: '#71c097' }} /> : ''
                                    }
                                    title={item.status || ""} subTitle={item.remark || ""} />
                            ))
                        }
                    </XSteps>
                    <BlankSpace style={{ height: '18px' }} />
                    <XDotSteps progressDot direction="vertical">
                        {
                            (getApplicationProgressState.list || []).map((item, index) => (
                                <XDotSteps.Step className={index === 0 ? "show-ripple" : ""} title={item.Activity} description={
                                    <>
                                        <Xspace direction="vertical" >
                                            {item.Actions &&
                                                <Label>{item.Actions}</Label>
                                            }
                                            {item.Remarks &&
                                                <div style={{ display: "flex", color: "black" }}>
                                                    <Label>Remark: </Label>
                                                    <Lvalue>{item.Remarks}</Lvalue>
                                                </div>
                                            }

                                            {(item.displayActions && item.displayActions.length > 0)
                                                ? [
                                                    item.displayActions.map((action) => {
                                                        if (action.slug === "view_pay_demand_note") {
                                                            return (
                                                                <>
                                                                    <OrangeButton style={{ marginTop: '6px' }} icon={<DownloadOutlined />} onClick={() => setDemandNoteVisibleFunc(index, true)}>{action.Label || "Action"}</OrangeButton>
                                                                    <Modal
                                                                        title={
                                                                            <>
                                                                                <span>{`Demand Note: ${action.CustomPayload && action.CustomPayload[0] && action.CustomPayload[0].DemandNoteNo || ""}`}</span>
                                                                                <br />
                                                                                <DemandNoteDate>{`${action.CustomPayload && action.CustomPayload[0] && action.CustomPayload[0].DemandNoteDate || ""}`}</DemandNoteDate>
                                                                            </>
                                                                        }
                                                                        visible={demandNoteVisible[index]}
                                                                        onCancel={() => setDemandNoteVisibleFunc(index, false)}
                                                                        footer={null}
                                                                        centered
                                                                    >
                                                                        <DemandNote
                                                                            amount={action.CustomPayload[0]?.TotalDueAmount}
                                                                            rows={action.CustomPayload && action.CustomPayload[0] && action.CustomPayload[0].headDetails || []}
                                                                        />
                                                                        <Footer>
                                                                            {action.CustomPayload && action.CustomPayload[0] && action.CustomPayload[0]?.TotalDueAmount &&
                                                                                <FlexDiv><BlueButton
                                                                                    icon={<SendIcon size={12} />}
                                                                                    loading={["loading", "ideal"].includes(PropertyDuePaymentsState.paymentIntegrationApiState) ? true : false}
                                                                                    onClick={() => getPaymentIntegrationPayload({
                                                                                        PropertyRefId: action.CustomPayload[0].PropertyRefId,
                                                                                        OrgId: action.CustomPayload[0].OrgId,
                                                                                        TotalDueAmount: action.CustomPayload[0]?.TotalDueAmount,
                                                                                        headDetails: action.CustomPayload[0].headDetails,
                                                                                        DemandNoteId: action.CustomPayload[0].DemandNoteId,
                                                                                        EntityType: action.CustomPayload[0].EntityType,
                                                                                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                                                                                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                                                                                        ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                                                                                        ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
                                                                                    })
                                                                                    }>{`PAY NOW`}</BlueButton></FlexDiv>}
                                                                        </Footer>
                                                                    </Modal>
                                                                </>
                                                            )
                                                        }

                                                        if (action.slug === "view_demand_note") {
                                                            return (
                                                                <>
                                                                    <BlueButton style={{ marginTop: '6px' }} icon={<EyeFilled />} onClick={() => setDemandNoteVisibleFunc(index, true)}>{action.Label || "Action"}</BlueButton>
                                                                    <Modal
                                                                        title={
                                                                            <>
                                                                                <span>{`Demand Note: ${action.CustomPayload && action.CustomPayload[0] && action.CustomPayload[0].DemandNoteNo || ""}`}</span>
                                                                                <br />
                                                                                <DemandNoteDate>{`${action.CustomPayload && action.CustomPayload[0] && action.CustomPayload[0].DemandNoteDate || ""}`}</DemandNoteDate>
                                                                            </>
                                                                        }
                                                                        visible={demandNoteVisible[index]}
                                                                        onCancel={() => setDemandNoteVisibleFunc(index, false)}
                                                                        footer={null}
                                                                        centered
                                                                    >
                                                                        <DemandNote
                                                                            amount={action.CustomPayload[0]?.TotalDueAmount}
                                                                            rows={action.CustomPayload && action.CustomPayload[0] && action.CustomPayload[0].headDetails || []}
                                                                        />
                                                                    </Modal>
                                                                </>
                                                            )
                                                        }

                                                        if (action.slug === "print_acknowledgement") {
                                                            const isDisabled =
                                                                props.ApplicationTypeId == 1791 &&
                                                                (getApplicationProgressState.list || []).some(i =>
                                                                    i.displayActions?.some(a => a.slug === "view_pay_demand_note")
                                                                );

                                                            return isDisabled ? (
                                                                <BlueButton
                                                                    style={{ marginTop: "6px" }}
                                                                    icon={<PrinterFilled />}
                                                                    disabled
                                                                >
                                                                    {action.Label || "Action"}
                                                                </BlueButton>
                                                            ) : (
                                                                <Link
                                                                    to={`/print-acknowledgement/${props.ApplicationId}`}
                                                                    target="_blank"
                                                                >
                                                                    <BlueButton
                                                                        style={{ marginTop: "6px" }}
                                                                        onClick={acknowledgement}
                                                                        icon={<PrinterFilled />}
                                                                    >
                                                                        {action.Label || "Action"}
                                                                    </BlueButton>
                                                                </Link>
                                                            );
                                                        }


                                                        if (action.slug === "ask_for_correction") {
                                                            return (
                                                                <Link to={`/edit-application/${props.ApplicationId}`} >
                                                                    <BlueButton style={{ marginTop: '6px' }} onClick={acknowledgement}>{action.Label || "Action"}</BlueButton>
                                                                </Link>
                                                            )
                                                        }

                                                        //ask_for_clarification
                                                        if (action.slug === "ask_for_clarification") {
                                                            return (
                                                                <ClarificationDiv>
                                                                    <ClarificationTextarea maxLength={100} name="Remarks" onChange={handleOnChange} placeholder="Enter your clarification" size="large" />
                                                                    <ClarificationAction>
                                                                        <Space>
                                                                            <DocumentUploadSingle
                                                                                key="1"
                                                                                headers={headers}
                                                                                action={`${conf.api.base_url}DMS_DocumentService/UploadActionDocument?ApiKey=UploadActionDocument&OrgId=${OrgId}&EntityType=111&EntityId=${props.ApplicationId}`}
                                                                                allowedFileTypes={["image/jpg", "image/jpeg", "image/png", "pdf"]}
                                                                                displayFileValidation={displayFileValidation}
                                                                                beforeUpload={file => {
                                                                                    setDocumentLoading(true)
                                                                                    setFileList([file])
                                                                                    return true
                                                                                }}
                                                                                onError={(info) => {
                                                                                    setDocumentLoading(false)
                                                                                    setFileList()
                                                                                }}
                                                                                onRemove={file => {
                                                                                    setDocumentLoading(false)
                                                                                    setFileList([])
                                                                                }}
                                                                                onSuccess={(info) => {
                                                                                    if (info.CustomObject && info.CustomObject.EntityId) {
                                                                                        setFormData({ ...formData, ["ClearificationUploaded"]: true, ["EntityId"]: info.CustomObject.EntityId, ["DocumentId"]: info.CustomObject.DocumentId })
                                                                                        // Modal.success({
                                                                                        //     content: info.Message,
                                                                                        // })
                                                                                    }
                                                                                    else {
                                                                                        setFormData({ ...formData, ["ClearificationUploaded"]: false, ["EntityId"]: 0, ["DocumentId"]: 0 })
                                                                                        Modal.error({
                                                                                            content: info.Message,
                                                                                        })
                                                                                        setFileList([])
                                                                                    }
                                                                                    setDocumentLoading(false)
                                                                                }}
                                                                                maxCount={1}
                                                                                multiple={false}
                                                                                showUploadList={true}
                                                                                fileTypeValidationMessage={"Only JPG, JPEG, PNG and PDF file types allowed!"}
                                                                                fileList={fileList}
                                                                            >
                                                                                <Button size="small" type="text" icon={<UploadOutlined />}>Upload</Button>
                                                                            </DocumentUploadSingle>
                                                                            <BlueButton
                                                                                size="small"
                                                                                disabled={documentLoading}
                                                                                loading={saveWorkFlowState.apiState === "success"}
                                                                                onClick={saveWorkFlowAction}>Submit</BlueButton>
                                                                        </Space>
                                                                    </ClarificationAction>

                                                                </ClarificationDiv>

                                                            )
                                                        }
                                                        if (action.slug === "download_document") {
                                                            return (
                                                                <a
                                                                    onClick={() => DownloadFile(item.FileId, item.Filename)}
                                                                >
                                                                    {item.DocumentId}
                                                                    {item.FileName}
                                                                    <BlueButton style={{ marginTop: '6px' }} icon={<PrinterFilled />}>{action.Label || "Action"}</BlueButton>
                                                                </a>
                                                            )
                                                        }
                                                        if (ApplicationTypeId !== 1727 && ApplicationTypeId !== 1710) {
                                                            if (action.slug === "download_certificate") {
                                                                return (
                                                                    <a
                                                                        href={action.CustomPayload[0].Url}
                                                                        target="_blank"
                                                                    >
                                                                        <BlueButton style={{ marginTop: '6px' }} icon={<PrinterFilled />}>{action.Label || "Action"}</BlueButton>
                                                                    </a>
                                                                )
                                                            }
                                                        }

                                                    })
                                                ]
                                                : null
                                            }
                                        </Xspace>

                                        <div style={{ marginBottom: "1rem" }} />
                                    </>
                                } />
                            ))
                        }
                    </XDotSteps>
                </>
            }
            <Modal
                title={null}
                visible={displayPaymentStatusModal}
                footer={null}
                centered
                closable={false}
                className="round-shape"
            >
                {
                    PropertyDuePaymentsState.paymentStatus === "Success" &&
                    <PaymentContainer>
                        <Lottie
                            options={paymentSuccessAnimationOptions}
                            height={300}
                            width={300}
                            speed={1.5}
                        />
                    </PaymentContainer>
                }

                {
                    PropertyDuePaymentsState.paymentStatus === "Failed" &&
                    <PaymentContainer>
                        <Lottie
                            options={paymentFailAnimationOptions}
                            height={300}
                            width={300}
                            speed={1.5}
                        />
                    </PaymentContainer>
                }

                {
                    PropertyDuePaymentsState.paymentStatus === "Cancelled" &&
                    <PaymentContainer>
                        <Lottie
                            options={paymentFailAnimationOptions}
                            height={300}
                            width={300}
                            speed={2}
                        />
                    </PaymentContainer>
                }

                <FlexDiv><Link to={`/ndc-details/${props.ApplicationId}?org=${OrgId}}`}><BlueButton onClick={() => {
                    setDisplayPaymentStatusModal(false)
                    PropertyDuePaymentsState.paymentStatus = ""
                }} style={{ padding: "0 2rem" }}>OK</BlueButton></Link></FlexDiv>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({
    getApplicationProgressState: state.getApplicationProgress,
    PropertyDuePaymentsState: state.PropertyDuePayments,
    saveWorkFlowState: state.saveWorkFlow,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    postAutoDCRState: state.postAutoDCR,

})

const mapDispatchToProps = (dispatch) => ({
    getApplicationProgress: (params) => dispatch(getApplicationProgress(params)),
    getPaymentIntegrationPayload: (params) => dispatch(getPaymentIntegrationPayload(params)),
    paymentIntegrationStatusCheck: (params) => dispatch(paymentIntegrationStatusCheck(params)),
    saveWorkFlow: (params) => dispatch(saveWorkFlow(params)),
    saveWorkFlowrRsetState: () => dispatch(saveWorkFlowrRsetState()),
    postAutoDCR: (params) => dispatch(postAutoDCR(params)),
    postAutoDCRResetState: () => dispatch(postAutoDCRResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationProgress)