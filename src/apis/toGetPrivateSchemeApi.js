import conf from '../config'
import axios from 'axios'

export const toGetPrivateSchemeApi = async (params) => {
    // console.log("toGetPrivateSchemeApiSection", params);
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetPrivateSchemeList",
            "OrgId": params?.OrgId || 3,
            "ApiParams": {
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    return response
}

export default toGetPrivateSchemeApi