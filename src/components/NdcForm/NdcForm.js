import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  Upload,
  Button,
  notification,
  Input,
  DatePicker,
  Select,
  Checkbox,
  InputNumber,
  Alert,
  Space,
  Modal,
  Radio,
  message,
} from "antd";
import {
  Label,
  Lvalue,
  PaymentContainer,
  DemandNoteDate,
  Footer,
  TotalLabel,
  TotalAmount,
  ClarificationDiv,
  ClarificationAction,
  ClarificationTextarea,
  Xspace,
} from "./NdcFormStyle";
import { connect } from "react-redux";
import { UploadOutlined, PrinterFilled } from "@ant-design/icons";
import moment from "moment";
import _ from "lodash";

// components
import { Container, Heading } from "./NdcFormStyle";
import {
  FormItem,
  BlankSpace,
  BlueButton,
  DocumentUpload,
  ValidationDiv,
  FileTitle,
  Xtable,
  XSteps,
  XDotSteps,
  GreenButton,
  OrangeButton,
  FlexDiv,
  DocumentUploadSingle,
} from "../Xcomponents";
import { SendIcon } from "../../components/CustomIcons";

// actions
import {
  getDocumentList,
  getDocumentListResetState,
} from "../../actions/getDocumentListAction";
import {
  saveNdcApplication,
  saveNdcApplicationResetState,
} from "../../actions/saveNdcApplicationAction";
import {
  saveWaterApplication,
  saveWaterApplicationResetState,
} from "../../actions/saveWaterApplicationAction";
import {
  getAppointmentDate,
  getAppointmentDateResetState,
} from "../../actions/getAppointmentDateAction";
import {
  saveChangeOfOwnershipApplication,
  resetStateSaveChangeOfOwnershipApplication,
} from "../../actions/saveChangeOfOwnershipApplicationAction";
import {
  saveApplicationAsDraft,
  resetStateSaveApplicationAsDraft,
} from "../../actions/saveApplicationAsDraftAction";
import {
  getDraftApplicationDetails,
  getDraftApplicationDetailsResetState,
} from "../../actions/getDraftApplicationDetailsAction";
import {
  fetchTransferApplication,
  resetStateFetchTransferApplication
} from "../../actions/transferApplicationfetchActions";
import { getSalutationList } from "../../actions/getSalutationListActions";
import {
  getStateList,
  getStateListResetState,
} from "../../actions/getStateListAction";
import {
  getDistrictList,
  getDistrictListResetState,
} from "../../actions/getDistrictListAction";
import { getEntrepreneurDetailByPan } from "../../actions/getEntrepreneurDetailByPanAction";
import {
  savePermittingProfessionalService,
  savePermittingProfessionalServiceResetState,
} from "../../actions/savePermittingProfessionalServiceAction";
import {
  getFeeDetails,
  getFeeDetailsResetState,
} from "../../actions/getFeeDetailsAction";

// others
import { getOrgId, getArchitectToken, inr } from "../../utils";
import conf from "../../config";
import { Link, Redirect } from "react-router-dom";
import { getApplicationDetailSuccess } from "../../actions/getApplicationDetailAction";
import { useDispatch } from "react-redux";
import { useRef } from "react";

import {
  getPaymentIntegrationPayload,
  paymentIntegrationStatusCheck,
} from "../../actions/duePaymentsAction";
import {
  postAutoDCR,
  postAutoDCRResetState,
} from "../../actions/postAutoDCRAction";
import paymentProcessingAnimation from "../../Lottie/payment-processing.json";
import paymentSuccessAnimation from "../../Lottie/payment-success.json";
import paymentFailAnimation from "../../Lottie/payment-fail.json";
import Lottie from "react-lottie";
import { getApplicationProgress } from "../../actions/getApplicationProgressAction";
const { Option } = Select;

