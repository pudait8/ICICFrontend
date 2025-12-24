import conf from '../config'
import axios from 'axios'

export const fetchPropertyNumberList = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetAutoCompletePropertyData",
            "OrgId": params.AuthorityId,
            "ApiParams": {
                "P1": params.SectorId,
                "P2": params.UsageTypeId,
                "P3": params.PropertyTypeId,
                "OrgId": params.AuthorityId,
                "Query": params.SearchTerm,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "AuthToken": params.AuthToken,
            // "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
}

export default fetchPropertyNumberList