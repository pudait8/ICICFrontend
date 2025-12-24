import conf from '../config'
import axios from 'axios'

export const savePermittingProfessionalServiceApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SavePermittingProffessionalServices",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationType": params.ApplicationType,
                "PropertyRefId": params.PropertyRefId,
                "LandlineNo": "",
                "IdType": 0,
                "IdDetail": "",
                "ApplicationDetail": params.Remark,
                "GPASPA": params.GPASPA,
                "Gstno": params.Gstno,
                "ConstituationTypeId": params.ConstituationTypeId,
                "TemporaryApplicationId": params.TemporaryApplicationId,
                "OwnerId": params.OwnerId,
                "SubmitType": 1,
                "AppointmentDate": params.AppointmentDate,
                "Pan": params.PAN,
                "RegCategoryId": params.ApplicationType,
                "PreRegNo": params.PreRegNo,
                "Title": params.Salutation,
                "Name": params.Name,
                "FatherName": params.FatherHusbandName,
                "Gender": params.Gender,
                "MaritalStatusId": params.MaritalStatusId,
                "Dob": params.Dob,
                "Aadhar": params.AadhaarNumber,
                "Mobile": params.MobileNumber,
                "EmailId": params.EmailAddress,
                "ServiceCategory": params.ServiceCategory,
                "ProfessionalDetail": params.ProfessionalDetail,
                "VisitorDetails": params.VisitorDetails,
                "WorkingHours": params.WorkingHours,
                "Floor": params.Floor,
                "TotalArea": params.TotalArea,
                "PeAddressLine1": params.PermanentAddress,
                "PeState": params.PermanentAddressState,
                "PeDistrict": params.PermanentAddressDistrict,
                "PePin": params.PermanentAddressPin,
                "CoAddressLine1": params.CorrespondenceAddress,
                "CoState": params.CorrespondenceAddressState,
                "CoDistrict": params.CorrespondenceAddressDistrict,
                "CoPin": params.CorrespondenceAddressPin,
                "Qualification": params.Qualification,
                "IsRenewal": params.IsRenewal,
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

export default savePermittingProfessionalServiceApi