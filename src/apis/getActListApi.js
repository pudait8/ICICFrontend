import conf from '../config'
import axios from 'axios'

export const getActListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            "ApiKey": "GetActsForCitizenPortal",
            "OrgId": params.OrgId,
            "ApiParams": { "SearchText": params.SearchText }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export default getActListApi