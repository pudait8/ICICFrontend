import React, { useEffect, useState, useRef, use } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Modal, message } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'
import _ from "lodash"
import { Link, Redirect } from "react-router-dom"

// Components
import { BlankSpace, FlexDiv, DocumentUpload, TextButton, FormItem, ValidationDiv, BlueButton, FileTitle, Xtable } from '../Xcomponents'
import { Container, Heading, Footer, TotalLabel, TotalAmount, PaymentContainer } from './ServiceDetailsPrivatePropertiesFormStyle'
import { getAuthData, getOrgId } from '../../utils'
import OwnerForm from "../../pages/ServiceDetailsPrivateProperties/OwnerForm"
import conf from '../../config'

// Actions
import { privatePropertyApplication, privatePropertyApplicationResetState } from '../../actions/privatePropertyApplicationAction'
import { getAppointmentDate, getAppointmentDateResetState } from '../../actions/getAppointmentDateAction'
import { getDocumentList, getDocumentListResetState } from '../../actions/getDocumentListAction'
import { toGetPrivateScheme, toGetPrivateSchemeResetState } from '../../actions/toGetPrivateSchemeAction'
import { toGetPrivatePropertiesList, toGetPrivatePropertiesListResetState } from '../../actions/toGetPrivatePropertiesListAction'
import { saveNdcApplication, saveNdcApplicationResetState } from '../../actions/saveNdcApplicationAction'
import { getPropertyAreaUnitList, resetStateGetPropertyAreaUnitList } from '../../actions/getPropertyAreaUnitListAction'
import { saveApplicationAsDraft, resetStateSaveApplicationAsDraft } from '../../actions/saveApplicationAsDraftAction'
import { saveChangeOfOwnershipApplication, resetStateSaveChangeOfOwnershipApplication } from '../../actions/saveChangeOfOwnershipApplicationAction'
import { getDraftApplicationDetails, getDraftApplicationDetailsResetState } from '../../actions/getDraftApplicationDetailsAction'
import { fetchTransferApplication, resetStateFetchTransferApplication } from '../../actions/transferApplicationfetchActions'
import { SendIcon } from "../../components/CustomIcons"
import {
    postAutoDCR,
    postAutoDCRResetState,
} from "../../actions/postAutoDCRAction";
import {
    getPaymentIntegrationPayload,
    paymentIntegrationStatusCheck,
} from "../../actions/duePaymentsAction";

import { getApplicationProgress } from "../../actions/getApplicationProgressAction";
import paymentProcessingAnimation from "../../Lottie/payment-processing.json";
import paymentSuccessAnimation from "../../Lottie/payment-success.json";
import paymentFailAnimation from "../../Lottie/payment-fail.json";
import Lottie from "react-lottie";

