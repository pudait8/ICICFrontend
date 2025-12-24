import conf from '../config'
import axios from 'axios'

export const transferApplicationDeleteLegalHeirApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "DeleteLegalHeir",
            "OrgId": params.OrgId,
            "ApiParams": {
                "LegalHeirId": params.LegalHeirId,
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

export default transferApplicationDeleteLegalHeirApi