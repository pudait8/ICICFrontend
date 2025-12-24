import conf from '../config'
import axios from 'axios'

export const getMasterListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            "ApiKey": "GetMasterPlanForCitizenPortal",
            "OrgId": params.OrgId,
            "ApiParams": { "SearchText": params.SearchText }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export default getMasterListApi