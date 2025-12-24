import conf from '../config'
import axios from 'axios'

export const changeOfOwnershipSaveApi = async (params) => {
    // console.log(params.PropertyRefId);
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveChangeOfOwnershipApplication",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": params.ApplicationId,
                "ApplicationType": params.ApplicationTypeId,
                "IdType": 0,
                "IdDetail": "",
                "ApplicationDetail": params.Remark,
                "GPASPA": "N",
                "GstNo": "",
                "TemporaryApplicationId": params.TemporaryApplicationId,
                "PermissionNo": params.PermissionNo,
                "SubmitType": params.SubmitType,
                "AppointmentDate": params.AppointmentDate,
                "Name": params.Name,
                "Mobile": params.Mobile,
                "PropertyRefId": params.PropertyRefId,
                "SubmitType": params.SubmitType,

            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    });
    // console.log(response);
    return response
}

export default changeOfOwnershipSaveApi