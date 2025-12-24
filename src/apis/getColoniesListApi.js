import conf from '../config'
import axios from 'axios'

const getColoniesListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            ApiKey: "GetColoniesForCitizenPortal",
            OrgId: params.OrgId,
            ApiParams: {
                SearchText: ""
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    return response
}

export default getColoniesListApi