import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CheckCircleFilled, FileOutlined, UploadOutlined } from "@ant-design/icons"
import { Row, Col, Form, Skeleton, Input, Select, notification, List, Upload, Space, Button } from "antd"
import { Link, Redirect, useLocation, useHistory } from "react-router-dom"
import folderAnimation from '../../Lottie/folder-animation.json'
import _ from "lodash"

// components
import {
    Container, Title, Status, SuccessBar, SuccessBarText, Description,
    Heading, FileContainer, ViewPlanLink, UploadButton
} from "./NdcDetailsStyle"
import { PrimaryButton, BlankSpace, FormItem, BlueButton, FlexDiv } from '../../components/Xcomponents'
import ApplicationProgress from "../ApplicationProgress/ApplicationProgress"
import FlexBar from "../../components/FlexBar/FlexBar"
import Lottie from "react-lottie"
import { BackIcon } from "../../components/CustomIcons"

// others
import { getOrgId } from '../../utils'
import conf from '../../config'

// actions
import { getNdcDetails, getNdcDetailsResetState } from '../../actions/getNdcDetailsAction'
import { getDocumentList } from '../../actions/getDocumentListAction'
import { verifyUpnAndMobileSubmitOtpResetState } from '../../actions/verifyUpnAndMobileSubmitOtpAction'
import { getAppointmentDate, getAppointmentDateResetState } from '../../actions/getAppointmentDateAction'
import { rescheduleAppointmentByCitizen, rescheduleAppointmentByCitizenResetState } from '../../actions/rescheduleAppointmentByCitizenAction'
import { getAppointmentHistory, getAppointmentHistoryResetState } from '../../actions/getAppointmentHistoryAction'
import { getDrawingScrutinyReport, getDrawingScrutinyReportResetState } from '../../actions/getDrawingScrutinyReportAction'
import { reSubmitForScrutiny, reSubmitForScrutinyResetState } from '../../actions/reSubmitForScrutinyAction'
import { postAutoDCR, postAutoDCRResetState } from '../../actions/postAutoDCRAction'

const { Option } = Select

