import conf from '../config'
import axios from 'axios'

export const getPropertyPermissionDetailApi = async (params) => {



    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "GetUserLinkedPropertyPemissionList",
            "OrgId": params.OrgId,
            "ApiParams": {
                "SearchText": "",
                "CurrentPageNumber": params.CurrentPageNumber,
                "PageSize": params.PageSize,
                "SortOrder": "",
                "FilterParams": {
                    "PropertyRefId": params.PropertyId,
                    "OrgId": params.OrgId
                }
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

export default getPropertyPermissionDetailApi