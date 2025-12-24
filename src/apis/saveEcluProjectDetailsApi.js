import conf from '../config'
import axios from 'axios'

export const saveEcluProjectDetailsApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveECLUProjectDetails",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicantId": params.ApplicantId,
                "ProjectId": params.ProjectId,
                "Name": params.Name,
                "Purpose": params.Purpose,
                "Address1": params.Address1,
                "Address2": params.Address2,
                "Pin": params.Pin,
                "Country": params.Country,
                "StateId": params.StateId,
                "DistrictId": params.DistrictId,
                "Tehsil": params.Tehsil,
                "LiesUnderMC": params.LiesUnderMC,
                "Distance": params.Distance,
                "LiesUnderMonuments": params.LiesUnderMonuments,
                "NocTaken": params.NocTaken,
                "ClearanceTaken": params.ClearanceTaken,
                "TempDPRId": params.TempDPRId,
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

export default saveEcluProjectDetailsApi