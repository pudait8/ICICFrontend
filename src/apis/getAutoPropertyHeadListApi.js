import conf from '../config'
import axios from 'axios'

export const getAutoPropertyHeadListApi = async (params) => {


    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "GetAutoPropertyHeadList",
            "OrgId": params.OrgId,
            "ApiParams": {
                "SearchText": "",
                "CurrentPageNumber": 0,
                "PageSize": 10,
                "SortOrder": "",
                "FilterParams": {
                    "PropertyRefId": params.PropertyRefId,
                    "TotalAmount": params.TotalAmount
                }
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
            "ArchitectToken": params.ArchitectToken,
            "ArchitectTokenKey": params.ArchitectTokenKey,
        }
    });

    return response
}

export default getAutoPropertyHeadListApi