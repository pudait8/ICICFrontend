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
} from "antd";
import { connect } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
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
} from "../Xcomponents";

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
import { getOrgId, getArchitectToken } from "../../utils";
import conf from "../../config";
import { Link, Redirect } from "react-router-dom";
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

  // callbacks
  useEffect(() => {
    getStateList({
      OrgId: OrgId,
    });
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
    };
  }, []);

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
      setRedirect([
        true,
        "/ndc-details/" + saveNdcApplicationState.data.ApplicationId,
      ]);
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
  // functions
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                            label={`${
                              purchaser.SalutationId === 88
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

          {getDocumentListState.apiState === "success" && (
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
                              {item.IsPVerificationRequired && (
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
                            `${
                              conf.api.base_url
                            }DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=${
                              props.serviceId
                            }&DocumentTypeId=${
                              item.DocumentTypeId
                            }&Documentname=${
                              item.Name
                            }&EntityTypeID=111&ApplicationId=${
                              getDocumentListState.EntityId
                            }&PhysicalVerificationRequired=${
                              item.IsPVerificationRequired ? 1 : 0
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
                            fetch(
                              `${conf.api.base_url}DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${documentFileId[idx]}`,
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
          {getAppointmentDateState.apiState === "success" &&
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
          {getDocumentListState.apiState === "success" && (
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
          )}
        </Form>
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
  getSalutationListState: state.getSalutationList,
  getStateListState: state.getStateList,
  getDistrictListState: state.getDistrictList,
  getEntrepreneurDetailByPanState: state.getEntrepreneurDetailByPan,
  savePermittingProfessionalServiceState:
    state.savePermittingProfessionalService,
  getFeeDetailsState: state.getFeeDetails,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NdcForm);
