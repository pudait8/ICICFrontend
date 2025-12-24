import conf from '../config'
import axios from 'axios'

export const GetPropertyAreaUnitList = async () => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetPropertyAreaUnitList",
            "OrgId": 3,
            "ApiParams": {
                "SearchText": ""
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    return response
}

export default GetPropertyAreaUnitList