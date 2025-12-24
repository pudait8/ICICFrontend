import conf from '../config'
import axios from 'axios'

const getLegalHeirListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            ApiKey: "ViewLegalHeir",
            OrgId: params.OrgId,
            ApiParams: {
                ApplicationId: params.ApplicationId
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

export default getLegalHeirListApi