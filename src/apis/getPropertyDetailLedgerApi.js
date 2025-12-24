import conf from '../config'
import axios from 'axios'

export const getPropertyDetailLedgerApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthAdminService/GetData`,
        data: {
            "ApiKey": "GetPropertyDetailLedger",
            "OrgId": params.OrgId,
            "ApiParams": {
                "schemeId": params.schemeId,
                "propertyRefId": params.propertyRefId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
            "ArchitectToken": params.ArchitectToken,
            "ArchitectTokenKey": params.ArchitectTokenKey,
        }
    })

    return response
}

export default getPropertyDetailLedgerApi