import conf from '../config'
import axios from 'axios'

export const toGetPrivatePropertiesListApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetPrivatePropertiesList",
            "OrgId": params?.OrgId || 3,
            "ApiParams": {
                "SchemeId": params?.SchemeId || params
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    return response
}

export default toGetPrivatePropertiesListApi