import conf from '../config'
import axios from 'axios'

const getStateListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            ApiKey: "GetStateList",
            OrgId: params.OrgId,
            ApiParams: {}
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    return response
}

export default getStateListApi