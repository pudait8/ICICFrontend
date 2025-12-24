import conf from '../config'
import axios from 'axios'

export const saveEditProfessionalServiceApi = async (params) => {

    // console.log("params", params);
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "EditProfessionalServiceApplication",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": params.ApplicationId,
                "Remarks": params.Remarks,
                "Pan": params.PAN,
                "Title": params.Salutation,
                "FullName": params.Name,
                "FatherName": params.FatherHusbandName,
                "Gender": params.Gender,
                "MaritalStatusId": params.MaritalStatusId,
                "Dob": params.Dob,
                "Aadhar": params.AadhaarNumber,
                "MobileNumber": params.MobileNumber,
                "EmailAddress": params.EmailAddress,
                "ServiceCategory": params.ServiceCategory,
                "ProfessionalDetail": params.ProfessionalDetail,
                "VisitorDetail": params.VisitorDetails,
                "WorkingHours": params.WorkingHours,
                "Floor": params.Floor,
                "TotalArea": params.TotalArea,
                "PeAddressLine1": params.PermanentAddress,
                "PeStateId": params.PermanentAddressState,
                "PeDistrictId": params.PermanentAddressDistrict,
                "PePin": params.PermanentAddressPin,
                "CoAddressLine1": params.CorrespondenceAddress,
                "CoStateId": params.CorrespondenceAddressState,
                "CoDistrictId": params.CorrespondenceAddressDistrict,
                "CoPin": params.CorrespondenceAddressPin,
                "AppointmentDate": params.AppointmentDate,
                "RegCategoryId": params.RegistrationCategory,
                "PreRegNo": params.PreRegNo,
                "LicenseNumber": params.CertificateNumber,
                "LicenseIssueDate": params.ValidFrom,
                "LicenseExpiryDate": params.ValidTill,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    })

    return response
}

export default saveEditProfessionalServiceApi