const NdcForm = (props) => {
  // variables
  const {
    getServiceDetailState,
    getDocumentList,
    getDocumentListResetState,
    getDocumentListState,
    verifyUpnAndMobileSubmitOtpState,
    verifyUpnAndMobileState,
    saveNdcApplication,
    saveNdcApplicationResetState,
    saveNdcApplicationState,
    saveWaterApplication,
    saveWaterApplicationResetState,
    saveWaterApplicationState,
    getAppointmentDate,
    getAppointmentDateState,
    getAppointmentDateResetState,
    saveChangeOfOwnershipApplication,
    resetStateSaveChangeOfOwnershipApplication,
    saveChangeOfOwnershipApplicationState,
    saveApplicationAsDraft,
    resetStateSaveApplicationAsDraft,
    saveApplicationAsDraftState,
    getDraftApplicationDetails,
    getDraftApplicationDetailsResetState,
    getDraftApplicationDetailsState,
    fetchTransferApplication,
    resetStateFetchTransferApplication,
    transferApplicationFetchState,
    getSalutationList,
    getSalutationListState,
    getStateList,
    getStateListState,
    getStateListResetState,
    getDistrictList,
    getDistrictListState,
    getDistrictListResetState,
    getEntrepreneurDetailByPan,
    getEntrepreneurDetailByPanState,
    savePermittingProfessionalService,
    savePermittingProfessionalServiceState,
    savePermittingProfessionalServiceResetState,
    getFeeDetails,
    getFeeDetailsState,
    getFeeDetailsResetState,
    getApplicationProgressState,
    getPaymentIntegrationPayload,
    PropertyDuePaymentsState,
    paymentIntegrationStatusCheck,
  } = props;
  const serviceId = props.serviceId;
  let initialFormData = {
    name: "",
    Remark: "",
    NoOfFloorConstructed: 0,
    AppointmentDate: "",
    WheatherBuildingIs: "",
    IsBasmentConstruct: 0,
    BuildingPlanSanctionDate: "",
    PlumberName: "",
    PlumberLicenseNumber: "",
    PlumberAddress: "",
    CerificateIssueDate: "",
    NumberOfSeats: 0,
    SeatsGroundFloor: 0,
    SeatsFirstFloor: 0,
    SeatsSecondFloor: 0,
    ServicePipeLineLength: "",
    ServicePipeLineSize: "",
    NumberOfTap: "",
    SizeOfTap: "",
    FerrulCockSize: "",
    SanaitaryMaterialsDtl: "",
    HotWaterFittingDtl: "",
    HotWaterFittingBillNo: "",
    PurposeOfConnection: "",
    ApplicationType: serviceId,
    RegCategoryId: serviceId,
    PreRegNo: "",
    RegistrationCategory: "",
    PAN: "",
    Salutation: "Mr.",
    Name: "",
    MobileNumber: "",
    EmailAddress: "",
    Gender: "",
    MaritalStatusId: "",
    Dob: "",
    FatherHusbandName: "",
    AadhaarNumber: "",
    PermanentAddress: "",
    PermanentAddressDistrict: "",
    PermanentAddressState: "",
    PermanentAddressPin: "",
    CorrespondenceAddress: "",
    CorrespondenceAddressDistrict: "",
    CorrespondenceAddressState: "",
    CorrespondenceAddressPin: "",
    IsCorrespondenceAddressSame: false,
    ServiceCategory: "",
    ProfessionalDetail: "",
    VisitorDetails: "",
    WorkingHours: "",
    Floor: "",
    TotalArea: "",
    AreaGroundFloor: 0,
    AreaFirstFloor: 0,
    AreaSecondFloor: 0,
    IsMumtyConstructed: 0,
    AreaBasment: 0,
    AreaMumty: 0,
    MeterNumber: "",
    MeterMakeAndModel: "",
    InstallationDate: "",
    MeterBillNumber: "",
    MeterWarrantyYears: "",
    WallConstructLength: 0,
    ConstructionCost: 0,
    ConstructArea: 0,
    IsRevisedPlan: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const OrgId = getOrgId();
  const [fileList, setFileList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState([]);
  const [files, setFiles] = useState([]);
  const [redirect, setRedirect] = useState([false, ""]);
  const [isPVerificationRequired, setIsPVerificationRequired] = useState(false);
  const [documentFileId, setDocumentFileId] = useState([]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [currentFileType, setCurrentFileType] = useState(""); // Current file format
  const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false); // Current file format
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [checkSameAs, setCheckSameAs] = useState(false);
  const [selectState, setSelectState] = useState(true);
  const [districtList, setDistrictList] = useState({
    permanentDistrict: [],
    correspondenceDistrict: [],
  });
  const [form] = Form.useForm();
  const architect = getArchitectToken();

  const [totalCal, SetTotalCal] = useState(0);

  const [builtUpAreaList, setBuiltUpAreaList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");

  const [submitAsDraftDisabled, setSubmitAsDraftDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [payDisabled, setPayDisabled] = useState(false);

  const [applicationType, setApplicationType] = useState("Proposed");

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

  const [agcUsageSubTypes, setAgcUsageSubTypes] = useState([]);
  const [farUsageSubTypes, setFarUsageSubTypes] = useState([]);
  const [agcCoverageOptions, setAgcCoverageOptions] = useState([]);
  const [farCoverageOptions, setFarCoverageOptions] = useState([]);

  const calculateAmount = (area, rate) => Number(area || 0) * Number(rate || 0);

  const [agcList, setAgcList] = useState([]);
  const [agcEditIndex, setAgcEditIndex] = useState(null);

  const [agcForm, setAgcForm] = useState({
    additionalGroundCoverage: "",
    rates: 0,
    area: "",
    collectorFees: "",
    amount: 0,
    totalWithFeesAGC: 0,
  });

  const [farList, setFarList] = useState([]);
  const [farEditIndex, setFarEditIndex] = useState(null);

  const [farForm, setFarForm] = useState({
    additionalFAR: "",
    rates: 0,
    area: "",
    collectorFees: "",
    amount: 0,
    totalWithFeesFAR: 0,
  });

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

  const [totalArea, setTotalArea] = useState(0);
  const [showFAR, setShowFAR] = useState(false);
  const [existingAreaScrutinyAmount, setExistingAreaScrutinyAmount] =
    useState(0);

  // Fee calculation states
  const [feeModalVisible, setFeeModalVisible] = useState(false);
  const [feeData, setFeeData] = useState({
    ScrutinyFee: 0,
    SecurityFee: 0,
    LabourCessFee: 0,
  });
  const [feeLoading, setFeeLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(0);
  const [hasBasement, setHasBasement] = useState(false);

  // FAR dropdown states
  const [farDropdownData, setFarDropdownData] = useState([]);
  const [agcUsageSubType, setAgcUsageSubType] = useState(null);
  const [farUsageSubType, setFarUsageSubType] = useState(null);
  const [agcCoverageType, setAgcCoverageType] = useState(null);
  const [farCoverageType, setFarCoverageType] = useState(null);
  const [draftSaved, setDraftSaved] = useState(null);
  const [demandNoteModalVisible, setDemandNoteModalVisible] = useState(false);
  const [demandNoteData, setDemandNoteData] = useState(null); // store demand note details
  const [displayPaymentStatusModal, setDisplayPaymentStatusModal] =
    useState(false);
  const [acknowledgeDisabled, setAcknowledgeDisabled] = useState(true);
  const [paymentOnly, setPaymentOnly] = useState(false);

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

      // Calculate the number of non-basement floors added
    const getNonBasementFloorCount = () => {
        return builtUpAreaList.filter(item => item.floor >= 0).length;
    };

    // Check if max floors (3) have been reached (excluding basement)
    const isMaxFloorsReached = () => {
        return getNonBasementFloorCount() >= 4; // Ground floor (0) + 3 floors (1, 2, 3) = 4 floors total
    };



  const DemandNote = (props) => {
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

    let dataSource =
      // return {
      //     PaymentHead: item.HeadName,
      //     Amount: inr(item.TobePaidAmount),
      // }

      [
        {
          PaymentHead: "Scrutiny Fee",
          Amount: inr(feeData.ScrutinyFee),
        },
        {
          PaymentHead: "Security Fee",
          Amount: inr(feeData.SecurityFee),
        },
        {
          PaymentHead: "LabourCess Fee",
          Amount: inr(feeData.LabourCessFee),
        },
        {
          PaymentHead: "GST",
          Amount: inr(feeData.GST),
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

  const dispatch = useDispatch();
  const draftPromiseRef = useRef(null);
  // callbacks
  useEffect(() => {
    getStateList({
      OrgId: OrgId,
    });
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
      saveWaterApplicationResetState();
      getAppointmentDateResetState();
      getDocumentListResetState();
      resetStateSaveChangeOfOwnershipApplication();
      getDistrictListResetState();
      getStateListResetState();
      savePermittingProfessionalServiceResetState();
      getFeeDetailsResetState();
      getDraftApplicationDetailsResetState();
      resetStateFetchTransferApplication();
    };
  }, [applicationId]);

  useEffect(() => {
    getDocumentList({
      PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
      OrgId: OrgId,
      ApplicationTypeId: props.serviceId,
      AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
      AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
    });
  }, []);

  useEffect(() => {
    let isDemandNoteCreated = props.serviceId === "1791" && verifyUpnAndMobileSubmitOtpState.data.ApplicationDemandNoteId > 0 && verifyUpnAndMobileSubmitOtpState.data.ApplicationDemandNoteStatus == 1;
    setPaymentOnly(isDemandNoteCreated);
  }, []);

  useEffect(() => {
    console.log(getDocumentListState, "getDocumentListState data");
    if (getDocumentListState.apiState === "success") {
      let data = _.find(getDocumentListState.list, {
        IsPVerificationRequired: true,
      })
        ? true
        : false;
      if (data) {
        setIsPVerificationRequired(true);
        getAppointmentDate({
          OrgId: OrgId,
          ApplicationTypeId: props.serviceId,
          AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
          AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
        });
      } else {
        setIsPVerificationRequired(false);
      }
    }
  }, [getDocumentListState]);

  useEffect(() => {
    if (getDistrictListState.apiState === "success") {
      if (selectState) {
        setDistrictList({
          ...districtList,
          ["permanentDistrict"]: getDistrictListState.list,
        });
        setFormData({ ...formData, ["PermanentAddressDistrict"]: "" });
        form.setFieldsValue({
          PermanentAddressDistrict: null,
        });
      } else {
        setDistrictList({
          ...districtList,
          ["correspondenceDistrict"]: getDistrictListState.list,
        });
        setFormData({ ...formData, ["CorrespondenceAddressDistrict"]: "" });
        form.setFieldsValue({
          CorrespondenceAddressDistrict: null,
        });
      }
    } else {
      if (selectState) {
        setDistrictList({ ...districtList, ["permanentDistrict"]: [] });
        setFormData({ ...formData, ["PermanentAddressDistrict"]: "" });
        form.setFieldsValue({
          PermanentAddressDistrict: null,
        });
      } else {
        setDistrictList({ ...districtList, ["correspondenceDistrict"]: [] });
        setFormData({ ...formData, ["CorrespondenceAddressDistrict"]: "" });
        form.setFieldsValue({
          CorrespondenceAddressDistrict: null,
        });
      }
    }
  }, [getDistrictListState]);

  useEffect(() => {
    if (checkSameAs) {
      form.validateFields([
        "CorrespondenceAddress",
        "CorrespondenceAddressState",
        "CorrespondenceAddressDistrict",
        "CorrespondenceAddressPin",
      ]);
    }
  }, [checkSameAs]);
  useEffect(() => {
    if (formData.NoOfFloorConstructed < 2) {
      setFormData({
        ...formData,
        ["SeatsFirstFloor"]: 0,
        ["SeatsSecondFloor"]: 0,
        ["AreaFirstFloor"]: 0,
        ["AreaSecondFloor"]: 0,
      });
      form.setFieldsValue({
        SeatsFirstFloor: null,
        SeatsSecondFloor: null,
        AreaFirstFloor: null,
        AreaSecondFloor: null,
      });
    } else if (formData.NoOfFloorConstructed < 3) {
      setFormData({
        ...formData,
        ["SeatsSecondFloor"]: 0,
        ["AreaSecondFloor"]: 0,
      });
      form.setFieldsValue({
        SeatsSecondFloor: null,
        AreaSecondFloor: null,
      });
    }
  }, [formData.NoOfFloorConstructed]);

  useEffect(() => {
    if (formData.IsBasmentConstruct === 0) {
      setFormData({
        ...formData,
        ["AreaBasment"]: 0,
      });
      form.setFieldsValue({
        AreaBasment: null,
      });
    }
  }, [formData.IsBasmentConstruct]);

  useEffect(() => {
    if (formData.IsMumtyConstructed === 0) {
      setFormData({
        ...formData,
        ["AreaMumty"]: 0,
      });
      form.setFieldsValue({
        AreaMumty: null,
      });
    }
  }, [formData.IsMumtyConstructed]);

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
      // if (props.serviceId === '27') {
      //     window.location = `${saveNdcApplicationState.data.URL}?UniqueId=${saveNdcApplicationState.data.UniqueId}&UserId=${saveNdcApplicationState.data.UserId}&Amount=${saveNdcApplicationState.data.Amount}&AuthTokenKey=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.AuthTokenKey)}&AuthToken=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.AuthToken)}&ArchitectToken=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.ArchitectToken)}&ArchitectTokenKey=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey)}`
      // }
      // else {
      //     setRedirect([true, "/ndc-details/" + saveNdcApplicationState.data.ApplicationId])
      // }
      setApplicationId(saveNdcApplicationState.data.ApplicationId);
      setAcknowledgeDisabled(false);
      setPayDisabled(true);
      setSubmitAsDraftDisabled(true);
      setRedirect([
        true,
        "/ndc-details/" + saveNdcApplicationState.data.ApplicationId,
      ]);
    }
    if (saveNdcApplicationState.apiState === "success") {
      notification["success"]({
        message: saveNdcApplicationState.apiMessage,
        placement: "bottomRight",
      });
      verifyUpnAndMobileSubmitOtpState.submitApplication = true;
      // if (props.serviceId === '27') {
      //     window.location = `${saveNdcApplicationState.data.URL}?UniqueId=${saveNdcApplicationState.data.UniqueId}&UserId=${saveNdcApplicationState.data.UserId}&Amount=${saveNdcApplicationState.data.Amount}&AuthTokenKey=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.AuthTokenKey)}&AuthToken=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.AuthToken)}&ArchitectToken=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.ArchitectToken)}&ArchitectTokenKey=${encodeURIComponent(verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey)}`
      // }
      // else {
      //     setRedirect([true, "/ndc-details/" + saveNdcApplicationState.data.ApplicationId])
      // }

      if (serviceId === "1791") {
        setApplicationId(saveNdcApplicationState.data.ApplicationId);
        setAcknowledgeDisabled(false);
        setPayDisabled(true);
        setSubmitAsDraftDisabled(true);
      } else {
        setRedirect([
          true,
          "/ndc-details/" + saveNdcApplicationState.data.ApplicationId,
        ]);
      }
    }
  }, [saveNdcApplicationState]);

  useEffect(() => {
    if (saveWaterApplicationState.apiState === "alert") {
      notification["error"]({
        message: saveWaterApplicationState.apiMessage,
        placement: "bottomRight",
      });
      saveWaterApplicationResetState();
    }

    if (saveWaterApplicationState.apiState === "success") {
      notification["success"]({
        message: saveWaterApplicationState.apiMessage,
        placement: "bottomRight",
      });
      verifyUpnAndMobileSubmitOtpState.submitApplication = true;
      if (saveWaterApplicationState.data?.ReturnURL) {
        window.location.href = saveWaterApplicationState.data.ReturnURL;
      } else {
        setRedirect([
          true,
          "/ndc-details/" + saveWaterApplicationState.data.ApplicationId,
        ]);
      }
    }
    if (saveWaterApplicationState.apiState === "error") {
      notification["error"]({
        message: saveWaterApplicationState.apiMessage,
        placement: "bottomRight",
      });
      saveWaterApplicationResetState();
    }
  }, [saveWaterApplicationState]);

  useEffect(() => {
    if (saveChangeOfOwnershipApplicationState.apiState === "alert") {
      notification["error"]({
        message: saveChangeOfOwnershipApplicationState.apiMessage,
        placement: "bottomRight",
      });
      resetStateSaveChangeOfOwnershipApplication();
    }

    if (saveChangeOfOwnershipApplicationState.apiState === "success") {
      notification["success"]({
        message: saveChangeOfOwnershipApplicationState.apiMessage,
        placement: "bottomRight",
      });
      verifyUpnAndMobileSubmitOtpState.submitApplication = true;
      setRedirect([
        true,
        "/ndc-details/" +
        saveChangeOfOwnershipApplicationState.data.ApplicationId,
      ]);
    }
  }, [saveChangeOfOwnershipApplicationState]);

  useEffect(() => {
    if (savePermittingProfessionalServiceState.apiState === "alert") {
      notification["error"]({
        message: savePermittingProfessionalServiceState.apiMessage,
        placement: "bottomRight",
      });
      savePermittingProfessionalServiceResetState();
    }

    if (savePermittingProfessionalServiceState.apiState === "success") {
      notification["success"]({
        message: savePermittingProfessionalServiceState.apiMessage,
        placement: "bottomRight",
      });
      verifyUpnAndMobileSubmitOtpState.submitApplication = true;
      setRedirect([
        true,
        "/ndc-details/" +
        savePermittingProfessionalServiceState.data.ApplicationId,
      ]);
    }
  }, [savePermittingProfessionalServiceState]);

  useEffect(() => {
    if (getEntrepreneurDetailByPanState.apiState === "success") {
      setFormData({
        ...formData,
        ["Salutation"]: getEntrepreneurDetailByPanState.data.Title,
        ["Name"]: getEntrepreneurDetailByPanState.data.FullName,
        ["MobileNumber"]: getEntrepreneurDetailByPanState.data.MobileNumber,
        ["EmailAddress"]: getEntrepreneurDetailByPanState.data.EmailAddress,
        ["Dob"]: getEntrepreneurDetailByPanState.data.Dob,
        ["Gender"]: getEntrepreneurDetailByPanState.data.Gender,
        ["MaritalStatusId"]:
          getEntrepreneurDetailByPanState.data.MaritalStatusId,
        ["FatherHusbandName"]: getEntrepreneurDetailByPanState.data.FatherName,
        ["AadhaarNumber"]: getEntrepreneurDetailByPanState.data.Aadhar,
        ["PermanentAddress"]:
          getEntrepreneurDetailByPanState.data.PeAddressLine1,
        ["PermanentAddressState"]:
          getEntrepreneurDetailByPanState.data.PeStateId,
        ["PermanentAddressDistrict"]:
          getEntrepreneurDetailByPanState.data.PeDistrictId,
        ["PermanentAddressPin"]: getEntrepreneurDetailByPanState.data.PePin,
        ["CorrespondenceAddress"]:
          getEntrepreneurDetailByPanState.data.CoAddressLine1,
        ["CorrespondenceAddressState"]:
          getEntrepreneurDetailByPanState.data.CoStateId,
        ["CorrespondenceAddressDistrict"]:
          getEntrepreneurDetailByPanState.data.CoDistrictId,
        ["CorrespondenceAddressPin"]:
          getEntrepreneurDetailByPanState.data.CoPin,
      });
      form.setFieldsValue({
        Salutation: getEntrepreneurDetailByPanState.data.Title,
        Name: getEntrepreneurDetailByPanState.data.FullName,
        MobileNumber: getEntrepreneurDetailByPanState.data.MobileNumber,
        EmailAddress: getEntrepreneurDetailByPanState.data.EmailAddress,
        Dob: getEntrepreneurDetailByPanState.data.Dob
          ? moment(getEntrepreneurDetailByPanState.data.Dob)
          : "",
        Gender: getEntrepreneurDetailByPanState.data.Gender,
        MaritalStatusId: getEntrepreneurDetailByPanState.data.MaritalStatus,
        FatherHusbandName: getEntrepreneurDetailByPanState.data.FatherName,
        AadhaarNumber: getEntrepreneurDetailByPanState.data.Aadhar,
        PermanentAddress: getEntrepreneurDetailByPanState.data.PeAddressLine1,
        PermanentAddressState: getEntrepreneurDetailByPanState.data.PeState,
        PermanentAddressDistrict:
          getEntrepreneurDetailByPanState.data.PeDistrict,
        PermanentAddressPin: getEntrepreneurDetailByPanState.data.PePin,
        CorrespondenceAddress:
          getEntrepreneurDetailByPanState.data.CoAddressLine1,
        CorrespondenceAddressState:
          getEntrepreneurDetailByPanState.data.CoState,
        CorrespondenceAddressDistrict:
          getEntrepreneurDetailByPanState.data.CoDistrict,
        CorrespondenceAddressPin: getEntrepreneurDetailByPanState.data.CoPin,
      });
    } else if (getEntrepreneurDetailByPanState.apiState === "alert") {
      notification["error"]({
        message: getEntrepreneurDetailByPanState.alertMessage,
        placement: "bottomRight",
      });
    }
  }, [getEntrepreneurDetailByPanState]);

  useEffect(() => {
    const total = builtUpAreaList.reduce(
      (sum, item) => sum + Number(item.area),
      0
    );
    setTotalArea(total);
  }, [builtUpAreaList]);

  // API call for dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        console.log("Dropdown API start:");
        const response = await fetch(
          `${conf.api.base_url}Gateway_PostAuthPortalService/GetDropdownDataForApplicationDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ApiKey: "GetDropdownDataForApplicationDetails",
              OrgId: 1,
              ApiParams: {
                RefType:
                  verifyUpnAndMobileSubmitOtpState.data?.ProertyDetails
                    ?.UsageType || "Commercial",
              },
            }),
          }
        );

        const data = await response.json();
        console.log("Dropdown API Response:", data);

        if (data.Status === 2 && data.CustomObject) {
          setFarDropdownData(data.CustomObject);

          // Set AGC usage sub types - distinct FARType where FARCategory is "GC"
          const agcTypes = [
            ...new Set(
              data.CustomObject.filter((item) => item.FARCategory === "GC").map(
                (item) => item.FARType
              )
            ),
          ];
          setAgcUsageSubTypes(agcTypes);

          // Set FAR usage sub types - distinct FARType where FARCategory is "FAR"
          const farTypes = [
            ...new Set(
              data.CustomObject.filter(
                (item) => item.FARCategory === "FAR"
              ).map((item) => item.FARType)
            ),
          ];
          setFarUsageSubTypes(farTypes);

          // Set AGC coverage options - distinct FARDescription where FARCategory is "GC"
          const agcCoverages = [
            ...new Set(
              data.CustomObject.filter((item) => item.FARCategory === "GC").map(
                (item) => item.FARDescription
              )
            ),
          ];
          setAgcCoverageOptions(agcCoverages);

          // Set FAR coverage options - distinct FARDescription where FARCategory is "FAR"
          const farCoverages = [
            ...new Set(
              data.CustomObject.filter(
                (item) => item.FARCategory === "FAR"
              ).map((item) => item.FARDescription)
            ),
          ];
          setFarCoverageOptions(farCoverages);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (props.applicationId && verifyUpnAndMobileSubmitOtpState?.data?.ApplicationDemandNoteStatus != 2) {
      setApplicationId(props.applicationId);
    }
  }, [props.applicationId]);

  // useEffect(() => {
  //   const params = {
  //     ApiKey: "GetDraftApplicationDetails",
  //     OrgId: 3,
  //     ApiParams: {
  //       APPLICATION_REF_ID: applicationId, // replace with dynamic ID if needed
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
  //        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
  //     },
  //   };

  //   getDraftApplicationDetails(params);
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     getDraftApplicationDetailsResetState();
  //   };
  // }, []);

  // Handle draft application details response
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

  // Handle transfer application fetch response (for documents)
  useEffect(() => {
    if (transferApplicationFetchState.apiState === "success") {
      // Process documents and set defaultFileList for display on page load
      if (transferApplicationFetchState.data.Documents && transferApplicationFetchState.data.Documents.length > 0) {
        let fileArr = []
        transferApplicationFetchState.data.Documents.map((item) => {
          let extension = item.FileName.substr(item.FileName.lastIndexOf(".") + 1)
          let filePrependString = ""
          if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            filePrependString = `data:image/${extension};base64,${item.FileData}`
          }
          else {
            filePrependString = `data:application/${extension};base64,${item.FileData}`
          }
          fileArr.push({
            documentTypeId: item.DocumentTypeId,
            uid: item.DocumentId,
            name: item.FileName,
            status: 'done',
            url: filePrependString,
            thumbUrl: filePrependString,
            preview: filePrependString,
          })
        })
        setDefaultFileList(fileArr)

        // Also initialize fileList for each document type to ensure files display
        if (getDocumentListState.list && getDocumentListState.list.length > 0) {
          const newFileList = [...fileList];
          fileArr.forEach((file) => {
            const docTypeIndex = getDocumentListState.list.findIndex(doc => doc.DocumentTypeId === file.documentTypeId);
            if (docTypeIndex !== -1) {
              newFileList[docTypeIndex] = [file];
              // Set form field value for Ant Design validation
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
  }, [transferApplicationFetchState]);

  useEffect(() => {
    if (saveApplicationAsDraftState.apiState === "success") {
      message.success("Application saved successfully");
      setDraftSaved(true); // Resolve draft save
      resetStateSaveApplicationAsDraft(); // optional
    } else if (
      saveApplicationAsDraftState.apiState === "error" ||
      saveApplicationAsDraftState.apiState === "alert"
    ) {
      message.error(
        saveApplicationAsDraftState.apiMessage || "Failed to save application"
      );
      setDraftSaved(false); // Reject draft save
      resetStateSaveApplicationAsDraft(); // optional
    }
  }, [saveApplicationAsDraftState]);

  useEffect(() => {
    if (!PropertyDuePaymentsState) return;
    if (PropertyDuePaymentsState.paymentIntegrationApiState === "ideal") {
      handleSubmit();
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
      if (props.serviceId === "1791") {
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

          handleSubmit();

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
    if (!draftPromiseRef.current) return;

    if (saveApplicationAsDraftState.apiState === "success") {
      draftPromiseRef.current.resolve();
      draftPromiseRef.current = null;
    }

    if (saveApplicationAsDraftState.apiState === "error") {
      draftPromiseRef.current.reject("Failed to save draft");
      draftPromiseRef.current = null;
    }
  }, [saveApplicationAsDraftState.apiState]);

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

  const saveDraftAndWait = () => {
    return new Promise((resolve, reject) => {
      // Prevent duplicate calls
      if (saveApplicationAsDraftState.apiState === "loading") {
        reject("Draft save already in progress");
        return;
      }

      draftPromiseRef.current = { resolve, reject };
      handleSaveAsDraft(); // dispatch Redux action
    });
  };

  // functions
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = (e) => {
    handleOnChange(e);
    //Calculations
    //total
    //
    SetTotalCal(totalCal);
  };


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
  }

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
    try {
      const requestBody = {
        OrgId: OrgId,
        PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
        ApplType: props.serviceId,
        ExtraArea: 0, //remove hard code
        ApplicationType: applicationType,
        WallConstructLength: 0,
        NoOfFloors: builtUpAreaList.length,
        ConstructionCost: formValues.TotalConstructionCost || 0,
        ConstructArea: area || 0,
        TotalExistingArea: formValues.TotalExistingArea || 0,
      };

      const response = await fetch(
        // "http://localhost:57657/api/PMS_EnterprenurService/GetFeeInfo?orgId=3",
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
            } else {
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

  const handleSubmit = () => {
    if (props.serviceId === "25" || props.serviceId === "32") {
      saveChangeOfOwnershipApplication({
        ApplicationId: 0,
        OrgId: OrgId,
        PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
        ApplicationTypeId: props.serviceId,
        Remark: formData.Remark,
        TemporaryApplicationId: getDocumentListState.EntityId,
        AppointmentDate: formData.AppointmentDate,
        SubmitType: 1,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    } else if (
      props.serviceId === "1059" ||
      props.serviceId === "30" ||
      props.serviceId === "1475" ||
      serviceId === "1712" ||
      serviceId === "1716"
    ) {
      let paramString = "";
      let returnUrl = "";
      let BussinessFirstApplId = "";
      if (props.serviceId === "1475" || props.serviceId === "30") {
        const checkSubmitType = window.location.href.split(`/`)[5];
        if (checkSubmitType === undefined) {
          paramString = "";
          returnUrl = "";
          BussinessFirstApplId = "";
        } else {
          paramString = window.location.href
            .split(`{`)[1]
            .toString()
            .split("%22:")[1]
            .slice(0, -9);
          returnUrl = "";
          const str1 = window.location.href.split("|");
          const lenstr = str1.length;
          returnUrl = str1[lenstr - 2] + "|" + str1[lenstr - 1];

          BussinessFirstApplId = window.location.href
            .split(`{`)[1]
            .toString()
            .split("%22:")[2]
            .slice(3, 13);
        }
      }
      saveWaterApplication({
        ApplicationType: props.serviceId,
        PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
        Name: verifyUpnAndMobileState.data.OwnerName,
        Mobile: "",
        EmailId: "",
        Remark: formData.Remark,
        TemporaryApplicationId: getDocumentListState.EntityId,
        GPASPA: "N",
        IPin: paramString,
        ReturnURL: returnUrl,
        BussinessFirstApplId: BussinessFirstApplId,
        OwnerId: verifyUpnAndMobileState.data.OwnerId,
        OrgId: OrgId,
        AppointmentDate: formData.AppointmentDate,
        WheatherBuildingIs: formData.WheatherBuildingIs,
        NoOfFloorConstructed: formData.NoOfFloorConstructed,
        IsBasmentConstruct: formData.IsBasmentConstruct,
        BuildingPlanSanctionDate: formData.BuildingPlanSanctionDate,
        PlumberName: formData.PlumberName,
        PlumberLicenseNumber: formData.PlumberLicenseNumber,
        PlumberAddress: formData.PlumberAddress,
        CerificateIssueDate: formData.CerificateIssueDate,
        NumberOfSeats:
          formData.SeatsGroundFloor +
          formData.SeatsFirstFloor +
          formData.SeatsSecondFloor,
        SeatsGroundFloor: formData.SeatsGroundFloor,
        SeatsFirstFloor: formData.SeatsFirstFloor,
        SeatsSecondFloor: formData.SeatsSecondFloor,
        ServicePipeLineLength: formData.ServicePipeLineLength,
        ServicePipeLineSize: formData.ServicePipeLineSize,
        NumberOfTap: formData.NumberOfTap,
        SizeOfTap: formData.SizeOfTap,
        FerrulCockSize: formData.FerrulCockSize,
        AreaMumty: formData.AreaMumty,
        IsMumtyConstructed: formData.IsMumtyConstructed,
        AreaGroundFloor: formData.AreaGroundFloor,
        AreaFirstFloor: formData.AreaFirstFloor,
        AreaSecondFloor: formData.AreaSecondFloor,
        SanaitaryMaterialsDtl: formData.SanaitaryMaterialsDtl,
        HotWaterFittingDtl: formData.HotWaterFittingDtl,
        HotWaterFittingBillNo: formData.HotWaterFittingBillNo,
        ConstructionCost: formData.ConstructionCost,
        PurposeOfConnection: formData.PurposeOfConnection,
        MeterNumber: formData.MeterNumber,
        MeterMakeAndModel: formData.MeterMakeAndModel,
        InstallationDate: formData.InstallationDate,
        MeterBillNumber: formData.MeterBillNumber,
        MeterWarrantyYears: formData.MeterWarrantyYears,
        AreaBasment: formData.AreaBasment,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    } else if (props.serviceId === "33") {
      savePermittingProfessionalService({
        ApplicationType: props.serviceId,
        PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
        Remark: formData.Remark,
        TemporaryApplicationId: getDocumentListState.EntityId,
        GPASPA: "N",
        OwnerId: verifyUpnAndMobileState.data.OwnerId,
        OrgId: OrgId,
        AppointmentDate: formData.AppointmentDate,
        PAN: formData.PAN,
        PreRegNo: formData.PreRegNo,
        Salutation: formData.Salutation,
        Name: formData.Name,
        FatherHusbandName: formData.FatherHusbandName,
        Gender: formData.Gender,
        MaritalStatusId: formData.MaritalStatusId,
        Dob: formData.Dob,
        AadhaarNumber: formData.AadhaarNumber,
        MobileNumber: formData.MobileNumber,
        EmailAddress: formData.EmailAddress,
        ServiceCategory: formData.ServiceCategory,
        ProfessionalDetail: formData.ProfessionalDetail,
        VisitorDetails: formData.VisitorDetails,
        WorkingHours: formData.WorkingHours,
        Floor: formData.Floor,
        TotalArea: formData.TotalArea,
        PermanentAddress: formData.PermanentAddress,
        PermanentAddressState: formData.PermanentAddressState,
        PermanentAddressDistrict: formData.PermanentAddressDistrict,
        PermanentAddressPin: formData.PermanentAddressPin,
        CorrespondenceAddress: checkSameAs
          ? formData.PermanentAddress
          : formData.CorrespondenceAddress,
        CorrespondenceAddressState: checkSameAs
          ? formData.PermanentAddressState
          : formData.CorrespondenceAddressState,
        CorrespondenceAddressDistrict: checkSameAs
          ? formData.PermanentAddressDistrict
          : formData.CorrespondenceAddressDistrict,
        CorrespondenceAddressPin: checkSameAs
          ? formData.PermanentAddressPin
          : formData.CorrespondenceAddressPin,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    } else if (
      props.serviceId === "27" ||
      props.serviceId === "1729" ||
      props.serviceId === "1730" ||
      props.serviceId === "1731" ||
      props.serviceId === "1732" ||
      props.serviceId === "951"
    ) {
      saveNdcApplication({
        ApiKey: "SaveBuildingPlanApplication",
        ApplicationType: props.serviceId,
        PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
        Name: verifyUpnAndMobileState.data.OwnerName,
        Mobile: "",
        EmailId: "",
        Remark: formData.Remark,
        TemporaryApplicationId: getDocumentListState.EntityId,
        GPASPA: "N",
        OwnerId: verifyUpnAndMobileState.data.OwnerId,
        OrgId: OrgId,
        AppointmentDate: formData.AppointmentDate,
        EnterprenurId: +architect.EnterprenurId,
        WallConstructLength: formData.WallConstructLength,
        ConstructionCost: formData.ConstructionCost,
        ConstructArea: formData.ConstructArea,
        IsRevisedPlan: formData.IsRevisedPlan,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    } else if (props.serviceId === "1791") {
      saveNdcApplication({
        ApiKey: "SavePropertyApplication",
        ApplicationId: applicationId,
        ApplicationType: props.serviceId,
        PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
        Name: verifyUpnAndMobileState.data.OwnerName,
        Mobile: "",
        EmailId: "",
        Remark: formData.Remark,
        TemporaryApplicationId: applicationId,
        GPASPA: "N",
        OwnerId: verifyUpnAndMobileState.data.OwnerId,
        OrgId: OrgId,
        AppointmentDate: formData.AppointmentDate,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    } else {
      saveNdcApplication({
        ApiKey: "SavePropertyApplication",
        ApplicationType: props.serviceId,
        PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
        Name: verifyUpnAndMobileState.data.OwnerName,
        Mobile: "",
        EmailId: "",
        Remark: formData.Remark,
        TemporaryApplicationId: getDocumentListState.EntityId,
        GPASPA: "N",
        OwnerId: verifyUpnAndMobileState.data.OwnerId,
        OrgId: OrgId,
        AppointmentDate: formData.AppointmentDate,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    }
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
 

  
  const handleSaveAsDraft = async () => {
    try {
      // First API call to get application data
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
            OrgId: verifyUpnAndMobileState.data.OrgId,
            ApiParams: {
              ApplicationId:
                applicationId,
              ApplicationType: props.serviceId,
              PropertyRefId:
                verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
              Name: verifyUpnAndMobileState.data.OwnerName,
              Mobile: "",
              EmailId: "",
              Remark: formData.Remark,
              TemporaryApplicationId: getDocumentListState.EntityId ?? 0,
              GPASPA: "N",
              OwnerId: verifyUpnAndMobileState.data.OwnerId,
              OrgId: OrgId,
              AppointmentDate: formData.AppointmentDate,
              AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
              AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
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

      setApplicationId(appId);

      // const values = await form.validateFields(); // gets latest values

      const formValues = form.getFieldsValue(true); // ✅ no validation
      //  // Calculate totals for ScrutinyFees, LabourCess, and GST from all lists
      const builtUpAreaTotals = builtUpAreaList.reduce(
        (acc, item) => ({
          scrutinyFees: acc.scrutinyFees + (parseFloat(item.scrutinyFee) || 0),
          labourCess: acc.labourCess + (parseFloat(item.labourCessFee) || 0),
          gst: acc.gst + (parseFloat(item.gst) || 0),
        }),
        { scrutinyFees: 0, labourCess: 0, gst: 0 }
      );

      const agcTotals = agcList.reduce(
        (acc, item) => ({
          scrutinyFees: acc.scrutinyFees + (parseFloat(item.scrutinyFee) || 0),
          labourCess: acc.labourCess + (parseFloat(item.labourCessFee) || 0),
          gst: acc.gst + (parseFloat(item.gst) || 0),
        }),
        { scrutinyFees: 0, labourCess: 0, gst: 0 }
      );

      const farTotals = farList.reduce(
        (acc, item) => ({
          scrutinyFees: acc.scrutinyFees + (parseFloat(item.scrutinyFee) || 0),
          labourCess: acc.labourCess + (parseFloat(item.labourCessFee) || 0),
          gst: acc.gst + (parseFloat(item.gst) || 0),
        }),
        { scrutinyFees: 0, labourCess: 0, gst: 0 }
      );

      let totalScrutinyFees =
        builtUpAreaTotals.scrutinyFees +
        agcTotals.scrutinyFees +
        farTotals.scrutinyFees;
      let totalLabourCess =
        builtUpAreaTotals.labourCess +
        agcTotals.labourCess +
        farTotals.labourCess;


      let totalSecurityFees = 0;

      const data = await calculateFee(totalArea);
      let totalScrutineeFee =
        (data.ScrutinyAmount || 0) + (data.ExistingAreaScrutinyAmount || 0);
      let totalGST = 0;
      let totalAmount = 0;

      if (data) {
        totalScrutinyFees = (data.ScrutinyAmount || 0) + (data.ExistingAreaScrutinyAmount || 0);
        totalLabourCess = data.LabourCessAmount || 0
        totalGST = (totalScrutineeFee || 0) * 0.18
        totalSecurityFees = Number(data.SecurityAmount || 0) -
          Number(formValues.PaidSecurityAmount || 0);
        totalAmount = totalScrutinyFees + totalLabourCess + totalGST + totalSecurityFees;
      }

      // Construct the payload based on form data with ApplicationRefId mapped from response
      const payload = {
        ApiKey: "SaveApplicationAsDraft",
        OrgId: OrgId,
        ApiParams: {
          applicationmodel: {
            UPN: verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.UPN,
            ApplicationRefId: appId,
            TotalBuiltUpArea: totalArea || 0,
            TotalBuiltUpAreaWithFees: totalArea || 0,
            TotalBoundaryWall: 0,
            TotalBoundaryWallWithFees: 0,
            TotalFARWithFees: 0, // TODO: Calculate from FAR data
            TotalAmount: totalAmount,
            ScrutinyFees: totalScrutinyFees,
            LabourCess: totalLabourCess,
            GST: totalGST,
            ApplicationType: applicationType,
            TotalConstructionCost: Number(formValues.TotalConstructionCost),
            TotalExistingArea: Number(formValues.TotalExistingArea),
            SubUsageType: formValues.ApplicationType,
            PaidSecurityAmount: Number(formValues.PaidSecurityAmount),
            ExistingAreaScrutinyFee: existingAreaScrutinyAmount,
            SecurityFees: totalSecurityFees
          },
          builtUpAreaList: builtUpAreaList.map((item) => ({
            Floor: item.floor,
            Area: parseFloat(item.area) || 0,
            ScrutinyFees: parseFloat(item.scrutinyFee) || 0,
            LabourCess: parseFloat(item.labourCessFee) || 0,
            GST: parseFloat(item.gst) || 0,
          })),
          rateForAGCList: agcList.map((item) => ({
            AdditionalGroundCoverage: item.additionalGroundCoverage,
            Rates: parseFloat(item.rates) || 0,
            Area: parseFloat(item.area) || 0,
            CollectorFees: parseFloat(item.collectorFees) || 0,
            Amount: parseFloat(item.amount) || 0,
            TotalWithFeesAGC: parseFloat(item.totalWithFeesAGC) || 0,
            ScrutinyFees: parseFloat(item.scrutinyFee) || 0,
            LabourCess: parseFloat(item.labourCessFee) || 0,
            GST: parseFloat(item.gst) || 0,
          })),
          rateForFARList: farList.map((item) => ({
            AdditionalFAR: item.additionalFAR,
            Rates: parseFloat(item.rates) || 0,
            Area: parseFloat(item.area) || 0,
            CollectorFees: parseFloat(item.collectorFees) || 0,
            Amount: parseFloat(item.amount) || 0,
            TotalWithFeesFAR: parseFloat(item.totalWithFeesFAR) || 0,
            ScrutinyFees: parseFloat(item.scrutinyFee) || 0,
            LabourCess: parseFloat(item.labourCessFee) || 0,
            GST: parseFloat(item.gst) || 0,
          })),
        },
      };

      saveApplicationAsDraft(payload);
    } catch (error) {
      console.error("Error in handleSaveAsDraft:", error);
      message.error("Failed to save application as draft");
    }
  };

  const acknowledgementClick = () => {
    localStorage.setItem(
      "PudaAuthToken",
      verifyUpnAndMobileSubmitOtpState.AuthToken
    );
    localStorage.setItem(
      "PudaAuthTokenKey",
      verifyUpnAndMobileSubmitOtpState.AuthTokenKey
    );
    if (!applicationId) return;

    // Manually populate the Redux store for print page
    dispatch(
      getApplicationDetailSuccess({
        uiState: "ideal",
        data: {},
      })
    );
    window.open(`/print-acknowledgement/${applicationId}`, "_blank"); //harcoded
    // window.open(`/print-acknowledgement/276730}`, "_blank"); //harcoded
  };

  const handleModalPayNow = async () => {
    setPayDisabled(true); // optional: disable button immediately
    setDemandNoteModalVisible(false);
    setAcknowledgeDisabled(false);
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


    getPaymentIntegrationPayload({
      PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
      OrgId: OrgId,
      TotalDueAmount: demandNoteData?.TotalDueAmount || 0,
      headDetails: demandNoteData?.headDetails || [],
      DemandNoteId: result.CustomObject.DemandNoteId ?? 0, // ✅ REAL VALUE
      EntityType: demandNoteData?.EntityType, // ✅ REAL VALUE
      AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
      AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
      ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
      ArchitectTokenKey:
        verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? "",
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

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  const disabledDob = (current) => {
    var tillDate = moment().subtract(13, "years");
    return !tillDate.isAfter(current);
  };

  const handleOnChangeDate = (date, dateString, name) => {
    setFormData({ ...formData, [name]: dateString });
  };

  const handleOnChangeSelect = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleOnChangeCheck = (e, name) => {
    if (e.target.checked) {
      setFormData({ ...formData, [name]: 1 });
    } else {
      setFormData({ ...formData, [name]: 0 });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onPreview = async (file) => {
    let extension = file.name.substr(file.name.lastIndexOf(".") + 1);
    let src = file.url;
    if (extension === "jpg" || extension === "jpeg" || extension === "png") {
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      setCurrentFileType("image");
      setPreviewImage(src);
      setPreviewVisible(true);
    } else {
      setCurrentFileType("pdf");
      setPreviewImage(src);
      setPreviewVisible(true);
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handleOnChangeSelectState = (value, name, status) => {
    setFormData({ ...formData, [name]: value });
    setSelectState(status);
    getDistrictList({
      OrgId: OrgId,
      StateId: value,
    });
  };

  const onSameAsChange = (e) => {
    setCheckSameAs(e.target.checked);
  };

  const callEntrepreneurDetailByPan = () => {
    getEntrepreneurDetailByPan({
      OrgId: OrgId,
      PAN: formData.PAN,
      AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
      AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
    });
  };

  const getFee = () => {
    getFeeDetails({
      PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
      OrgId: OrgId,
      ApplicationTypeId: props.serviceId,
      WallConstructLength: formData.WallConstructLength,
      IsRevisedPlan: formData.IsRevisedPlan,
      ConstructionCost: formData.ConstructionCost,
      ConstructArea: formData.ConstructArea,
    });
  };

  const createMarkup = (processContent) => {
    return { __html: processContent };
  };

  const renderExtensions = (extension) => {
    let extensionData = [];
    extension.map((data) => {
      let a = "." + _.split(data, "/")[1];
      extensionData.push(a);
    });
    return extensionData.join(", ");
  };

  // const handleBuiltUpArea=(builtUp)=>{
  //   let newBuiltUpAreaList = [...builtUpAreaList];
  //   newBuiltUpAreaList.push(builtUp);
  //   SetBuiltUpAreaList(newBuiltUpAreaList);
  // }

  const calculateExistingAreaFees = async () => {
    const data = await calculateFee(0);
    if (!data) {
      message.error("Error calculating fees");
      return;
    }
    setExistingAreaScrutinyAmount(data.ExistingAreaScrutinyAmount);
  };

  const handleBuiltUpArea = async ({ area }) => {
    // Validation: All fields are required
    // if (!floor) {
    //   message.error("Please select a floor");
    //   return;
    // }

    const floor = hasBasement
      ? builtUpAreaList.length - 1
      : builtUpAreaList.length;

        if (applicationType !== "Revised" && applicationType !== "Superseded" && (!area || area === "")) {      
          message.error("Please enter area");
      return;
    }

    // Validation: Numeric values should be greater than 1
    const numericArea = parseFloat(area);
        if (applicationType !== "Revised" && applicationType !== "Superseded" && (isNaN(numericArea) || numericArea <= 1)) {          
          message.error("Area must be a number greater than 1");
      return;
    }

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
    setFloor("");
    setArea("");
  };

  const handleEdit = (index) => {
    const item = builtUpAreaList[index];
    setFloor(item.floor);
    setArea(item.area);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = builtUpAreaList.filter((_, i) => i !== index);
    setBuiltUpAreaList(updatedList);
    if (editingIndex === index) {
      setFloor("");
      setArea("");
      setEditingIndex(null);
    }
  };

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
    const data = await calculateFee(agcForm.area);
    if (!data) {
      message.error("Error calculating fees");
      return;
    }

    const scrutinyAmount = data.ScrutinyAmount || 0;
    const securityAmount = data.SecurityAmount || 0;
    const labourCessAmount = data.LabourCessAmount || 0;
    const gst = data.ScrutinyAmount * 0.18;

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

  {
    /* { floor, area, scrutinyAmount,securityAmount, labourCessAmount,gst }; */
  }

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

    const data = await calculateFee(farForm.area);
    if (!data) {
      message.error("Error calculating fees");
      return;
    }

    const scrutinyAmount = data.ScrutinyAmount || 0;
    const securityAmount = data.SecurityAmount || 0;
    const labourCessAmount = data.LabourCessAmount || 0;
    const gst = data.ScrutinyAmount * 0.18;

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

  const saveDemandNote = async () => {
    try {
      const payload = {
        ApplicationId: applicationId,
        OrgId: OrgId,
        EntityRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
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

  console.log("NDC FORm");
  return (
    <>
      {redirect[0] && <Redirect to={redirect[1]} />}

      <Container>
        <Heading>Applicant Details</Heading>
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Row gutter="24">
            <Col span="10">
              <FormItem label="Applicant Name">
                <Input
                  size="large"
                  readOnly
                  defaultValue={verifyUpnAndMobileState.data.OwnerName}
                />
              </FormItem>
            </Col>
            <Col span="14">
              <FormItem label="Remark" name="Remark">
                <Input
                  size="large"
                  name="Remark"
                  onChange={handleOnChange}
                  showCount
                  maxLength={200}
                />
              </FormItem>
            </Col>
          </Row>
          <BlankSpace/>  

                      {serviceId==="1791" && (
                      <>
                        <Heading>Architect Details</Heading>
                        <Row gutter="24">
                            <Col span="8">
                                <FormItem
                                    label="Architect Name"
                                    name="ArchitectName"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Input name="ArchitectName" maxLength={100} size="large" />
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem
                                    label="Certificate No"
                                    name="ArchitectCertificateNo"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Input name="ArchitectCertificateNo" maxLength={50} size="large" />
                                </FormItem>
                            </Col>
                        </Row>
                        </>
                      )}

          <Heading>Property Details</Heading>
          <Row gutter="24">
            <Col span="8">
              <FormItem label="UPN">
                <Input
                  size="large"
                  readOnly
                  defaultValue={
                    verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.UPN
                  }
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="Area">
                <Input
                  size="large"
                  readOnly
                  defaultValue={
                    verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.Area
                  }
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="Authority Name">
                <Input
                  size="large"
                  readOnly
                  defaultValue={
                    verifyUpnAndMobileSubmitOtpState.data.ProertyDetails
                      .AuthorityName
                  }
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter="24">
            <Col span="8">
              <FormItem label="Plot Number">
                <Input
                  size="large"
                  readOnly
                  defaultValue={
                    verifyUpnAndMobileSubmitOtpState.data.ProertyDetails
                      .PlotNumber
                  }
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="Property Type">
                <Input
                  size="large"
                  readOnly
                  defaultValue={
                    verifyUpnAndMobileSubmitOtpState.data.ProertyDetails
                      .PropertyType
                  }
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="Scheme Name">
                <Input
                  size="large"
                  readOnly
                  defaultValue={
                    verifyUpnAndMobileSubmitOtpState.data.ProertyDetails
                      .SchemeName
                  }
                />
              </FormItem>
            </Col>
          </Row>

          {serviceId === "1791" && (
            <>
              <Row style={{ marginBottom: "20px" }}>
                <Col span="8">
                  <Form.Item label="Application Type" name="ApplicationType">
                    <Select
                      placeholder="Select application type"
                      style={{ width: "100%" }}
                      onChange={(value) => handleApplicationType(value)} // optional
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

              {/* <Heading>Details of Boundary Wall</Heading> */}
              <Heading>Site, Area and Cost Details</Heading>
              <Row gutter={24} align="middle">
                <Col span="6">
                  <FormItem
                    label="Total Construction Cost"
                    name="TotalConstructionCost"
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
                        >
                          <Input size="large" />
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem
                          label="Total Existing area (In sqmts)"
                          name="TotalExistingArea"
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
                        ></FormItem>
                      </Col>
                    </Row>
                  </>
                )}

              <Heading>Details of Built Up Area</Heading>
              <>
                {serviceId === "1791" && (
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
                      <FormItem
                        label={`Usage Type: ${verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.UsageType}`}
                        name="UsageType"
                      ></FormItem>
                      <FormItem label="AGC Usage Sub type">
                        <Select
                          value={agcUsageSubType}
                          onChange={(value) => {
                            setAgcUsageSubType(value);
                            setAgcCoverageType(null); // Reset coverage when usage type changes
                            setAgcForm((prev) => ({ ...prev, rates: 0 })); // Reset rates
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

                            // Set rates from FAR data based on selected usage type and coverage
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

                    {/* <Col span={3}>
              <FormItem label="Amount">
                <Input value={agcForm.amount} readOnly />
              </FormItem>
            </Col> */}

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
                            setFarCoverageType(null); // Reset coverage when usage type changes
                            setFarForm((prev) => ({ ...prev, rates: 0 })); // Reset rates
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

                            // Set rates from FAR data based on selected usage type and coverage
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

                    {/* <Col span={3}>
              <FormItem label="Amount">
                <Input value={farForm.amount} readOnly />
              </FormItem>
            </Col> */}

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
                {/* <Col span="8">
              <FormItem
                label={`TotalCalculation: ${totalCal}`}
                name="TotalCalculation"
              ></FormItem>
            </Col> */}
              </Row>
            </>
          )}
          {serviceId === "33" && (
            <>
              <Heading>
                Property Details where applicant will run professional
                consultancy services{" "}
              </Heading>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Enter PAN of Consultant"
                    name="PAN"
                    rules={[
                      { required: true, message: "Required" },
                      {
                        pattern: "^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$",
                        message: "PAN is not valid",
                      },
                    ]}
                  >
                    <Input name="PAN" size="large" onChange={handleOnChange} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label=" ">
                    <BlueButton onClick={callEntrepreneurDetailByPan}>
                      Fetch Details
                    </BlueButton>
                  </FormItem>
                </Col>
              </Row>
              <Heading>Applicant's Personal Details</Heading>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    name="Salutation"
                    label={"Salutation"}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      name="Salutation"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) => handleOnChangeSelect(v, "Salutation")}
                    >
                      <Option key={"Mr"} value={"Mr"}>
                        Mr
                      </Option>
                      <Option key={"Mrs"} value={"Mrs"}>
                        Mrs
                      </Option>
                      <Option key={"Ms"} value={"Ms"}>
                        Ms
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Full Name"
                    name="Name"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input name="Name" size="large" onChange={handleOnChange} />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Father's Name"
                    name="FatherHusbandName"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input
                      name="FatherHusbandName"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Gender"
                    name="Gender"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      name="Gender"
                      onSelect={(v) => handleOnChangeSelect(v, "Gender")}
                      size="large"
                    >
                      <Option key={"Male"} value={"Male"}>
                        Male
                      </Option>
                      <Option key={"Female"} value={"Female"}>
                        Female
                      </Option>
                      <Option key={"UnSpecified"} value={"UnSpecified"}>
                        UnSpecified
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Marital Status"
                    name="MaritalStatusId"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      name="MaritalStatusId"
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "MaritalStatusId")
                      }
                      size="large"
                    >
                      <Option key={218} value={218}>
                        Single
                      </Option>
                      <Option key={219} value={219}>
                        Married
                      </Option>
                      <Option key={220} value={220}>
                        Divorcee
                      </Option>
                      <Option key={221} value={221}>
                        Widow
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Date of Birth"
                    name="Dob"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <DatePicker
                      name="Dob"
                      size="large"
                      onChange={(date, dateString) =>
                        handleOnChangeDate(date, dateString, "Dob")
                      }
                      format="DD-MMM-YYYY"
                      disabledDate={disabledDob}
                      placeholder=""
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="UID/Aadhaar Number"
                    name="AadhaarNumber"
                    rules={[
                      { required: true, message: "Required" },
                      {
                        pattern: "^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$",
                        message: "Aadhaar number is not valid",
                      },
                    ]}
                  >
                    <Input
                      name="AadhaarNumber"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Email Address"
                    name="EmailAddress"
                    rules={[
                      { required: true, message: "Required" },
                      { type: "email", message: "Email is not valid" },
                    ]}
                  >
                    <Input
                      name="EmailAddress"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Mobile Number"
                    name="MobileNumber"
                    rules={[
                      { required: true, message: "Required" },
                      {
                        pattern: new RegExp("^[6-9]\\d{9}$"),
                        message: "Mobile number is not valid",
                      },
                    ]}
                  >
                    <Input
                      name="MobileNumber"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Heading>Applicant's Permanent Address</Heading>
              <Row gutter="24">
                <Col span="24">
                  <FormItem
                    label="Full Address"
                    name="PermanentAddress"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      name="PermanentAddress"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="State"
                    name="PermanentAddressState"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      showSearch
                      notFoundContent={null}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      autoComplete="dontshow"
                      name="PermanentAddressState"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) =>
                        handleOnChangeSelectState(
                          v,
                          "PermanentAddressState",
                          true
                        )
                      }
                    >
                      {getStateListState.list.map((item) => (
                        <Option key={item.Id} value={item.Id}>
                          {item.Name}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="District"
                    name="PermanentAddressDistrict"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      showSearch
                      notFoundContent={null}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      autoComplete="dontshow"
                      name="PermanentAddressDistrict"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "PermanentAddressDistrict")
                      }
                    >
                      {districtList.permanentDistrict.map((item) => (
                        <Option key={item.Id} value={item.Id}>
                          {item.Name}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Pincode"
                    name="PermanentAddressPin"
                    rules={[
                      { required: true, message: "Required" },
                      {
                        pattern: new RegExp("^[0-9]{6}$"),
                        message: "Enter valid Pincode.",
                      },
                    ]}
                  >
                    <Input
                      name="PermanentAddressPin"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="24">
                  <FormItem>
                    <Checkbox checked={checkSameAs} onChange={onSameAsChange}>
                      Applicant's Correspondence Address Same as Applicant's
                      Permanent Address
                    </Checkbox>
                  </FormItem>
                </Col>
              </Row>
              <div style={{ display: checkSameAs ? "none" : "block" }}>
                <Heading>Applicant's Correspondence Address</Heading>
                <Row gutter="24">
                  <Col span="24">
                    <FormItem
                      label="Full Address"
                      name="CorrespondenceAddress"
                      rules={[{ required: !checkSameAs, message: "Required" }]}
                    >
                      <Input
                        name="CorrespondenceAddress"
                        size="large"
                        onChange={handleOnChange}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem
                      label="State"
                      name="CorrespondenceAddressState"
                      rules={[{ required: !checkSameAs, message: "Required" }]}
                    >
                      <Select
                        showSearch
                        notFoundContent={null}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        autoComplete="dontshow"
                        name="CorrespondenceAddressState"
                        size="large"
                        style={{ width: "100%" }}
                        onSelect={(v) =>
                          handleOnChangeSelectState(
                            v,
                            "CorrespondenceAddressState",
                            false
                          )
                        }
                      >
                        {getStateListState.list.map((item) => (
                          <Option key={item.Id} value={item.Id}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem
                      label="District"
                      name="CorrespondenceAddressDistrict"
                      rules={[{ required: !checkSameAs, message: "Required" }]}
                    >
                      <Select
                        showSearch
                        notFoundContent={null}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        autoComplete="dontshow"
                        name="CorrespondenceAddressDistrict"
                        size="large"
                        style={{ width: "100%" }}
                        onSelect={(v) =>
                          handleOnChangeSelect(
                            v,
                            "CorrespondenceAddressDistrict"
                          )
                        }
                      >
                        {districtList.correspondenceDistrict.map((item) => (
                          <Option key={item.Id} value={item.Id}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem
                      label="Pincode"
                      name="CorrespondenceAddressPin"
                      rules={[
                        { required: !checkSameAs, message: "Required" },
                        {
                          pattern: new RegExp("^[0-9]{6}$"),
                          message: "Enter valid Pincode.",
                        },
                      ]}
                    >
                      <Input
                        name="CorrespondenceAddressPin"
                        size="large"
                        onChange={handleOnChange}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <Heading>Professional Consultancy Services Details</Heading>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Service Category"
                    name="ServiceCategory"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      name="ServiceCategory"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "ServiceCategory", false)
                      }
                    >
                      <Option key="Clinic" value="Clinic">
                        Clinic
                      </Option>
                      <Option key="Legal" value="Legal">
                        Legal
                      </Option>
                      <Option key="Others" value="Others">
                        Others
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Details of Profession"
                    name="ProfessionalDetail"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      name="ProfessionalDetail"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "ProfessionalDetail", false)
                      }
                    >
                      <Option key="LLB" value="LLB">
                        LLB
                      </Option>
                      <Option key="MBBS" value="MBBS">
                        MBBS
                      </Option>
                      <Option key="B.Arch" value="B.Arch">
                        B.Arch
                      </Option>
                      <Option
                        key="Marketing and Trading of Agriculture Consulting"
                        value="Marketing and Trading of Agriculture Consulting"
                      >
                        Marketing and Trading of Agriculture Consulting
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Details of Anticipated Visitors"
                    name="VisitorDetails"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      name="VisitorDetails"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Working hours of Consultancy"
                    name="WorkingHours"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      name="WorkingHours"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "WorkingHours", false)
                      }
                    >
                      <Option key="9.00 AM - 5.30 PM" value="9.00 AM - 5.30 PM">
                        9.00 AM - 5.30 PM
                      </Option>
                      <Option key="9.30 AM - 6.00 PM" value="9.30 AM - 6.00 PM">
                        9.30 AM - 6.00 PM
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Floor on which Services will be given"
                    name="Floor"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      name="Floor"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) => handleOnChangeSelect(v, "Floor", false)}
                    >
                      <Option key="Ground" value="Ground">
                        Ground
                      </Option>
                      <Option key="First" value="First">
                        First
                      </Option>
                      <Option key="Second" value="Second">
                        Second
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Total Area to be used in SQM"
                    name="TotalArea"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      name="TotalArea"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
            </>
          )}
          {(serviceId === "25" || serviceId === "32") && (
            <>
              <Row gutter="24">
                <Col span="8">
                  <FormItem label="Reserved Price">
                    <Input
                      size="large"
                      readOnly
                      defaultValue={
                        verifyUpnAndMobileSubmitOtpState.data.ProertyDetails
                          .ReservedPrice
                      }
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="Sale Type">
                    <Input
                      size="large"
                      readOnly
                      defaultValue={
                        verifyUpnAndMobileSubmitOtpState.data.ProertyDetails
                          .SaleType
                      }
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="Usage Type">
                    <Input
                      size="large"
                      readOnly
                      defaultValue={
                        verifyUpnAndMobileSubmitOtpState.data.ProertyDetails
                          .UsageType
                      }
                    />
                  </FormItem>
                </Col>
              </Row>
              {verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails.map(
                (purchaser) => {
                  return (
                    <>
                      <BlankSpace />
                      <Heading>
                        {serviceId === "25"
                          ? "Transferee’s Details as per NOC"
                          : "Transferee’s Details as per Transfer Permission"}{" "}
                        {`${purchaser.Name}`}
                      </Heading>
                      <Row gutter={24}>
                        <Col span="8">
                          <FormItem label={"Transferee's Name"}>
                            <Input
                              readOnly
                              defaultValue={`${purchaser.Name}`}
                              size="large"
                            />
                          </FormItem>
                        </Col>
                        <Col span="8">
                          <FormItem
                            label={`${purchaser.SalutationId === 88
                              ? "Husband Name"
                              : "Father Name"
                              }`}
                          >
                            <Input
                              readOnly
                              defaultValue={purchaser.FatherName}
                              size="large"
                            />
                          </FormItem>
                        </Col>
                        <Col span="8">
                          <FormItem label="Address">
                            <Input
                              size="large"
                              readOnly
                              defaultValue={purchaser.Address}
                            />
                          </FormItem>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span="8">
                          <FormItem label="Mobile">
                            <Input
                              readOnly
                              defaultValue={purchaser.MobileNumber}
                              size="large"
                            />
                          </FormItem>
                        </Col>
                        <Col span="8">
                          <FormItem label="Email">
                            <Input
                              readOnly
                              defaultValue={purchaser.EmailAddress}
                              size="large"
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </>
                  );
                }
              )}
            </>
          )}
          {serviceId === "1475" && (
            <>
              <Heading>Required Details</Heading>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Date of Sanction of Building Plan"
                    name="BuildingPlanSanctionDate"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <DatePicker
                      name="BuildingPlanSanctionDate"
                      size="large"
                      onChange={(date, dateString) =>
                        handleOnChangeDate(
                          date,
                          dateString,
                          "BuildingPlanSanctionDate"
                        )
                      }
                      format="DD-MMM-YYYY"
                      disabledDate={disabledDate}
                      placeholder=""
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Number of Floors Constructed"
                    name="NoOfFloorConstructed"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      name="NoOfFloorConstructed"
                      size="large"
                      notFoundContent={<span>Not Found</span>}
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "NoOfFloorConstructed")
                      }
                      // loading={LoadingDevelopmentAuthority === true}
                      autoComplete="dontshow"
                    >
                      <Option value="1">Groud Floor</Option>
                      <Option value="2">First Floor</Option>
                      <Option value="3">Second Floor</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    name="IsBasmentConstruct"
                    label="Is Basement Constructed"
                  >
                    <Checkbox
                      name="IsBasmentConstruct"
                      onChange={(e) =>
                        handleOnChangeCheck(e, "IsBasmentConstruct")
                      }
                    >
                      Yes
                    </Checkbox>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Proposed Covered Area  for Ground Floor (in Sq foot)"
                    name="AreaGroundFloor"
                    rules={[
                      {
                        required: formData.NoOfFloorConstructed >= 1,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      name="AreaGroundFloor"
                      maxLength={10}
                      disabled={formData.NoOfFloorConstructed < 1}
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(v) =>
                        handleOnChangeSelect(v, "AreaGroundFloor")
                      }
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Proposed Covered Area  for First Floor (in Sq foot)"
                    name="AreaFirstFloor"
                    rules={[
                      {
                        required: formData.NoOfFloorConstructed >= 2,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      name="AreaFirstFloor"
                      maxLength={10}
                      disabled={formData.NoOfFloorConstructed < 2}
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(v) =>
                        handleOnChangeSelect(v, "AreaFirstFloor")
                      }
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Proposed Covered Area  for Second Floor (in Sq foot)"
                    name="AreaSecondFloor"
                    rules={[
                      {
                        required: formData.NoOfFloorConstructed >= 3,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      name="AreaSecondFloor"
                      maxLength={10}
                      disabled={formData.NoOfFloorConstructed < 3}
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(v) =>
                        handleOnChangeSelect(v, "AreaSecondFloor")
                      }
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Service Pipe Length (in feet)"
                    name="ServicePipeLineLength"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      name="ServicePipeLineLength"
                      maxLength={2}
                      size="large"
                      onChange={(v) =>
                        handleOnChangeSelect(v, "ServicePipeLineLength")
                      }
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Service Pipe Size"
                    name="ServicePipeLineSize"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      name="ServicePipeLineSize"
                      size="large"
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "ServicePipeLineSize")
                      }
                      autoComplete="dontshow"
                    >
                      <Option value="20 mm (3/4 Inch)">20 mm (3/4 Inch)</Option>
                      <Option value="15 mm (1/2 Inch)">15 mm (1/2 Inch)</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="Number of Tapes" name="NumberOfTap">
                    <InputNumber
                      name="NumberOfTap"
                      maxLength={2}
                      size="large"
                      onChange={(v) => handleOnChangeSelect(v, "NumberOfTap")}
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="Size of Tap" name="SizeOfTap">
                    <Input
                      name="SizeOfTap"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Size of Ferrule Cock"
                    name="FerrulCockSize"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      name="FerrulCockSize"
                      size="large"
                      onSelect={(v) =>
                        handleOnChangeSelect(v, "FerrulCockSize")
                      }
                      autoComplete="dontshow"
                    >
                      <Option value="15 mm (1/2 Inch)">15 mm (1/2 Inch)</Option>
                      <Option value="25 mm (1 Inch)">25 mm (1 Inch)</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Purpose of Water Connection"
                    name="PurposeOfConnection"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Input
                      name="PurposeOfConnection"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Proposed Covered Area for Basement (in Sq foot)"
                    name="AreaBasment"
                    rules={[
                      {
                        required:
                          formData.IsBasmentConstruct === 1 ? true : false,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      name="AreaBasment"
                      maxLength={10}
                      size="large"
                      onChange={(v) => handleOnChangeSelect(v, "AreaBasment")}
                      disabled={
                        formData.IsBasmentConstruct === 1 ? false : true
                      }
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                {/* <Col span="8" >
                                    <FormItem
                                        label="Details of Sanitory Materials"
                                        name="SanaitaryMaterialsDtl"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <Input name="SanaitaryMaterialsDtl" size="large" onChange={handleOnChange} />
                                    </FormItem>
                                </Col>
                                <Col span="8" >
                                    <FormItem
                                        label="Hot Water Fitting Material Details"
                                        name="HotWaterFittingDtl"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <Input name="HotWaterFittingDtl" size="large" onChange={handleOnChange} />
                                    </FormItem>
                                </Col> */}

                <Col span="8">
                  <FormItem
                    name="IsMumtyConstructed"
                    label="Is Mumty Constructed"
                  >
                    <Checkbox
                      name="IsMumtyConstructed"
                      onChange={(e) =>
                        handleOnChangeCheck(e, "IsMumtyConstructed")
                      }
                    >
                      Yes
                    </Checkbox>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    name="AreaMumty"
                    label="Proposed Covered Area  for Mumty (in Sq foot)"
                    rules={[
                      {
                        required:
                          formData.IsMumtyConstructed === 1 ? true : false,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      name="AreaMumty"
                      maxLength={10}
                      size="large"
                      onChange={(v) => handleOnChangeSelect(v, "AreaMumty")}
                      disabled={
                        formData.IsMumtyConstructed === 1 ? false : true
                      }
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    name="ConstructionCost"
                    label="Total estimated cost of Construction (as per Architect)"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <InputNumber
                      name="ConstructionCost"
                      min={0}
                      maxLength={9}
                      size="large"
                      onChange={(v) =>
                        handleOnChangeSelect(v, "ConstructionCost")
                      }
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
              </Row>
            </>
          )}

          {(serviceId === "30" ||
            serviceId === "1059" ||
            serviceId === "1712" ||
            serviceId === "1716") && (
              <>
                <Heading>Required Details</Heading>
                {(serviceId === "1059" ||
                  serviceId === "1712" ||
                  serviceId === "1716") && (
                    <>
                      <Row gutter="24">
                        <Col span="8">
                          <FormItem
                            label="Water Meter No."
                            name="MeterNumber"
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <Input
                              name="MeterNumber"
                              size="large"
                              onChange={handleOnChange}
                            />
                          </FormItem>
                        </Col>
                        <Col span="8">
                          <FormItem
                            label="Make and Model"
                            name="MeterMakeAndModel"
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <Input
                              name="MeterMakeAndModel"
                              size="large"
                              onChange={handleOnChange}
                            />
                          </FormItem>
                        </Col>
                        <Col span="8">
                          <FormItem
                            label="Installation Date"
                            name="InstallationDate"
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <DatePicker
                              name="InstallationDate"
                              size="large"
                              onChange={(date, dateString) =>
                                handleOnChangeDate(
                                  date,
                                  dateString,
                                  "InstallationDate"
                                )
                              }
                              format="DD-MMM-YYYY"
                              disabledDate={disabledDate}
                              placeholder=""
                              style={{ width: "100%" }}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </>
                  )}
                <Row gutter="24">
                  {(serviceId === "1059" ||
                    serviceId === "1712" ||
                    serviceId === "1716") && (
                      <>
                        <Col span="8">
                          <FormItem
                            label="Water Meter Bill Number"
                            name="MeterBillNumber"
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <Input
                              name="MeterBillNumber"
                              size="large"
                              onChange={handleOnChange}
                            />
                          </FormItem>
                        </Col>
                        <Col span="8">
                          <FormItem
                            label="Warranty In Years"
                            name="MeterWarrantyYears"
                            rules={[
                              {
                                required: true,
                                message: "Required",
                              },
                            ]}
                          >
                            <Input
                              name="MeterWarrantyYears"
                              size="large"
                              onChange={handleOnChange}
                            />
                          </FormItem>
                        </Col>
                      </>
                    )}
                  <Col span="8">
                    <FormItem
                      label="Whether Building Is"
                      name="WheatherBuildingIs"
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                    >
                      <Select
                        name="WheatherBuildingIs"
                        size="large"
                        notFoundContent={<span>Not Found</span>}
                        onSelect={(v) =>
                          handleOnChangeSelect(v, "WheatherBuildingIs")
                        }
                        // loading={LoadingDevelopmentAuthority === true}
                        autoComplete="dontshow"
                      >
                        <Option value="1">Completed Constructed</Option>
                        <Option value="2">Partially Constructed</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem
                      label="Number of Floors Constructed"
                      name="NoOfFloorConstructed"
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                    >
                      <Select
                        name="NoOfFloorConstructed"
                        size="large"
                        notFoundContent={<span>Not Found</span>}
                        onSelect={(v) =>
                          handleOnChangeSelect(v, "NoOfFloorConstructed")
                        }
                        // loading={LoadingDevelopmentAuthority === true}
                        autoComplete="dontshow"
                      >
                        <Option value="1">Groud Floor</Option>
                        <Option value="2">First Floor</Option>
                        <Option value="3">Second Floor</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem
                      name="IsBasmentConstruct"
                      label="Is Basement Constructed"
                    >
                      <Checkbox
                        name="IsBasmentConstruct"
                        onChange={(e) =>
                          handleOnChangeCheck(e, "IsBasmentConstruct")
                        }
                      >
                        Yes
                      </Checkbox>
                    </FormItem>
                  </Col>
                </Row>
                {(serviceId === "30" ||
                  serviceId === "1059" ||
                  serviceId === "1712" ||
                  serviceId === "1716") && (
                    <Row gutter="24">
                      {serviceId === "30" && (
                        <>
                          <Col span="8">
                            <FormItem
                              label="Date of Sanction of Building Plan"
                              name="BuildingPlanSanctionDate"
                              rules={[
                                {
                                  required: true,
                                  message: "Required",
                                },
                              ]}
                            >
                              <DatePicker
                                name="BuildingPlanSanctionDate"
                                size="large"
                                onChange={(date, dateString) =>
                                  handleOnChangeDate(
                                    date,
                                    dateString,
                                    "BuildingPlanSanctionDate"
                                  )
                                }
                                format="DD-MMM-YYYY"
                                disabledDate={disabledDate}
                                placeholder=""
                                style={{ width: "100%" }}
                              />
                            </FormItem>
                          </Col>

                          <Col span="8">
                            <FormItem
                              label="Hot Water Fitting Material Details"
                              name="HotWaterFittingDtl"
                            // rules={[{
                            //     required: true,
                            //      message: 'Required'
                            // }]}
                            >
                              <Input
                                name="HotWaterFittingDtl"
                                size="large"
                                onChange={handleOnChange}
                              />
                            </FormItem>
                          </Col>
                          <Col span="8">
                            <FormItem
                              label="Hot Water Fitting Installation Bill Number"
                              name="HotWaterFittingBillNo"
                            // rules={[{
                            //     required: true,
                            //     message: 'Required'
                            // }]}
                            >
                              <Input
                                name="HotWaterFittingBillNo"
                                size="large"
                                onChange={handleOnChange}
                              />
                            </FormItem>
                          </Col>
                        </>
                      )}
                      {(serviceId === "30" ||
                        serviceId === "1059" ||
                        serviceId === "1712" ||
                        serviceId === "1716") && (
                          // <Col span="8" >
                          //     <FormItem
                          //         label="Number of Seats"
                          //         name="NumberOfSeats"
                          //         rules={[{
                          //             required: true,
                          //             message: 'Required'
                          //         }]}
                          //     >
                          //         <InputNumber name="NumberOfSeats" size="large" style={{ width: '100%' }} onChange={(v) => handleOnChangeSelect(v, 'NumberOfSeats')} />
                          //     </FormItem>
                          // </Col>
                          <>
                            <Col span="8">
                              <FormItem
                                label="Number of Seats For Ground Floor"
                                name="SeatsGroundFloor"
                                rules={[
                                  {
                                    required: formData.NoOfFloorConstructed >= 1,
                                    message: "Required",
                                  },
                                ]}
                              >
                                <InputNumber
                                  name="SeatsGroundFloor"
                                  maxLength={2}
                                  disabled={formData.NoOfFloorConstructed < 1}
                                  size="large"
                                  style={{ width: "100%" }}
                                  onChange={(v) =>
                                    handleOnChangeSelect(v, "SeatsGroundFloor")
                                  }
                                />
                              </FormItem>
                            </Col>
                            <Col span="8">
                              <FormItem
                                label="Number of Seats For First Floor"
                                name="SeatsFirstFloor"
                                rules={[
                                  {
                                    required: formData.NoOfFloorConstructed >= 2,
                                    message: "Required",
                                  },
                                ]}
                              >
                                <InputNumber
                                  name="SeatsFirstFloor"
                                  maxLength={2}
                                  disabled={formData.NoOfFloorConstructed < 2}
                                  size="large"
                                  style={{ width: "100%" }}
                                  onChange={(v) =>
                                    handleOnChangeSelect(v, "SeatsFirstFloor")
                                  }
                                />
                              </FormItem>
                            </Col>
                            <Col span="8">
                              <FormItem
                                label="Number of Seats For Second Floor"
                                name="SeatsSecondFloor"
                                rules={[
                                  {
                                    required: formData.NoOfFloorConstructed == 3,
                                    message: "Required",
                                  },
                                ]}
                              >
                                <InputNumber
                                  name="SeatsSecondFloor"
                                  maxLength={2}
                                  disabled={formData.NoOfFloorConstructed < 3}
                                  size="large"
                                  style={{ width: "100%" }}
                                  onChange={(v) =>
                                    handleOnChangeSelect(v, "SeatsSecondFloor")
                                  }
                                />
                              </FormItem>
                            </Col>
                          </>
                        )}
                    </Row>
                  )}
                {serviceId === "30" && (
                  <>
                    <Heading>
                      Plumber Certificate Details (Who issued certificate)
                    </Heading>
                    <Row gutter="24">
                      <Col span="8">
                        <FormItem
                          label="Name of the Plumber"
                          name="PlumberName"
                          rules={[
                            {
                              required: true,
                              message: "Required",
                            },
                          ]}
                        >
                          <Input
                            name="PlumberName"
                            size="large"
                            onChange={handleOnChange}
                          />
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem
                          label="License Number"
                          name="PlumberLicenseNumber"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp("^([A-Za-z]|[0-9])+$"),
                              message: "Required",
                            },
                          ]}
                        >
                          <Input
                            name="PlumberLicenseNumber"
                            maxLength={45}
                            size="large"
                            onChange={handleOnChange}
                          />
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem
                          label="Address of the Plumber"
                          name="PlumberAddress"
                          rules={[
                            {
                              required: true,
                              message: "Required",
                            },
                          ]}
                        >
                          <Input
                            name="PlumberAddress"
                            maxLength={200}
                            size="large"
                            onChange={handleOnChange}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter="24">
                      <Col span="8">
                        <FormItem
                          label="Date of Issue of Certificate"
                          name="CerificateIssueDate"
                          rules={[
                            {
                              required: true,
                              message: "Required",
                            },
                          ]}
                        >
                          <DatePicker
                            name="CerificateIssueDate"
                            size="large"
                            onChange={(date, dateString) =>
                              handleOnChangeDate(
                                date,
                                dateString,
                                "CerificateIssueDate"
                              )
                            }
                            format="DD-MMM-YYYY"
                            disabledDate={disabledDate}
                            placeholder=""
                            style={{ width: "100%" }}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            )}
          {(serviceId === "27" ||
            serviceId === "1729" ||
            serviceId === "1730" ||
            serviceId === "1731" ||
            serviceId === "1732" ||
            serviceId === "951") && (
              <>
                <Heading>Building Plan Details</Heading>
                <Row gutter="24">
                  {/* {verifyUpnAndMobileSubmitOtpState.data.AreainSqYard > 1195.99 &&
                                    <Col span="8" >
                                        <FormItem
                                            label="Wall Construction Length (In meters)"
                                            name="WallConstructLength"
                                            rules={[{
                                                required: true,
                                                message: 'Required'
                                            }]}
                                        >
                                            <InputNumber name="WallConstructLength" min={0} maxLength={5} size="large" onChange={(v) => handleOnChangeSelect(v, 'WallConstructLength')} style={{ width: '100%' }} />
                                        </FormItem>
                                    </Col>
                                } */}
                  {/* <Col span="8" >
                                    <FormItem
                                        label="Building Constructed/Covered Area (In Sq. meters)"
                                        name="ConstructArea"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <InputNumber name="ConstructArea" min={0} maxLength={5} size="large" onChange={(v) => handleOnChangeSelect(v, 'ConstructArea')} style={{ width: '100%' }} />
                                    </FormItem>
                                </Col> */}

                  <Col span="8">
                    <FormItem
                      label="Total Building Construction Cost (In rupees)"
                      name="ConstructionCost"
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                    >
                      <InputNumber
                        name="ConstructionCost"
                        min={0}
                        maxLength={9}
                        size="large"
                        onChange={(v) =>
                          handleOnChangeSelect(v, "ConstructionCost")
                        }
                        style={{ width: "100%" }}
                      />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem
                      label="Are you applying for revised plan"
                      name="IsRevisedPlan"
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                    >
                      <Radio.Group
                        name="IsRevisedPlan"
                        size="large"
                        onChange={handleOnChange}
                      >
                        <Radio value="true">Yes</Radio>
                        <Radio value="false">No</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                  {/* <Col span="8" >
                                    <Button type="primary" onClick={getFee}>Calculate Fee</Button>
                                </Col> */}
                </Row>
                {getFeeDetailsState.apiState === "success" && (
                  <>
                    <Heading>Building Plan Fee Details</Heading>
                    <Row gutter="24">
                      <Col span="8">
                        <FormItem label="Scrutiny Amount">
                          <Input
                            size="large"
                            readOnly
                            defaultValue={getFeeDetailsState.data.ScrutinyAmount}
                          />
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="Security Amount">
                          <Input
                            size="large"
                            readOnly
                            defaultValue={getFeeDetailsState.data.SecurityAmount}
                          />
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="Labour Cess Amount">
                          <Input
                            size="large"
                            readOnly
                            defaultValue={
                              getFeeDetailsState.data.LabourCessAmount
                            }
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            )}

          {getDocumentListState.apiState === "success" && !paymentOnly && (
            <>
              <Heading>Documents Required</Heading>
              {getDocumentListState.list.map((item, idx) => (
                <>
                  <Row gutter="24">
                    <Col span="24">
                      <FileTitle>
                        <span>{idx + 1}.</span>
                        <div>
                          <ValidationDiv
                            className={item.IsMandatory ? "validate" : ""}
                          >
                            {item.Name}
                          </ValidationDiv>
                          <div>
                            <span style={{ color: "red" }}>
                              (File must be in "
                              {renderExtensions(item.Extensions)} format and
                              less than {item.MaxSizeInKb}KB in size.")
                            </span>
                          </div>
                          {(item.IsPVerificationRequired ||
                            item.SampleFileURL) && (
                              <Space>
                                {item.SampleFileURL ? (
                                  <Link
                                    to={{ pathname: item.SampleFileURL }}
                                    target="_blank"
                                    style={{
                                      textDecoration: "underline",
                                      color: "#006fc3",
                                    }}
                                  >
                                    Download Sample Document.
                                  </Link>
                                ) : null}
                                {item.IsPVerificationRequired && props.serviceId !== 1791 && (
                                  <Alert
                                    message="Physical verification required."
                                    type="warning"
                                    style={{ padding: "0px 8px" }}
                                  />
                                )}
                              </Space>
                            )}
                        </div>
                      </FileTitle>
                    </Col>
                    <Col span="24">
                      <Form.Item
                        name={item.Name}
                        getValueFromEvent={normFile}
                        rules={[
                          { required: item.IsMandatory, message: "Required" },
                        ]}
                        style={{ paddingLeft: 22 }}
                      >
                        <DocumentUpload
                          name={item.Name}
                          listType="picture-card"
                          onPreview={() =>
                            onPreview(
                              _.find(defaultFileList, {
                                documentTypeId: item.DocumentTypeId,
                              })
                            )
                          }
                          action={encodeURI(
                            `${conf.api.base_url
                            }DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=${props.serviceId
                            }&DocumentTypeId=${item.DocumentTypeId
                            }&Documentname=${item.Name
                            }&EntityTypeID=111&ApplicationId=${getDocumentListState.EntityId
                            }&PhysicalVerificationRequired=${item.IsPVerificationRequired ? 1 : 0
                            }`
                          )}
                          headers={{
                            AuthToken:
                              verifyUpnAndMobileSubmitOtpState.AuthToken,
                            AuthTokenKey:
                              verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                          }}
                          beforeUpload={(file) => {
                            setUploadLoading({
                              ...uploadLoading,
                              [idx]: true,
                            });
                            setFiles({
                              ...files,
                              [idx]: file,
                            });
                            setFileList((state) => ({
                              ...fileList,
                              [idx]: [],
                            }));
                            setSubmitDocumentStatus(true);
                            return true;
                          }}
                          onRemove={(file) => {
                            const defaultFileLists = defaultFileList;
                            let DocumentTypeId = item.DocumentTypeId;

                            // Get DocumentId: use uid from loaded document, or documentFileId for uploaded documents
                            const loadedFile = _.find(defaultFileList, { documentTypeId: item.DocumentTypeId });
                            const documentId = loadedFile ? loadedFile.uid : documentFileId[idx];

                            fetch(
                              `${conf.api.base_url}DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${documentId}`,
                              {
                                method: "post",
                                headers: {
                                  AuthToken:
                                    verifyUpnAndMobileSubmitOtpState.AuthToken,
                                  AuthTokenKey:
                                    verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                                },
                              }
                            )
                              .then((res) => {
                                if (res.status === 200) {
                                  let fileArr = [];
                                  defaultFileLists.forEach((defaultItem) => {
                                    if (
                                      defaultItem.documentTypeId !==
                                      DocumentTypeId
                                    ) {
                                      fileArr.push(defaultItem);
                                    }
                                  });
                                  setDefaultFileList(fileArr);
                                  // Clear form field value for Ant Design validation
                                  form.setFieldsValue({
                                    [item.Name]: []
                                  });
                                  setFileList((state) => ({
                                    ...fileList,
                                    [idx]: [],
                                  }));
                                } else {
                                  return null;
                                }
                              })
                              .catch(console.log);
                          }}
                          onError={(info) => {
                            setSubmitDocumentStatus(false);
                          }}
                          onSuccess={(response) => {
                            if (response.Status === 2) {
                              setDocumentFileId((state) => ({
                                ...documentFileId,
                                [idx]: response.CustomObject.FileId,
                              }));

                              let fileArr = [];
                              const defaultFileLists = defaultFileList;
                              defaultFileLists.forEach((defaultItem) => {
                                fileArr.push(defaultItem);
                              });
                              let extension = files[idx].name.substr(
                                files[idx].name.lastIndexOf(".") + 1
                              );
                              let filePrependString = "";
                              if (
                                extension === "jpg" ||
                                extension === "jpeg" ||
                                extension === "png"
                              ) {
                                filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`;
                              } else {
                                filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`;
                              }
                              fileArr.push({
                                documentTypeId: item.DocumentTypeId,
                                uid: response.CustomObject.FileId,
                                name: files[idx].name,
                                status: "done",
                                url: filePrependString,
                                thumbUrl: filePrependString,
                                preview: filePrependString,
                              });
                              setDefaultFileList(fileArr);
                              // Set form field value for Ant Design validation
                              form.setFieldsValue({
                                [item.Name]: [{
                                  documentTypeId: item.DocumentTypeId,
                                  uid: response.CustomObject.FileId,
                                  name: files[idx].name,
                                  status: "done",
                                  url: filePrependString,
                                  thumbUrl: filePrependString,
                                  preview: filePrependString,
                                }]
                              });
                              setFileList((state) => ({
                                ...fileList,
                                [idx]: [
                                  {
                                    documentTypeId: item.DocumentTypeId,
                                    uid: response.CustomObject.FileId,
                                    name: files[idx].name,
                                    status: "done",
                                    url: filePrependString,
                                    thumbUrl: filePrependString,
                                    preview: filePrependString,
                                  },
                                ],
                              }));
                            }
                            if (response.Status === 1) {
                              notification["error"]({
                                message: response.Message,
                                placement: "bottomRight",
                              });
                            }
                            setUploadLoading({
                              ...uploadLoading,
                              [idx]: false,
                            });
                            setSubmitDocumentStatus(false);
                          }}
                          defaultFileList={
                            _.find(defaultFileList, {
                              documentTypeId: item.DocumentTypeId,
                            })
                              ? [
                                _.find(defaultFileList, {
                                  documentTypeId: item.DocumentTypeId,
                                }),
                              ]
                              : []
                          }
                          fileList={fileList[idx]}
                          allowedFileTypes={item.Extensions}
                        >
                          {_.find(defaultFileList, {
                            documentTypeId: item.DocumentTypeId,
                          }) ? null : (
                            <Button
                              icon={<UploadOutlined />}
                              loading={uploadLoading[idx]}
                            >
                              Click to Upload
                            </Button>
                          )}
                        </DocumentUpload>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ))}
            </>
          )}
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            {currentFileType === "pdf" ? (
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
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            )}
          </Modal>
          {(getAppointmentDateState.apiState === "success" && serviceId !== "1791") &&
            isPVerificationRequired && (
              <>
                <Heading style={{ marginTop: 36 }}>
                  Appointment Detail For Physical Verification of Documents
                </Heading>
                <Row>
                  <Col span="10">
                    <FormItem
                      name="AppointmentDate"
                      label="Select Appointment Date"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Select
                        name="AppointmentDate"
                        size="large"
                        onSelect={(v) =>
                          handleOnChangeSelect(v, "AppointmentDate")
                        }
                      >
                        {getAppointmentDateState.data.map((item) => {
                          return (
                            <Option
                              key={item.AppointmentDate}
                              value={item.AppointmentDate}
                            >
                              {item.AppointmentDate}
                            </Option>
                          );
                        })}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </>
            )}
          {getServiceDetailState.data.Declaration !== null && (
            <Row>
              <Col span="24">
                <FormItem
                  name="declaration"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error(
                              "Please accept declaration before submitting application."
                            )
                          ),
                    },
                  ]}
                >
                  <label style={{ display: "flex" }}>
                    <Checkbox />
                    <div
                      style={{ marginLeft: 8 }}
                      dangerouslySetInnerHTML={createMarkup(
                        getServiceDetailState.data.Declaration
                      )}
                    />
                  </label>
                </FormItem>
              </Col>
            </Row>
          )}
          <BlankSpace />

          {(serviceId === "1791" ? (
            <Space size="middle">
              <BlueButton
                disabled={submitAsDraftDisabled || paymentOnly}
                loading={saveApplicationAsDraftState.apiState === "loading"}
                onClick={handleSaveAsDraft}
              >
                Save Application As Draft
              </BlueButton>

              <BlueButton
                disabled={payDisabled}
                loading={
                  saveChangeOfOwnershipApplicationState.apiState === "loading"
                }
                onClick={showPaymentConfirmation}
              >
                PAY NOW
              </BlueButton>

              {/* <BlueButton
                disabled={acknowledgeDisabled}
                icon={<PrinterFilled />}
                onClick={acknowledgementClick}
              >
                ACKNOWLEDGEMENT
              </BlueButton> */}
            </Space>
          ) :

            getDocumentListState.apiState === "success" &&
            (
              <BlueButton
                disabled={submitDocumentStatus}
                loading={
                  saveWaterApplicationState.apiState === "loading" ||
                  saveChangeOfOwnershipApplicationState.apiState ===
                  "loading" ||
                  saveNdcApplicationState.apiState === "loading" ||
                  saveNdcApplicationState.apiState === "success" ||
                  savePermittingProfessionalServiceState.apiState === "loading"
                }
                htmlType="submit"
              >
                SUBMIT
              </BlueButton>
            ))}
          {/* baldeep */}
          {/* {getDocumentListState.apiState === "success" && (
            <BlueButton
              disabled={submitDocumentStatus}
              loading={
                saveWaterApplicationState.apiState === "loading" ||
                saveChangeOfOwnershipApplicationState.apiState === "loading" ||
                saveNdcApplicationState.apiState === "loading" ||
                saveNdcApplicationState.apiState === "success" ||
                savePermittingProfessionalServiceState.apiState === "loading"
                  ? true
                  : false
              }
              htmlType="submit"
            >
              SUBMIT
            </BlueButton>
          )} */}
        </Form>

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
                    {feeData.ScrutinyFee.toLocaleString("en-IN", {
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
                    {(feeData.ScrutinyFee * 0.18).toLocaleString("en-IN", {
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
                      feeData.ScrutinyFee +
                      feeData.ScrutinyFee * 0.18
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
                    {feeData.SecurityFee.toLocaleString("en-IN", {
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
                    {feeData.LabourCessFee.toLocaleString("en-IN", {
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
                    fontWeight: "700",
                  }}
                >
                  <strong>Total Amount:</strong>
                  <strong style={{ color: "#1890ff" }}>
                    ₹
                    {(
                      feeData.ScrutinyFee +
                      feeData.ScrutinyFee * 0.18 +
                      feeData.SecurityFee +
                      feeData.LabourCessFee
                    ).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>

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

        <Modal
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
            <Link to={`/ndc-details/${applicationId}?org=${OrgId}}`}>
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
        </Modal>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  getServiceDetailState: state.getServiceDetail,
  getDocumentListState: state.getDocumentList,
  verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
  verifyUpnAndMobileState: state.verifyUpnAndMobile,
  saveNdcApplicationState: state.saveNdcApplication,
  saveWaterApplicationState: state.saveWaterApplication,
  getAppointmentDateState: state.getAppointmentDate,
  saveChangeOfOwnershipApplicationState: state.saveChangeOfOwnershipApplication,
  saveApplicationAsDraftState: state.saveApplicationAsDraft,
  getSalutationListState: state.getSalutationList,
  getStateListState: state.getStateList,
  getDistrictListState: state.getDistrictList,
  getEntrepreneurDetailByPanState: state.getEntrepreneurDetailByPan,
  savePermittingProfessionalServiceState:
    state.savePermittingProfessionalService,
  getFeeDetailsState: state.getFeeDetails,
  getDraftApplicationDetailsState: state.getDraftApplicationDetails,
  transferApplicationFetchState: state.transferApplicationFetch,
  PropertyDuePaymentsState: state.PropertyDuePayments,
  postAutoDCRState: state.postAutoDCR,
  getApplicationProgressState: state.getApplicationProgress,
});

const mapDispatchToProps = (dispatch) => ({
  getDocumentList: (params) => dispatch(getDocumentList(params)),
  saveNdcApplication: (params) => dispatch(saveNdcApplication(params)),
  saveNdcApplicationResetState: () => dispatch(saveNdcApplicationResetState()),
  saveWaterApplication: (params) => dispatch(saveWaterApplication(params)),
  saveWaterApplicationResetState: () =>
    dispatch(saveWaterApplicationResetState()),
  getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
  getAppointmentDateResetState: () => dispatch(getAppointmentDateResetState()),
  getDocumentListResetState: () => dispatch(getDocumentListResetState()),
  saveChangeOfOwnershipApplication: (params) =>
    dispatch(saveChangeOfOwnershipApplication(params)),
  resetStateSaveChangeOfOwnershipApplication: () =>
    dispatch(resetStateSaveChangeOfOwnershipApplication()),
  saveApplicationAsDraft: (params) => dispatch(saveApplicationAsDraft(params)),
  resetStateSaveApplicationAsDraft: () =>
    dispatch(resetStateSaveApplicationAsDraft()),
  getSalutationList: (params) => dispatch(getSalutationList(params)),
  getStateList: (params) => dispatch(getStateList(params)),
  getStateListResetState: () => dispatch(getStateListResetState()),
  getDistrictList: (params) => dispatch(getDistrictList(params)),
  getDistrictListResetState: () => dispatch(getDistrictListResetState()),
  getEntrepreneurDetailByPan: (params) =>
    dispatch(getEntrepreneurDetailByPan(params)),
  savePermittingProfessionalService: (params) =>
    dispatch(savePermittingProfessionalService(params)),
  savePermittingProfessionalServiceResetState: () =>
    dispatch(savePermittingProfessionalServiceResetState()),
  getFeeDetails: (params) => dispatch(getFeeDetails(params)),
  getFeeDetailsResetState: () => dispatch(getFeeDetailsResetState()),
  getDraftApplicationDetails: (params) =>
    dispatch(getDraftApplicationDetails(params)),
  getDraftApplicationDetailsResetState: () =>
    dispatch(getDraftApplicationDetailsResetState()),
  fetchTransferApplication: (params) => dispatch(fetchTransferApplication(params)),
  resetStateFetchTransferApplication: () => dispatch(resetStateFetchTransferApplication()),
  getPaymentIntegrationPayload: (params) =>
    dispatch(getPaymentIntegrationPayload(params)),

  paymentIntegrationStatusCheck: (params) =>
    dispatch(paymentIntegrationStatusCheck(params)),
  postAutoDCR: (params) => dispatch(postAutoDCR(params)),
  postAutoDCRResetState: () => dispatch(postAutoDCRResetState()),
  getApplicationProgress: (params) => dispatch(getApplicationProgress(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NdcForm);
