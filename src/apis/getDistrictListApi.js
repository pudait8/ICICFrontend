import conf from '../config'
import axios from 'axios'

const getDistrictListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            ApiKey: "GetDistrictList",
            OrgId: params.OrgId,
            ApiParams: {
                StateId: params.StateId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    return response
}

export default getDistrictListApi