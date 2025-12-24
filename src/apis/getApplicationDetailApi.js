import conf from '../config'
import axios from 'axios'
import { getAuthData, getArchitectToken } from '../utils'

export const getApplicationDetailApi = async (params) => {

    let AuthId = getAuthData().AuthId
    let AuthKey = getAuthData().AuthKey
    const ArchitectToken = getArchitectToken()

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "ViewPropertyApplication",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": params.ApplicationId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": AuthId ?? "",
            "AuthTokenKey": AuthKey ?? "",
            "ArchitectToken": ArchitectToken.ArchitectToken ?? "",
            "ArchitectTokenKey": ArchitectToken.ArchitectTokenKey ?? "",
        }
    })


    return response
}

export default getApplicationDetailApi