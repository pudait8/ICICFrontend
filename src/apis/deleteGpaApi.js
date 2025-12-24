import conf from '../config'
import axios from 'axios'

export const deleteGpaApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthAdminService/GetData`,
        data: {
            "ApiKey": "DeleteGPA",
            "OrgId": params.OrgId,
            "ApiParams": {
                "EntityId": params.EntityId,
                "EntityType": params.EntityType,
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

export default deleteGpaApi