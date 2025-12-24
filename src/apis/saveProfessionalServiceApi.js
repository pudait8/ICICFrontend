import conf from '../config'
import axios from 'axios'

export const saveProfessionalServiceApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveProffessionalServices",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": "0",
                "SubmitType": 1,
                "ApplicationType": params.ApplicationType,
                "TemporaryApplicationId": params.TemporaryApplicationId,
                "AppointmentDate": params.AppointmentDate,
                "Pan": params.PAN,
                "RegCategoryId": params.RegistrationCategory,
                "IsApplicant": 1,
                "PreRegNo": params.PreRegNo,
                "ConstituationTypeId": 1638,
                "Title": params.Salutation,
                "Name": params.Name,
                "FatherName": params.FatherHusbandName,
                "Gender": params.Gender,
                "MaritalStatusId": params.MaritalStatus,
                "Dob": params.DateOfBirth,
                "Aadhar": params.AadhaarNumber,
                "Mobile": params.PhoneNumber,
                "EmailId": params.EmailAddress,
                "LicenseNumber": params.CertificateNumber,
                "LicenseIssueDate": params.ValidFrom,
                "LicenseExpiryDate": params.ValidTill,
                "PeAddressLine1": params.PermanentAddress,
                "PeState": params.PermanentAddressState,
                "PeDistrict": params.PermanentAddressDistrict,
                "PePin": params.PermanentAddressPin,
                "CoAddressLine1": params.CorrespondenceAddress,
                "CoState": params.CorrespondenceAddressState,
                "CoDistrict": params.CorrespondenceAddressDistrict,
                "CoPin": params.CorrespondenceAddressPin,
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

export default saveProfessionalServiceApi