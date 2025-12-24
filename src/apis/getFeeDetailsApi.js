import conf from '../config'
import axios from 'axios'

export const getFeeDetailsApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetList`,
        data: {
            "ApiKey": "GetFeeDetails",
            "OrgId": params.OrgId,
            "ApiParams": {
                "PropertyRefId": params.PropertyRefId,
                "ApplicationTypeId": params.ApplicationTypeId,
                "WallConstructLength": params.WallConstructLength,
                "IsRevisedPlan": params.IsRevisedPlan,
                "ConstructionCost": params.ConstructionCost,
                "ConstructArea": params.ConstructArea,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export default getFeeDetailsApi