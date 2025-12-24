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
} from "antd";
import { connect } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import _ from "lodash";

// components
import { Container, Heading } from "./EditNdcFormStyle";
import {
  FormItem,
  BlankSpace,
  BlueButton,
  DocumentUpload,
  ValidationDiv,
  FileTitle,
} from "../Xcomponents";
import EditOwnerForm from "./EditOwnerForm";

// actions
import {
  toGetPrivatePropertiesList,
  toGetPrivatePropertiesListResetState,
} from "../../actions/toGetPrivatePropertiesListAction";
import {
  saveProfessionalService,
  saveProfessionalServiceResetState,
} from "../../actions/saveProfessionalServiceAction";
import {
  getDocumentList,
  getDocumentListResetState,
} from "../../actions/getDocumentListAction";
import {
  saveEditApplication,
  saveEditApplicationResetState,
} from "../../actions/saveEditApplicationAction";
import {
  saveEditWaterApplication,
  saveEditWaterApplicationResetState,
} from "../../actions/saveEditWaterApplicationAction";
import {
  saveEditProfessionalService,
  saveEditProfessionalServiceResetState,
} from "../../actions/saveEditProfessionalServiceAction";
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
  getNdcDetails,
  getNdcDetailsResetState,
} from "../../actions/getNdcDetailsAction";
import {
  toGetPrivateScheme,
  toGetPrivateSchemeResetState,
} from "../../actions/toGetPrivateSchemeAction";
import {
  getAppointmentDate,
  getAppointmentDateResetState,
} from "../../actions/getAppointmentDateAction";