const { Option } = Select
export const ServiceDetailsPrivatePropertiesForm = (props) => {
    const {
        getPropertyAreaUnitList,
        getPropertyAreaUnitListState,
        privatePropertyApplication,
        privatePropertyApplicationResetState,
        verifyUpnAndMobileSubmitOtpState,
        toGetPrivatePropertiesList,
        toGetPrivateScheme,
        saveNdcApplication,
        saveNdcApplicationResetState,
        listofDocuments,
        saveNdcApplicationState,
        getDocumentList, getDocumentListState,
        toGetPrivatePropertiesListState,
        toGetPrivateSchemeState,
        getAppointmentDateState,
        mobileNoState,
        getDocumentListResetState,
        getAppointmentDate,
        getAppointmentDateResetState,
        saveOwnerPrivatePropertiesState,
        toGetPrivatePropertiesListResetState,
        saveApplicationAsDraft,
        saveApplicationAsDraftState,
        saveChangeOfOwnershipApplication,
        saveChangeOfOwnershipApplicationState,
        PropertyDuePaymentsState,
        getDraftApplicationDetails,
        getDraftApplicationDetailsState,
        getDraftApplicationDetailsResetState,
        fetchTransferApplication,
        resetStateFetchTransferApplication,
        transferApplicationFetchState,
        getPaymentIntegrationPayload,
        paymentIntegrationStatusCheck,
        getApplicationProgressState
    } = props;
    const [uploadLoading, setUploadLoading] = useState([])
    const [documentFileId, setDocumentFileId] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [appId, setAppId] = useState();
    const OrgId = getOrgId();
    const [currentFileType, setCurrentFileType] = useState(''); // Current file format
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([])
    const [files, setFiles] = useState([])
    const [form] = Form.useForm();
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false);
    const [basedOnProperty, setBasedOnProperty] = useState(true);
    const [formData, setFormData] = useState({
        IdentityProofUploaded: "",
        ApplicantName: '',
        Remark: "",
        SchemeId: "",
        PropertyNumber: "",
        Mobile: '',
        AppointmentDate: '',
        UnitOfArea: '',
        Area: ''
    });
    const [isPVerificationRequired, setIsPVerificationRequired] = useState(false);

    // Payment related state variables
    const [submitAsDraftDisabled, setSubmitAsDraftDisabled] = useState(false);
    const [payDisabled, setPayDisabled] = useState(false);
    const [applicationId, setApplicationId] = useState();
    const [demandNoteData, setDemandNoteData] = useState(null);
    const [demandNoteModalVisible, setDemandNoteModalVisible] = useState(false);
    const [displayPaymentStatusModal, setDisplayPaymentStatusModal] = useState(false);
    const draftPromiseRef = useRef(null);

    // Built-up area related state variables
    const [builtUpAreaList, setBuiltUpAreaList] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [area, setArea] = useState("");
    const [hasBasement, setHasBasement] = useState(false);
    const [totalArea, setTotalArea] = useState(0);
    const [existingAreaScrutinyAmount, setExistingAreaScrutinyAmount] = useState(0);
    const [applicationType, setApplicationType] = useState("Proposed");
    const [feeLoading, setFeeLoading] = useState(false);
    const [feeData, setFeeData] = useState(null);
    const [feeModalVisible, setFeeModalVisible] = useState(false);

    // AGC related state variables
    const [agcUsageSubTypes, setAgcUsageSubTypes] = useState([]);
    const [farUsageSubTypes, setFarUsageSubTypes] = useState([]);
    const [agcCoverageOptions, setAgcCoverageOptions] = useState([]);
    const [farCoverageOptions, setFarCoverageOptions] = useState([]);
    const [showFAR, setShowFAR] = useState(false);
    const [agcUsageSubType, setAgcUsageSubType] = useState(null);
    const [farUsageSubType, setFarUsageSubType] = useState(null);
    const [agcCoverageType, setAgcCoverageType] = useState(null);
    const [farCoverageType, setFarCoverageType] = useState(null);
    const [agcList, setAgcList] = useState([]);
    const [agcEditIndex, setAgcEditIndex] = useState(null);
    const [farList, setFarList] = useState([]);
    const [farEditIndex, setFarEditIndex] = useState(null);
    const [farDropdownData, setFarDropdownData] = useState([]);
    const [paymentOnly, setPaymentOnly] = useState(false);


    const [agcForm, setAgcForm] = useState({
        additionalGroundCoverage: "",
        rates: 0,
        area: "",
        collectorFees: "",
        amount: 0,
        totalWithFeesAGC: 0,
    });

    const [farForm, setFarForm] = useState({
        additionalFAR: "",
        rates: 0,
        area: "",
        collectorFees: "",
        amount: 0,
        totalWithFeesFAR: 0,
    });

    // Constants
    const applicationTypeOptions = [
        { label: "Proposed", value: "Proposed" },
        { label: "Revised", value: "Revised" },
        { label: "Superseded", value: "Superseded" },
    ];

    const floorOptions = [
        { label: "Basement", value: -1 },
        { label: "Ground Floor", value: 0 },
        { label: "First Floor", value: 1 },
        { label: "Second Floor", value: 2 },
        { label: "Mumty", value: 3 },
    ];

    const thStyle = {
        border: "1px solid #d9d9d9",
        padding: "8px",
        backgroundColor: "#fafafa",
        fontWeight: 600,
        textAlign: "left",
    };

    const tdStyle = {
        border: "1px solid #d9d9d9",
        padding: "8px",
    };

    const calculateAmount = (area, rate) => Number(area || 0) * Number(rate || 0);


    useEffect(() => {
        if (saveNdcApplicationState.apiState === "alert") {
            notification["error"]({
                message: saveNdcApplicationState.apiMessage,
                placement: "bottomRight",
            });
            saveNdcApplicationResetState();
        }

        if (saveNdcApplicationState.apiState === "success") {
            notification["success"]({
                message: saveNdcApplicationState.apiMessage,
                placement: "bottomRight",
            });
            verifyUpnAndMobileSubmitOtpState.submitApplication = true;
            setRedirect([
                true,
                "/ndc-details/" + saveNdcApplicationState.data.ApplicationId,
            ]);
        }
    }, [saveNdcApplicationState]);

    useEffect(() => {
        const total = builtUpAreaList.reduce(
            (sum, item) => sum + Number(item.area),
            0
        );
        setTotalArea(total);
    }, [builtUpAreaList]);

    useEffect(() => {

        let isDemandNoteCreated = props.serviceId === "1796" && verifyUpnAndMobileSubmitOtpState.data.ApplicationDemandNoteId > 0 && verifyUpnAndMobileSubmitOtpState.data.ApplicationDemandNoteStatus == 1;

        // setPaymentOnly(isDemandNoteCreated); //uncomment for production

    }, []);

    useEffect(() => {
        if (verifyUpnAndMobileSubmitOtpState?.data?.ApplicationId && verifyUpnAndMobileSubmitOtpState?.data?.ApplicationDemandNoteStatus != 2) {
            // setApplicationId(verifyUpnAndMobileSubmitOtpState?.data?.ApplicationId);  // Uncomment for production
        }
    }, [verifyUpnAndMobileSubmitOtpState?.data?.ApplicationId]);

    useEffect(() => {
        setAppId();
        setRedirect(false);
        toGetPrivateScheme({ OrgId: OrgId });
        saveNdcApplicationResetState();
        privatePropertyApplicationResetState();
        getDocumentListResetState();
        getAppointmentDateResetState();
        getDocumentList({
            PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            OrgId: OrgId,
            ApplicationTypeId: props.serviceId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getPropertyAreaUnitList();
    }, []);

    useEffect(() => {
        getApplicationProgress({
            ApplicationId: parseInt(applicationId),
            OrgId: getOrgId(),
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
            ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
            ArchitectTokenKey:
                verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? "",
        });
    }, []);

    // // Payment integration status handling
    // useEffect(() => {
    //     if (!PropertyDuePaymentsState) return;
    //     if (PropertyDuePaymentsState.paymentIntegrationApiState === "ideal") {
    //         // Redirect to payment gateway
    //         window.location = `${PropertyDuePaymentsState.paymentIntegrationPayload.URL
    //             }?UniqueId=${PropertyDuePaymentsState.paymentIntegrationPayload.UniqueId
    //             }&UserId=${PropertyDuePaymentsState.paymentIntegrationPayload.UserId
    //             }&Amount=${1}&AuthTokenKey=${encodeURIComponent(
    //                 verifyUpnAndMobileSubmitOtpState.AuthTokenKey
    //             )}&AuthToken=${encodeURIComponent(
    //                 verifyUpnAndMobileSubmitOtpState.AuthToken
    //             )}&ArchitectToken=${encodeURIComponent(
    //                 verifyUpnAndMobileSubmitOtpState.ArchitectToken
    //             )}&ArchitectTokenKey=${encodeURIComponent(
    //                 verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey
    //             )}`;
    //     }

    //     if (PropertyDuePaymentsState.paymentIntegrationApiState === "error") {
    //         setPayDisabled(false);
    //         message.error("Failed to initiate payment");
    //     }
    // }, [PropertyDuePaymentsState?.paymentIntegrationApiState]);

    // // Payment status handling
    // useEffect(() => {
    //     if (
    //         ["Success", "Failed", "In-Progress", "Cancelled"].includes(
    //             PropertyDuePaymentsState?.paymentStatus
    //         )
    //     ) {
    //         if (props.serviceId === "1796") {
    //             // For service ID 1625, handle payment success
    //             if (PropertyDuePaymentsState.paymentStatus === "Success") {
    //                 // You can add postAutoDCR call here if needed for service 1625
    //                 // For now, just show success modal
    //             }
    //         }

    //         setDisplayPaymentStatusModal(true);
    //     }
    // }, [PropertyDuePaymentsState?.paymentStatus]);

    // Handle draft save completion
    useEffect(() => {
        if (draftPromiseRef.current) {
            if (saveApplicationAsDraftState?.apiState === "success") {
                console.log("DRAFT SAVE: Success");
                draftPromiseRef.current.resolve(saveApplicationAsDraftState.data);
                draftPromiseRef.current = null;
            } else if (
                saveApplicationAsDraftState?.apiState === "error" ||
                saveApplicationAsDraftState?.apiState === "alert"
            ) {
                console.log("DRAFT SAVE: Error", saveApplicationAsDraftState?.apiMessage);
                draftPromiseRef.current.reject(new Error(saveApplicationAsDraftState?.apiMessage || "Failed to save draft"));
                draftPromiseRef.current = null;
            }
        }
    }, [saveApplicationAsDraftState?.apiState, saveApplicationAsDraftState?.apiMessage]);

    // Load draft application details if applicationId is available
    useEffect(() => {
        // Load draft application details if APPLICATION_REF_ID is available
        const urlParams = new URLSearchParams(window.location.search);
        if (applicationId) {
            getDraftApplicationDetails({
                ApiKey: "GetDraftApplicationDetails",
                OrgId: OrgId,
                ApiParams: {
                    APPLICATION_REF_ID: parseInt(applicationId),
                },
            });
            // Load documents from existing application using fetchTransferApplication
            fetchTransferApplication({
                OrgId: OrgId,
                ApplicationId: applicationId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            });
        }
        return () => {
            saveNdcApplicationResetState();
            getAppointmentDateResetState();
            getDocumentListResetState();
            resetStateSaveChangeOfOwnershipApplication();
            getDraftApplicationDetailsResetState();
            resetStateFetchTransferApplication();
        };
    }, [applicationId]);

    // Handle draft application details response and bind form fields
    useEffect(() => {
        if (
            getDraftApplicationDetailsState.apiState === "success" &&
            getDraftApplicationDetailsState.data
        ) {
            const draftData = getDraftApplicationDetailsState.data;

            // Map BuildingApplication data to form fields
            if (draftData.BuildingApplication) {
                const buildingApp = draftData.BuildingApplication;
                // setFormData((prevData) => ({
                //   ...prevData,
                //   UPN: buildingApp.UPN || "",
                //   TotalBuiltUpArea: buildingApp.TotalBuiltUpArea || 0,
                //   TotalBuiltUpAreaWithFees: buildingApp.TotalBuiltUpAreaWithFees || 0,
                //   TotalBoundaryWall: buildingApp.TotalBoundaryWall || 0,
                //   TotalBoundaryWallWithFees: buildingApp.TotalBoundaryWallWithFees || 0,
                //   TotalFARWithFees: buildingApp.TotalFARWithFees || 0,
                //   TotalAmount: buildingApp.TotalAmount || 0,
                //   TotalConstructionCost: buildingApp.TotalConstructionCost || 0,
                //   TotalExistingArea: buildingApp.TotalExistingArea || 0,
                //   ApplicationType:buildingApp.ApplicationType
                // }));
                setApplicationType(draftData.BuildingApplication.ApplicationType);
                setExistingAreaScrutinyAmount(draftData.BuildingApplication.ExistingAreaScrutinyFee);
                // Set form values for Ant Design form
                form.setFieldsValue({
                    UPN: buildingApp.UPN || "",
                    TotalBuiltUpArea: draftData.BuildingApplication.TotalBuiltUpArea || 0,
                    TotalBuiltUpAreaWithFees:
                        draftData.BuildingApplication.TotalBuiltUpAreaWithFees || 0,
                    TotalBoundaryWall: 0,
                    TotalBoundaryWallWithFees: 0,
                    TotalFARWithFees: draftData.BuildingApplication.TotalFARWithFees || 0,
                    TotalAmount: draftData.BuildingApplication.TotalAmount || 0,
                    TotalConstructionCost:
                        draftData.BuildingApplication.TotalConstructionCost,
                    TotalExistingArea: draftData.BuildingApplication.TotalExistingArea,
                    ApplicationType: draftData.BuildingApplication.ApplicationType,
                    PaidSecurityAmount: draftData.BuildingApplication.PaidSecurityAmount
                });
            }



            // Map BuiltUpAreas to builtUpAreaList state
            if (draftData.BuiltUpAreas && draftData.BuiltUpAreas.length > 0) {
                setBuiltUpAreaList(
                    draftData.BuiltUpAreas.map((area) => ({
                        floor: area.Floor || 0,
                        area: area.Area || 0,
                        gst: area.GST || 0,
                        labourCessFee: area.LabourCess || 0,
                        scrutinyFee: area.ScrutinyFees || 0,
                    }))
                );
            }

            // Map RateForAGCList to agcList state
            if (draftData.RateForAGCList && draftData.RateForAGCList.length > 0) {
                setAgcList(
                    draftData.RateForAGCList.map((agc) => ({
                        additionalGroundCoverage: agc.AdditionalGroundCoverage || "",
                        rates: agc.Rates || 0,
                        area: agc.Area || 0,
                        collectorFees: agc.CollectorFees || 0,
                        amount: agc.Amount || 0,
                        totalWithFeesAGC: agc.TotalWithFeesAGC || 0,
                        gst: agc.GST || 0,
                        labourCessFee: agc.LabourCess || 0,
                        scrutinyFee: agc.ScrutinyFees || 0,
                    }))
                );
            }

            // Map RateForFARList to farList state
            if (draftData.RateForFARList && draftData.RateForFARList.length > 0) {
                setFarList(
                    draftData.RateForFARList.map((far) => ({
                        additionalFAR: far.AdditionalFAR || "",
                        rates: far.Rates || 0,
                        area: far.Area || 0,
                        collectorFees: far.CollectorFees || 0,
                        amount: far.Amount || 0,
                        totalWithFeesFAR: far.TotalWithFeesFAR || 0,
                        gst: far.GST || 0,
                        labourCessFee: far.LabourCess || 0,
                        scrutinyFee: far.ScrutinyFees || 0,
                    }))
                );
            }

            if (
                (draftData.RateForAGCList && draftData.RateForAGCList.length > 0) ||
                (draftData.RateForFARList && draftData.RateForFARList.length > 0)
            ) {
                setShowFAR(true);
            }
        }
    }, [getDraftApplicationDetailsState]);

    // Handle transfer application fetch state for documents
    useEffect(() => {
        if (transferApplicationFetchState?.apiState === "success" && props.serviceId === "1796") {
            if (transferApplicationFetchState.data?.Documents && transferApplicationFetchState.data.Documents.length > 0) {
                let fileArr = [];
                transferApplicationFetchState.data.Documents.map((item) => {
                    let extension = item.FileName.substr(item.FileName.lastIndexOf(".") + 1);
                    let filePrependString = "";
                    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                        filePrependString = `data:image/${extension};base64,${item.FileData}`;
                    } else {
                        filePrependString = `data:application/${extension};base64,${item.FileData}`;
                    }
                    fileArr.push({
                        documentTypeId: item.DocumentTypeId,
                        uid: item.DocumentId,
                        name: item.FileName,
                        status: 'done',
                        url: filePrependString,
                        thumbUrl: filePrependString,
                        preview: filePrependString,
                    });
                });
                setDefaultFileList(fileArr);

                if (getDocumentListState.list && getDocumentListState.list.length > 0) {
                    const newFileList = [...fileList];
                    fileArr.forEach((file) => {
                        const docTypeIndex = getDocumentListState.list.findIndex(doc => doc.DocumentTypeId === file.documentTypeId);
                        if (docTypeIndex !== -1) {
                            newFileList[docTypeIndex] = [file];
                            const docItem = getDocumentListState.list[docTypeIndex];
                            form.setFieldsValue({
                                [docItem.Name]: [file]
                            });
                        }
                    });
                    setFileList(newFileList);
                }
            }
        }
    }, [transferApplicationFetchState?.apiState, transferApplicationFetchState?.data, props.serviceId, getDocumentListState.list]);

    const handleOnChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    useEffect(() => {
        if (saveNdcApplicationState.apiState === "success") {
            notification.success({
                message: saveNdcApplicationState.apiMessage,
                placement: "bottomRight"
            });
            setRedirect(true);
            setAppId(saveNdcApplicationState.data.ApplicationId)
        }
        else if (saveNdcApplicationState.apiState == 'alert') {
            notification.warn({
                message: saveNdcApplicationState.apiMessage,
                placement: "bottomRight"
            });
        }
    }, [saveNdcApplicationState]);

    const submit = () => {
        if (saveOwnerPrivatePropertiesState.apiState === 'success') {
            if (props.serviceId === "1796") {
                saveNdcApplication({
                    ApplicationId: applicationId,
                    OrgId: OrgId,
                    PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
                    ApplicationType: props.serviceId,
                    Name: formData.ApplicantName,
                    Remark: formData.Remark,
                    Mobile: mobileNoState.MobileNo,
                    UnitOfArea: formData.UnitOfArea,
                    Area: formData.Area,
                    TemporaryApplicationId: getDocumentListState.EntityId ?? 0,
                    PropertyRefId: formData.PropertyNumber,
                    SubmitType: 1,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                    ApiKey: "SavePropertyApplication",
                    GPASPA: "",
                    AppointmentDate: formData.AppointmentDate,
                })
            } else {
                saveNdcApplication({
                    OrgId: OrgId,
                    PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
                    ApplicationType: props.serviceId,
                    Name: formData.ApplicantName,
                    Remark: formData.Remark,
                    Mobile: mobileNoState.MobileNo,
                    UnitOfArea: formData.UnitOfArea,
                    Area: formData.Area,
                    TemporaryApplicationId: getDocumentListState.EntityId ?? 0,
                    PropertyRefId: formData.PropertyNumber,
                    SubmitType: 1,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                    ApiKey: "SavePropertyApplication",
                    GPASPA: "",
                    AppointmentDate: formData.AppointmentDate,
                })
            }
        }
        else {
            notification.warn({
                message: "Atleast one owner must be added",
                placement: "bottomRight"
            });
        }
    };

    const handleOnChangeSelect = (field, value) => {
        setFormData({ ...formData, [field]: value })
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    };

    const paymentSuccessAnimationOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentSuccessAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const paymentFailAnimationOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentFailAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    // Built-up area functions
    const handleApplicationType = (value) => {
        setApplicationType(value);
        const formValues = form.getFieldsValue(true);
        if (value == "Proposed") {
            setExistingAreaScrutinyAmount(0);
            form.setFieldsValue({
                ...formValues,
                PaidSecurityAmount: 0,
                TotalExistingArea: 0
            });
        }
    };

    const calculateExistingAreaFees = async () => {
        const data = await calculateFee(0);
        if (!data) {
            message.error("Error calculating fees");
            return;
        }
        setExistingAreaScrutinyAmount(data.ExistingAreaScrutinyAmount);
    };

    // Calculate the number of non-basement floors added
    const getNonBasementFloorCount = () => {
        return builtUpAreaList.filter(item => item.floor >= 0).length;
    };

    // Check if max floors (3) have been reached (excluding basement)
    const isMaxFloorsReached = () => {
        return getNonBasementFloorCount() >= 4; // Ground floor (0) + 3 floors (1, 2, 3) = 4 floors total
    };

    const handleBuiltUpArea = async ({ area }) => {
        // Validation: All fields are required
        // if (!floor) {
        //   message.error("Please select a floor");
        //   return;
        // }

        let res = isValidForFeesCalculation(area);
        if (!res.isValid) {
            message.error(res.message);
            return;
        }

        const floor = hasBasement
            ? builtUpAreaList.length - 1
            : builtUpAreaList.length;

        // Check if max floors reached (3 floors + ground floor = 4 total, basement is separate)
        // Only check when adding new floor, not when editing
        if (editingIndex === null) {
            // If trying to add a non-basement floor and max is reached
            if (floor >= 0 && getNonBasementFloorCount() >= 4) {
                message.error("Cannot add more than 3 floors (mumty room)");
                return;
            }
            // If trying to add floor beyond Third Floor (value > 3)
            if (floor > 3) {
                message.error("Cannot add more than 3 floors (mumty room)");
                return;
            }
        }

        if (applicationType !== "Revised" && applicationType !== "Superseded" && (!area || area === "")) {
            message.error("Total area must be greater than 0 for Purposed application type.");
            return;
        }
        // Validation: Numeric values should be greater than 1
        const numericArea = parseFloat(area);
        if (applicationType !== "Revised" && applicationType !== "Superseded" && (isNaN(numericArea) || numericArea <= 0)) {
            message.error("Area must be a number greater than 0");
            return;
        }

        // Check if the floor already exists in the list (except the one being edited)
        const isDuplicate = builtUpAreaList.some(
            (item, index) => item.floor === floor && index !== editingIndex
        );

        if (isDuplicate) {
            message.error(`Data for ${floor} already exists`);
            return;
        }

        const data = await calculateFee(area);
        if (!data) {
            message.error("Error calculating fees");
            return;
        }

        const scrutinyFee = data.ScrutinyAmount || 0;
        const securityFee = data.SecurityAmount || 0;
        const labourCessFee = data.LabourCessAmount || 0;
        const gst = data.ScrutinyAmount * 0.18;
        setExistingAreaScrutinyAmount(data.ExistingAreaScrutinyAmount);

        if (editingIndex !== null) {
            // Update existing row
            const updatedList = [...builtUpAreaList];
            updatedList[editingIndex] = {
                floor,
                area,
                scrutinyFee,
                securityFee,
                labourCessFee,
                gst,
            };
            setBuiltUpAreaList(updatedList);
            setEditingIndex(null);
            message.success(`Updated data for ${floor}`);
        } else {
            // Add new row
            setBuiltUpAreaList([
                ...builtUpAreaList,
                { floor, area, scrutinyFee, securityFee, labourCessFee, gst },
            ]);
            let floorName = floorOptions.find(x => x.value == floor)?.label;
            message.success(`Added data for ${floorName}`);
        }

        // Reset inputs
        setArea("");
    };

    const handleEdit = (index) => {
        const item = builtUpAreaList[index];
        setArea(item.area);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedList = builtUpAreaList.filter((_, i) => i !== index);
        setBuiltUpAreaList(updatedList);
        if (editingIndex === index) {
            setArea("");
            setEditingIndex(null);
        }
        // Update total area
        const newTotalArea = updatedList.reduce((sum, item) => sum + Number(item.area), 0);
        setTotalArea(newTotalArea);
    };

    // AGC functions
    const saveAGC = async () => {
        // Validation: All fields are required
        if (!agcForm.additionalGroundCoverage) {
            message.error("Please select Additional Ground Coverage");
            return;
        }

        if (!agcForm.rates || agcForm.rates === "") {
            message.error("Please enter rates");
            return;
        }

        if (!agcForm.area || agcForm.area === "") {
            message.error("Please enter area");
            return;
        }

        if (!agcForm.collectorFees || agcForm.collectorFees === "") {
            message.error("Please enter collector fees");
            return;
        }

        // Validation: Numeric values should be greater than 1
        const numericRates = parseFloat(agcForm.rates);
        if (isNaN(numericRates) || numericRates <= 1) {
            message.error("Rates must be a number greater than 1");
            return;
        }

        const numericArea = parseFloat(agcForm.area);
        if (isNaN(numericArea) || numericArea <= 1) {
            message.error("Area must be a number greater than 1");
            return;
        }

        const numericCollectorFees = parseFloat(agcForm.collectorFees);
        if (isNaN(numericCollectorFees) || numericCollectorFees <= 1) {
            message.error("Collector fees must be a number greater than 1");
            return;
        }

        const duplicate = agcList.some(
            (i, idx) =>
                i.additionalGroundCoverage === agcForm.additionalGroundCoverage &&
                idx !== agcEditIndex
        );

        if (duplicate) {
            message.error("This Ground Coverage already exists");
            return;
        }

        // Dummy fee calculation - replace with actual calculateFee function
        const scrutinyAmount = numericArea * 10;
        const securityAmount = numericArea * 5;
        const labourCessAmount = numericArea * 2;
        const gst = scrutinyAmount * 0.18;

        const updated = [...agcList];
        agcForm.Amount =
            agcForm.area * agcForm.collectorFees * (agcForm.rates / 100);

        agcForm.scrutinyFee = scrutinyAmount;
        agcForm.securityFee = securityAmount;
        agcForm.labourCessFee = labourCessAmount;
        agcForm.gst = gst;

        if (agcEditIndex !== null) {
            updated[agcEditIndex] = agcForm;
        } else {
            updated.push(agcForm);
        }

        setAgcList(updated);
        resetAGC();
    };

    const editAGC = (index) => {
        setAgcForm(agcList[index]);
        setAgcEditIndex(index);
    };

    const deleteAGC = (index) => {
        setAgcList(agcList.filter((_, i) => i !== index));
        resetAGC();
    };

    const resetAGC = () => {
        setAgcForm({
            additionalGroundCoverage: "",
            rates: 0,
            area: "",
            collectorFees: "",
            amount: 0,
            totalWithFeesAGC: 0,
        });
        setAgcEditIndex(null);
    };

    // FAR functions
    const saveFAR = async () => {
        // Validation: All fields are required
        if (!farForm.additionalFAR) {
            message.error("Please select Additional FAR");
            return;
        }

        if (!farForm.rates || farForm.rates === "") {
            message.error("Please enter rates");
            return;
        }

        if (!farForm.area || farForm.area === "") {
            message.error("Please enter area");
            return;
        }

        if (!farForm.collectorFees || farForm.collectorFees === "") {
            message.error("Please enter collector fees");
            return;
        }

        // Validation: Numeric values should be greater than 1
        const numericRates = parseFloat(farForm.rates);
        if (isNaN(numericRates) || numericRates <= 1) {
            message.error("Rates must be a number greater than 1");
            return;
        }

        const numericArea = parseFloat(farForm.area);
        if (isNaN(numericArea) || numericArea <= 1) {
            message.error("Area must be a number greater than 1");
            return;
        }

        const numericCollectorFees = parseFloat(farForm.collectorFees);
        if (isNaN(numericCollectorFees) || numericCollectorFees <= 1) {
            message.error("Collector fees must be a number greater than 1");
            return;
        }

        const duplicate = farList.some(
            (item, idx) =>
                item.additionalFAR === farForm.additionalFAR && idx !== farEditIndex
        );

        if (duplicate) {
            message.error("This Additional FAR already exists");
            return;
        }

        // Dummy fee calculation - replace with actual calculateFee function
        const scrutinyAmount = numericArea * 10;
        const securityAmount = numericArea * 5;
        const labourCessAmount = numericArea * 2;
        const gst = scrutinyAmount * 0.18;

        const updatedList = [...farList];
        farForm.Amount =
            farForm.area * farForm.collectorFees * (farForm.rates / 100);

        farForm.scrutinyFee = scrutinyAmount;
        farForm.securityFee = securityAmount;
        farForm.labourCessFee = labourCessAmount;
        farForm.gst = gst;

        if (farEditIndex !== null) {
            updatedList[farEditIndex] = farForm;
        } else {
            updatedList.push(farForm);
        }

        setFarList(updatedList);
        resetFAR();
    };

    const editFAR = (index) => {
        setFarForm(farList[index]);
        setFarEditIndex(index);
    };

    const deleteFAR = (index) => {
        setFarList(farList.filter((_, i) => i !== index));
        resetFAR();
    };

    const resetFAR = () => {
        setFarForm({
            additionalFAR: "",
            rates: 0,
            area: "",
            collectorFees: "",
            amount: 0,
            totalWithFeesFAR: 0,
        });
        setFarEditIndex(null);
    };

    const calculateFee = async (area) => {
        const formValues = form.getFieldsValue();
        if (
            (applicationType == "Revised" || applicationType == "Superseded") &&
            Number(formValues.TotalExistingArea) <= 0
        ) {
            setExistingAreaScrutinyAmount(0);
            message.error("Please enter total existing area");
            return;
        }

        const areaVal = formValues?.Area ?? null;
        const unitValue = formValues?.UnitOfArea;

        const unitName =
            typeof unitValue === "string"
                ? unitValue.trim() === "" ? null : unitValue
                : Number.isInteger(unitValue)
                    ? props?.getPropertyAreaUnitListState?.data
                        ?.find(x => x.Id === unitValue)
                        ?.Name ?? null
                    : null;


        const propertyArea = areaVal && unitName
            ? `${areaVal} ${unitName}`
            : null;


        try {
            const requestBody = {
                OrgId: OrgId,
                PropertyRefId: formValues.PropertyNumber,
                ApplType: props.serviceId,
                ExtraArea: 0, //remove hard code
                ApplicationType: applicationType,
                WallConstructLength: 0,
                NoOfFloors: builtUpAreaList.length,
                ConstructionCost: formValues.TotalConstructionCost || 0,
                ConstructArea: area || 0,
                TotalExistingArea: formValues.TotalExistingArea || 0,
                PropertyArea: propertyArea
            };
            const response = await fetch(
                 //"http://localhost:63990/api/PMS_EnterprenurService/GetFeeInfo?orgId=3",
                `${conf.api.base_url}PMS_EnterprenurService/GetFeeInfo?orgId=${OrgId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            const data = await response.json();
            if (data.Status === 2 && data.CustomObject) {
                const formattedObject = Object.fromEntries(
                    Object.entries(data.CustomObject).map(([key, value]) => [
                        key,
                        Number(value).toFixed(2) * 1 // converts back to number
                    ])
                );

                return formattedObject;
            }
            else {
                message.error(data.Message || "Failed to calculate fees");
            }
        } catch (error) {
            console.error("Error calculating fees:", error);
            message.error("Error calculating fees. Please try again.");
        } finally {
            setFeeLoading(false);
        }
    };

    const handleCalculateFee = async (showModal) => {
        if (totalArea <= 0) {
            message.error("Please add areas before calculating fees");
            return;
        }
        try {
            setFeeLoading(true);
            const data = await calculateFee(totalArea);
            if (!data) {
                message.error("Error calculating fees");
                return;
            }
            const formValues = form.getFieldsValue(true);
            let totalScrutineeFee =
                (data.ScrutinyAmount || 0) + (data.ExistingAreaScrutinyAmount || 0);

            let totalSecurityFee =
                Number(data.SecurityAmount || 0) -
                Number(formValues.PaidSecurityAmount || 0);

            const feeResult = {
                ScrutinyFee:
                    Number(data.ScrutinyAmount) + Number(data.ExistingAreaScrutinyAmount),
                SecurityFee: totalSecurityFee || 0,
                LabourCessFee: data.LabourCessAmount || 0,
                GST: (totalScrutineeFee || 0) * 0.18,
                headDetails: data.headDetails || [],
            };

            setFeeData(feeResult);
            if (showModal == true) setFeeModalVisible(true);

            return feeResult;
        } catch (error) {
            console.error("Error calculating fees:", error);
            message.error("Error calculating fees. Please try again.");
        } finally {
            setFeeLoading(false);
        }
    };

    // Draft saving functions
    const saveDraftAndWait = () => {
        return new Promise((resolve, reject) => {
            // Prevent duplicate calls
            if (saveApplicationAsDraftState?.apiState === "loading") {
                reject("Draft save already in progress");
                return;
            }

            draftPromiseRef.current = { resolve, reject };
            handleSaveAsDraft(); // dispatch Redux action
        });
    };

    const handleSaveAsDraft = async () => {
        try {
            // First API call to get application data
            if (saveOwnerPrivatePropertiesState.apiState !== 'success') {
                message.error("Atleast one owner must be added");
                return;
            }
            const getDataResponse = await fetch(
                `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json, text/plain, */*",
                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                    },
                    body: JSON.stringify({
                        ApiKey: "SaveDraftPropertyApplication",
                        OrgId: OrgId,
                        ApiParams: {
                            // ApplicationId:
                            //   verifyUpnAndMobileSubmitOtpState.data.ApplicationId,
                            ApplicationId: applicationId,  //hard code
                            ApplicationType: props.serviceId,
                            EmailId: "",
                            Remark: formData.Remark,
                            TemporaryApplicationId: getDocumentListState.EntityId ?? 0,
                            GPASPA: "N",
                            OwnerId: saveOwnerPrivatePropertiesState.data.PurchaserId,
                            OrgId: OrgId,
                            PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
                            Name: formData.ApplicantName,
                            Mobile: mobileNoState.MobileNo,
                            UnitOfArea: formData.UnitOfArea,
                            Area: formData.Area,
                            PropertyRefId: formData.PropertyNumber,
                            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                            GPASPA: "",
                            AppointmentDate: formData.AppointmentDate,
                        },
                    }),
                }
            );

            const getDataResult = await getDataResponse.json();

            if (getDataResult.Status !== 2) {
                message.error("Failed to get application data");
                return;
            }

            const appId = getDataResult.CustomObject?.ApplicationId;
            setApplicationId(appId);

            if (!appId) {
                message.error("Application ID not found in response");
                return;
            }

            const formValues = form.getFieldsValue(true);

            // Calculate totals for built-up areas if serviceId is "1796"
            let builtUpAreaTotals = { scrutinyFees: 0, labourCess: 0, gst: 0 };
            let totalArea = 0;

            if (props.serviceId === "1796") {
                builtUpAreaTotals = builtUpAreaList.reduce(
                    (acc, item) => ({
                        scrutinyFees: acc.scrutinyFees + (parseFloat(item.scrutinyFee) || 0),
                        labourCess: acc.labourCess + (parseFloat(item.labourCessFee) || 0),
                        gst: acc.gst + (parseFloat(item.gst) || 0),
                    }),
                    { scrutinyFees: 0, labourCess: 0, gst: 0 }
                );
                totalArea = builtUpAreaList.reduce((sum, item) => sum + Number(item.area), 0);
            }

            // Dummy fee calculation - replace with actual calculateFee function
            const data = {
                ScrutinyAmount: totalArea * 10,
                ExistingAreaScrutinyAmount: existingAreaScrutinyAmount,
                SecurityAmount: totalArea * 5,
                LabourCessAmount: totalArea * 2,
            };

            let totalScrutineeFee =
                (data.ScrutinyAmount || 0) + (data.ExistingAreaScrutinyAmount || 0);
            let totalGST = (totalScrutineeFee || 0) * 0.18;
            let totalSecurityFees = Number(data.SecurityAmount || 0) -
                Number(formValues.PaidSecurityAmount || 0);
            let totalAmount = totalScrutineeFee + data.LabourCessAmount + totalGST + totalSecurityFees;

            // Construct the payload for private properties form
            const payload = {
                ApiKey: "SaveApplicationAsDraft",
                OrgId: OrgId,
                ApiParams: {
                    applicationmodel: {
                        UPN: 0,
                        ApplicationRefId: appId,
                        TotalBuiltUpArea: totalArea || 0,
                        TotalBuiltUpAreaWithFees: totalArea || 0,
                        TotalBoundaryWall: 0,
                        TotalBoundaryWallWithFees: 0,
                        TotalFARWithFees: 0,
                        TotalAmount: totalAmount,
                        ScrutinyFees: totalScrutineeFee,
                        LabourCess: data.LabourCessAmount || 0,
                        GST: totalGST,
                        ApplicationType: applicationType,
                        TotalConstructionCost: Number(formValues.TotalConstructionCost || 0),
                        TotalExistingArea: Number(formValues.TotalExistingArea || 0),
                        SubUsageType: formValues.ApplicationType || "Proposed",
                        PaidSecurityAmount: Number(formValues.PaidSecurityAmount || 0),
                        ExistingAreaScrutinyFee: existingAreaScrutinyAmount,
                        SecurityFees: totalSecurityFees
                    },
                    builtUpAreaList: props.serviceId === "1796" ? builtUpAreaList.map((item) => ({
                        Floor: item.floor,
                        Area: parseFloat(item.area) || 0,
                        ScrutinyFees: parseFloat(item.scrutinyFee) || 0,
                        LabourCess: parseFloat(item.labourCessFee) || 0,
                        GST: parseFloat(item.gst) || 0,
                    })) : [],
                    rateForAGCList: [],
                    rateForFARList: [],
                },
            };

            saveApplicationAsDraft(payload);
        } catch (error) {
            console.error("Error in handleSaveAsDraft:", error);
            message.error("Failed to save application as draft");
        }
    };

    const handleModalPayNow = async () => {
        setPayDisabled(true); // optional: disable button immediately
        setDemandNoteModalVisible(false);
        //   setAcknowledgeDisabled(false);
        setSubmitAsDraftDisabled(true);

        const result = await saveDemandNote();

        if (!result) {
            setPayDisabled(false); // rollback
            message.error("Unable to save demand note");
            return;
        }

        console.error("getPaymentIntegrationPayload DemandNoteId" + result?.CustomObject?.DemandNoteId);
        console.error("getPaymentIntegrationPayload PropertyRefId" + verifyUpnAndMobileSubmitOtpState.data.PropertyRefId);
        console.error(
            "getPaymentIntegrationPayload demandNoteData: " +
            JSON.stringify(demandNoteData)
        );
        console.error("getPaymentIntegrationPayload org" + OrgId);

        console.error("getPaymentIntegrationPayload authtoken" + verifyUpnAndMobileSubmitOtpState.AuthToken);

        console.error("getPaymentIntegrationPayload authkey" + verifyUpnAndMobileSubmitOtpState.AuthTokenKey);

        const formValues = form.getFieldsValue();
        console.error(formValues.PropertyNumber);
        submit();
        //   getPaymentIntegrationPayload({
        //     PropertyRefId: formValues.PropertyNumber,
        //     OrgId: OrgId,
        //     TotalDueAmount: demandNoteData?.TotalDueAmount || 0,
        //     headDetails: demandNoteData?.headDetails || [],
        //     DemandNoteId: result.CustomObject.DemandNoteId ?? 0, // ✅ REAL VALUE
        //     EntityType: demandNoteData?.EntityType, // ✅ REAL VALUE
        //     AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
        //     AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
        //     ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
        //     ArchitectTokenKey:
        //       verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? "",
        //   });
    };


    const showPaymentConfirmation = () => {
        Modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to continue? You cannot go back after this.',
            okText: 'Yes',
            cancelText: 'No',
            centered: true,
            onOk: () => {
                handlePayNowClick();
            },
            onCancel: () => {
            },
        });
    };

    const handlePayNowClick = async () => {
        try {
            // ✅ STEP 0: Trigger all form validations

            if (!paymentOnly) {
                await form.validateFields();

                // ✅ STEP 1: Extra check for mandatory document upload
                const missingDocs = getDocumentListState.list.filter((item, idx) => {
                    if (!item.IsMandatory) return false;

                    const hasUploadedFile = !!_.find(defaultFileList, {
                        documentTypeId: item.DocumentTypeId,
                    });

                    return !hasUploadedFile;
                });

                if (missingDocs.length > 0) {
                    message.error("Please upload all mandatory documents before payment.");
                    return;
                }
                // Step 1: Save as draft and calculate fees

                await saveDraftAndWait();
            }
            const calculatedFee = await handleCalculateFee(false);

            if (
                !calculatedFee ||
                (!calculatedFee.ScrutinyFee &&
                    !calculatedFee.SecurityFee &&
                    !calculatedFee.LabourCessFee)
            ) {
                message.error("Please calculate fees before proceeding to payment");
                return;
            }

            // Step 2: Prepare demand note data
            const scrutinyWithGST =
                calculatedFee.ScrutinyFee + calculatedFee.ScrutinyFee * 0.18;


            const totalAmount = Number(
                (
                    scrutinyWithGST +
                    calculatedFee.SecurityFee +
                    calculatedFee.LabourCessFee
                ).toFixed(2)
            );


            setDemandNoteData({
                TotalAmount: totalAmount,
                ScrutinyFee: calculatedFee.ScrutinyFee,
                SecurityFee: calculatedFee.SecurityFee,
                LabourCessFee: calculatedFee.LabourCessFee,
                GST: (calculatedFee.ScrutinyFee || 0) * 0.18,
                headDetails: [
                    {
                        HeadId: 989,
                        HeadName: "Scrutiny Fee",
                        DueAmount: calculatedFee.ScrutinyFee || 0,
                        TobePaidAmount: calculatedFee.ScrutinyFee || 0,
                    },
                    {
                        HeadId: 928,
                        HeadName: "Security Charges",
                        DueAmount: calculatedFee.SecurityFee || 0,
                        TobePaidAmount: calculatedFee.SecurityFee || 0,
                    },
                    {
                        HeadId: 1344,
                        HeadName: "Labour Cess (Approaved Map)",
                        DueAmount: calculatedFee.LabourCessFee || 0,
                        TobePaidAmount: calculatedFee.LabourCessFee || 0,
                    },
                    {
                        HeadId: 1562,
                        HeadName: "GST",
                        DueAmount: (calculatedFee.ScrutinyFee || 0) * 0.18,
                        TobePaidAmount: (calculatedFee.ScrutinyFee || 0) * 0.18,
                    },
                ], //remove hard code
                DemandNoteId: !paymentOnly ? 0 : verifyUpnAndMobileSubmitOtpState?.data?.ApplicationDemandNoteId,
                EntityType: 111,
                PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
                OrgId: OrgId,
                TotalDueAmount: totalAmount,
            });

            // Step 3: Show modal
            setDemandNoteModalVisible(true);
        } catch (error) {
            if (!error?.errorFields?.length > 0) {
                message.error("Failed to prepare demand note. Please try again.");
            }
        }
    };

    // Demand Note Component
    const DemandNote = (props) => {
        const inr = (amount) => {
            return new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amount || 0);
        };

        let columns = [
            {
                title: "Payment Head",
                dataIndex: "PaymentHead",
                width: "70%",
            },
            {
                title: "Amount (₹)",
                dataIndex: "Amount",
                align: "right",
            },
        ];

        let dataSource = [
            {
                PaymentHead: "Scrutiny Fee",
                Amount: inr(demandNoteData?.ScrutinyFee),
            },
            {
                PaymentHead: "Security Fee",
                Amount: inr(demandNoteData?.SecurityFee),
            },
            {
                PaymentHead: "Labour Cess Fee",
                Amount: inr(demandNoteData?.LabourCessFee),
            },
            {
                PaymentHead: "GST",
                Amount: inr((demandNoteData?.ScrutinyFee || 0) * 0.18),
            },
        ];

        return (
            <>
                <Xtable
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 300 }}
                />
                <Footer>
                    <TotalLabel>Total Amount:</TotalLabel>
                    <TotalAmount>₹ {inr(props.amount)}</TotalAmount>
                </Footer>
            </>
        );
    };

    const onPreview = async file => {
        let extension = file.name.substr(file.name.lastIndexOf(".") + 1)
        let src = file.url;
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            if (!src) {
                src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
            }
            setCurrentFileType('image');
            setPreviewImage(src);
            setPreviewVisible(true);
        }
        else {
            setCurrentFileType('pdf');
            setPreviewImage(src);
            setPreviewVisible(true);
        }
    };

    useEffect(() => {
        if (!PropertyDuePaymentsState) return;
        if (PropertyDuePaymentsState.paymentIntegrationApiState === "ideal") {
            submit();
            // window.location = "https://gmadaipms.in/PaymentGateWay/PayNow_New.aspx?UniqueId=6ad15a5d-c5ec-44b0-bc42-5027875abae9&UserId=0&Amount=1&AuthTokenKey=ZwKYJJij3aXA5%2BAXsqHwpeeOgGoB%2FD9AzSpeZaZRWu9czRThasIkbYMROefX1MKgpqT4rBMS7tI3HZK7YD%2FEC%2Fa0GDpAq0TxVLnEZrA9G5psSLdRG%2BszRltIOR77dyI5aJggU24yJ%2Bq0QwPMDgO4g4vceTNifAYg6wb73Q8FJ10Rgzleu6trW7%2BCASJrnFht&AuthToken=xAqtZpEX9QNKhssg6XslvA%3D%3D&ArchitectToken=null&ArchitectTokenKey=null";
            let url = `${PropertyDuePaymentsState.paymentIntegrationPayload.URL
                }?UniqueId=${PropertyDuePaymentsState.paymentIntegrationPayload.UniqueId
                }&UserId=${PropertyDuePaymentsState.paymentIntegrationPayload.UserId
                }&Amount=${demandNoteData.TotalAmount}&AuthTokenKey=${encodeURIComponent(
                    verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                )}&AuthToken=${encodeURIComponent(
                    verifyUpnAndMobileSubmitOtpState.AuthToken
                )}&ArchitectToken=${encodeURIComponent(
                    verifyUpnAndMobileSubmitOtpState.ArchitectToken
                )}&ArchitectTokenKey=${encodeURIComponent(
                    verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey
                )}`;

            console.error(url);
            window.location = url;
            //handleSubmit();
        }

        if (PropertyDuePaymentsState.paymentIntegrationApiState === "error") {
            setPayDisabled(false);
            message.error("Failed to initiate payment");
        }
    }, [PropertyDuePaymentsState.paymentIntegrationApiState]);

    useEffect(() => {
        if (
            ["Success", "Failed", "In-Progress", "Cancelled"].includes(
                PropertyDuePaymentsState.paymentStatus
            )
        ) {
            if (props.serviceId === "1796") {
                console.log("PRODUCTION CHECK: paymentStatus before success");
                console.error("PRODUCTION CHECK: error paymentStatus before success");

                if (PropertyDuePaymentsState.paymentStatus === "Success") {
                    console.log("PRODUCTION CHECK: paymentStatus after success");
                    console.error("PRODUCTION CHECK: error paymentStatus after success");

                    postAutoDCR({
                        OrgId: OrgId,
                        ApplicationId: applicationId,
                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                        ArchitectToken:
                            verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                        ArchitectTokenKey:
                            verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? "",
                    });
                    // Call handleSubmit after postAutoDCR when payment is successful
                    console.log("PRODUCTION CHECK: paymentStatus after dcr");
                    console.error("PRODUCTION CHECK: error paymentStatus after dcr");

                    submit();

                    console.log("PRODUCTION CHECK: after dcr handle submit");
                    console.error("PRODUCTION CHECK: error after dcr handle submit");

                    setRedirect([
                        true,
                        "/ndc-details/" + applicationId,
                    ]);
                }
            }

            setDisplayPaymentStatusModal(true);
        }
    }, [PropertyDuePaymentsState.paymentStatus]);

    useEffect(() => {
        if (formData.SchemeId) {
            form.setFieldsValue({ "PropertyNumber": "", "Area": "", "UnitOfArea": "" })
            toGetPrivatePropertiesList(formData.SchemeId);
        }
    }, [formData.SchemeId]);

    useEffect(() => {
        if (formData.PropertyNumber) {
            let array = [];
            toGetPrivatePropertiesListState.data.map((item) => {
                if (item.Id === formData.PropertyNumber) {
                    array = item
                }
            }, [])
            if (array.PropertyAreaUnit === 0 && array.Area === 0) {
                setBasedOnProperty(false)
            }
            else {
                setBasedOnProperty(true);
                setFormData({ ...formData, ['Area']: "", ['UnitOfArea']: "" });
            }
            form.setFieldsValue({
                ...form,
                Area: array.Area == 0 ? "" : array.Area,
                UnitOfArea: array.PropertyAreaLabel == "-" ? "" : array.PropertyAreaLabel
            })
        }

    }, [formData.PropertyNumber]);

    const renderExtensions = (extension) => {
        let extensionData = []
        extension.map((data) => {
            let a = "." + _.split(data, "/")[1]
            extensionData.push(a)
        })
        return extensionData.join(", ")
    };

    const handleCancel = () => {
        setPreviewVisible(false);
    };

    useEffect(() => {
        if (getDocumentListState.apiState === "success") {
            let data = _.find(getDocumentListState.list, { 'IsPVerificationRequired': true }) ? true : false
            if (data) {
                setIsPVerificationRequired(true);
                getAppointmentDate({
                    OrgId: OrgId,
                    ApplicationTypeId: props.serviceId,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                })
            }
            else {
                setIsPVerificationRequired(false)
            }
        }
    }, [getDocumentListState])

    const saveDemandNote = async () => {
        try {
            const payload = {
                ApplicationId: applicationId,
                OrgId: OrgId,
                EntityRefId: -1,
                ScrutinyFee: demandNoteData.ScrutinyFee,
                SecurityFee: demandNoteData.SecurityFee,
                LabourCessFee: demandNoteData.LabourCessFee,
                GST: demandNoteData.GST,
                TotalAmount: demandNoteData.TotalAmount
            };

            const response = await fetch(
                // "http://localhost:57657/api/PMS_EnterprenurService/GetFeeInfo?orgId=3",
                `${conf.api.base_url}PMS_EnterprenurService/AddUpdatePropertyDemandNote`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                    },
                    body: JSON.stringify(payload)
                });


            if (!response.ok) {
                console.error("HTTP Error:", response.status);
                message.error("Failed to save demand note");
                return null;
            }

            const data = await response.json();


            if (data?.Status !== 2) {
                message.error(data?.Message || "Failed to save demand note");
                return null;
            }

            return data; // ✅ RETURN SUCCESS DATA
        } catch (error) {
            console.error("Save Demand Note Error:", error);
            message.error("Error saving demand note");
            return null;
        }
    };

    const isValidForFeesCalculation = (Totalarea) => {
        const formValues = form.getFieldsValue();
        const area = Number(formValues.Area);
        const unit = formValues.UnitOfArea;
        const applicationType = formValues.ApplicationType;

        const unitOfArea =
            typeof unit === "string"
                ? unit.trim() === "" ? null : unit
                : Number.isInteger(unit)
                    ? props?.getPropertyAreaUnitListState?.data
                        ?.find(x => x.Id === unit)
                        ?.Name ?? null
                    : null;

        // Check if ApplicationType is empty or not selected
        if (!applicationType) {
            return {
                isValid: false,
                message: "Application Type is required. Please select one."
            };
        }
        // Check for "Purposed" application type and ensure Totalarea > 0
        if (applicationType === "Purposed" && Totalarea <= 0) {
            return {
                isValid: false,
                message: "Total area must be greater than 0 for Purposed application type. Please update property details."
            };
        }
        // if (!area || area <= 0) {
        //     return {
        //         isValid: false,
        //         message: "Property area must be greater than 0. Please update property details."
        //     };
        // }

        // if (!unitOfArea || unitOfArea.trim() === "") {
        //     return {
        //         isValid: false,
        //         message: "Unit of Area is required"
        //     };
        // }

        return { isValid: true };
    }

    return (
        <>
            {saveNdcApplicationState.apiState === "success" && appId ?
                <Redirect to={`/ndc-details/${appId}`} />
                :
                <Container>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={submit}
                    >
                        <Heading>Applicant Details</Heading>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="Applicant Name"
                                    name="ApplicantName"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Input name="ApplicantName" maxLength={50} size="large" onChange={handleOnChange} />
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Remark"
                                    name="Remark"
                                >
                                    <Input size="large" name="Remark" onChange={handleOnChange} showCount maxLength={200} />
                                </FormItem>
                            </Col>
                        </Row>

                        <Heading>Property Details</Heading>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="Select Scheme"
                                    name="SchemeId"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Select
                                        showSearch
                                        name="SchemeId"
                                        disabled={props.IsRenewal === "Y"}
                                        onSelect={(v) => handleOnChangeSelect("SchemeId", v)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        size="large"
                                    >
                                        {toGetPrivateSchemeState.data.length > 0 &&
                                            toGetPrivateSchemeState.data.map((item) => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Select Property Number"
                                    name="PropertyNumber"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Select
                                        showSearch
                                        name="PropertyNumber"
                                        disabled={props.IsRenewal === "Y"}
                                        onSelect={(v) => handleOnChangeSelect("PropertyNumber", v)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        size="large"
                                    >
                                        {toGetPrivatePropertiesListState.data.length > 0 &&
                                            toGetPrivatePropertiesListState.data.map((item) => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Area"
                                    name="Area"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Input readOnly={basedOnProperty} disabled={true} size="large" name="Area" onChange={handleOnChange} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="Unit Of Area"
                                    name="UnitOfArea"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Select
                                        // aria-readonly={basedOnProperty}
                                        // readOnly={basedOnProperty}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        name="UnitOfArea"
                                        disabled={true}
                                        onSelect={(v) => handleOnChangeSelect("UnitOfArea", v)}
                                        size="large"
                                    >
                                        {getPropertyAreaUnitListState.data.length > 0 &&
                                            getPropertyAreaUnitListState.data.map((item) =>
                                                <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Heading>Owner Details</Heading>
                        <OwnerForm
                            serviceId={props.serviceId}
                            // triggerDraftSave={onSaveDraft}
                            AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
                            AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
                            EntityId={getDocumentListState.EntityId}
                        />
                        <BlankSpace />

                        {/* Built-up Area Section - Service ID 1560 */}
                        {props.serviceId === "1796" && (
                            <>
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col span="8">
                                        <Form.Item label="Application Type" name="ApplicationType">
                                            <Select
                                                placeholder="Select application type"
                                                style={{ width: "100%" }}
                                                onChange={(value) => handleApplicationType(value)}
                                                disabled={builtUpAreaList.length > 0}
                                            >
                                                {applicationTypeOptions.map((option) => (
                                                    <Select.Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Heading>Details of Boundary Wall</Heading>
                                <Row gutter={24} align="middle">
                                    <Col span="6">
                                        <FormItem
                                            label="Total Construction Cost"
                                            name="TotalConstructionCost"
                                            rules={[
                                                {
                                                    pattern: /^[0-9]*\.?[0-9]*$/,
                                                    message: "Only numbers and decimal are allowed",
                                                },
                                            ]}
                                        >
                                            <Input size="large" />
                                        </FormItem>
                                    </Col>
                                </Row>
                                {(form.getFieldValue("ApplicationType") == "Revised" ||
                                    form.getFieldValue("ApplicationType") == "Superseded") && (
                                        <>
                                            <Row gutter="24">
                                                <Col span={8}>
                                                    <FormItem
                                                        label="Paid Security Amount"
                                                        name="PaidSecurityAmount"
                                                        rules={[
                                                {
                                                    pattern: /^[0-9]*\.?[0-9]*$/,
                                                    message: "Only numbers and decimal are allowed",
                                                },
                                            ]}
                                                    >
                                                        <Input size="large" />
                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
                                                    <FormItem
                                                        label="Total Existing area (In sqmts)"
                                                        name="TotalExistingArea"
                                                        rules={[
                                                {
                                                    pattern: /^[0-9]*\.?[0-9]*$/,
                                                    message: "Only numbers and decimal are allowed",
                                                },
                                            ]}
                                                    >
                                                        <Input
                                                            size="large"
                                                            onChange={calculateExistingAreaFees}
                                                        />
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>
                                                    <FormItem
                                                        label={`Existing Area Scrutiny Amount: ${existingAreaScrutinyAmount}`}
                                                        name="TotalArea"
                                                        rules={[
                                                {
                                                    pattern: /^[0-9]*\.?[0-9]*$/,
                                                    message: "Only numbers and decimal are allowed",
                                                },
                                            ]}
                                                    ></FormItem>
                                                </Col>
                                            </Row>
                                        </>
                                    )}

                                <Heading>Details of Built Up Area</Heading>
                                <>
                                    {props.serviceId === "1796" && (
                                        <>
                                            {builtUpAreaList.length == 0 && (
                                                <Row gutter="24">
                                                    <Col span="24">
                                                        <FormItem>
                                                            <Checkbox
                                                                checked={hasBasement}
                                                                onChange={() => setHasBasement(!hasBasement)}
                                                            >
                                                                Has Basement
                                                            </Checkbox>
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            )}
                                            <Row gutter={24} align="middle">
                                                <Col span={6}>
                                                    <Form.Item label="Area (In sqmts)">
                                                        <Input
                                                            size="large"
                                                            type="number"
                                                            value={area}
                                                            onChange={(e) => setArea(Number(e.target.value))}
                                                            placeholder="Floor wise area"
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={6}>
                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleBuiltUpArea({ area })}
                                                        style={{ marginTop: "30px" }}
                                                        disabled={paymentOnly}
                                                    >
                                                        {editingIndex !== null ? "Update" : "Add"}
                                                    </Button>
                                                </Col>
                                            </Row>

                                            {builtUpAreaList.length > 0 && (
                                                <table
                                                    style={{
                                                        borderCollapse: "collapse",
                                                        width: "100%",
                                                        textAlign: "left",
                                                        border: "1px solid #ccc",
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th style={thStyle}>Floor</th>
                                                            <th style={thStyle}>Area (In sqmts)</th>
                                                            <th style={thStyle}>Scrutiny fee</th>
                                                            <th style={thStyle}>GST</th>
                                                            <th style={thStyle}>Labour Cess</th>
                                                            <th style={thStyle}>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {builtUpAreaList.map((item, index) => (
                                                            <tr key={index}>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #ccc",
                                                                        padding: "8px",
                                                                    }}
                                                                >
                                                                    {
                                                                        floorOptions.find(
                                                                            (x) => x.value == item.floor
                                                                        ).label
                                                                    }
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #ccc",
                                                                        padding: "8px",
                                                                    }}
                                                                >
                                                                    {item.area.toFixed(2)}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #ccc",
                                                                        padding: "8px",
                                                                    }}
                                                                >
                                                                    {item.scrutinyFee.toFixed(2)}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #ccc",
                                                                        padding: "8px",
                                                                    }}
                                                                >
                                                                    {item.gst.toFixed(2)}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #ccc",
                                                                        padding: "8px",
                                                                    }}
                                                                >
                                                                    {item.labourCessFee.toFixed(2)}
                                                                </td>
                                                                <td style={{ ...tdStyle, textAlign: "center" }}>
                                                                    <Button
                                                                        size="small"
                                                                        type="link"
                                                                        onClick={() => handleEdit(index)}
                                                                        style={{ padding: "0 6px" }}
                                                                        disabled={paymentOnly}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    {index == builtUpAreaList.length - 1 && !paymentOnly && (
                                                                        <Button
                                                                            size="small"
                                                                            type="link"
                                                                            danger
                                                                            onClick={() => handleDelete(index)}
                                                                            style={{ padding: "0 6px" }}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}

                                            <Row>
                                                <Col span={6}>
                                                    <FormItem
                                                        label={`Total Area: ${totalArea.toFixed(2)}`}
                                                        name="TotalArea"
                                                    ></FormItem>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </>

                                {false && (
                                    <Row gutter="24">
                                        <Col span="24">
                                            <FormItem>
                                                <Checkbox
                                                    checked={showFAR}
                                                    onChange={() => setShowFAR(!showFAR)}
                                                >
                                                    Additional Ground Coverage / Additional FAR
                                                </Checkbox>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                )}
                                {showFAR && (
                                    <>
                                        <Heading>Details of F.A.R</Heading>
                                        <Heading>Additional Ground Coverage (AGC)</Heading>

                                        <Row>
                                            <Col span={5}>
                                                <FormItem label="AGC Usage Sub type">
                                                    <Select
                                                        value={agcUsageSubType}
                                                        onChange={(value) => {
                                                            setAgcUsageSubType(value);
                                                            setAgcCoverageType(null);
                                                            setAgcForm((prev) => ({ ...prev, rates: 0 }));
                                                        }}
                                                    >
                                                        {agcUsageSubTypes.map((o) => (
                                                            <Select.Option key={o} value={o}>
                                                                {o}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={5}>
                                                <FormItem label="AGC Coverage">
                                                    <Select
                                                        value={agcCoverageType}
                                                        onChange={(value) => {
                                                            setAgcCoverageType(value);
                                                            const selectedItem = farDropdownData.find(
                                                                (item) =>
                                                                    item.FARCategory === "GC" &&
                                                                    item.FARType === agcUsageSubType &&
                                                                    item.FARDescription === value
                                                            );
                                                            setAgcForm({
                                                                ...agcForm,
                                                                additionalGroundCoverage: value,
                                                                rates: selectedItem
                                                                    ? selectedItem.FARPercentage
                                                                    : 0,
                                                            });
                                                        }}
                                                        disabled={!agcUsageSubType}
                                                    >
                                                        {agcCoverageOptions.map((o) => (
                                                            <Select.Option key={o} value={o}>
                                                                {o}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </FormItem>
                                            </Col>

                                            <Col span={3}>
                                                <FormItem label="Rates">
                                                    <Input value={agcForm.rates} readOnly />
                                                </FormItem>
                                            </Col>

                                            <Col span={3}>
                                                <FormItem label="Area">
                                                    <Input
                                                        value={agcForm.area}
                                                        onChange={(e) => {
                                                            const area = e.target.value;
                                                            const amount = calculateAmount(area, agcForm.rates);
                                                            setAgcForm({
                                                                ...agcForm,
                                                                area,
                                                                amount,
                                                                totalWithFeesAGC: 0,
                                                            });
                                                        }}
                                                    />
                                                </FormItem>
                                            </Col>

                                            <Col span={3}>
                                                <FormItem label="Collect Fee">
                                                    <Input
                                                        value={agcForm.collectorFees}
                                                        onChange={(e) =>
                                                            setAgcForm({
                                                                ...agcForm,
                                                                collectorFees: e.target.value,
                                                                totalWithFeesAGC: 0,
                                                            })
                                                        }
                                                    />
                                                </FormItem>
                                            </Col>

                                            <Col span={4}>
                                                <Button
                                                    type="primary"
                                                    onClick={saveAGC}
                                                    style={{ marginTop: 30 }}
                                                >
                                                    {agcEditIndex !== null ? "Update" : "Add"}
                                                </Button>
                                            </Col>
                                        </Row>

                                        {agcList.length > 0 && (
                                            <table
                                                style={{
                                                    width: "100%",
                                                    borderCollapse: "collapse",
                                                    marginTop: "16px",
                                                    border: "1px solid #d9d9d9",
                                                }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th style={thStyle}>Coverage</th>
                                                        <th style={thStyle}>Area</th>
                                                        <th style={thStyle}>Amount</th>
                                                        <th style={thStyle}>Total</th>
                                                        <th style={thStyle}>Scrutiny fee</th>
                                                        <th style={thStyle}>GST</th>
                                                        <th style={thStyle}>Labour Cess</th>
                                                        <th style={thStyle}>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {agcList.map((i, idx) => (
                                                        <tr key={idx}>
                                                            <td style={tdStyle}>
                                                                {i.additionalGroundCoverage}
                                                            </td>
                                                            <td style={tdStyle}>{Number(i.area).toFixed(2)}</td>
                                                            <td style={tdStyle}>{i.amount.toFixed(2)}</td>
                                                            <td style={tdStyle}>
                                                                {i.totalWithFeesAGC.toFixed(2)}
                                                            </td>
                                                            <td style={tdStyle}>{i.scrutinyFee.toFixed(2)}</td>
                                                            <td style={tdStyle}>{i.gst.toFixed(2)}</td>
                                                            <td style={tdStyle}>
                                                                {i.labourCessFee.toFixed(2)}
                                                            </td>
                                                            <td style={{ ...tdStyle, textAlign: "center" }}>
                                                                <Button
                                                                    size="small"
                                                                    type="link"
                                                                    onClick={() => editAGC(idx)}
                                                                    style={{ padding: "0 6px" }}
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    size="small"
                                                                    type="link"
                                                                    danger
                                                                    onClick={() => deleteAGC(idx)}
                                                                    style={{ padding: "0 6px" }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                        <Heading>Additional FAR</Heading>

                                        <Row>
                                            <Col span={5}>
                                                <FormItem label="FAR Usage Sub type">
                                                    <Select
                                                        value={farUsageSubType}
                                                        onChange={(value) => {
                                                            setFarUsageSubType(value);
                                                            setFarCoverageType(null);
                                                            setFarForm((prev) => ({ ...prev, rates: 0 }));
                                                        }}
                                                    >
                                                        {farUsageSubTypes.map((o) => (
                                                            <Select.Option key={o} value={o}>
                                                                {o}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={5}>
                                                <FormItem label="FAR Coverage">
                                                    <Select
                                                        value={farCoverageType}
                                                        onChange={(value) => {
                                                            setFarCoverageType(value);
                                                            const selectedItem = farDropdownData.find(
                                                                (item) =>
                                                                    item.FARCategory === "FAR" &&
                                                                    item.FARType === farUsageSubType &&
                                                                    item.FARDescription === value
                                                            );
                                                            setFarForm({
                                                                ...farForm,
                                                                additionalFAR: value,
                                                                rates: selectedItem
                                                                    ? selectedItem.FARPercentage
                                                                    : 0,
                                                            });
                                                        }}
                                                        disabled={!farUsageSubType}
                                                    >
                                                        {farCoverageOptions.map((opt) => (
                                                            <Select.Option key={opt} value={opt}>
                                                                {opt}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </FormItem>
                                            </Col>

                                            <Col span={3}>
                                                <FormItem label="Rates">
                                                    <Input value={farForm.rates} readOnly />
                                                </FormItem>
                                            </Col>

                                            <Col span={3}>
                                                <FormItem label="Area">
                                                    <Input
                                                        value={farForm.area}
                                                        onChange={(e) => {
                                                            const area = e.target.value;
                                                            const amount = calculateAmount(area, farForm.rates);
                                                            setFarForm({
                                                                ...farForm,
                                                                area,
                                                                amount,
                                                                totalWithFeesFAR:
                                                                    amount + Number(farForm.collectorFees || 0),
                                                            });
                                                        }}
                                                    />
                                                </FormItem>
                                            </Col>

                                            <Col span={3}>
                                                <FormItem label="Collect Fee">
                                                    <Input
                                                        value={farForm.collectorFees}
                                                        onChange={(e) =>
                                                            setFarForm({
                                                                ...farForm,
                                                                collectorFees: e.target.value,
                                                                totalWithFeesFAR:
                                                                    farForm.amount + Number(e.target.value || 0),
                                                            })
                                                        }
                                                    />
                                                </FormItem>
                                            </Col>

                                            <Col span={4}>
                                                <Button
                                                    type="primary"
                                                    onClick={saveFAR}
                                                    style={{ marginTop: 30 }}
                                                >
                                                    {farEditIndex !== null ? "Update" : "Add"}
                                                </Button>
                                            </Col>
                                        </Row>

                                        {farList.length > 0 && (
                                            <table
                                                style={{
                                                    width: "100%",
                                                    borderCollapse: "collapse",
                                                    marginTop: "16px",
                                                    border: "1px solid #d9d9d9",
                                                }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th style={thStyle}>Additional FAR</th>
                                                        <th style={thStyle}>Area</th>
                                                        <th style={thStyle}>Amount</th>
                                                        <th style={thStyle}>Total</th>
                                                        <th style={thStyle}>Scrutiny fee</th>
                                                        <th style={thStyle}>GST</th>
                                                        <th style={thStyle}>Labour Cess</th>
                                                        <th style={thStyle}>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {farList.map((i, index) => (
                                                        <tr key={index}>
                                                            <td style={tdStyle}>{i.additionalFAR}</td>
                                                            <td style={tdStyle}>{Number(i.area).toFixed(2)}</td>
                                                            <td style={tdStyle}>{i.amount.toFixed(2)}</td>
                                                            <td style={tdStyle}>
                                                                {i.totalWithFeesFAR.toFixed(2)}
                                                            </td>
                                                            <td style={tdStyle}>{i.scrutinyFee.toFixed(2)}</td>
                                                            <td style={tdStyle}>{i.gst.toFixed(2)}</td>
                                                            <td style={tdStyle}>
                                                                {i.labourCessFee.toFixed(2)}
                                                            </td>
                                                            <td style={{ ...tdStyle, textAlign: "center" }}>
                                                                <Button
                                                                    size="small"
                                                                    type="link"
                                                                    onClick={() => editFAR(index)}
                                                                    style={{ padding: "0 6px" }}
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    size="small"
                                                                    type="link"
                                                                    danger
                                                                    onClick={() => deleteFAR(index)}
                                                                    style={{ padding: "0 6px" }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </>
                                )}
                                <Row>
                                    <Col span="8">
                                        <BlueButton
                                            onClick={() => {
                                                handleCalculateFee(true);
                                            }}
                                            loading={feeLoading}
                                            disabled={totalArea <= 0 || paymentOnly}
                                        >
                                            Calculate
                                        </BlueButton>
                                    </Col>
                                </Row>
                            </>
                        )}

                        {getDocumentListState.apiState === "success" && !paymentOnly &&
                            <>
                                <Heading style={{ marginTop: 36 }}>Documents Required</Heading>
                                {getDocumentListState.list.map((item, idx) => (
                                    <>
                                        <Row gutter="24" >
                                            <Col span="24" >
                                                <FileTitle >
                                                    <span>{idx + 1}.</span>
                                                    <div>
                                                        <ValidationDiv className={item.IsMandatory ? 'validate' : ''}>
                                                            {item.Name}
                                                        </ValidationDiv>
                                                        <div>
                                                            <span style={{ color: "red" }}>
                                                                (File must be in "{renderExtensions(item.Extensions)} format and less than {item.MaxSizeInKb}KB in size.")
                                                            </span>
                                                        </div>
                                                        {(item.IsPVerificationRequired || item.SampleFileURL) &&
                                                            <Space>
                                                                {item.SampleFileURL ? <Link to={{ pathname: item.SampleFileURL }} target="_blank" style={{ textDecoration: 'underline', color: '#006fc3' }}>Download Sample Document.</Link> : null}
                                                                {item.IsPVerificationRequired && props.serviceId !== "1796" && props.serviceId !== "1796" &&
                                                                    <Alert
                                                                        message="Physical verification required."
                                                                        type="warning"
                                                                        style={{ padding: "0px 8px" }}
                                                                    />
                                                                }

                                                            </Space>
                                                        }
                                                    </div>
                                                </FileTitle>
                                            </Col>
                                            <Col span="24" >
                                                <Form.Item
                                                    name={item.Name}
                                                    getValueFromEvent={normFile}
                                                    rules={[
                                                        { required: _.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? false : item.IsMandatory, message: 'Required' },
                                                    ]}
                                                    style={{ paddingLeft: 22 }}
                                                >

                                                    <DocumentUpload
                                                        name={item.Name}
                                                        listType="picture-card"
                                                        onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }))}
                                                        action={encodeURI(`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=${props.serviceId}&DocumentTypeId=${item.DocumentTypeId}&Documentname=${item.Name}&EntityTypeID=111&ApplicationId=${getDocumentListState.EntityId}&PhysicalVerificationRequired=${item.IsPVerificationRequired ? 1 : 0}`)}
                                                        headers={{
                                                            'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                            'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                                        }}
                                                        beforeUpload={file => {
                                                            setUploadLoading({
                                                                ...uploadLoading,
                                                                [idx]: true
                                                            })
                                                            setFiles({
                                                                ...files,
                                                                [idx]: file
                                                            })
                                                            setFileList(state => ({
                                                                ...fileList,
                                                                [idx]: []
                                                            }))
                                                            setSubmitDocumentStatus(true)
                                                            return true
                                                        }}
                                                        onError={(info) => {
                                                            setSubmitDocumentStatus(false)
                                                        }}
                                                        onRemove={file => {
                                                            const defaultFileLists = defaultFileList;
                                                            let DocumentTypeId = item.DocumentTypeId
                                                            fetch(`${conf.api.base_url}DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? _.find(defaultFileList, { 'documentTypeId': DocumentTypeId }).uid : documentFileId[idx]}`, {
                                                                method: 'post',
                                                                headers: {
                                                                    'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                                    'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                                                }
                                                            }).then(res => {
                                                                if (res.status === 200) {
                                                                    let fileArr = []
                                                                    defaultFileLists.forEach((defaultItem) => {
                                                                        if (defaultItem.documentTypeId !== DocumentTypeId) {
                                                                            fileArr.push(defaultItem)
                                                                        }
                                                                    })
                                                                    setDefaultFileList(fileArr)
                                                                    setFileList(state => ({
                                                                        ...fileList,
                                                                        [idx]: []
                                                                    }))
                                                                    return true
                                                                } else {
                                                                    return null
                                                                }
                                                            }).catch(console.log)
                                                        }}
                                                        onSuccess={(response) => {
                                                            if (response.Status === 2) {

                                                                setDocumentFileId(state => ({
                                                                    ...documentFileId,
                                                                    [idx]: response.CustomObject.FileId
                                                                }))

                                                                let fileArr = []
                                                                const defaultFileLists = defaultFileList;
                                                                defaultFileLists.forEach((defaultItem) => {
                                                                    fileArr.push(defaultItem)
                                                                })
                                                                let extension = files[idx].name.substr(files[idx].name.lastIndexOf(".") + 1)
                                                                let filePrependString = ""
                                                                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                                    filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                                }
                                                                else {
                                                                    filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                                }
                                                                fileArr.push({
                                                                    documentTypeId: item.DocumentTypeId,
                                                                    uid: response.CustomObject.FileId,
                                                                    name: files[idx].name,
                                                                    status: 'done',
                                                                    url: filePrependString,
                                                                    thumbUrl: filePrependString,
                                                                    preview: filePrependString,
                                                                })
                                                                setDefaultFileList(fileArr)
                                                                setFileList(state => ({
                                                                    ...fileList,
                                                                    [idx]: [{
                                                                        documentTypeId: item.DocumentTypeId,
                                                                        uid: response.CustomObject.FileId,
                                                                        name: files[idx].name,
                                                                        status: 'done',
                                                                        url: filePrependString,
                                                                        thumbUrl: filePrependString,
                                                                        preview: filePrependString,
                                                                    }]
                                                                }))


                                                            }
                                                            if (response.Status === 1) {
                                                                notification["error"]({
                                                                    message: response.Message,
                                                                    placement: "bottomRight"
                                                                })
                                                            }
                                                            setUploadLoading({
                                                                ...uploadLoading,
                                                                [idx]: false
                                                            })
                                                            setSubmitDocumentStatus(false)
                                                        }}
                                                        defaultFileList={_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? [_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId })] : []}
                                                        fileList={fileList[idx]}
                                                        allowedFileTypes={item.Extensions}
                                                    >
                                                        {_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? null : <Button icon={<UploadOutlined />}
                                                            loading={uploadLoading[idx]}
                                                        >Click to Upload</Button>
                                                        }
                                                    </DocumentUpload>

                                                </Form.Item>

                                            </Col>
                                        </Row>
                                    </>
                                ))}
                            </>
                        }
                        <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            {currentFileType === 'pdf' ? (
                                <iframe
                                    title="PDF"
                                    className="scrolling"
                                    scrolling="no"
                                    frameBorder="0"
                                    id="press"
                                    src={previewImage}
                                    width="100%"
                                    height={630}
                                />
                            ) : (
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            )}
                        </Modal>

                        {(getAppointmentDateState.apiState === "success" && isPVerificationRequired) &&
                            <>
                                <Heading style={{ marginTop: 36 }}>Appointment Detail For Physical Verification of Documents</Heading>
                                <Row>
                                    <Col span="10" >
                                        <FormItem
                                            name="AppointmentDate"
                                            label="Select Appointment Date"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Select
                                                name="AppointmentDate"
                                                size="large"
                                                onSelect={(v) => handleOnChangeSelect("AppointmentDate", v)}
                                            >
                                                {getAppointmentDateState.data.map((item) => {
                                                    return (
                                                        <Option key={item.AppointmentDate} value={item.AppointmentDate} >{item.AppointmentDate}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </>
                        }
                        {props.serviceId === "1796" ? (
                            <Space size="middle">
                                {/* <BlueButton
                  disabled={submitAsDraftDisabled}
                  loading={saveApplicationAsDraftState?.apiState === "loading"}
                  onClick={handleSaveAsDraft}
                >
                  Save Application As Draft
                </BlueButton> */}

                                <BlueButton
                                    disabled={payDisabled}
                                    loading={
                                        saveChangeOfOwnershipApplicationState?.apiState === "loading"
                                    }
                                    onClick={showPaymentConfirmation}
                                >
                                    SUBMIT & PAY NOW
                                </BlueButton>

                                {/* <BlueButton
                disabled={acknowledgeDisabled}
                icon={<PrinterFilled />}
                onClick={acknowledgementClick}
              >
                ACKNOWLEDGEMENT
              </BlueButton> */}
                                {/* <Space size="middle" >
                            <BlueButton disabled={false} loading={false} htmlType="submit" >Submit Application For Processing</BlueButton>
                        </Space> */}
                            </Space>
                        ) : (
                            <Space size="middle" >
                                <BlueButton disabled={false} loading={false} htmlType="submit" >Submit Application For Processing</BlueButton>
                            </Space>
                        )
                        }
                    </Form>
                </Container>
            }

            {/* Fee Calculation Modal */}
            <Modal
                title="Fee Calculation Results"
                visible={feeModalVisible}
                onCancel={() => setFeeModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setFeeModalVisible(false)}>
                        Close
                    </Button>,
                ]}
                width={500}
                centered
            >
                <div style={{ padding: "10px 0" }}>
                    <Row gutter={[16, 8]}>
                        <Col span={24}>
                            <div
                                style={{
                                    borderBottom: "1px solid #f0f0f0",
                                    paddingBottom: "8px",
                                    marginBottom: "12px",
                                }}
                            >
                                <strong style={{ fontSize: "16px" }}>Scrutiny Fees</strong>
                            </div>
                        </Col>

                        <Col span={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                }}
                            >
                                <span>Scrutiny Fee:</span>
                                <span style={{ fontWeight: "500" }}>
                                    ₹
                                    {feeData?.ScrutinyFee?.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </Col>

                        <Col span={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                }}
                            >
                                <span>GST (18%):</span>
                                <span style={{ fontWeight: "500" }}>
                                    ₹
                                    {(feeData?.ScrutinyFee * 0.18)?.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </Col>

                        <Col span={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px 0",
                                    borderTop: "1px solid #f0f0f0",
                                    borderBottom: "1px solid #f0f0f0",
                                    margin: "8px 0",
                                    fontWeight: "600",
                                }}
                            >
                                <span>Subtotal (Scrutiny + GST):</span>
                                <span>
                                    ₹
                                    {(
                                        (feeData?.ScrutinyFee || 0) +
                                        (feeData?.ScrutinyFee || 0) * 0.18
                                    ).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </Col>

                        <Col span={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                }}
                            >
                                <span>Security Deposit:</span>
                                <span style={{ fontWeight: "500" }}>
                                    ₹
                                    {feeData?.SecurityFee?.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </Col>

                        <Col span={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                }}
                            >
                                <span>Labour Cess:</span>
                                <span style={{ fontWeight: "500" }}>
                                    ₹
                                    {feeData?.LabourCessFee?.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </Col>

                        <Col span={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "16px 12px",
                                    backgroundColor: "#f6f6f6",
                                    borderRadius: "4px",
                                    marginTop: "12px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                <span>Total Amount:</span>
                                <span style={{ color: "#1890ff" }}>
                                    ₹
                                    {(
                                        (feeData?.ScrutinyFee || 0) +
                                        (feeData?.ScrutinyFee || 0) * 0.18 +
                                        (feeData?.SecurityFee || 0) +
                                        (feeData?.LabourCessFee || 0)
                                    ).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>

            {/* Demand Note Modal */}
            <Modal
                title="Demand Note"
                visible={demandNoteModalVisible}
                onCancel={() => setDemandNoteModalVisible(false)}
                footer={
                    <Footer>
                        <FlexDiv>
                            <BlueButton
                                icon={<SendIcon size={12} />}
                                loading={payDisabled} // show spinner while API runs
                                onClick={handleModalPayNow} // call the async handler
                            >
                                PAY NOW
                            </BlueButton>
                        </FlexDiv>
                    </Footer>
                }
                centered
            >
                {demandNoteData && (
                    <DemandNote
                        amount={demandNoteData.TotalAmount}
                        rows={demandNoteData.headDetails}
                    />
                )}
            </Modal>

            {/* Payment Status Modal */}
            {/* <Modal
                   title={null}
                   visible={displayPaymentStatusModal}
                   footer={null}
                   centered
                   closable={false}
                   className="round-shape"
                 >
                   {PropertyDuePaymentsState.paymentStatus === "Success" && (
                     <PaymentContainer>
                       <Lottie
                         options={paymentSuccessAnimationOptions}
                         height={300}
                         width={300}
                         speed={1.5}
                       />
                     </PaymentContainer>
                   )}
         
                   {PropertyDuePaymentsState.paymentStatus === "Failed" && (
                     <PaymentContainer>
                       <Lottie
                         options={paymentFailAnimationOptions}
                         height={300}
                         width={300}
                         speed={1.5}
                       />
                     </PaymentContainer>
                   )}
         
                   {PropertyDuePaymentsState.paymentStatus === "Cancelled" && (
                     <PaymentContainer>
                       <Lottie
                         options={paymentFailAnimationOptions}
                         height={300}
                         width={300}
                         speed={2}
                       />
                     </PaymentContainer>
                   )}
         
                   <FlexDiv>
                     <Link to={`/ndc-details/${props.applicationId}?org=${OrgId}}`}>
                       <BlueButton
                         onClick={() => {
                           setDisplayPaymentStatusModal(false);
                           PropertyDuePaymentsState.paymentStatus = "";
                         }}
                         style={{ padding: "0 2rem" }}
                       >
                         OK
                       </BlueButton>
                     </Link>
                   </FlexDiv>
                 </Modal> */}

        </>
    )
}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getDocumentListState: state.getDocumentList,
    toGetPrivateSchemeState: state.toGetPrivateScheme,
    toGetPrivatePropertiesListState: state.toGetPrivatePropertiesList,
    saveNdcApplicationState: state.saveNdcApplication,
    mobileNoState: state.mobileNo,
    saveOwnerPrivatePropertiesState: state.saveOwnerPrivateProperties,
    getAppointmentDateState: state.getAppointmentDate,
    getPropertyAreaUnitListState: state.getPropertyAreaUnitList,
    saveApplicationAsDraftState: state.saveApplicationAsDraft,
    saveChangeOfOwnershipApplicationState: state.saveChangeOfOwnershipApplication,
    PropertyDuePaymentsState: state.PropertyDuePayments,
    getDraftApplicationDetailsState: state.getDraftApplicationDetails,
    transferApplicationFetchState: state.transferApplicationFetch,
    postAutoDCRState: state.postAutoDCR,
    getApplicationProgressState: state.getApplicationProgress,
})

const mapDispatchToProps = (dispatch) => ({
    privatePropertyApplication: (params) => dispatch(privatePropertyApplication(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    privatePropertyApplicationResetState: () => dispatch(privatePropertyApplicationResetState()),
    toGetPrivateScheme: (params) => dispatch(toGetPrivateScheme(params)),
    toGetPrivatePropertiesList: (params) => dispatch(toGetPrivatePropertiesList(params)),
    toGetPrivatePropertiesListResetState: () => dispatch(toGetPrivatePropertiesListResetState()),
    saveNdcApplication: (params) => dispatch(saveNdcApplication(params)),
    saveNdcApplicationResetState: () => dispatch(saveNdcApplicationResetState()),
    getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
    getAppointmentDateResetState: () => dispatch(getAppointmentDateResetState()),
    getPropertyAreaUnitList: () => dispatch(getPropertyAreaUnitList()),
    saveApplicationAsDraft: (params) => dispatch(saveApplicationAsDraft(params)),
    saveApplicationAsDraftResetState: () => dispatch(resetStateSaveApplicationAsDraft()),
    saveChangeOfOwnershipApplication: (params) => dispatch(saveChangeOfOwnershipApplication(params)),
    saveChangeOfOwnershipApplicationResetState: () => dispatch(resetStateSaveChangeOfOwnershipApplication()),
    getPaymentIntegrationPayload: (params) => dispatch(getPaymentIntegrationPayload(params)),
    getDraftApplicationDetails: (params) => dispatch(getDraftApplicationDetails(params)),
    getDraftApplicationDetailsResetState: () => dispatch(getDraftApplicationDetailsResetState()),
    fetchTransferApplication: (params) => dispatch(fetchTransferApplication(params)),
    resetStateFetchTransferApplication: () => dispatch(resetStateFetchTransferApplication()),
    getPaymentIntegrationPayload: (params) =>
        dispatch(getPaymentIntegrationPayload(params)),

    paymentIntegrationStatusCheck: (params) =>
        dispatch(paymentIntegrationStatusCheck(params)),
    postAutoDCR: (params) => dispatch(postAutoDCR(params)),
    postAutoDCRResetState: () => dispatch(postAutoDCRResetState()),
    getApplicationProgress: (params) => dispatch(getApplicationProgress(params)),

})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailsPrivatePropertiesForm)