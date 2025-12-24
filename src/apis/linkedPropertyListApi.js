import conf from '../config'
import axios from 'axios'

export const linkedPropertyListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "GetLinkedPropertyList",
            "OrgId": params.OrgId,
            "ApiParams": {
                "SearchText": params.SearchText,
                "CurrentPageNumber": params.CurrentPageNumber,
                "PageSize": params.PageSize,
                "SortOrder": params.SortOrder,
                "FilterParams": {}
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

export default linkedPropertyListApi