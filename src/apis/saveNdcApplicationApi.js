import conf from './../config'
import axios from 'axios'

const saveNdcApplicationApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": params.ApiKey,
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
                "OwnerId": params.OwnerId,
                "AppointmentDate": params.AppointmentDate,
                "EnterprenurId": params.EnterprenurId,
                "WallConstructLength": params.WallConstructLength,
                "ConstructionCost": params.ConstructionCost,
                "IsRevisedPlan": params.IsRevisedPlan,
                "ConstructArea": params.ConstructArea,
                "Mobile": params.Mobile,
                "OwnerId": params.OwnerId ? params.OwnerId : "0",
                "PropertyAreaUnit": params.UnitOfArea,
                "PropertyArea": params.Area
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
        }
    });

    return response
};

export default saveNdcApplicationApi