const NdcDetails = props => {
    // variables
    const OrgId = getOrgId()
    const ApplicationId = props.match.params.id
    const {
        getNdcDetails, getNdcDetailsState, getNdcDetailsResetState,
        getDocumentList, getDocumentListState,
        verifyUpnAndMobileSubmitOtpState, verifyUpnAndMobileSubmitOtpResetState,
        getAppointmentDate, getAppointmentDateState, getAppointmentDateResetState,
        rescheduleAppointmentByCitizen, rescheduleAppointmentByCitizenState, rescheduleAppointmentByCitizenResetState,
        getAppointmentHistory, getAppointmentHistoryState, getAppointmentHistoryResetState,
        getDrawingScrutinyReport, getDrawingScrutinyReportState, getDrawingScrutinyReportResetState,
        reSubmitForScrutiny, reSubmitForScrutinyState, reSubmitForScrutinyResetState,
        postAutoDCR, postAutoDCRState, postAutoDCRResetState,
    } = props
    const [refreshRedirect, setRefreshRedirect] = useState(false)
    const [attachedDocs, setAttachedDocs] = useState(0)
    const [changeOfOwnerShip, setChangeOfOwnerShip] = useState(false)
    const folderAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: folderAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    let initialFormData = {
        NewAppointmentDatewithSlot: "",
        Remarks: "",
    }
    const [formData, setFormData] = useState(initialFormData)
    const [render, setRender] = useState(false)
    let query = new URLSearchParams(useLocation().search)
    let uniqueKey = query.get("uniqueKey")
    let AuthTokenKey = query.get("AuthTokenKey")
    let AuthToken = query.get("AuthToken")
    let ArchitectTokenKey = query.get("ArchitectTokenKey")
    let ArchitectToken = query.get("ArchitectToken")
    let architect = query.get("architect")


    useEffect(() => {
        if (uniqueKey) {
            verifyUpnAndMobileSubmitOtpState.AuthToken = (decodeURIComponent(AuthToken) === " null" || decodeURIComponent(AuthToken) === "null") ? "" : decodeURIComponent(AuthToken)
            verifyUpnAndMobileSubmitOtpState.AuthTokenKey = (decodeURIComponent(AuthTokenKey) === " null" || decodeURIComponent(AuthTokenKey) === "null") ? "" : decodeURIComponent(AuthTokenKey)
            verifyUpnAndMobileSubmitOtpState.ArchitectToken = (decodeURIComponent(ArchitectToken) === " null" || decodeURIComponent(ArchitectToken) === "null") ? "" : decodeURIComponent(ArchitectToken)
            verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey = (decodeURIComponent(ArchitectTokenKey) === " null" || decodeURIComponent(ArchitectTokenKey) === "null") ? "" : decodeURIComponent(ArchitectTokenKey)
        }
    }, [uniqueKey])
    const [buldingDocument, setBuidlingDocument] = useState({
        EntityTypeId: 0,
        EntityId: 0,
        ApplicationTypeId: 0,
        DocumentTypeId: 0,
        Name: "",
        IsMandatory: false,
        IsPVerificationRequired: false,
        Extensions: [],
        MaxSizeInKb: 0
    })
    const [uploadLoading, setUploadLoading] = useState(false)
    const previousPath = useHistory()

    //callback
    useEffect(() => {
        window.scrollTo(0, 2)
    }, [])
    useEffect(() => {
        return (() => {
            getNdcDetailsResetState()
            getAppointmentDateResetState()
            rescheduleAppointmentByCitizenResetState()
            getAppointmentHistoryResetState()
            getDrawingScrutinyReportResetState()
            reSubmitForScrutinyResetState()
            postAutoDCRResetState()
        })
    }, [])

    useEffect(() => {
        if (rescheduleAppointmentByCitizenState.apiState === "alert") {
            notification["error"]({
                message: rescheduleAppointmentByCitizenState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (rescheduleAppointmentByCitizenState.apiState === "success") {
            notification["success"]({
                message: rescheduleAppointmentByCitizenState.apiMessage,
                placement: "bottomRight"
            })
            getAppointmentDateResetState()
            getNdcDetailsFunction()
        }
    }, [rescheduleAppointmentByCitizenState])

    useEffect(() => {
        if (localStorage.getItem("PudaAuthToken") !== null) {
            verifyUpnAndMobileSubmitOtpState.AuthToken = localStorage.getItem("PudaAuthToken")
            verifyUpnAndMobileSubmitOtpState.AuthTokenKey = localStorage.getItem("PudaAuthTokenKey")

            setTimeout(function () {
                localStorage.removeItem('PudaAuthTokenKey')
                localStorage.removeItem('PudaAuthToken')
            }, 500)
        }
        else if (localStorage.getItem("PudaArchitectToken") !== null) {
            verifyUpnAndMobileSubmitOtpState.ArchitectToken = localStorage.getItem("PudaArchitectToken")
            verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey = localStorage.getItem("PudaArchitectTokenKey")
        }
        else if (verifyUpnAndMobileSubmitOtpState.AuthToken === null && verifyUpnAndMobileSubmitOtpState.ArchitectToken === null) {
            setRefreshRedirect(true)
        }
        window.onbeforeunload = () => {
            return true
        }
        return () => {
            window.onbeforeunload = null
        }
    }, [])

    useEffect(() => {
        getNdcDetailsFunction()
    }, [])


    useEffect(() => {
        if (getNdcDetailsState.apiState === "success") {
            if (getNdcDetailsState.data.ApplicationTypeId === 27 || getNdcDetailsState.data.ApplicationTypeId === 1729 || getNdcDetailsState.data.ApplicationTypeId === 1730 || getNdcDetailsState.data.ApplicationTypeId === 1731 || getNdcDetailsState.data.ApplicationTypeId === 1732 || getNdcDetailsState.data.ApplicationTypeId === 951) {
                callDrawingScrutinyReport()
            }

            getDocumentList({
                PropertyId: getNdcDetailsState.data.PropertyRefId,
                OrgId: OrgId,
                ApplicationTypeId: getNdcDetailsState.data.ApplicationTypeId,
                ApplicationId: ApplicationId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
            })
            if (getNdcDetailsState.data.ApplicationTypeId === 1509 || getNdcDetailsState.data.ApplicationTypeId === 1508 || getNdcDetailsState.data.ApplicationTypeId === 26 || getNdcDetailsState.data.ApplicationTypeId === 25 || getNdcDetailsState.data.ApplicationTypeId === 32) {
                setChangeOfOwnerShip(true)
            }
            if (getNdcDetailsState.data.AppointmentDetail !== null) {
                getAppointmentHistory({
                    OrgId: OrgId,
                    ApplicationId: ApplicationId,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                    ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                    ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
                })
            }
            getNdcDetailsState.apiState = ""
            setRender(true)
        }
    }, [getNdcDetailsState])


    useEffect(() => {
        if (getDocumentListState.apiState === "success") {
            getDocumentListState.list.map((item) => {
                if (item.DocumentId) {
                    setAttachedDocs(attachedDocs + 1)
                }
                if (item.Name === "Upload the Building Plans") {
                    setBuidlingDocument({ EntityTypeId: item.EntityTypeId, EntityId: item.EntityId, ApplicationTypeId: item.ApplicationTypeId, DocumentTypeId: item.DocumentTypeId, Name: item.Name, IsMandatory: item.IsMandatory, IsPVerificationRequired: item.IsPVerificationRequired, Extensions: item.Extensions, MaxSizeInKb: item.MaxSizeInKb })
                }
            })


            // _.forEach(getNdcDetailsState.documentList, function (item) {
            //     if (item.DocumentId) {
            //         setAttachedDocs(attachedDocs + 1)
            //     }
            // })
        }
    }, [getDocumentListState])

    useEffect(() => {
        if (postAutoDCRState.apiState === "success") {
            callDrawingScrutinyReport()
            postAutoDCRResetState()
        }
    }, [postAutoDCRState])

    // function

    const callDrawingScrutinyReport = () => {
        getDrawingScrutinyReport({
            OrgId: OrgId,
            ApplicationId: ApplicationId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
            ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
            ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
        })
    }

    const DownloadFile = (DocumentId, FileName) => {
        fetch(`${conf.api.base_url}DMS_DocumentService/GetUploadedDocument?ApiKey=GetUploadDocument&OrgId=${OrgId}&DocumentId=${DocumentId}`, {
            method: 'POST',
            headers: {
                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                'ArchitectToken': verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                'ArchitectTokenKey': verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
            }
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
    const DownloadPurchaserOrLegalHeirFile = (DocumentId, FileName, EntityType) => {
        fetch(`${conf.api.base_url}DMS_DocumentService/GetPurchaserLegalHeirDocument?ApiKey=GetPurchaserLegalHeirDocument&OrgId=${OrgId}&DocumentId=${DocumentId}&EntityType=${EntityType}`, {
            method: 'POST',
            headers: {
                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                'ArchitectToken': verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                'ArchitectTokenKey': verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
            }
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

    const DownloadGPAFile = (DocumentId, FileName) => {
        fetch(`${conf.api.base_url}DMS_DocumentService/GetGPADocument?ApiKey=GetGPADocument&OrgId=${OrgId}&DocumentId=${DocumentId}`, {
            method: 'POST',
            headers: {
                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                'ArchitectToken': verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                'ArchitectTokenKey': verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
            }
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

    const handleToScroll = () => {
        var ProgressHistoryTarget = document.querySelector('#ProgressHistory');

        if (ProgressHistoryTarget) {
            ProgressHistoryTarget.scrollIntoView({
                behavior: 'smooth',
                block: "center"
            })
        }
    }

    const reScheduleAppointment = () => {
        getAppointmentDate({
            OrgId: OrgId,
            ApplicationTypeId: getNdcDetailsState.data.ApplicationTypeId ?? "",
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
            ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
            ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
        })
    }
    const submitReScheduleAppointment = () => {
        rescheduleAppointmentByCitizen({
            OrgId: OrgId,
            ApplicationId: getNdcDetailsState.data.AppointmentDetail.ApplicationId,
            AppointmentId: getNdcDetailsState.data.AppointmentDetail.AppointmentId,
            RescheduledBy: "Applicant",
            NewAppointmentDatewithSlot: formData.NewAppointmentDatewithSlot,
            Remarks: formData.Remarks,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
            ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
            ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
        })
    }

    const handleOnChangeSelect = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const getNdcDetailsFunction = () => {
        document.getElementById('root').scrollIntoView({
            behavior: 'smooth',
            block: "start"
        })
        getNdcDetails({
            OrgId: OrgId,
            ApplicationId: parseInt(ApplicationId),
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
            ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
            ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
        })
    }

    const goToPreviousPath = () => {
        previousPath.goBack()
    }
    return (
        <Container>
            {refreshRedirect &&
                <Redirect to="/" />
            }
            {getNdcDetailsState.apiState === "loading" &&
                <Skeleton active />
            }

            {["error", "alert"].includes(getNdcDetailsState.apiState) &&
                <h3>Something is not right.</h3>
            }

            {render &&
                <>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <div>
                            <div style={{ display: "flex" }} >
                                <Link to="/" style={{ width: 40 }}>
                                    <BackIcon style={{ marginTop: 8 }} />
                                </Link>
                                <Title>{getNdcDetailsState.data.ApplicationName} .</Title>
                                <a onClick={handleToScroll}><Status>{getNdcDetailsState.data.ApplicationStatus}</Status></a>
                            </div>
                            <Title style={{ marginLeft: 40 }}>Application ID: {getNdcDetailsState.data.ApplicationNo}</Title>
                        </div>
                        {getNdcDetailsState.data.DownloadCertificateLink &&
                            getNdcDetailsState.data.ApplicationTypeId !== 1727 && getNdcDetailsState.data.ApplicationTypeId !== 1710 &&
                            <Link to={{ pathname: getNdcDetailsState.data.DownloadCertificateLink }} target="_blank" ><PrimaryButton type="primary" >DOWNLOAD CERTIFICATE</PrimaryButton></Link>
                        }
                    </div>
                    {verifyUpnAndMobileSubmitOtpState.submitApplication &&
                        <>
                            <BlankSpace />
                            <SuccessBar>
                                <CheckCircleFilled style={{ color: "#74bf98", fontSize: 24 }} />
                                <SuccessBarText>Application submitted Successfully. Know your application status from home page.</SuccessBarText>
                            </SuccessBar>
                        </>
                    }

                    <BlankSpace />
                    <div style={{ display: "flex", justifyContent: "center" }} >
                        <div style={{ width: "90%" }} >
                            <Description>Your Application ID is <b>{ApplicationId}</b> and application was submitted on <b>{getNdcDetailsState.data.ApplicationDate}</b>. Your application is currently in <b>{getNdcDetailsState.data.ApplicationStatus}</b> status.
                                {(getNdcDetailsState.data.ApplicationTypeId === 28 || getNdcDetailsState.data.ApplicationTypeId === 29 || getNdcDetailsState.data.ApplicationTypeId === 1721 || getNdcDetailsState.data.ApplicationTypeId === 1726) &&
                                    <>
                                        {getNdcDetailsState.data.IsRenewal === "N" ? " Application is applied for new certificate." : " Application is applied for renewal certificate."}
                                    </>
                                }
                            </Description>

                            <BlankSpace />
                            <Form
                                layout="vertical"
                                onFinish={submitReScheduleAppointment}
                            >
                                {(getNdcDetailsState.data.ApplicationTypeId === 21 || getNdcDetailsState.data.ApplicationTypeId === 1048 || getNdcDetailsState.data.ApplicationTypeId === 20 || getNdcDetailsState.data.ApplicationTypeId === 1509 || getNdcDetailsState.data.ApplicationTypeId === 1508 || getNdcDetailsState.data.ApplicationTypeId === 26 || getNdcDetailsState.data.ApplicationTypeId === 25 || getNdcDetailsState.data.ApplicationTypeId === 32) ?

                                    <>
                                        {(getNdcDetailsState.data.ApplicationTypeId === 20 || getNdcDetailsState.data.ApplicationTypeId === 21) &&
                                            <div style={{ color: '#e75a5a', marginBottom: 26 }}>
                                                <i>
                                                    Note:- All Allotees/Applicants purchasers along with sellers must visit the single window for the due
                                                    verification of the details filled up in the application form and get their photograph clicked at the time of verification
                                                    of documents only.
                                                </i>
                                            </div>
                                        }
                                        <Heading>Property Details</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="UPN"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.UPN} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Area"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.Area} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Authority Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.AuthorityName} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Plot Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.PlotNumber} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Property Type"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.PropertyType} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Scheme Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.SchemeName} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Reserved Price"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.ReservedPrice} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Sale Type"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.SaleType} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Usage Type"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.UsageType} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <BlankSpace />
                                        <Heading>Applicant Details</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Full Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.ApplicantDetails.Name} />
                                                </FormItem>
                                            </Col>
                                            {(getNdcDetailsState.data.ApplicationTypeId === 1509 || getNdcDetailsState.data.ApplicationTypeId === 1508 || getNdcDetailsState.data.ApplicationTypeId === 26 || getNdcDetailsState.data.ApplicationTypeId === 25 || getNdcDetailsState.data.ApplicationTypeId === 32) ?
                                                null
                                                :
                                                <Col span="8" >
                                                    <FormItem
                                                        label="Permission Type"
                                                    >
                                                        <Input size="large" readOnly defaultValue={getNdcDetailsState.data.TransferType} />
                                                    </FormItem>
                                                </Col>
                                            }
                                            {getNdcDetailsState.data.TransferType === "Transfer" &&
                                                <>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Relation"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.TransferSubType} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Share to be transferred"
                                                        >
                                                            <Input size="large" readOnly defaultValue={`${getNdcDetailsState.data.TransferPercentage}%`} />
                                                        </FormItem>
                                                    </Col>
                                                </>
                                            }
                                            <Col span="14" >
                                                <FormItem
                                                    label="Remark"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.Remarks} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        {getNdcDetailsState.data.AppliedOwner.length > 0 && getNdcDetailsState.data.AppliedOwner[0].GPADetails.Id > 0 &&
                                            <>
                                                <BlankSpace />
                                                <Heading>GPA Details of {`${getNdcDetailsState.data.ApplicantDetails.Name}`}</Heading>
                                                <Row gutter={24}>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Name"
                                                        >
                                                            <Input readOnly defaultValue={`${getNdcDetailsState.data.AppliedOwner[0].GPADetails.Name}`} size="large" />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Father Name/Husband Name"
                                                        >
                                                            <Input readOnly defaultValue={`${getNdcDetailsState.data.AppliedOwner[0].GPADetails.FName}`} size="large" />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Address"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.AppliedOwner[0].GPADetails.Address} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                {/* {getNdcDetailsState.data.ApplicationTypeId !== 25 && */}

                                                {getNdcDetailsState.data.AppliedOwner[0].GPADetails.Document &&

                                                    <FileContainer onClick={() => DownloadGPAFile(getNdcDetailsState.data.AppliedOwner[0].GPADetails.Document.DocumentId, getNdcDetailsState.data.AppliedOwner[0].GPADetails.Document.FileName)}>
                                                        <div><FileOutlined /></div>
                                                        <p className="title">{getNdcDetailsState.data.AppliedOwner[0].GPADetails.Document.DocumentName}</p>
                                                    </FileContainer>

                                                }

                                            </>
                                        }

                                        {getNdcDetailsState.data.PurchaserDetails.map((purchaser) => {
                                            return (
                                                <>
                                                    <BlankSpace />
                                                    <Heading>{changeOfOwnerShip ? (getNdcDetailsState.data.ApplicationTypeId !== 25 ? "Transferee's" : getNdcDetailsState.data.ApplicationTypeId === 25 ? "Transferee’s Details as per NOC" : "Transferee’s Details as per Transfer Permission") : "Purchaser's"} Details of {`${purchaser.Salutation} ${purchaser.Name}`}</Heading>
                                                    <Row gutter={24}>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label={changeOfOwnerShip ? "Transferee's Name" : "Purchaser Name"}
                                                            >
                                                                <Input readOnly defaultValue={`${purchaser.Salutation} ${purchaser.Name}`} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label={`${purchaser.SalutationId === 88 ? 'Husband Name' : 'Father Name'}`}
                                                            >
                                                                <Input readOnly defaultValue={purchaser.FatherName} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Address"
                                                            >
                                                                <Input size="large" readOnly defaultValue={purchaser.Address} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>

                                                    <Row gutter={24}>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Mobile"
                                                            >
                                                                <Input readOnly defaultValue={purchaser.MobileNumber} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Email"
                                                            >
                                                                <Input readOnly defaultValue={purchaser.EmailAddress} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <>
                                                        {purchaser.PurchaserDocument.map(item => {
                                                            return (
                                                                <FileContainer onClick={() => DownloadPurchaserOrLegalHeirFile(item.DocumentId, item.FileName, 900)}>
                                                                    <div><FileOutlined /></div>
                                                                    <p className="title">{item.DocumentName}</p>
                                                                </FileContainer>
                                                            )
                                                        })
                                                        }
                                                    </>
                                                    {purchaser.GPADetails && purchaser.GPADetails.Id > 0 &&
                                                        <>
                                                            <BlankSpace />
                                                            <Heading>GPA Details of {`${purchaser.Salutation} ${purchaser.Name}`}</Heading>
                                                            <Row gutter={24}>
                                                                <Col span="8" >
                                                                    <FormItem
                                                                        label="Name"
                                                                    >
                                                                        <Input readOnly defaultValue={`${purchaser.GPADetails.Name}`} size="large" />
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span="8" >
                                                                    <FormItem
                                                                        label="Father Name/Husband Name"
                                                                    >
                                                                        <Input readOnly defaultValue={`${purchaser.GPADetails.FName}`} size="large" />
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span="8" >
                                                                    <FormItem
                                                                        label="Address"
                                                                    >
                                                                        <Input size="large" readOnly defaultValue={purchaser.GPADetails.Address} />
                                                                    </FormItem>
                                                                </Col>
                                                            </Row>
                                                            {/* {getNdcDetailsState.data.ApplicationTypeId !== 25 && */}

                                                            {purchaser.GPADetails.Document &&

                                                                <FileContainer onClick={() => DownloadGPAFile(purchaser.GPADetails.Document.DocumentId, purchaser.GPADetails.Document.FileName)}>
                                                                    <div><FileOutlined /></div>
                                                                    <p className="title">{purchaser.GPADetails.Document.DocumentName}</p>
                                                                </FileContainer>

                                                            }

                                                        </>
                                                    }
                                                </>

                                            )
                                        })}

                                        {getNdcDetailsState.data.LegalHeirDetails.map((legalHeir) => {
                                            return (
                                                <>
                                                    <BlankSpace />
                                                    <Heading>Legal Heir Details of {`${legalHeir.PurchaserName}`}</Heading>
                                                    <Row gutter={24}>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Legal Heir of"
                                                            >
                                                                <Input readOnly defaultValue={legalHeir.PurchaserName} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label={"Legal Heir Name"}
                                                            >
                                                                <Input readOnly defaultValue={`${legalHeir.Salutation} ${legalHeir.Name}`} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label={`Relationship with ${changeOfOwnerShip ? 'Transferee' : 'Purchaser'}`}
                                                            >
                                                                <Input readOnly defaultValue={legalHeir.Relationship} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                        {/* <Col span="8" >
                                                            <FormItem
                                                                label="Mobile of Legal Heir"
                                                            >
                                                                <Input readOnly defaultValue={legalHeir.MobileNumber} size="large" />
                                                            </FormItem>
                                                        </Col> */}
                                                    </Row>

                                                    {/* <Row gutter={24}>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Email of Legal Heir"
                                                            >
                                                                <Input readOnly readOnly defaultValue={legalHeir.EmailAddress} size="large" />
                                                            </FormItem>
                                                        </Col>
                                                    </Row> */}
                                                    {legalHeir.LegalHeirDocument.map(item => {
                                                        return (
                                                            <FileContainer onClick={() => DownloadPurchaserOrLegalHeirFile(item.DocumentId, item.FileName, 901)}>
                                                                <div><FileOutlined /></div>
                                                                <p className="title">{item.DocumentName}</p>
                                                            </FileContainer>
                                                        )
                                                    })
                                                    }
                                                </>
                                            )
                                        })}

                                    </>
                                    :
                                    <>
                                        {
                                            (getNdcDetailsState.data.ApplicationTypeId === 1626 || getNdcDetailsState.data.ApplicationTypeId === 1625) ?
                                                <>
                                                    <Heading>Applicant Details</Heading>
                                                    <Row gutter="24" >
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Applicant Name"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.ApplicantDetails.Name} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Mobile Number"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.ApplicantDetails.MobileNo} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Remark"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.Remarks} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>

                                                    <Heading>Property Details</Heading>
                                                    <Row gutter="24" >
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Area"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.Area} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Authority Name"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.AuthorityName} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter="24" >
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Plot Number"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.PlotNumber} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Property Type"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.PropertyType} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Scheme Name"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.SchemeName} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    {(getNdcDetailsState.data.PurchaserDetails).map((details) => {
                                                        return (
                                                            <div>
                                                                <Heading>Owner Details of {details.Salutation} {details.Name}</Heading>
                                                                <Row gutter="24" >
                                                                    <Col span="8" >
                                                                        <FormItem
                                                                            label="Salutation"
                                                                        >
                                                                            <Input size="large" readOnly defaultValue={details.Salutation} />
                                                                        </FormItem>
                                                                    </Col>
                                                                    <Col span="8" >
                                                                        <FormItem
                                                                            label="Name"
                                                                        >
                                                                            <Input size="large" readOnly defaultValue={details.Name} />
                                                                        </FormItem>
                                                                    </Col>
                                                                    <Col span="8" >
                                                                        <FormItem
                                                                            label="Mobile Number"
                                                                        >
                                                                            <Input size="large" readOnly defaultValue={details.Address} />
                                                                        </FormItem>
                                                                    </Col>
                                                                </Row>
                                                                <Row gutter="24" >
                                                                    <Col span="8" >
                                                                        <FormItem
                                                                            label="Email Address"
                                                                        >
                                                                            <Input size="large" readOnly defaultValue={details.EmailAddress} />
                                                                        </FormItem>
                                                                    </Col>
                                                                    <Col span="8" >
                                                                        <FormItem
                                                                            label={details.Salutation == "Mrs." ? "Husband Name" : "Father's Name"}
                                                                        >
                                                                            <Input size="large" readOnly defaultValue={details.FatherName} />
                                                                        </FormItem>
                                                                    </Col>
                                                                    <Col span="8" >
                                                                        <FormItem
                                                                            label="Mobile Number"
                                                                        >
                                                                            <Input size="large" readOnly defaultValue={details.MobileNumber} />
                                                                        </FormItem>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                                :

                                                (getNdcDetailsState.data.ApplicationTypeId !== 28 && getNdcDetailsState.data.ApplicationTypeId !== 29 && getNdcDetailsState.data.ApplicationTypeId !== 1721 && getNdcDetailsState.data.ApplicationTypeId !== 1726 && getNdcDetailsState.data.ApplicationTypeId !== 1679 && getNdcDetailsState.data.ApplicationTypeId !== 1710 && getNdcDetailsState.data.ApplicationTypeId !== 1727) &&
                                                <>
                                                    <Heading>Applicant Details</Heading>

                                                    <Row gutter="24" >
                                                        <Col span="10" >
                                                            <FormItem
                                                                label="Full Name"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.ApplicantDetails.Name} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="14" >
                                                            <FormItem
                                                                label="Remark"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.Remarks} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <BlankSpace />
                                                    <Heading>Property Details</Heading>
                                                    <Row gutter="24" >
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="UPN"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.UPN} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Area"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.Area} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Authority Name"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.AuthorityName} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter="24" >
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Plot Number"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.PlotNumber} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Property Type"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.PropertyType} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span="8" >
                                                            <FormItem
                                                                label="Scheme Name"
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.PropertyDetails.SchemeName} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </>
                                        }

                                    </>
                                }
                                {getNdcDetailsState.data.ApplicationTypeId === 33 &&
                                    <>
                                        <Heading>Property Details where applicant will run professional consultancy services </Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="PAN of Consultant"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Pan} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Applicant's Personal Details</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Salutation"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Title} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Full Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.FullName} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Father's Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.FatherName} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Gender"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Gender} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Marital Status"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.MaritalStatus} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Date of Birth"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Dob} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="UID/Aadhar Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Aadhar} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Email Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.EmailAddress} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Mobile Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.MobileNumber} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Applicant's Permanent Address</Heading>
                                        <Row gutter="24" >
                                            <Col span="24" >
                                                <FormItem
                                                    label="Full Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="State"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeState} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="District"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeDistrict} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Pincode"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PePin} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Applicant's Correspondence Address</Heading>
                                        <Row gutter="24" >
                                            <Col span="24" >
                                                <FormItem
                                                    label="Full Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="State"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoState} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="District"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoDistrict} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Pincode"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoPin} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Professional Consultancy Services Details</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Service Category"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.ServiceCategory} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Details of Profession"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.ProfessionalDetail} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Details of Anticipated Visitors"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.VisitorDetail} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Working hours of Consultancy"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.WorkingHours} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Floor on which Services will be given"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Floor} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Total Area to be used in SQM"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.TotalArea} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </>
                                }
                                {getNdcDetailsState.data.ApplicationTypeId === 1475 &&
                                    <>
                                        <BlankSpace />
                                        <Heading>Required Details</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Date of Sanction of Building Plan"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.BuildingPlanSanctionDateString} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Number of Floors Constructed"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.NoOfFloorConstructedString} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Is Basement Constructed"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.IsBasmentConstructString} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Proposed Covered Area  for Ground Floor (in Sq foot)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.AreaGroundFloor} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Proposed Covered Area  for First Floor (in Sq foot)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.AreaFirstFloor} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Proposed Covered Area  for Second Floor (in Sq foot)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.AreaSecondFloor} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Service Pipe Length (in feet)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.ServicePipeLineLength} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Service Pipe Size"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.ServicePipeLineSize} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Number of Tapes"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.NumberOfTap} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Size of Tap"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.SizeOfTap} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Size of Ferrule Cock"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.FerrulCockSize} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Purpose of Water Connection"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.PurposeOfConnection} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >

                                            <Col span="8" >
                                                <FormItem
                                                    label="Proposed Covered Area for Basement (in Sq foot)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.AreaBasment} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Is Mumty Constructed"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.IsMumtyConstructedString} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Proposed Covered Area  for Mumty (in Sq foot)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.AreaMumty} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Total estimated cost of Construction (as per Architect)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.ConstructionCost} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                    </>

                                }
                                {(getNdcDetailsState.data.ApplicationTypeId === 30 || getNdcDetailsState.data.ApplicationTypeId === 1059 || getNdcDetailsState.data.ApplicationTypeId === 1712 || getNdcDetailsState.data.ApplicationTypeId === 1716) &&
                                    <>
                                        <BlankSpace />
                                        <Heading>Requirements</Heading>
                                        {(getNdcDetailsState.data.ApplicationTypeId === 1059 || getNdcDetailsState.data.ApplicationTypeId === 1712 || getNdcDetailsState.data.ApplicationTypeId === 1716) &&
                                            <>
                                                <Row gutter="24" >
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Water Meter No."
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.MeterNumber} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Make and Model"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.MeterMakeAndModel} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Installation Date"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.InstallationDate} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                        <Row gutter="24" >
                                            {(getNdcDetailsState.data.ApplicationTypeId === 1059 || getNdcDetailsState.data.ApplicationTypeId === 1712 || getNdcDetailsState.data.ApplicationTypeId === 1716) &&
                                                <>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Water Meter Bill Number"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.MeterBillNumber} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Warranty In Years"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.MeterWarrantyYears} />
                                                        </FormItem>
                                                    </Col>
                                                </>
                                            }
                                            <Col span="8" >
                                                <FormItem
                                                    label="Whether Building Is"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.WheatherBuildingIsString} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Number of Floors Constructed"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.NoOfFloorConstructedString} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Is Basement Constructed"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.IsBasmentConstructString} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </>

                                }
                                {(getNdcDetailsState.data.ApplicationTypeId === 30 || getNdcDetailsState.data.ApplicationTypeId === 1059 || getNdcDetailsState.data.ApplicationTypeId === 1712 || getNdcDetailsState.data.ApplicationTypeId === 1716) &&
                                    <>
                                        <Row gutter="24" >
                                            {getNdcDetailsState.data.ApplicationTypeId === 30 &&
                                                <>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Date of Sanction of Building Plan"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.BuildingPlanSanctionDateString} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Hot Water Fitting Material Details"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.HotWaterFittingDtl} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Hot Water Fitting Installation Bill Number"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.HotWaterFittingBillNo} />
                                                        </FormItem>
                                                    </Col>
                                                </>
                                            }

                                            {(getNdcDetailsState.data.ApplicationTypeId === 30 || getNdcDetailsState.data.ApplicationTypeId === 1059 || getNdcDetailsState.data.ApplicationTypeId === 1712 || getNdcDetailsState.data.ApplicationTypeId === 1716) &&
                                                <>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Number of Seats For Ground Floor"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.SeatsGroundFloor} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Number of Seats For First Floor"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.SeatsFirstFloor} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="8" >
                                                        <FormItem
                                                            label="Number of Seats For Second Floor"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.SeatsSecondFloor} />
                                                        </FormItem>
                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                    </>
                                }

                                {(getNdcDetailsState.data.ApplicationTypeId === 30) &&
                                    <>
                                        <BlankSpace />
                                        <Heading>Plumber Certificate Details (Who issued certificate)</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Name of the Plumber"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.PlumberName} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="License Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.PlumberLicenseNumber} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Address of the Plumber"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.PlumberAddress} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Date of Issue of Certificate"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WaterApplicationDetails.CerificateIssueDateString} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </>

                                }
                                {(getNdcDetailsState.data.ApplicationTypeId === 28 || getNdcDetailsState.data.ApplicationTypeId === 29 || getNdcDetailsState.data.ApplicationTypeId === 1721 || getNdcDetailsState.data.ApplicationTypeId === 1726) &&
                                    <>
                                        {(getNdcDetailsState.data.ApplicationTypeId === 28 || getNdcDetailsState.data.ApplicationTypeId === 29) ?
                                            <>
                                                <Heading>Applicant Details</Heading>
                                                <Row gutter="24" >
                                                    <Col span="10" >
                                                        <FormItem
                                                            label="Status of The Applicant"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeName} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="14" >
                                                        <FormItem
                                                            label="Remark"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.Remarks} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Heading>{getNdcDetailsState.data.ApplicationTypeId === 28 ? "Estate Agent" : "Promoter"} Personal Details</Heading>
                                            </>
                                            :
                                            <Heading>Plumber's Personal Details</Heading>
                                        }
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Salutation"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Title} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label={`${(getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1638 || getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1639) || (getNdcDetailsState.data.ApplicationTypeId === 1721 || getNdcDetailsState.data.ApplicationTypeId === 1726) ? "Full Name" : "Firm Name"}`}
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.FullName} />
                                                </FormItem>
                                            </Col>
                                            {((getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1638 || getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1639) || (getNdcDetailsState.data.ApplicationTypeId === 1721 || getNdcDetailsState.data.ApplicationTypeId === 1726)) &&
                                                <Col span="8" >
                                                    <FormItem
                                                        label="Father's Name"
                                                    >
                                                        <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.FatherName} />
                                                    </FormItem>
                                                </Col>
                                            }
                                        </Row>
                                        {((getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1638 || getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1639) || (getNdcDetailsState.data.ApplicationTypeId === 1721 || getNdcDetailsState.data.ApplicationTypeId === 1726)) &&
                                            <Row gutter="24" >
                                                <Col span="8" >
                                                    <FormItem
                                                        label="Gender"
                                                    >
                                                        <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Gender} />
                                                    </FormItem>
                                                </Col>
                                                <Col span="8" >
                                                    <FormItem
                                                        label="Marital Status"
                                                    >
                                                        <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.MaritalStatus} />
                                                    </FormItem>
                                                </Col>
                                                <Col span="8" >
                                                    <FormItem
                                                        label="Date of Birth"
                                                    >
                                                        <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Dob} />
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        }
                                        <Row gutter="24" >
                                            {((getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1638 || getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1639) || (getNdcDetailsState.data.ApplicationTypeId === 1721 || getNdcDetailsState.data.ApplicationTypeId === 1726)) &&
                                                <Col span="8" >
                                                    <FormItem
                                                        label="UID/Aadhar Number"
                                                    >
                                                        <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Aadhar} />
                                                    </FormItem>
                                                </Col>
                                            }
                                            {((getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId !== 1638 && getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId !== 1639) && (getNdcDetailsState.data.ApplicationTypeId !== 1721 && getNdcDetailsState.data.ApplicationTypeId !== 1726)) &&
                                                <Col span="8" >
                                                    <FormItem
                                                        label="GST Number"
                                                    >
                                                        <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.GstNo} />
                                                    </FormItem>
                                                </Col>
                                            }
                                            <Col span="8" >
                                                <FormItem
                                                    label="Email Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.EmailAddress} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Mobile Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.MobileNumber} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="PAN"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Pan} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        {(getNdcDetailsState.data.ApplicationTypeId === 1721 || getNdcDetailsState.data.ApplicationTypeId === 1726) &&
                                            <>
                                                <Heading>Qualification and Experience Details:</Heading>
                                                <Row gutter="24" >
                                                    <Col span="24" >
                                                        <FormItem
                                                            label="Qualification"
                                                        >
                                                            <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Qualification} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                        {(getNdcDetailsState.data.ApplicationTypeId === 28 || getNdcDetailsState.data.ApplicationTypeId === 29) ?
                                            <Heading>{getNdcDetailsState.data.ApplicationTypeId === 28 ? "Estate Agent" : "Promoter"} Permanent Address</Heading>
                                            :
                                            <Heading>Plumber's Permanent Address</Heading>
                                        }
                                        <Row gutter="24" >
                                            <Col span="24" >
                                                <FormItem
                                                    label="Full Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="State"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeState} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="District"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeDistrict} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Pincode"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PePin} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        {(getNdcDetailsState.data.ApplicationTypeId === 28 || getNdcDetailsState.data.ApplicationTypeId === 29) ?
                                            <Heading>{getNdcDetailsState.data.ApplicationTypeId === 28 ? "Estate Agent" : "Promoter"} Correspondence Address</Heading>
                                            :
                                            <Heading>Plumber's Correspondence Address</Heading>
                                        }
                                        <Row gutter="24" >
                                            <Col span="24" >
                                                <FormItem
                                                    label="Full Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="State"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoState} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="District"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoDistrict} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Pincode"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoPin} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <BlankSpace />
                                    </>

                                }


                                {(getNdcDetailsState.data.ApplicationTypeId === 27 || getNdcDetailsState.data.ApplicationTypeId === 1729 || getNdcDetailsState.data.ApplicationTypeId === 1730 || getNdcDetailsState.data.ApplicationTypeId === 1731 || getNdcDetailsState.data.ApplicationTypeId === 1732 || getNdcDetailsState.data.ApplicationTypeId === 951) &&
                                    <>
                                        <BlankSpace />
                                        <Heading>Building Plan Details </Heading>
                                        <Row gutter="24" >
                                            {/* {getNdcDetailsState.data.AreainSqYard > 1195.99 && */}
                                            <Col span="8" >
                                                <FormItem
                                                    label="Wall Construction Length (In meters)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.WallConstructLength} />
                                                </FormItem>
                                            </Col>
                                            {/* } */}
                                            <Col span="8" >
                                                <FormItem
                                                    label="Building Constructed/Covered Area (In Sq. meters)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.ConstructArea} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Total Building Construction cost (In rupees)"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.ConstructionCost} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Are you applying for revised plan"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.IsRevisedPlan} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Number of Flats"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.NoofFlats} />
                                                </FormItem>
                                            </Col>

                                        </Row>
                                        {(getDrawingScrutinyReportState.apiState === "success" && getDrawingScrutinyReportState.list.length > 0) &&
                                            <>
                                                <BlankSpace />
                                                <Heading>Building Plan Revision History </Heading>
                                            </>
                                        }
                                        {getDrawingScrutinyReportState.apiState === "success" && getDrawingScrutinyReportState.list.map((item, index) => (
                                            <>
                                                <Row gutter={[0, 16]}>
                                                    <Col span={24}>
                                                        <Row >
                                                            <Col span={6}>
                                                                <div style={{ fontWeight: 700 }}>{`${++index}.  ${item.ReportDate}`} : </div>
                                                            </Col>
                                                            <Col span={18}>
                                                                <div>{item.Remarks}</div>

                                                            </Col>
                                                        </Row>
                                                        <Row >
                                                            <Col span={24}>
                                                                <div style={{ marginLeft: 22 }}>
                                                                    <Space>
                                                                        {
                                                                            item.Status === '03' &&
                                                                            <ViewPlanLink style={{ marginRight: 16 }} to={{ pathname: item.DrawingFileLink }} target="_blank"><span>View Building Plan</span></ViewPlanLink>
                                                                        }
                                                                        {
                                                                            (item.Status === '03' || item.Status === '04') &&
                                                                            <ViewPlanLink to={{ pathname: item.SrutinyReportLink }} target="_blank"><span>View Scrutiny Report</span></ViewPlanLink>
                                                                        }
                                                                    </Space>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        {((item.Status === '04' || item.Status === '05') && getDocumentListState.apiState === "success" && index === 1) &&
                                                            <Row >

                                                                <Col span={24}>
                                                                    <Space style={{ marginLeft: 22 }}>
                                                                        <span style={{ color: 'red' }}>
                                                                            Upload revised building plan.
                                                                        </span>
                                                                        <UploadButton type="primary"
                                                                            action={encodeURI(`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=${getNdcDetailsState.data.ApplicationTypeId}&DocumentTypeId=${buldingDocument.DocumentTypeId}&Documentname=${buldingDocument.Name}&EntityTypeID=111&ApplicationId=${getDocumentListState.EntityId}&PhysicalVerificationRequired=${buldingDocument.IsPVerificationRequired ? 1 : 0}`)}
                                                                            headers={{
                                                                                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                                                                                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                                                                                'ArchitectToken': verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                                                                                'ArchitectTokenKey': verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
                                                                            }}
                                                                            beforeUpload={file => {
                                                                                setUploadLoading(true)
                                                                                return true
                                                                            }}
                                                                            onSuccess={(response) => {
                                                                                if (response.Status === 2) {
                                                                                    notification["success"]({
                                                                                        message: "Revised building plan document successfully submitted.",
                                                                                        placement: "bottomRight"
                                                                                    })
                                                                                    postAutoDCR({
                                                                                        OrgId: OrgId,
                                                                                        ApplicationId: getDocumentListState.EntityId,
                                                                                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                                                                                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                                                                                        ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                                                                                        ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
                                                                                    })
                                                                                }
                                                                                if (response.Status === 1) {
                                                                                    notification["error"]({
                                                                                        message: response.Message,
                                                                                        placement: "bottomRight"
                                                                                    })
                                                                                }
                                                                                setUploadLoading(false)
                                                                            }}
                                                                        > <Button size="middle" type="primary" icon={<UploadOutlined />} loading={uploadLoading} >Click to Upload</Button>
                                                                        </UploadButton>
                                                                    </Space>
                                                                </Col>
                                                            </Row>
                                                        }

                                                    </Col>
                                                </Row>
                                            </>
                                        ))}


                                    </>
                                }

                                {(getNdcDetailsState.data.ApplicationTypeId === 1679 || getNdcDetailsState.data.ApplicationTypeId === 1710 || getNdcDetailsState.data.ApplicationTypeId === 1727) &&
                                    <>
                                        <Heading>Application Details </Heading>
                                        <Row gutter="24" >
                                            {/* <Col span="8" >
                                                <FormItem
                                                    label="Empanelment Category"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.RegistrationCategoryName} />
                                                </FormItem>
                                            </Col> */}
                                            <Col span="8" >
                                                <FormItem
                                                    label="PAN of Architect"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Pan} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Architect's Personal Details</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Salutation"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Title} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Full Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.FullName} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Father's Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.FatherName} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Gender"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Gender} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Marital Status"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.MaritalStatus} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Date of Birth"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Dob} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="UID/Aadhar Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.Aadhar} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Email Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.EmailAddress} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Mobile Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.MobileNumber} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Certificate of Registration Details at Council of Architecture</Heading>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="Certificate Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.LicenseNumber} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Valid From"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.LicenseIssueDate} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Valid Till"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.LicenseExpiryDate} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Architect's Permanent Address</Heading>
                                        <Row gutter="24" >
                                            <Col span="24" >
                                                <FormItem
                                                    label="Full Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="State"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeState} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="District"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PeDistrict} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Pincode"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.PePin} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Heading>Architect's official Address</Heading>
                                        <Row gutter="24" >
                                            <Col span="24" >
                                                <FormItem
                                                    label="Full Address"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter="24" >
                                            <Col span="8" >
                                                <FormItem
                                                    label="State"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoState} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="District"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoDistrict} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Pincode"
                                                >
                                                    <Input size="large" readOnly defaultValue={getNdcDetailsState.data.EntrepreneurDetails.CoPin} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                    </>
                                }

                                <BlankSpace />
                                <Heading>Documents Uploaded</Heading>

                                {getDocumentListState.apiState === "success"
                                    ? (getDocumentListState.list || []).map(item => {
                                        if (item.DocumentId) {
                                            return (
                                                <FileContainer onClick={() => DownloadFile(item.DocumentId, item.FileName)}>
                                                    <div><FileOutlined /></div>
                                                    <p className="title">{item.Name}</p>
                                                </FileContainer>
                                            )
                                        }
                                    })
                                    : null}

                                {getDocumentListState.apiState === "success"
                                    ? [
                                        attachedDocs === 0
                                            ? <FlexBar leftContent={
                                                <>
                                                    <Lottie
                                                        options={folderAnimationOptions}
                                                        height={80}
                                                        width={80}
                                                    />
                                                    <span>No document attached.</span>
                                                </>
                                            } />
                                            : null
                                    ]
                                    : null}
                                {getNdcDetailsState.data.AppointmentDetail !== null &&
                                    <>
                                        <BlankSpace />
                                        <Heading>Appointment Detail For Physical Verification of Documents</Heading>
                                        <Row gutter="24" >

                                            {(getNdcDetailsState.data.AppointmentDetail.IsExpired === 'Yes' && getAppointmentDateState.apiState === "success") ?
                                                <>
                                                    <Col span="10" >
                                                        <FormItem
                                                            name="NewAppointmentDatewithSlot"
                                                            label="Select Appointment Date"
                                                            rules={[{ required: true, message: 'Required' }]}
                                                        >
                                                            <Select
                                                                name="NewAppointmentDatewithSlot"
                                                                size="large"
                                                                onSelect={(v) => handleOnChangeSelect(v, 'NewAppointmentDatewithSlot')}
                                                            >
                                                                {getAppointmentDateState.data.map((item) => {
                                                                    return (
                                                                        <Option key={item.AppointmentDate} value={item.AppointmentDate} >{item.AppointmentDate}</Option>
                                                                    )
                                                                })}
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="10" >
                                                        <FormItem
                                                            label="Remarks"
                                                            name="Remarks"
                                                        >
                                                            <Input size="large" name="Remarks" onChange={handleOnChange} />
                                                        </FormItem>
                                                    </Col>
                                                    <Col span="4" >
                                                        <FormItem
                                                            label=" "
                                                        >
                                                            <BlueButton htmlType="submit"  >Submit</BlueButton>
                                                        </FormItem>

                                                    </Col>
                                                </>
                                                :
                                                <>
                                                    {getNdcDetailsState.data.AppointmentDetail.Status === 'SCHEDULED' &&
                                                        <Col span="10" >
                                                            <FormItem
                                                                label={(getAppointmentHistoryState.apiState === 'success' && getAppointmentHistoryState.data.length > 0) ? 'Rescheduled Appointment Date' : 'Appointment Date'}
                                                            >
                                                                <Input size="large" readOnly defaultValue={getNdcDetailsState.data.AppointmentDetail.AppointmentDateWithSlot} />
                                                            </FormItem>
                                                        </Col>
                                                    }

                                                    {getNdcDetailsState.data.AppointmentDetail.IsExpired === 'Yes' &&


                                                        <Col span="4" >
                                                            <FormItem
                                                                label=" "
                                                            >
                                                                <BlueButton onClick={reScheduleAppointment}  >Reschedule Appointment</BlueButton>
                                                            </FormItem>
                                                        </Col>
                                                    }

                                                </>
                                            }

                                        </Row>
                                        {(getAppointmentHistoryState.apiState === 'success' && getAppointmentHistoryState.data.length > 0) &&
                                            <Row gutter="24" >
                                                <Col span="24" >
                                                    <List
                                                        header={<div style={{ fontWeight: 'bold' }}>Appointment History</div>}
                                                        itemLayout="horizontal"
                                                        dataSource={getAppointmentHistoryState.data}
                                                        renderItem={item => (
                                                            <List.Item>
                                                                <List.Item.Meta
                                                                    title={<span style={{ color: '#000' }}> {item.AppointmentDateWithSlot}</span>}
                                                                    description={
                                                                        <>
                                                                            <span style={{ fontSize: 14, color: '#000', fontWeight: 700 }}>
                                                                                {item.Status === 'COMPLETED' ? 'Physical verification of documents successfully completed. '
                                                                                    : 'Reason for Rescheduling: '
                                                                                }
                                                                            </span>
                                                                            <span style={{ fontSize: 14, color: '#000' }}> {item.Remarks}</span>
                                                                        </>
                                                                    }
                                                                />
                                                            </List.Item>
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                        }
                                    </>
                                }
                                <BlankSpace />
                                <ApplicationProgress ApplicationId={ApplicationId} ApplicationTypeId={getNdcDetailsState.data.ApplicationTypeId} PropertyRefId={getNdcDetailsState.data.PropertyRefId} DownloadCertificateLink={getNdcDetailsState.data.DownloadCertificateLink} getNdcDetailsFunction={getNdcDetailsFunction} />
                            </Form>
                        </div>
                    </div>

                </>
            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    getNdcDetailsState: state.getNdcDetails,
    getDocumentListState: state.getDocumentList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getAppointmentDateState: state.getAppointmentDate,
    rescheduleAppointmentByCitizenState: state.rescheduleAppointmentByCitizen,
    getAppointmentHistoryState: state.getAppointmentHistory,
    getDrawingScrutinyReportState: state.getDrawingScrutinyReport,
    reSubmitForScrutinyState: state.reSubmitForScrutiny,
    postAutoDCRState: state.postAutoDCR,
})
const mapDispatchToProps = (dispatch) => ({
    getNdcDetails: (params) => dispatch(getNdcDetails(params)),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    verifyUpnAndMobileSubmitOtpResetState: () => dispatch(verifyUpnAndMobileSubmitOtpResetState()),
    getNdcDetailsResetState: () => dispatch(getNdcDetailsResetState()),
    getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
    getAppointmentDateResetState: () => dispatch(getAppointmentDateResetState()),
    rescheduleAppointmentByCitizen: (params) => dispatch(rescheduleAppointmentByCitizen(params)),
    rescheduleAppointmentByCitizenResetState: () => dispatch(rescheduleAppointmentByCitizenResetState()),
    getAppointmentHistory: (params) => dispatch(getAppointmentHistory(params)),
    getAppointmentHistoryResetState: () => dispatch(getAppointmentHistoryResetState()),
    getDrawingScrutinyReport: (params) => dispatch(getDrawingScrutinyReport(params)),
    getDrawingScrutinyReportResetState: () => dispatch(getDrawingScrutinyReportResetState()),
    reSubmitForScrutiny: (params) => dispatch(reSubmitForScrutiny(params)),
    reSubmitForScrutinyResetState: () => dispatch(reSubmitForScrutinyResetState()),
    postAutoDCR: (params) => dispatch(postAutoDCR(params)),
    postAutoDCRResetState: () => dispatch(postAutoDCRResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NdcDetails)