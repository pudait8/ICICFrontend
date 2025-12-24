import conf from '../config'
import axios from 'axios'

export const transferApplicationSavePurchaserApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveApplicationPropertyBuyers",
            "OrgId": params.OrgId,
            "ApiParams": {
                "PurchaserId": params.PurchaserId,
                "ApplicationId": params.ApplicationId,
                "PropertyRefId": params.PropertyRefId,
                "Name": params.Name,
                "FatherName": params.FatherName,
                "Address": params.Address,
                "Gender": params.Gender,
                "MobileNumber": params.MobileNumber,
                "EmailAddress": params.EmailAddress,
                "Salutation": params.Salutation,
                "PhoneNumber": null,
                "IsPrimary": params.IsPrimary,
                "IdProof": 0,
                "IdProofDetail": null,
                "TempPhotoId": params.TempPhotoId,
                "TempSignId": params.TempSignId,
                "TempIdentityProofId": params.TempIdentityProofId,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
}

export default transferApplicationSavePurchaserApi