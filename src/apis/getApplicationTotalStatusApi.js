import conf from '../config';
import axios from 'axios';

const getApplicationTotalStatusApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            ApiKey: "GetApplCount",
            OrgId: params,
            ApiParams: {}
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    return response
}

export default getApplicationTotalStatusApi;