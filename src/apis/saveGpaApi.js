import conf from '../config'
import axios from 'axios'

export const saveGpaApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthAdminService/GetData`,
        data: {
            "ApiKey": "SaveGPA",
            "OrgId": params.OrgId,
            "ApiParams": {
                "Id": params.Id,
                "ApplicationId": params.ApplicationId,
                "PropertyRefId": params.PropertyRefId,
                "EntityId": params.EntityId,
                "EntityType": params.EntityType,
                "Name": params.Name,
                "FName": params.FName,
                "Address": params.Address,
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

export default saveGpaApi