// others
import { getOrgId, getAuthData } from "../../utils";
import conf from "../../config";
import { Link, Redirect } from "react-router-dom";
const { Option } = Select;
const EditNdcForm = (props) => {
  const serviceId = props.serviceId;
  // variables
  const {
    getServiceDetailState,
    getNdcDetailsState,
    getNdcDetails,
    toGetPrivateSchemeState,
    toGetPrivateScheme,
    getDocumentList,
    getDocumentListResetState,
    getDocumentListState,
    toGetPrivatePropertiesListState,
    toGetPrivatePropertiesList,
    verifyUpnAndMobileSubmitOtpState,
    saveProfessionalServiceState,
    verifyUpnAndMobileState,
    saveProfessionalService,
    saveProfessionalServiceResetState,
    saveEditApplication,
    saveEditApplicationResetState,
    saveEditApplicationState,
    saveEditWaterApplication,
    saveEditWaterApplicationResetState,
    saveEditWaterApplicationState,
    saveEditProfessionalService,
    saveEditProfessionalServiceResetState,
    saveEditProfessionalServiceState,
    viewEditApplicationState,
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
    getAppointmentDateState,
    getAppointmentDate,
  } = props;

  let initialFormData = {};
  if (
    serviceId === "30" ||
    serviceId === "1059" ||
    serviceId === "1712" ||
    serviceId === "1716" ||
    serviceId === "1475"
  ) {
    initialFormData = {
      Remark: viewEditApplicationState.data.Remarks,
      Remarks: "",
      DetailId: viewEditApplicationState.data.WaterApplicationDetails.DetailId,
      ApplicationRefId:
        viewEditApplicationState.data.WaterApplicationDetails.ApplicationRefId,
      ApplicationDetail:
        viewEditApplicationState.data.WaterApplicationDetails.Remark,
      // Remarks: viewEditApplicationState.data.WaterApplicationDetails.Remarks,
      AppointmentDate:
        viewEditApplicationState.data.WaterApplicationDetails.AppointmentDate,
      WheatherBuildingIs:
        viewEditApplicationState.data.WaterApplicationDetails
          .WheatherBuildingIs,
      NoOfFloorConstructed:
        viewEditApplicationState.data.WaterApplicationDetails
          .NoOfFloorConstructed,
      IsBasmentConstruct:
        viewEditApplicationState.data.WaterApplicationDetails
          .IsBasmentConstruct,
      BuildingPlanSanctionDate:
        viewEditApplicationState.data.WaterApplicationDetails
          .BuildingPlanSanctionDate,
      PlumberName:
        viewEditApplicationState.data.WaterApplicationDetails.PlumberName,
      PlumberLicenseNumber:
        viewEditApplicationState.data.WaterApplicationDetails
          .PlumberLicenseNumber,
      PlumberAddress:
        viewEditApplicationState.data.WaterApplicationDetails.PlumberAddress,
      CerificateIssueDate:
        viewEditApplicationState.data.WaterApplicationDetails
          .CerificateIssueDate,
      NumberOfSeats:
        viewEditApplicationState.data.WaterApplicationDetails.NumberOfSeats,
      SeatsGroundFloor:
        viewEditApplicationState.data.WaterApplicationDetails.SeatsGroundFloor,
      SeatsFirstFloor:
        viewEditApplicationState.data.WaterApplicationDetails.SeatsFirstFloor,
      SeatsSecondFloor:
        viewEditApplicationState.data.WaterApplicationDetails.SeatsSecondFloor,
      ServicePipeLineLength:
        viewEditApplicationState.data.WaterApplicationDetails
          .ServicePipeLineLength,
      ServicePipeLineSize:
        viewEditApplicationState.data.WaterApplicationDetails
          .ServicePipeLineSize,
      NumberOfTap:
        viewEditApplicationState.data.WaterApplicationDetails.NumberOfTap,
      SizeOfTap:
        viewEditApplicationState.data.WaterApplicationDetails.SizeOfTap,
      FerrulCockSize:
        viewEditApplicationState.data.WaterApplicationDetails.FerrulCockSize,
      SanaitaryMaterialsDtl:
        viewEditApplicationState.data.WaterApplicationDetails
          .SanaitaryMaterialsDtl,
      HotWaterFittingDtl:
        viewEditApplicationState.data.WaterApplicationDetails
          .HotWaterFittingDtl,
      PurposeOfConnection:
        viewEditApplicationState.data.WaterApplicationDetails
          .PurposeOfConnection,
      AreaMumty:
        viewEditApplicationState.data.WaterApplicationDetails.AreaMumty,
      IsMumtyConstructed:
        viewEditApplicationState.data.WaterApplicationDetails
          .IsMumtyConstructed,
      AreaGroundFloor:
        viewEditApplicationState.data.WaterApplicationDetails.AreaGroundFloor,
      AreaFirstFloor:
        viewEditApplicationState.data.WaterApplicationDetails.AreaFirstFloor,
      AreaSecondFloor:
        viewEditApplicationState.data.WaterApplicationDetails.AreaSecondFloor,
      ConstructionCost:
        viewEditApplicationState.data.WaterApplicationDetails.ConstructionCost,
      MeterNumber:
        viewEditApplicationState.data.WaterApplicationDetails.MeterNumber,
      MeterMakeAndModel:
        viewEditApplicationState.data.WaterApplicationDetails.MeterMakeAndModel,
      InstallationDate: viewEditApplicationState.data.WaterApplicationDetails
        .InstallationDate
        ? moment(
            viewEditApplicationState.data.WaterApplicationDetails
              .InstallationDate
          )
        : "",
      MeterBillNumber:
        viewEditApplicationState.data.WaterApplicationDetails.MeterBillNumber,
      MeterWarrantyYears:
        viewEditApplicationState.data.WaterApplicationDetails
          .MeterWarrantyYears,
      HotWaterFittingBillNo:
        viewEditApplicationState.data.WaterApplicationDetails
          .HotWaterFittingBillNo,
      AreaBasment:
        viewEditApplicationState.data.WaterApplicationDetails.AreaBasment,
    };
  } else if (serviceId === "33") {
    initialFormData = {
      Remark: viewEditApplicationState.data.Remarks,
      Remarks: "",
      PAN: viewEditApplicationState.data.EntrepreneurDetails.Pan,
      Salutation: viewEditApplicationState.data.EntrepreneurDetails.Title,
      Name: viewEditApplicationState.data.EntrepreneurDetails.FullName,
      MobileNumber:
        viewEditApplicationState.data.EntrepreneurDetails.MobileNumber,
      EmailAddress:
        viewEditApplicationState.data.EntrepreneurDetails.EmailAddress,
      Gender: viewEditApplicationState.data.EntrepreneurDetails.Gender,
      MaritalStatusId:
        viewEditApplicationState.data.EntrepreneurDetails.MaritalStatusId,
      Dob: viewEditApplicationState.data.EntrepreneurDetails.Dob,
      FatherHusbandName:
        viewEditApplicationState.data.EntrepreneurDetails.FatherName,
      AadhaarNumber: viewEditApplicationState.data.EntrepreneurDetails.Aadhar,
      PermanentAddress:
        viewEditApplicationState.data.EntrepreneurDetails.PeAddressLine1,
      PermanentAddressDistrict:
        viewEditApplicationState.data.EntrepreneurDetails.PeDistrictId,
      PermanentAddressState:
        viewEditApplicationState.data.EntrepreneurDetails.PeStateId,
      PermanentAddressPin:
        viewEditApplicationState.data.EntrepreneurDetails.PePin,
      CorrespondenceAddress:
        viewEditApplicationState.data.EntrepreneurDetails.CoAddressLine1,
      CorrespondenceAddressDistrict:
        viewEditApplicationState.data.EntrepreneurDetails.CoDistrictId,
      CorrespondenceAddressState:
        viewEditApplicationState.data.EntrepreneurDetails.CoStateId,
      CorrespondenceAddressPin:
        viewEditApplicationState.data.EntrepreneurDetails.CoPin,
      ServiceCategory:
        viewEditApplicationState.data.EntrepreneurDetails.ServiceCategory,
      ProfessionalDetail:
        viewEditApplicationState.data.EntrepreneurDetails.ProfessionalDetail,
      VisitorDetails:
        viewEditApplicationState.data.EntrepreneurDetails.VisitorDetail,
      WorkingHours:
        viewEditApplicationState.data.EntrepreneurDetails.WorkingHours,
      Floor: viewEditApplicationState.data.EntrepreneurDetails.Floor,
      TotalArea: viewEditApplicationState.data.EntrepreneurDetails.TotalArea,
      IsCorrespondenceAddressSame: false,
    };
  } else {
    initialFormData = {
      Remark: viewEditApplicationState.data.Remarks,
      Remarks: "",
      PermissionNo: viewEditApplicationState.data.PermissionNo,
      AppointmentDate: "",
    };
  }

  // useEffect(() => {
  //     if (getNdcDetailsState.apiState === 'success') {
  //         if (serviceId === '1679' ||
  //             serviceId === '1710' ||
  //             serviceId === '1727') {
  //             setFormData({
  //                 ...formData,
  //                 ['PAN']: getNdcDetailsState.data.EntrepreneurDetails.Pan,
  //                 ['Salutation']: getNdcDetailsState.data.EntrepreneurDetails.Title,
  //                 ['FullName']: getNdcDetailsState.data.EntrepreneurDetails.FullName,
  //                 ['FatherName']: getNdcDetailsState.data.EntrepreneurDetails.FatherName,
  //                 ['Gender']: getNdcDetailsState.data.EntrepreneurDetails.Gender,
  //                 ['MaritalStatus']: getNdcDetailsState.data.EntrepreneurDetails.MaritalStatus,
  //                 ['Dob']: getNdcDetailsState.data.EntrepreneurDetails.Dob,
  //                 ['Aadhar']: getNdcDetailsState.data.EntrepreneurDetails.Aadhar,
  //                 ['EmailAddress']: getNdcDetailsState.data.EntrepreneurDetails.EmailAddress,
  //                 ['MobileNumber']: getNdcDetailsState.data.EntrepreneurDetails.MobileNumber,
  //                 ['LicenseNumber']: getNdcDetailsState.data.EntrepreneurDetails.LicenseNumber,
  //                 ['LicenseIssueDate']: getNdcDetailsState.data.EntrepreneurDetails.LicenseIssueDate,
  //                 ['LicenseExpiryDate']: getNdcDetailsState.data.EntrepreneurDetails.LicenseExpiryDate,
  //                 ['PeAddressLine1']: getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1,
  //                 ['PeState']: getNdcDetailsState.data.EntrepreneurDetails.PeState,
  //                 ['PeDistrict']: getNdcDetailsState.data.EntrepreneurDetails.PeDistrict,
  //                 ['PePin']: getNdcDetailsState.data.EntrepreneurDetails.PePin,
  //                 ['CoAddressLine1']: getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1,
  //                 ['CoState']: getNdcDetailsState.data.EntrepreneurDetails.CoState,
  //                 ['CoDistrict']: getNdcDetailsState.data.EntrepreneurDetails.CoDistrict,
  //                 ['CoPin']: getNdcDetailsState.data.EntrepreneurDetails.CoPin
  //             })
  //         }
  //     }
  // }, [getNdcDetailsState])

  const [formData, setFormData] = useState(initialFormData);
  const [validDate, setValidDate] = useState({
    ValidFrom: null,
    ValidTill: null,
  });
  const [form] = Form.useForm();
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
  const [callDistrictPInitial, setCallDistrictPInitial] = useState(0);
  const [callDistrictCInitial, setCallDistrictCInitial] = useState(0);

  // defaultValue = { viewEditApplicationState.data.WaterApplicationDetails.MeterNumber }
  // callbacks
  useEffect(() => {
    getStateList({
      OrgId: OrgId,
    });
    return () => {
      saveProfessionalServiceResetState();
      saveEditApplicationResetState();
      saveEditWaterApplicationResetState();
      saveEditProfessionalServiceResetState();
      getDocumentListResetState();
      getDistrictListResetState();
      getStateListResetState();
    };
  }, []);

  useEffect(() => {
    if (viewEditApplicationState.apiState === "success") {
      if (
        serviceId === "30" ||
        serviceId === "1059" ||
        serviceId === "1712" ||
        serviceId === "1716" ||
        serviceId === "1475"
      ) {
        form.setFieldsValue({
          DetailId:
            viewEditApplicationState.data.WaterApplicationDetails.DetailId,
          ApplicationRefId:
            viewEditApplicationState.data.WaterApplicationDetails
              .ApplicationRefId,
          ApplicationDetail:
            viewEditApplicationState.data.WaterApplicationDetails.Remark,
          Remarks:
            viewEditApplicationState.data.WaterApplicationDetails.Remarks,
          AppointmentDate:
            viewEditApplicationState.data.WaterApplicationDetails
              .AppointmentDate,
          WheatherBuildingIs:
            viewEditApplicationState.data.WaterApplicationDetails
              .WheatherBuildingIsString,
          NoOfFloorConstructed:
            viewEditApplicationState.data.WaterApplicationDetails
              .NoOfFloorConstructedString,
          IsBasmentConstruct:
            viewEditApplicationState.data.WaterApplicationDetails
              .IsBasmentConstruct === 1
              ? true
              : false,
          BuildingPlanSanctionDate: viewEditApplicationState.data
            .WaterApplicationDetails.BuildingPlanSanctionDate
            ? moment(
                viewEditApplicationState.data.WaterApplicationDetails
                  .BuildingPlanSanctionDate
              )
            : "",
          PlumberName:
            viewEditApplicationState.data.WaterApplicationDetails.PlumberName,
          PlumberLicenseNumber:
            viewEditApplicationState.data.WaterApplicationDetails
              .PlumberLicenseNumber,
          PlumberAddress:
            viewEditApplicationState.data.WaterApplicationDetails
              .PlumberAddress,
          CerificateIssueDate: viewEditApplicationState.data
            .WaterApplicationDetails.CerificateIssueDate
            ? moment(
                viewEditApplicationState.data.WaterApplicationDetails
                  .CerificateIssueDate
              )
            : "",
          NumberOfSeats:
            viewEditApplicationState.data.WaterApplicationDetails.NumberOfSeats,
          SeatsGroundFloor:
            viewEditApplicationState.data.WaterApplicationDetails
              .SeatsGroundFloor,
          SeatsFirstFloor:
            viewEditApplicationState.data.WaterApplicationDetails
              .SeatsFirstFloor,
          SeatsSecondFloor:
            viewEditApplicationState.data.WaterApplicationDetails
              .SeatsSecondFloor,
          ServicePipeLineLength:
            viewEditApplicationState.data.WaterApplicationDetails
              .ServicePipeLineLength,
          ServicePipeLineSize:
            viewEditApplicationState.data.WaterApplicationDetails
              .ServicePipeLineSize,
          NumberOfTap:
            viewEditApplicationState.data.WaterApplicationDetails.NumberOfTap,
          SizeOfTap:
            viewEditApplicationState.data.WaterApplicationDetails.SizeOfTap,
          FerrulCockSize:
            viewEditApplicationState.data.WaterApplicationDetails
              .FerrulCockSize,
          SanaitaryMaterialsDtl:
            viewEditApplicationState.data.WaterApplicationDetails
              .SanaitaryMaterialsDtl,
          HotWaterFittingDtl:
            viewEditApplicationState.data.WaterApplicationDetails
              .HotWaterFittingDtl,
          PurposeOfConnection:
            viewEditApplicationState.data.WaterApplicationDetails
              .PurposeOfConnection,
          AreaMumty:
            viewEditApplicationState.data.WaterApplicationDetails.AreaMumty,
          IsMumtyConstructed:
            viewEditApplicationState.data.WaterApplicationDetails
              .IsMumtyConstructed === 1
              ? true
              : false,
          AreaGroundFloor:
            viewEditApplicationState.data.WaterApplicationDetails
              .AreaGroundFloor,
          AreaFirstFloor:
            viewEditApplicationState.data.WaterApplicationDetails
              .AreaFirstFloor,
          AreaSecondFloor:
            viewEditApplicationState.data.WaterApplicationDetails
              .AreaSecondFloor,
          ConstructionCost:
            viewEditApplicationState.data.WaterApplicationDetails
              .ConstructionCost,
          MeterNumber:
            viewEditApplicationState.data.WaterApplicationDetails.MeterNumber,
          MeterMakeAndModel:
            viewEditApplicationState.data.WaterApplicationDetails
              .MeterMakeAndModel,
          InstallationDate: viewEditApplicationState.data
            .WaterApplicationDetails.InstallationDate
            ? moment(
                viewEditApplicationState.data.WaterApplicationDetails
                  .InstallationDate
              )
            : "",
          MeterBillNumber:
            viewEditApplicationState.data.WaterApplicationDetails
              .MeterBillNumber,
          MeterWarrantyYears:
            viewEditApplicationState.data.WaterApplicationDetails
              .MeterWarrantyYears,
          HotWaterFittingBillNo:
            viewEditApplicationState.data.WaterApplicationDetails
              .HotWaterFittingBillNo,
          AreaBasment:
            viewEditApplicationState.data.WaterApplicationDetails.AreaBasment,
        });
      } else if (serviceId === "33") {
        form.setFieldsValue({
          Remark: viewEditApplicationState.data.Remarks,
          Remarks: "",
          PAN: viewEditApplicationState.data.EntrepreneurDetails.Pan,
          Salutation: viewEditApplicationState.data.EntrepreneurDetails.Title,
          Name: viewEditApplicationState.data.EntrepreneurDetails.FullName,
          MobileNumber:
            viewEditApplicationState.data.EntrepreneurDetails.MobileNumber,
          EmailAddress:
            viewEditApplicationState.data.EntrepreneurDetails.EmailAddress,
          Gender: viewEditApplicationState.data.EntrepreneurDetails.Gender,
          MaritalStatusId:
            viewEditApplicationState.data.EntrepreneurDetails.MaritalStatus,
          Dob: viewEditApplicationState.data.EntrepreneurDetails.Dob
            ? moment(viewEditApplicationState.data.EntrepreneurDetails.Dob)
            : "",
          FatherHusbandName:
            viewEditApplicationState.data.EntrepreneurDetails.FatherName,
          AadhaarNumber:
            viewEditApplicationState.data.EntrepreneurDetails.Aadhar,
          PermanentAddress:
            viewEditApplicationState.data.EntrepreneurDetails.PeAddressLine1,
          // PermanentAddressDistrict: viewEditApplicationState.data.EntrepreneurDetails.PeDistrict,
          PermanentAddressState:
            viewEditApplicationState.data.EntrepreneurDetails.PeState,
          PermanentAddressPin:
            viewEditApplicationState.data.EntrepreneurDetails.PePin,
          CorrespondenceAddress:
            viewEditApplicationState.data.EntrepreneurDetails.CoAddressLine1,
          // CorrespondenceAddressDistrict: viewEditApplicationState.data.EntrepreneurDetails.CoDistrict,
          CorrespondenceAddressState:
            viewEditApplicationState.data.EntrepreneurDetails.CoState,
          CorrespondenceAddressPin:
            viewEditApplicationState.data.EntrepreneurDetails.CoPin,
          ServiceCategory:
            viewEditApplicationState.data.EntrepreneurDetails.ServiceCategory,
          ProfessionalDetail:
            viewEditApplicationState.data.EntrepreneurDetails
              .ProfessionalDetail,
          VisitorDetails:
            viewEditApplicationState.data.EntrepreneurDetails.VisitorDetail,
          WorkingHours:
            viewEditApplicationState.data.EntrepreneurDetails.WorkingHours,
          Floor: viewEditApplicationState.data.EntrepreneurDetails.Floor,
          TotalArea:
            viewEditApplicationState.data.EntrepreneurDetails.TotalArea,
          IsCorrespondenceAddressSame: false,
        });
      } else if (serviceId === "1625" || serviceId === "1626") {
        form.setFieldsValue({
          ApplicantName: viewEditApplicationState.data.ApplicantDetails.Name,
          MobileNumber: viewEditApplicationState.data.ApplicantDetails.MobileNo,
          Area: viewEditApplicationState.data.PropertyDetails.Area,
          AuthorityName:
            viewEditApplicationState.data.PropertyDetails.AuthorityName,
          Remark: viewEditApplicationState.data.Remarks,
          AppointmentDate:
            viewEditApplicationState.data.AppointmentDetail
              .AppointmentDateWithSlot,
        });
        setFormData({
          ["ApplicantName"]:
            viewEditApplicationState.data.ApplicantDetails.Name,
          ["Remark"]: viewEditApplicationState.data.Remarks,
          ["AppointmentDate"]:
            viewEditApplicationState.data.AppointmentDetail
              .AppointmentDateWithSlot,
        });
      }
    }
  }, [viewEditApplicationState]);

  useEffect(() => {
    if (getNdcDetailsState.apiState === "success") {
      if (
        serviceId === "1679" ||
        serviceId === "1710" ||
        serviceId === "1727"
      ) {
        setFormData({
          ["PAN"]: getNdcDetailsState.data.EntrepreneurDetails.Pan,
          ["Salutation"]: getNdcDetailsState.data.EntrepreneurDetails.Title,
          ["Name"]: getNdcDetailsState.data.EntrepreneurDetails.FullName,
          ["FatherHusbandName"]:
            getNdcDetailsState.data.EntrepreneurDetails.FatherName,
          ["Gender"]: getNdcDetailsState.data.EntrepreneurDetails.Gender,
          ["MaritalStatus"]:
            getNdcDetailsState.data.EntrepreneurDetails.MaritalStatusId,
          ["DateOfBirth"]: moment(
            getNdcDetailsState.data.EntrepreneurDetails.Dob
          ),
          ["AadhaarNumber"]: getNdcDetailsState.data.EntrepreneurDetails.Aadhar,
          ["EmailAddress"]:
            getNdcDetailsState.data.EntrepreneurDetails.EmailAddress,
          ["MobileNumber"]:
            getNdcDetailsState.data.EntrepreneurDetails.MobileNumber,
          ["CertificateNumber"]:
            getNdcDetailsState.data.EntrepreneurDetails.LicenseNumber,
          ["ValidFrom"]: moment(
            getNdcDetailsState.data.EntrepreneurDetails.LicenseIssueDate
          ),
          ["ValidTill"]: moment(
            getNdcDetailsState.data.EntrepreneurDetails.LicenseExpiryDate
          ),
          ["PermanentAddress"]:
            getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1,
          ["PermanentAddressState"]:
            getNdcDetailsState.data.EntrepreneurDetails.PeStateId,
          ["PermanentAddressDistrict"]:
            getNdcDetailsState.data.EntrepreneurDetails.PeDistrictId,
          ["PermanentAddressPin"]:
            getNdcDetailsState.data.EntrepreneurDetails.PePin,
          ["CorrespondenceAddress"]:
            getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1,
          ["CorrespondenceAddressState"]:
            getNdcDetailsState.data.EntrepreneurDetails.CoStateId,
          ["CorrespondenceAddressDistrict"]:
            getNdcDetailsState.data.EntrepreneurDetails.CoDistrictId,
          ["CorrespondenceAddressPin"]:
            getNdcDetailsState.data.EntrepreneurDetails.CoPin,
        });
        form.setFieldsValue({
          PAN: getNdcDetailsState.data.EntrepreneurDetails.Pan,
          Salutation: getNdcDetailsState.data.EntrepreneurDetails.Title,
          Name: getNdcDetailsState.data.EntrepreneurDetails.FullName,
          FatherHusbandName:
            getNdcDetailsState.data.EntrepreneurDetails.FatherName,
          Gender: getNdcDetailsState.data.EntrepreneurDetails.Gender,
          MaritalStatus:
            getNdcDetailsState.data.EntrepreneurDetails.MaritalStatus,
          DateOfBirth: moment(getNdcDetailsState.data.EntrepreneurDetails.Dob),
          AadhaarNumber: getNdcDetailsState.data.EntrepreneurDetails.Aadhar,
          EmailAddress:
            getNdcDetailsState.data.EntrepreneurDetails.EmailAddress,
          MobileNumber:
            getNdcDetailsState.data.EntrepreneurDetails.MobileNumber,
          CertificateNumber:
            getNdcDetailsState.data.EntrepreneurDetails.LicenseNumber,
          ValidFrom: moment(
            getNdcDetailsState.data.EntrepreneurDetails.LicenseIssueDate
          ),
          ValidTill: moment(
            getNdcDetailsState.data.EntrepreneurDetails.LicenseExpiryDate
          ),
          PermanentAddress:
            getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1,
          PermanentAddressState:
            getNdcDetailsState.data.EntrepreneurDetails.PeState,
          PermanentAddressDistrict:
            getNdcDetailsState.data.EntrepreneurDetails.PeDistrict,
          PermanentAddressPin:
            getNdcDetailsState.data.EntrepreneurDetails.PePin,
          CorrespondenceAddress:
            getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1,
          CorrespondenceAddressState:
            getNdcDetailsState.data.EntrepreneurDetails.CoState,
          CorrespondenceAddressDistrict:
            getNdcDetailsState.data.EntrepreneurDetails.CoDistrict,
          CorrespondenceAddressPin:
            getNdcDetailsState.data.EntrepreneurDetails.CoPin,
        });
      }
    }
  }, [getNdcDetailsState]);

  useEffect(() => {
    if (viewEditApplicationState.apiState === "success") {
      if (serviceId === "33") {
        if (callDistrictPInitial === 0) {
          setSelectState(true);
          getDistrictList({
            OrgId: OrgId,
            StateId:
              viewEditApplicationState.data.EntrepreneurDetails.PeStateId,
          });
        } else if (callDistrictCInitial === 0 && callDistrictPInitial === 1) {
          setSelectState(false);
          getDistrictList({
            OrgId: OrgId,
            StateId:
              viewEditApplicationState.data.EntrepreneurDetails.CoStateId,
          });
        }
      }
    }
  }, [callDistrictPInitial, callDistrictCInitial]);

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
    getDocumentList({
      PropertyId: viewEditApplicationState.data.PropertyRefId,
      OrgId: OrgId,
      ApplicationTypeId: props.serviceId,
      AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
      AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
    });
    getNdcDetails({
      OrgId: OrgId,
      ApplicationId: parseInt(viewEditApplicationState.data.ApplicationId),
      AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
      AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
      ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
      ArchitectTokenKey:
        verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? "",
    });
    getSalutationList({
      OrgId: OrgId,
      AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
      AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
    });
    toGetPrivateScheme();
  }, []);

  useEffect(() => {
    if (getDocumentListState.apiState === "success") {
      // let data = _.find(getDocumentListState.list, { 'IsPVerificationRequired': true }) ? true : false
      // if (data) {
      //     setIsPVerificationRequired(true)

      // }
      // else {
      //     setIsPVerificationRequired(false)
      // }

      let fileArr = [];
      viewEditApplicationState.data.Documents.map((item) => {
        let extension = item.FileName.substr(
          item.FileName.lastIndexOf(".") + 1
        );
        let filePrependString = "";
        if (
          extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png"
        ) {
          filePrependString = `data:image/${extension};base64,${item.FileData}`;
        } else {
          filePrependString = `data:application/${extension};base64,${item.FileData}`;
        }
        fileArr.push({
          documentTypeId: item.DocumentTypeId,
          uid: item.DocumentId,
          name: item.FileName,
          status: "done",
          url: filePrependString,
          thumbUrl: filePrependString,
          preview: filePrependString,
        });
      });
      setDefaultFileList(fileArr);
    }
  }, [getDocumentListState]);

  useEffect(() => {
    if (saveEditApplicationState.apiState === "alert") {
      notification["error"]({
        message: saveEditApplicationState.apiMessage,
        placement: "bottomRight",
      });
      saveEditApplicationResetState();
    }

    if (saveEditApplicationState.apiState === "success") {
      notification["success"]({
        message: saveEditApplicationState.apiMessage,
        placement: "bottomRight",
      });
      setRedirect([
        true,
        "/ndc-details/" + viewEditApplicationState.data.ApplicationId,
      ]);
    }
  }, [saveEditApplicationState]);

  useEffect(() => {
    if (saveEditWaterApplicationState.apiState === "alert") {
      notification["error"]({
        message: saveEditWaterApplicationState.apiMessage,
        placement: "bottomRight",
      });
      saveEditWaterApplicationResetState();
    }

    if (saveEditWaterApplicationState.apiState === "success") {
      notification["success"]({
        message: saveEditWaterApplicationState.apiMessage,
        placement: "bottomRight",
      });
      setRedirect([
        true,
        "/ndc-details/" + viewEditApplicationState.data.ApplicationId,
      ]);
    }
  }, [saveEditWaterApplicationState]);

  useEffect(() => {
    if (saveEditProfessionalServiceState.apiState === "alert") {
      notification["error"]({
        message: saveEditProfessionalServiceState.apiMessage,
        placement: "bottomRight",
      });
      saveEditProfessionalServiceResetState();
    }

    if (saveEditProfessionalServiceState.apiState === "success") {
      notification["success"]({
        message: saveEditProfessionalServiceState.apiMessage,
        placement: "bottomRight",
      });
      setRedirect([true, "/"]);
    }
  }, [saveEditProfessionalServiceState]);

  // functions
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      serviceId === "30" ||
      serviceId === "1059" ||
      serviceId === "1712" ||
      serviceId === "1716" ||
      serviceId === "1475"
    ) {
      saveEditWaterApplication({
        DetailId: formData.DetailId,
        ApplicationRefId: formData.ApplicationRefId,
        ApplicationDetail: formData.Remark,
        Remarks: formData.Remarks,
        AppointmentDate: formData.AppointmentDate,
        WheatherBuildingIs: formData.WheatherBuildingIs,
        NoOfFloorConstructed: formData.NoOfFloorConstructed,
        IsBasmentConstruct: formData.IsBasmentConstruct,
        BuildingPlanSanctionDate: formData.BuildingPlanSanctionDate,
        PlumberName: formData.PlumberName,
        PlumberLicenseNumber: formData.PlumberLicenseNumber,
        PlumberAddress: formData.PlumberAddress,
        CerificateIssueDate: formData.CerificateIssueDate,
        NumberOfSeats: formData.NumberOfSeats,
        SeatsGroundFloor: formData.SeatsGroundFloor,
        SeatsFirstFloor: formData.SeatsFirstFloor,
        SeatsSecondFloor: formData.SeatsSecondFloor,
        ServicePipeLineLength: formData.ServicePipeLineLength,
        ServicePipeLineSize: formData.ServicePipeLineSize,
        NumberOfTap: formData.NumberOfTap,
        SizeOfTap: formData.SizeOfTap,
        FerrulCockSize: formData.FerrulCockSize,
        SanaitaryMaterialsDtl: formData.SanaitaryMaterialsDtl,
        HotWaterFittingDtl: formData.HotWaterFittingDtl,
        PurposeOfConnection: formData.PurposeOfConnection,
        AreaMumty: formData.AreaMumty,
        IsMumtyConstructed: formData.IsMumtyConstructed,
        AreaGroundFloor: formData.AreaGroundFloor,
        AreaFirstFloor: formData.AreaFirstFloor,
        AreaSecondFloor: formData.AreaSecondFloor,
        ConstructionCost: formData.ConstructionCost,
        MeterNumber: formData.MeterNumber,
        MeterMakeAndModel: formData.MeterMakeAndModel,
        InstallationDate: formData.InstallationDate,
        MeterBillNumber: formData.MeterBillNumber,
        MeterWarrantyYears: formData.MeterWarrantyYears,
        HotWaterFittingBillNo: formData.HotWaterFittingBillNo,
        AreaBasment: formData.AreaBasment,
        OrgId: OrgId,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    } else if (serviceId === "33") {
      saveEditProfessionalService({
        ApplicationId: verifyUpnAndMobileSubmitOtpState.data.ApplicationId,
        ApplicationDetail: formData.Remark,
        Remarks: formData.Remarks,
        OrgId: OrgId,
        PAN: formData.PAN,
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
      serviceId === "1679" ||
      serviceId === "1710" ||
      serviceId === "1727"
    ) {
      saveEditProfessionalService({
        ApplicationId: viewEditApplicationState.data.ApplicationId,
        PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
        RegistrationCategory: formData.RegistrationCategory,
        AppointmentDate: formData.AppointmentDate,
        OrgId: OrgId,
        PAN: formData.PAN,
        PreRegNo: formData.PreRegNo,
        Salutation: formData.Salutation,
        Name: formData.Name,
        FatherHusbandName: formData.FatherHusbandName,
        Gender: formData.Gender,
        MaritalStatusId: formData.MaritalStatus,
        Dob: formData.DateOfBirth,
        AadhaarNumber: formData.AadhaarNumber,
        MobileNumber: formData.MobileNumber,
        EmailAddress: formData.EmailAddress,
        CertificateNumber: formData.CertificateNumber,
        ValidFrom: formData.ValidFrom,
        ValidTill: formData.ValidTill,
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
    } else if (serviceId === "1626" || serviceId === "1625") {
      saveEditApplication({
        OrgId: OrgId,
        ApplicationType: props.serviceId,
        ApplicationId: viewEditApplicationState.data.ApplicationId,
        Name: formData.ApplicantName,
        Remarks: formData.Remark,
        AppointmentDate: formData.AppointmentDate,
        SubmitType: 1,
        GPASPA: "",
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
      });
    } else {
      saveEditApplication({
        ApplicationType: props.serviceId,
        PropertyRefId: viewEditApplicationState.data.PropertyRefId,
        Remark: formData.Remark,
        Remarks: formData.Remarks,
        ApplicationId: viewEditApplicationState.data.ApplicationId,
        GPASPA: "N",
        OwnerId: viewEditApplicationState.data.OwnerId,
        OrgId: OrgId,
        PermissionNo: formData.PermissionNo,
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
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

  useEffect(() => {
    if (getDistrictListState.apiState === "success") {
      if (selectState) {
        setDistrictList({
          ...districtList,
          ["permanentDistrict"]: getDistrictListState.list,
        });
        if (callDistrictPInitial === 1) {
          setFormData({ ...formData, ["PermanentAddressDistrict"]: "" });
          form.setFieldsValue({
            PermanentAddressDistrict: null,
          });
        } else {
          form.setFieldsValue({
            PermanentAddressDistrict:
              viewEditApplicationState.data.EntrepreneurDetails.PeDistrict,
          });
          setCallDistrictPInitial(1);
        }
      } else {
        setDistrictList({
          ...districtList,
          ["correspondenceDistrict"]: getDistrictListState.list,
        });
        if (callDistrictCInitial === 1) {
          setFormData({ ...formData, ["CorrespondenceAddressDistrict"]: "" });
          form.setFieldsValue({
            CorrespondenceAddressDistrict: null,
          });
        } else {
          form.setFieldsValue({
            CorrespondenceAddressDistrict:
              viewEditApplicationState.data.EntrepreneurDetails.CoDistrict,
          });
          setCallDistrictCInitial(1);
        }
      }
    } else if (
      getDistrictListState.apiState === "alert" &&
      getDistrictListState.apiState === "error"
    ) {
      if (selectState) {
        setDistrictList({ ...districtList, ["permanentDistrict"]: [] });
        setFormData({ ...formData, ["PermanentAddressDistrict"]: "" });
        form.setFieldsValue({
          PermanentAddressDistrict: null,
        });
        setCallDistrictPInitial(1);
      } else {
        setDistrictList({ ...districtList, ["correspondenceDistrict"]: [] });
        setFormData({ ...formData, ["CorrespondenceAddressDistrict"]: "" });
        form.setFieldsValue({
          CorrespondenceAddressDistrict: null,
        });
        setCallDistrictCInitial(1);
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

  // Functions
  const callEntrepreneurDetailByPan = () => {
    getEntrepreneurDetailByPan({
      OrgId: OrgId,
      PAN: formData.PAN,
      AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
      AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
    });
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
      // const image = new Image();
      // image.src = src;
      // const imgWindow = window.open(src);
      // imgWindow.document.write(image.outerHTML);
      setCurrentFileType("image");
      setPreviewImage(src);
      setPreviewVisible(true);
    } else {
      setCurrentFileType("pdf");
      setPreviewImage(src);
      setPreviewVisible(true);
      // let pdfWindow = window.open("")
      // pdfWindow.document.write(
      //     "<iframe width='100%' height='100%' src='" +
      //     src + "'></iframe>"
      // )
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const renderExtensions = (extension) => {
    let extensionData = [];
    extension.map((data) => {
      let a = "." + _.split(data, "/")[1];
      extensionData.push(a);
    });
    return extensionData.join(", ");
  };

  const handleOnChangeDateValid = (date, dateString, name) => {
    setValidDate({ ...validDate, [name]: date });
    setFormData({ ...formData, [name]: dateString });
  };

  const disabledValidFromDate = (current) => {
    if (validDate.ValidTill !== null) {
      return current && current > validDate.ValidTill;
    } else {
      return current && current < validDate.ValidTill;
    }
  };

  const disabledValidTillDate = (current) => {
    return current && current < validDate.ValidFrom;
  };

  useEffect(() => {
    form.setFieldsValue({ PropertyNumber: "" });
    toGetPrivatePropertiesList(formData.Scheme);
  }, [formData.Scheme]);

  return (
    <>
      {
        redirect[0] && <Redirect to={redirect[1]} />
        // <Redirect to="/" />
      }

      <Container>
        {serviceId === "1679" ||
        serviceId === "1710" ||
        serviceId === "1727" ? (
          getNdcDetailsState.apiState === "success" && (
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <Heading>Application Details</Heading>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Enter PAN of Architect"
                    name="PAN"
                    rules={[
                      { required: true, message: "Required" },
                      {
                        pattern: "^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$",
                        message: "PAN is not valid",
                      },
                    ]}
                  >
                    <Input
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.Pan
                      }
                      name="PAN"
                      size="large"
                      onChange={handleOnChange}
                    />
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

              <Heading>Architect's Personal Details</Heading>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    name="Salutation"
                    label={"Salutation"}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.Title
                      }
                      name="Salutation"
                      size="large"
                      style={{ width: "100%" }}
                      onSelect={(v) => handleOnChangeSelect(v, "Salutation")}
                    >
                      {getSalutationListState.list.map((item) => (
                        <>
                          {item.NameRegional === "I" && (
                            <Option key={item.Id} value={item.Name}>
                              {item.Name}
                            </Option>
                          )}
                        </>
                      ))}
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
                    <Input
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.FullName
                      }
                      name="Name"
                      size="large"
                      onChange={handleOnChange}
                    />
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.FatherName
                      }
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.Gender
                      }
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
                    name="MaritalStatus"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Select
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails
                          .MaritalStatus
                      }
                      name="MaritalStatus"
                      onSelect={(v) => handleOnChangeSelect(v, "MaritalStatus")}
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
                    name="DateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <DatePicker
                      defaultValue={moment(
                        getNdcDetailsState.data.EntrepreneurDetails.Dob
                      )}
                      name="DateOfBirth"
                      size="large"
                      onChange={(date, dateString) =>
                        handleOnChangeDate(date, dateString, "DateOfBirth")
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.Aadhar
                      }
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.EmailAddress
                      }
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.MobileNumber
                      }
                      name="MobileNumber"
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Heading>
                Certificate of Registration Details at Council of Architecture
              </Heading>
              <Row gutter="24">
                <Col span="8">
                  <FormItem
                    label="Certificate Number"
                    name="CertificateNumber"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails
                          .LicenseNumber
                      }
                      name="CertificateNumber"
                      maxLength={25}
                      size="large"
                      onChange={handleOnChange}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Valid From"
                    name="ValidFrom"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <DatePicker
                      defaultValue={moment(
                        getNdcDetailsState.data.EntrepreneurDetails
                          .LicenseIssueDate
                      )}
                      name="ValidFrom"
                      size="large"
                      onChange={(date, dateString) =>
                        handleOnChangeDateValid(date, dateString, "ValidFrom")
                      }
                      format="DD-MMM-YYYY"
                      disabledDate={disabledValidFromDate}
                      placeholder=""
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem
                    label="Valid Till"
                    name="ValidTill"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <DatePicker
                      name="ValidTill"
                      size="large"
                      onChange={(date, dateString) =>
                        handleOnChangeDateValid(date, dateString, "ValidTill")
                      }
                      format="DD-MMM-YYYY"
                      disabledDate={disabledValidTillDate}
                      placeholder=""
                      style={{ width: "100%" }}
                      defaultValue={moment(
                        getNdcDetailsState.data.EntrepreneurDetails
                          .LicenseExpiryDate
                      )}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Heading>Architect's Permanent Address</Heading>
              <Row gutter="24">
                <Col span="24">
                  <FormItem
                    label="Full Address"
                    name="PermanentAddress"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails
                          .PeAddressLine1
                      }
                      name="PermanentAddress"
                      maxLength={195}
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.PeState
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.PeDistrict
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
                      defaultValue={
                        getNdcDetailsState.data.EntrepreneurDetails.PePin
                      }
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
                      Architect's official Address Same as Architect's Permanent
                      Address
                    </Checkbox>
                  </FormItem>
                </Col>
              </Row>
              <div style={{ display: checkSameAs ? "none" : "block" }}>
                <Heading>Architect's official Address</Heading>
                <Row gutter="24">
                  <Col span="24">
                    <FormItem
                      label="Full Address"
                      name="CorrespondenceAddress"
                      rules={[{ required: !checkSameAs, message: "Required" }]}
                    >
                      <Input
                        defaultValue={
                          getNdcDetailsState.data.EntrepreneurDetails
                            .CoAddressLine1
                        }
                        name="CorrespondenceAddress"
                        maxLength={195}
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
                        defaultValue={
                          getNdcDetailsState.data.EntrepreneurDetails.CoState
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
                        defaultValue={
                          getNdcDetailsState.data.EntrepreneurDetails.CoDistrict
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
                        defaultValue={
                          getNdcDetailsState.data.EntrepreneurDetails.CoPin
                        }
                        name="CorrespondenceAddressPin"
                        size="large"
                        onChange={handleOnChange}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>

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
                              {
                                required: _.find(defaultFileList, {
                                  documentTypeId: item.DocumentTypeId,
                                })
                                  ? false
                                  : item.IsMandatory,
                                message: "Required",
                              },
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
                                  viewEditApplicationState.data.ApplicationId
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
                                  `${
                                    conf.api.base_url
                                  }DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${
                                    _.find(defaultFileList, {
                                      documentTypeId: item.DocumentTypeId,
                                    })
                                      ? _.find(defaultFileList, {
                                          documentTypeId: DocumentTypeId,
                                        }).uid
                                      : documentFileId[idx]
                                  }`,
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
                                      defaultFileLists.forEach(
                                        (defaultItem) => {
                                          if (
                                            defaultItem.documentTypeId !==
                                            DocumentTypeId
                                          ) {
                                            fileArr.push(defaultItem);
                                          }
                                        }
                                      );
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
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
              >
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
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                )}
              </Modal>

              <BlankSpace />
              <BlueButton
                disabled={
                  submitDocumentStatus ||
                  saveEditApplicationState.apiState === "loading"
                }
                loading={
                  saveEditApplicationState.apiState === "loading" ? true : false
                }
                htmlType="submit"
              >
                SUBMIT
              </BlueButton>
            </Form>
          )
        ) : serviceId === "1625" || serviceId === "1626" ? (
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Heading>Applicant Details</Heading>
            <Row gutter="24">
              <Col span="8">
                <FormItem
                  label="Applicant Name"
                  name="ApplicantName"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Input
                    name="ApplicantName"
                    maxLength={50}
                    size="large"
                    onChange={handleOnChange}
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Mobile Number" name="MobileNumber">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
              <Col span="8">
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
                <FormItem label="Area" name="Area">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Authority Name" name="AuthorityName">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Plot Number" name="PlotNumber">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
            </Row>
            <Heading>Owner Details</Heading>
            <EditOwnerForm
              serviceId={serviceId}
              AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
              AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
              EntityId={viewEditApplicationState.data.ApplicationId}
            />
            <BlankSpace />

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
                            {
                              required: _.find(defaultFileList, {
                                documentTypeId: item.DocumentTypeId,
                              })
                                ? false
                                : item.IsMandatory,
                              message: "Required",
                            },
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
                                viewEditApplicationState.data.ApplicationId
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
                                `${
                                  conf.api.base_url
                                }DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${
                                  _.find(defaultFileList, {
                                    documentTypeId: item.DocumentTypeId,
                                  })
                                    ? _.find(defaultFileList, {
                                        documentTypeId: DocumentTypeId,
                                      }).uid
                                    : documentFileId[idx]
                                }`,
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
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
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
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
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

            <Space size="middle">
              <BlueButton disabled={false} loading={false} htmlType="submit">
                Submit Application For Processing
              </BlueButton>
            </Space>
          </Form>
        ) : (
          <>
            <Heading>Applicant Details</Heading>

            <Form layout="vertical" onFinish={handleSubmit} form={form}>
              <Row gutter="24">
                <Col span="10">
                  <FormItem label="Applicant Name">
                    <Input
                      size="large"
                      readOnly
                      defaultValue={
                        viewEditApplicationState.data.ApplicantDetails.Name
                      }
                    />
                  </FormItem>
                </Col>
                <Col span="14">
                  <FormItem label="Remark" name="Remark">
                    <Input
                      size="large"
                      name="Remark"
                      readOnly
                      maxLength={200}
                      defaultValue={viewEditApplicationState.data.Remarks}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Heading>Edit Remark</Heading>
              <Row gutter="24">
                <Col span="14">
                  <FormItem label="Remark" name="Remarks">
                    <Input
                      size="large"
                      name="Remarks"
                      showCount
                      maxLength={200}
                      onChange={handleOnChange}
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
                        viewEditApplicationState.data.PropertyDetails.UPN
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
                        viewEditApplicationState.data.PropertyDetails.Area
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
                        viewEditApplicationState.data.PropertyDetails
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
                        viewEditApplicationState.data.PropertyDetails.PlotNumber
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
                        viewEditApplicationState.data.PropertyDetails
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
                        viewEditApplicationState.data.PropertyDetails.SchemeName
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
                        <Input
                          name="PAN"
                          size="large"
                          onChange={handleOnChange}
                        />
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
                          onSelect={(v) =>
                            handleOnChangeSelect(v, "Salutation")
                          }
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
                        <Input
                          name="Name"
                          size="large"
                          onChange={handleOnChange}
                        />
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
                        <Checkbox
                          checked={checkSameAs}
                          onChange={onSameAsChange}
                        >
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
                          rules={[
                            { required: !checkSameAs, message: "Required" },
                          ]}
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
                          rules={[
                            { required: !checkSameAs, message: "Required" },
                          ]}
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
                          rules={[
                            { required: !checkSameAs, message: "Required" },
                          ]}
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
                          <Option
                            key="9.00 AM - 5.30 PM"
                            value="9.00 AM - 5.30 PM"
                          >
                            9.00 AM - 5.30 PM
                          </Option>
                          <Option
                            key="9.30 AM - 6.00 PM"
                            value="9.30 AM - 6.00 PM"
                          >
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
                          onSelect={(v) =>
                            handleOnChangeSelect(v, "Floor", false)
                          }
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
                            viewEditApplicationState.data.PropertyDetails
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
                            viewEditApplicationState.data.PropertyDetails
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
                            viewEditApplicationState.data.PropertyDetails
                              .UsageType
                          }
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  {viewEditApplicationState.data.PurchaserDetails.map(
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
                          checked={formData.IsBasmentConstruct === 1}
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
                          <Option value="20 mm (3/4 Inch)">
                            20 mm (3/4 Inch)
                          </Option>
                          <Option value="15 mm (1/2 Inch)">
                            15 mm (1/2 Inch)
                          </Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Number of Tapes" name="NumberOfTap">
                        <InputNumber
                          name="NumberOfTap"
                          maxLength={2}
                          size="large"
                          onChange={(v) =>
                            handleOnChangeSelect(v, "NumberOfTap")
                          }
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
                          <Option value="15 mm (1/2 Inch)">
                            15 mm (1/2 Inch)
                          </Option>
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
                          onChange={(v) =>
                            handleOnChangeSelect(v, "AreaBasment")
                          }
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
                          checked={formData.IsMumtyConstructed === 1}
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
                          maxLength={10}
                          name="AreaMumty"
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
                          checked={formData.IsBasmentConstruct === 1}
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
                              //     message: 'Required'
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
                              {
                                required: _.find(defaultFileList, {
                                  documentTypeId: item.DocumentTypeId,
                                })
                                  ? false
                                  : item.IsMandatory,
                                message: "Required",
                              },
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
                                  viewEditApplicationState.data.ApplicationId
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
                                  `${
                                    conf.api.base_url
                                  }DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${
                                    _.find(defaultFileList, {
                                      documentTypeId: item.DocumentTypeId,
                                    })
                                      ? _.find(defaultFileList, {
                                          documentTypeId: DocumentTypeId,
                                        }).uid
                                      : documentFileId[idx]
                                  }`,
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
                                      defaultFileLists.forEach(
                                        (defaultItem) => {
                                          if (
                                            defaultItem.documentTypeId !==
                                            DocumentTypeId
                                          ) {
                                            fileArr.push(defaultItem);
                                          }
                                        }
                                      );
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
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
              >
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
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                )}
              </Modal>

              <BlankSpace />
              {/* {getDocumentListState.apiState === "success" && */}
              <BlueButton
                disabled={submitDocumentStatus}
                loading={
                  saveEditApplicationState.apiState === "loading" ||
                  saveEditWaterApplicationState.apiState === "loading" ||
                  saveEditProfessionalServiceState.apiState === "loading"
                    ? true
                    : false
                }
                htmlType="submit"
              >
                SUBMIT
              </BlueButton>
              {/* } */}
            </Form>
          </>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  getServiceDetailState: state.getServiceDetail,
  getDocumentListState: state.getDocumentList,
  getNdcDetailsState: state.getNdcDetails,
  verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
  verifyUpnAndMobileState: state.verifyUpnAndMobile,
  saveEditApplicationState: state.saveEditApplication,
  saveEditWaterApplicationState: state.saveEditWaterApplication,
  viewEditApplicationState: state.viewEditApplication,
  saveEditProfessionalServiceState: state.saveEditProfessionalService,
  getSalutationListState: state.getSalutationList,
  getStateListState: state.getStateList,
  getDistrictListState: state.getDistrictList,
  getEntrepreneurDetailByPanState: state.getEntrepreneurDetailByPan,
  saveProfessionalServiceState: state.saveProfessionalService,
  toGetPrivateSchemeState: state.toGetPrivateScheme,
  getAppointmentDateState: state.getAppointmentDate,
  toGetPrivatePropertiesListState: state.toGetPrivatePropertiesList,
});

const mapDispatchToProps = (dispatch) => ({
  getNdcDetails: (params) => dispatch(getNdcDetails(params)),
  getDocumentList: (params) => dispatch(getDocumentList(params)),
  saveEditApplication: (params) => dispatch(saveEditApplication(params)),
  saveEditApplicationResetState: () =>
    dispatch(saveEditApplicationResetState()),
  saveEditWaterApplication: (params) =>
    dispatch(saveEditWaterApplication(params)),
  saveEditWaterApplicationResetState: () =>
    dispatch(saveEditWaterApplicationResetState()),
  getDocumentListResetState: () => dispatch(getDocumentListResetState()),
  saveEditProfessionalService: (params) =>
    dispatch(saveEditProfessionalService(params)),
  saveEditProfessionalServiceResetState: () =>
    dispatch(saveEditProfessionalServiceResetState()),
  getSalutationList: (params) => dispatch(getSalutationList(params)),
  getStateList: (params) => dispatch(getStateList(params)),
  getStateListResetState: () => dispatch(getStateListResetState()),
  getDistrictList: (params) => dispatch(getDistrictList(params)),
  getDistrictListResetState: () => dispatch(getDistrictListResetState()),
  getEntrepreneurDetailByPan: (params) =>
    dispatch(getEntrepreneurDetailByPan(params)),
  saveProfessionalService: (params) =>
    dispatch(saveProfessionalService(params)),
  saveProfessionalServiceResetState: () =>
    dispatch(saveProfessionalServiceResetState()),
  toGetPrivateScheme: () => dispatch(toGetPrivateScheme()),
  getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
  toGetPrivatePropertiesList: (params) =>
    dispatch(toGetPrivatePropertiesList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNdcForm);
