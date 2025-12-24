import conf from '../config'
import axios from 'axios'

export const saveEcluApplicantApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveECLUApplicant",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicantId": params.ApplicantId,
                "Title": params.Title,
                "Name": params.Name,
                "MiddleName": params.MiddleName,
                "LastName": params.LastName,
                "DesignationName": params.DesignationName,
                "Aadhaar": params.Aadhaar,
                "Pan": params.Pan,
                "MobileNo": params.MobileNo,
                "Email": params.Email,
                "Address1": params.Address1,
                "Address2": params.Address2,
                "Pin": params.Pin,
                "Country": params.Country,
                "StateId": params.StateId,
                "DistrictId": params.DistrictId,
                "Tehsil": params.Tehsil,
                "TempPhotoId": params.TempPhotoId,
                "TempPanCardId": params.TempPanCardId,
                "TempAadhaarId": params.TempAadhaarId
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

export default saveEcluApplicantApi