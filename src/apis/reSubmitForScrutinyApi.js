import conf from '../config'
import axios from 'axios'

export const reSubmitForScrutinyApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_Softech/GetDetails`,
        data: {
            "ApiKey": "ReSubmitForScrutiny",
            "ApiParams": {
                "ApplicationId": params.ApplicationId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    return response
}

export default reSubmitForScrutinyApi