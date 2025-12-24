import conf from '../config'
import axios from 'axios'

export const getPropertyDuePaymentsApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "GetUserLinkedPropertyDuesList",
            "OrgId": params.OrgId,
            "ApiParams": {
                "SearchText": "",
                "CurrentPageNumber": 0,
                "PageSize": 0,
                "SortOrder": "",
                "FilterParams": {
                    "PropertyRefId": params.PropertyRefId
                }
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

export default getPropertyDuePaymentsApi