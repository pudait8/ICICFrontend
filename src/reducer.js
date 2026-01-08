import { combineReducers } from 'redux';

import getServiceList from './reducers/getServiceListReducer'
import getServiceDetail from './reducers/getServiceDetailReducer'
import login from './reducers/loginReducer'
import other from './reducers/otherReducer'
import getAuthorityList from './reducers/getAuthorityListReducer'
import getWebContent from './reducers/getWebContentReducer'
import verifyUpnAndMobile from './reducers/verifyUpnAndMobileReducer'
import verifyUpnAndMobileSubmitOtp from './reducers/verifyUpnAndMobileSubmitOtpReducer'
import getDocumentList from './reducers/getDocumentListReducer'
import saveNdcApplication from './reducers/saveNdcApplicationReducer'
import getNdcDetails from './reducers/getNdcDetailsReducer'
import logout from './reducers/logoutReducer'
import citizenSignup from './reducers/citizenSignupReducer'
import citizenSignupVerifyOtp from './reducers/citizenSignupVerifyOtpReducer'
import citizenSignupResendOtp from './reducers/citizenSignupResendOtpReducer'
import forgotPasswordSendOtp from './reducers/forgotPasswordSendOtpReducer'
import forgotPasswordValidateOtp from './reducers/forgotPasswordValidateOtpReducer'
import setNewPassword from './reducers/setNewPasswordReducer'
import getApplicationProgress from './reducers/getApplicationProgressReducer'
import saveWorkFlow from './reducers/saveWorkFlowReducer'
import PropertyDuePayments from './reducers/duePaymentsReducer'
import getApplicationDetail from './reducers/getApplicationDetailReducer'
import GetUpn from './reducers/GetUpnReducer'
import knowYourPropertyVerifyUpnAndMobile from './reducers/knowYourPropertyVerifyUpnAndMobileReducer'
import getPropertyBasicDetail from './reducers/getPropertyBasicDetailReducer'
import getPropertyPermissionsDetail from './reducers/getPropertyPermissionsDetailReducer'
import getPropertyAllPayments from './reducers/getPropertyAllPaymentsReducer'
import getPropertyAllApplications from './reducers/getPropertyAllApplicationsReducer'
import getMyDocumentsList from './reducers/getMyDocumentsListReducer'
import ApplyForService from './reducers/ApplyForServiceReducer'
import LinkedProperty from './reducers/LinkedPropertyReducer'
import transferApplicationDelete from './reducers/transferApplicationDeleteReducer'
import transferApplicationFetch from './reducers/transferApplicationFetchReducer'
import transferApplicationSave from './reducers/transferApplicationSaveReducer'
import getSalutationList from './reducers/getSalutationListReducer'
import transferApplicationDeleteLegalHeir from './reducers/transferApplicationDeleteLegalHeirReducer'
import transferApplicationSaveLegalHeir from './reducers/transferApplicationSaveLegalHeirReducer'
import transferApplicationDeletePurchaser from './reducers/transferApplicationDeletePurchaserReducer'
import transferApplicationSavePurchaser from './reducers/transferApplicationSavePurchaserReducer'
import getFaqList from './reducers/getFaqListReducer'
import getAppointmentDate from './reducers/getAppointmentDateReducer'
import rescheduleAppointmentByCitizen from './reducers/rescheduleAppointmentByCitizenReducer'
import getAppointmentHistory from './reducers/getAppointmentHistoryReducer'
import getPropertyDetailByNocNumber from './reducers/getPropertyDetailByNocNumberReducer'
import saveChangeOfOwnershipApplication from './reducers/saveChangeOfOwnershipApplicationReducer'
import saveApplicationAsDraft from './reducers/saveApplicationAsDraftReducer'
import getDraftApplicationDetails from './reducers/getDraftApplicationDetailsReducer'
import getNocByUpn from './reducers/getNocByUpnReducer'
import saveEditApplication from './reducers/saveEditApplicationReducer'
import viewEditApplication from './reducers/viewEditApplicationReducer'
import saveGpa from './reducers/saveGpaReducer'
import deleteGpa from './reducers/deleteGpaReducer'
import saveWaterApplication from './reducers/saveWaterApplicationReducer'
import saveEditWaterApplication from './reducers/saveEditWaterApplicationReducer'
import getRegistrationCategory from './reducers/getRegistrationCategoryReducer'
import getEntrepreneurDetailByPan from './reducers/getEntrepreneurDetailByPanReducer'
import getStateList from './reducers/getStateListReducer'
import getDistrictList from './reducers/getDistrictListReducer'
import saveProfessionalService from './reducers/saveProfessionalServiceReducer'
import savePermittingProfessionalService from './reducers/savePermittingProfessionalServiceReducer'
import saveEditProfessionalService from './reducers/saveEditProfessionalServiceReducer'
import getCurrentOwnersByPropertyRefId from './reducers/getCurrentOwnersByPropertyRefIdReducer'
import getConstitutionTypeList from './reducers/getConstitutionTypeListReducer'
import verifyPan from './reducers/verifyPanReducer'
import verifyPanSubmitOtp from './reducers/verifyPanSubmitOtpReducer'
import getArchitectDashboard from './reducers/getArchitectDashboardReducer'
import getDrawingScrutinyReport from './reducers/getDrawingScrutinyReportReducer'
import reSubmitForScrutiny from './reducers/reSubmitForScrutinyReducer'
import postAutoDCR from './reducers/postAutoDCRReducer'
import getFeeDetails from './reducers/getFeeDetailsReducer'
import getMasterPlanList from './reducers/getMasterPlanListReducer'
import getGrievancePertainsToList from './reducers/getGrievancePertainsToListReducer'
import getActiveServicesList from './reducers/getActiveServicesListReducer'
import getApplListByMobileNo from './reducers/getApplListByMobileNoReducer'
import saveGrievance from './reducers/saveGrievanceReducer'
import getGrievanceDetail from './reducers/getGrievanceDetailReducer'
import getAutoPropertyHeadList from './reducers/getAutoPropertyHeadListReducer'
import getPurchaserList from './reducers/getPurchaserListReducer'
import getLegalHeirList from './reducers/getLegalHeirListReducer'
import getPropertyDetailLedger from './reducers/getPropertyDetailLedgerReducer'
import getPropertyLedger from './reducers/getPropertyLedgerReducer'
import getColoniesList from './reducers/getColoniesListReducer'
import getGrievanceDeptList from './reducers/getGrievanceDeptListReducer'
import getGrievanceDesgList from './reducers/getGrievanceDesgListReducer'
import saveEcluApplicant from './reducers/saveEcluApplicantReducer'
import saveEcluProjectDetails from './reducers/saveEcluProjectDetailsReducer'
import getEcluDetail from './reducers/getEcluDetailReducer'
import saveEcluBussinessDetails from './reducers/saveEcluBussinessDetailsReducer'
import saveEcluLandDetails from './reducers/saveEcluLandDetailsReducer'
import getActList from './reducers/getActListReducer'
import getWaterBillDetails from './reducers/getWaterBillDetailsReducer'
import getWaterPaymentLink from './reducers/getWaterPaymentLinkReducer'
import getWaterReceipt from './reducers/getWaterReceiptReducer'
import privatePropertyApplication from './reducers/privatePropertyApplicationReducer'
import saveOwnerPrivateProperties from './reducers/saveOwnerPrivatePropertiesReducers'
import getOwnerList from './reducers/getOwnerListReducer'
import toGetPrivateScheme from './reducers/toGetPrivateSchemereducer'
import toGetPrivatePropertiesList from './reducers/toGetPrivatePropertiesListReducer'
import mobileNo from './reducers/mobileNoReducer'
import getPropertyAreaUnitList from './reducers/getPropertyAreaUnitListReducer'
import getOldBillDetails from './reducers/getOldBillDetailsReducer'
import getZoningDetails from './reducers/getZoningDetailsReducer'
import getApplicationTotalStatus from './reducers/getApplicationTotalStatusReducer'
import getApplicationDashboard from './reducers/getApplicationDashboardReducer'
export default combineReducers({
    getSalutationList,
    transferApplicationDeleteLegalHeir,
    transferApplicationSaveLegalHeir,
    transferApplicationDeletePurchaser,
    transferApplicationSavePurchaser,
    getServiceList,
    getServiceDetail,
    login,
    other,
    getAuthorityList,
    getWebContent,
    verifyUpnAndMobile,
    verifyUpnAndMobileSubmitOtp,
    getDocumentList,
    saveNdcApplication,
    getNdcDetails,
    logout,
    citizenSignup,
    citizenSignupVerifyOtp,
    citizenSignupResendOtp,
    forgotPasswordSendOtp,
    forgotPasswordValidateOtp,
    setNewPassword,
    getApplicationProgress,
    saveWorkFlow,
    PropertyDuePayments,
    getApplicationDetail,
    GetUpn,
    knowYourPropertyVerifyUpnAndMobile,
    getPropertyBasicDetail,
    getPropertyPermissionsDetail,
    getPropertyAllPayments,
    getPropertyAllApplications,
    getMyDocumentsList,
    ApplyForService,
    LinkedProperty,
    transferApplicationDelete,
    transferApplicationFetch,
    transferApplicationSave,
    getFaqList,
    getAppointmentDate,
    rescheduleAppointmentByCitizen,
    getAppointmentHistory,
    getPropertyDetailByNocNumber,
    saveChangeOfOwnershipApplication,
    saveApplicationAsDraft,
    getDraftApplicationDetails,
    getNocByUpn,
    saveEditApplication,
    viewEditApplication,
    saveGpa,
    deleteGpa,
    saveWaterApplication,
    saveEditWaterApplication,
    getRegistrationCategory,
    getEntrepreneurDetailByPan,
    getStateList,
    getDistrictList,
    saveProfessionalService,
    savePermittingProfessionalService,
    saveEditProfessionalService,
    getCurrentOwnersByPropertyRefId,
    getConstitutionTypeList,
    verifyPan,
    verifyPanSubmitOtp,
    getArchitectDashboard,
    getDrawingScrutinyReport,
    reSubmitForScrutiny,
    postAutoDCR,
    getFeeDetails,
    getMasterPlanList,
    getGrievancePertainsToList,
    getActiveServicesList,
    getApplListByMobileNo,
    saveGrievance,
    getGrievanceDetail,
    getAutoPropertyHeadList,
    getPurchaserList,
    getLegalHeirList,
    getPropertyDetailLedger,
    getPropertyLedger,
    getColoniesList,
    getGrievanceDeptList,
    getGrievanceDesgList,
    saveEcluApplicant,
    saveEcluProjectDetails,
    getEcluDetail,
    saveEcluBussinessDetails,
    saveEcluLandDetails,
    getActList,
    getWaterBillDetails,
    getWaterPaymentLink,
    getWaterReceipt,
    privatePropertyApplication,
    saveOwnerPrivateProperties,
    getOwnerList,
    toGetPrivateScheme,
    toGetPrivatePropertiesList,
    mobileNo,
    getPropertyAreaUnitList,
    getOldBillDetails,
    getZoningDetails,
    getApplicationTotalStatus,
    getApplicationDashboard
})