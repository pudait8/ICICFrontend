import conf from '../config'
import axios from 'axios'

const saveGrievanceApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveGrievance",
            "OrgId": params.OrgId,
            "ApiParams": {
                "FullName": params.FullName,
                "EmailAddress": params.EmailAddress,
                "Gender": params.Gender,
                "TemporaryApplicationId": params.TemporaryApplicationId,
                "AddressLine1": params.AddressLine1,
                "AddressLine2": params.AddressLine2,
                "State": params.State,
                "City": params.City,
                "PIN": params.PIN,
                "ApplicationTypeId": params.ApplicationTypeId,
                "GrievanceDescription": params.GrievanceDescription,
                "GrievanceTypeId": params.GrievanceTypeId,
                "GrievanceSource": params.GrievanceSource,
                "AssistanceRequired": params.AssistanceRequired,
                "OtpTransactionNumber": params.OtpTransactionNumber,
                "MobileNumber": params.MobileNumber,
                "RefApplicationId": params.RefApplicationId,
                "OrgId": params.OrgId,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
};

export default saveGrievanceApi