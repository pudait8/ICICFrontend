import conf from '../config'
import axios from 'axios'

export const saveApplicationApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SavePropertyApplication",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationType": params.ApplicationType,
                "PropertyRefId": params.PropertyRefId,
                "Name": params.Name,
                "LandlineNo": "",
                "IdType": 0,
                "IdDetail": "",
                "ApplicationDetail": params.Remark,
                "GPASPA": params.GPASPA,
                "GstNo": "",
                "TemporaryApplicationId": params.TemporaryApplicationId,
                "OwnerId": params.OwnerId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    })

    return response
}

export default saveApplicationApi