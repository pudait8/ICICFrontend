import conf from '../config'
import axios from 'axios'

export const getFaqListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            "ApiKey": "GetFAQForCitizenPortal",
            "OrgId": 0,
            "ApiParams": { "SearchText": "" }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export default getFaqListApi