import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'

import getServiceListSaga from './sagas/getServiceListSaga'
import getServiceDetailSaga from './sagas/getServiceDetailSaga'
import loginSaga from './sagas/loginSaga'
import getAuthorityListSaga from './sagas/getAuthorityListSaga'
import getWebContentSaga from './sagas/getWebContentSaga'
import verifyUpnAndMobileSaga from './sagas/verifyUpnAndMobileSaga'
import verifyUpnAndMobileSubmitOtpSaga from './sagas/verifyUpnAndMobileSubmitOtpSaga'
import getDocumentListSaga from './sagas/getDocumentListSaga'
import saveNdcApplicationSaga from './sagas/saveNdcApplicationSaga'
import getNdcDetailsSaga from './sagas/getNdcDetailsSaga'
import logoutSaga from './sagas/logoutSaga'
import citizenSignupSaga from './sagas/citizenSignupSaga'
import citizenSignupVerifyOtpSaga from './sagas/citizenSignupVerifyOtpSaga'
import citizenSignupResendOtpSaga from './sagas/citizenSignupResendOtpSaga'
import forgotPasswordSendOtpSaga from './sagas/forgotPasswordSendOtpSaga'
import forgotPasswordValidateOtpSaga from './sagas/forgotPasswordValidateOtpSaga'
import setNewPasswordSaga from './sagas/setNewPasswordSaga'
import getApplicationProgressSaga from './sagas/getApplicationProgressSaga'
import saveWorkFlowSaga from './sagas/saveWorkFlowSaga'
import PropertyDuePaymentsSaga from './sagas/duePaymentsSaga'
import getApplicationDetailSaga from './sagas/getApplicationDetailSaga'
import GetUpnSaga from './sagas/GetUpnSaga'
import knowYourPropertyVerifyUpnAndMobileSaga from './sagas/knowYourPropertyVerifyUpnAndMobileSaga'
import getPropertyBasicDetailSaga from './sagas/getPropertyBasicDetailSaga'
import getPropertyPermissionsDetailSaga from './sagas/getPropertyPermissionsDetailSaga'
import getPropertyAllPaymentsSaga from './sagas/getPropertyAllPaymentsSaga'
import getPropertyAllApplicationsSaga from './sagas/getPropertyAllApplicationsSaga'
import getMyDocumentsListSaga from './sagas/getMyDocumentsListSaga'
import ApplyForServiceSaga from './sagas/ApplyForServiceSaga'
import LinkedPropertySaga from './sagas/LinkedPropertySaga'
import transferApplicationSaveSaga from './sagas/transferApplicationSaveSaga'
import transferApplicationFetchSaga from './sagas/transferApplicationFetchSaga'
import transferApplicationDeleteSaga from './sagas/transferApplicationDeleteSaga'
import getSalutationListSaga from './sagas/getSalutationListSaga'
import transferApplicationDeleteLegalHeirSaga from './sagas/transferApplicationDeleteLegalHeirSaga'
import transferApplicationSaveLegalHeirSaga from './sagas/transferApplicationSaveLegalHeirSaga'
import transferApplicationDeletePurchaserSaga from './sagas/transferApplicationDeletePurchaserSaga'
import transferApplicationSavePurchaserSaga from './sagas/transferApplicationSavePurchaserSaga'
import getFaqListSaga from './sagas/getFaqListSaga'
import getAppointmentDateSaga from './sagas/getAppointmentDateSaga'
import rescheduleAppointmentByCitizenSaga from './sagas/rescheduleAppointmentByCitizenSaga'
import getAppointmentHistorySaga from './sagas/getAppointmentHistorySaga'
import getPropertyDetailByNocNumberSaga from './sagas/getPropertyDetailByNocNumberSaga'
import saveChangeOfOwnershipApplicationSaga from './sagas/saveChangeOfOwnershipApplicationSaga'
import getNocByUpnSaga from './sagas/getNocByUpnSaga'
import saveEditApplicationSaga from './sagas/saveEditApplicationSaga'
import viewEditApplicationSaga from './sagas/viewEditApplicationSaga'
import saveGpaSaga from './sagas/saveGpaSaga'
import deleteGpaSaga from './sagas/deleteGpaSaga'
import saveWaterApplicationSaga from './sagas/saveWaterApplicationSaga'
import saveEditWaterApplicationSaga from './sagas/saveEditWaterApplicationSaga'
import getRegistrationCategorySaga from './sagas/getRegistrationCategorySaga'
import getEntrepreneurDetailByPanSaga from './sagas/getEntrepreneurDetailByPanSaga'
import getStateListSaga from './sagas/getStateListSaga'
import getDistrictListSaga from './sagas/getDistrictListSaga'
import saveProfessionalServiceSaga from './sagas/saveProfessionalServiceSaga'
import savePermittingProfessionalServiceSaga from './sagas/savePermittingProfessionalServiceSaga'
import saveEditProfessionalServiceSaga from './sagas/saveEditProfessionalServiceSaga'
import getCurrentOwnersByPropertyRefIdSaga from './sagas/getCurrentOwnersByPropertyRefIdSaga'
import getConstitutionTypeListSaga from './sagas/getConstitutionTypeListSaga'
import verifyPanSaga from './sagas/verifyPanSaga'
import verifyPanSubmitOtpSaga from './sagas/verifyPanSubmitOtpSaga'
import getArchitectDashboardSaga from './sagas/getArchitectDashboardSaga'
import getDrawingScrutinyReportSaga from './sagas/getDrawingScrutinyReportSaga'
import reSubmitForScrutinySaga from './sagas/reSubmitForScrutinySaga'
import postAutoDCRSaga from './sagas/postAutoDCRSaga'
import getFeeDetailsSaga from './sagas/getFeeDetailsSaga'
import getMasterPlanListSaga from './sagas/getMasterPlanListSaga'
import getGrievancePertainsToListSaga from './sagas/getGrievancePertainsToListSaga'
import getActiveServicesListSaga from './sagas/getActiveServicesListSaga'
import getApplListByMobileNoSaga from './sagas/getApplListByMobileNoSaga'
import saveGrievanceSaga from './sagas/saveGrievanceSaga'
import getGrievanceDetailSaga from './sagas/getGrievanceDetailSaga'
import getAutoPropertyHeadListSaga from './sagas/getAutoPropertyHeadListSaga'
import getPurchaserListSaga from './sagas/getPurchaserListSaga'
import getLegalHeirListSaga from './sagas/getLegalHeirListSaga'
import getPropertyDetailLedgerSaga from './sagas/getPropertyDetailLedgerSaga'
import getPropertyLedgerSaga from './sagas/getPropertyLedgerSaga'
import getColoniesListSaga from './sagas/getColoniesListSaga'
import getGrievanceDeptListSaga from './sagas/getGrievanceDeptListSaga'
import getGrievanceDesgListSaga from './sagas/getGrievanceDesgListSaga'
import saveEcluApplicantSaga from './sagas/saveEcluApplicantSaga'
import saveEcluProjectDetailsSaga from './sagas/saveEcluProjectDetailsSaga'
import getEcluDetailSaga from './sagas/getEcluDetailSaga'
import saveEcluBussinessDetailsSaga from './sagas/saveEcluBussinessDetailsSaga'
import saveEcluLandDetailsSaga from './sagas/saveEcluLandDetailsSaga'
import getActListSaga from './sagas/getActListSaga'
import getWaterBillDetailsSaga from './sagas/getWaterBillDetailsSaga'
import getWaterPaymentLinkSaga from './sagas/getWaterPaymentLinkSaga'
import getWaterReceiptSaga from './sagas/getWaterReceiptSaga'
import privatePropertyApplicationSaga from './sagas/privatePropertyApplicationSaga'
import saveOwnerPrivatePropertiesSaga from './sagas/saveOwnerPrivatePropertiesSaga'
import getOwnerListSaga from './sagas/getOwnerListSaga'
import toGetPrivateSchemeSaga from './sagas/toGetPrivateSchemeSaga'
import toGetPrivatePropertiesListSaga from './sagas/toGetPrivatePropertiesListSaga'
import getPropertyAreaUnitListSaga from './sagas/getPropertyAreaUnitListSaga'
import getOldBillDetailsSaga from './sagas/getOldBillDetailsSaga'
import getZoningDetailsSaga from './sagas/getZoningDetailsSaga'
import getApplicationTotalStatusSaga from './sagas/getApplicationTotalStatusSaga'
import getApplicationDashboardSaga from './sagas/getApplicationDashboardSaga'


// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

// then run the saga
sagaMiddleware.run(getSalutationListSaga)
sagaMiddleware.run(transferApplicationDeleteLegalHeirSaga)
sagaMiddleware.run(transferApplicationSaveLegalHeirSaga)
sagaMiddleware.run(transferApplicationDeletePurchaserSaga)
sagaMiddleware.run(transferApplicationSavePurchaserSaga)

sagaMiddleware.run(ApplyForServiceSaga)
sagaMiddleware.run(LinkedPropertySaga)
sagaMiddleware.run(transferApplicationSaveSaga)
sagaMiddleware.run(transferApplicationFetchSaga)
sagaMiddleware.run(transferApplicationDeleteSaga)

sagaMiddleware.run(getServiceListSaga)
sagaMiddleware.run(getServiceDetailSaga)
sagaMiddleware.run(loginSaga)
sagaMiddleware.run(getAuthorityListSaga)
sagaMiddleware.run(getWebContentSaga)
sagaMiddleware.run(verifyUpnAndMobileSaga)
sagaMiddleware.run(verifyUpnAndMobileSubmitOtpSaga)
sagaMiddleware.run(getDocumentListSaga)
sagaMiddleware.run(saveNdcApplicationSaga)
sagaMiddleware.run(getNdcDetailsSaga)
sagaMiddleware.run(logoutSaga)
sagaMiddleware.run(citizenSignupSaga)
sagaMiddleware.run(citizenSignupVerifyOtpSaga)
sagaMiddleware.run(citizenSignupResendOtpSaga)
sagaMiddleware.run(forgotPasswordSendOtpSaga)
sagaMiddleware.run(forgotPasswordValidateOtpSaga)
sagaMiddleware.run(setNewPasswordSaga)
sagaMiddleware.run(getApplicationProgressSaga)
sagaMiddleware.run(saveWorkFlowSaga)
sagaMiddleware.run(PropertyDuePaymentsSaga)
sagaMiddleware.run(getApplicationDetailSaga)
sagaMiddleware.run(GetUpnSaga)
sagaMiddleware.run(knowYourPropertyVerifyUpnAndMobileSaga)
sagaMiddleware.run(getPropertyBasicDetailSaga)
sagaMiddleware.run(getPropertyPermissionsDetailSaga)
sagaMiddleware.run(getPropertyAllPaymentsSaga)
sagaMiddleware.run(getPropertyAllApplicationsSaga)
sagaMiddleware.run(getMyDocumentsListSaga)
sagaMiddleware.run(getFaqListSaga)
sagaMiddleware.run(getAppointmentDateSaga)
sagaMiddleware.run(rescheduleAppointmentByCitizenSaga)
sagaMiddleware.run(getAppointmentHistorySaga)
sagaMiddleware.run(getPropertyDetailByNocNumberSaga)
sagaMiddleware.run(saveChangeOfOwnershipApplicationSaga)
sagaMiddleware.run(getNocByUpnSaga)
sagaMiddleware.run(saveEditApplicationSaga)
sagaMiddleware.run(viewEditApplicationSaga)
sagaMiddleware.run(saveGpaSaga)
sagaMiddleware.run(deleteGpaSaga)
sagaMiddleware.run(saveWaterApplicationSaga)
sagaMiddleware.run(saveEditWaterApplicationSaga)
sagaMiddleware.run(getRegistrationCategorySaga)
sagaMiddleware.run(getEntrepreneurDetailByPanSaga)
sagaMiddleware.run(getStateListSaga)
sagaMiddleware.run(getDistrictListSaga)
sagaMiddleware.run(saveProfessionalServiceSaga)
sagaMiddleware.run(savePermittingProfessionalServiceSaga)
sagaMiddleware.run(saveEditProfessionalServiceSaga)
sagaMiddleware.run(getCurrentOwnersByPropertyRefIdSaga)
sagaMiddleware.run(getConstitutionTypeListSaga)
sagaMiddleware.run(verifyPanSaga)
sagaMiddleware.run(verifyPanSubmitOtpSaga)
sagaMiddleware.run(getArchitectDashboardSaga)
sagaMiddleware.run(getDrawingScrutinyReportSaga)
sagaMiddleware.run(reSubmitForScrutinySaga)
sagaMiddleware.run(postAutoDCRSaga)
sagaMiddleware.run(getFeeDetailsSaga)
sagaMiddleware.run(getMasterPlanListSaga)
sagaMiddleware.run(getGrievancePertainsToListSaga)
sagaMiddleware.run(getActiveServicesListSaga)
sagaMiddleware.run(getApplListByMobileNoSaga)
sagaMiddleware.run(saveGrievanceSaga)
sagaMiddleware.run(getGrievanceDetailSaga)
sagaMiddleware.run(getAutoPropertyHeadListSaga)
sagaMiddleware.run(getPurchaserListSaga)
sagaMiddleware.run(getLegalHeirListSaga)
sagaMiddleware.run(getPropertyDetailLedgerSaga)
sagaMiddleware.run(getPropertyLedgerSaga)
sagaMiddleware.run(getColoniesListSaga)
sagaMiddleware.run(getGrievanceDeptListSaga)
sagaMiddleware.run(getGrievanceDesgListSaga)
sagaMiddleware.run(saveEcluApplicantSaga)
sagaMiddleware.run(saveEcluProjectDetailsSaga)
sagaMiddleware.run(getEcluDetailSaga)
sagaMiddleware.run(saveEcluBussinessDetailsSaga)
sagaMiddleware.run(saveEcluLandDetailsSaga)
sagaMiddleware.run(getActListSaga)
sagaMiddleware.run(getWaterBillDetailsSaga)
sagaMiddleware.run(getWaterPaymentLinkSaga)
sagaMiddleware.run(getWaterReceiptSaga)
sagaMiddleware.run(privatePropertyApplicationSaga)
sagaMiddleware.run(saveOwnerPrivatePropertiesSaga)
sagaMiddleware.run(getOwnerListSaga)
sagaMiddleware.run(toGetPrivateSchemeSaga)
sagaMiddleware.run(toGetPrivatePropertiesListSaga)
sagaMiddleware.run(getPropertyAreaUnitListSaga)
sagaMiddleware.run(getOldBillDetailsSaga)
sagaMiddleware.run(getZoningDetailsSaga)
sagaMiddleware.run(getApplicationTotalStatusSaga)
sagaMiddleware.run(getApplicationDashboardSaga)

// render the application

export default store