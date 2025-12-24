import conf from '../config'
import axios from 'axios'

const viewEditApplicationApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "ViewEditApplication",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": params.ApplicationId,
                "OrgId": params.OrgId
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

export default viewEditApplicationApi