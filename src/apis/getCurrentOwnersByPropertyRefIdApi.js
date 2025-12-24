import conf from '../config'
import axios from 'axios'

const getCurrentOwnersByPropertyRefIdApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            ApiKey: "GetCurrentOwnersByPropertyRefId",
            OrgId: params.OrgId,
            ApiParams: {
                PropertyRefId: params.PropertyRefId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    return response
}

export default getCurrentOwnersByPropertyRefIdApi