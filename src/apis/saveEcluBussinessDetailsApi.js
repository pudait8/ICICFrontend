import conf from '../config'
import axios from 'axios'

export const saveEcluBussinessDetailsApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveECLUBussinessDetails",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicantId": params.ApplicantId,
                "BusinessId": params.BusinessId,
                "BussinessName": params.BussinessName,
                "BussinessType": params.BussinessType,
                "Address1": params.Address1,
                "Address2": params.Address2,
                "Pin": params.Pin,
                "Country": params.Country,
                "StateId": params.StateId,
                "DistrictId": params.DistrictId,
                "Tehsil": params.Tehsil,
                "DirectorDetails": params.DirectorDetails,
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

export default saveEcluBussinessDetailsApi