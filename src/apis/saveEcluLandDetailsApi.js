import conf from '../config'
import axios from 'axios'

export const saveEcluLandDetailsApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveECLULandDetails",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicantId": params.ApplicantId,
                "LandDetailId": params.LandDetailId,
                "MeasurementScale": params.MeasurementScale,
                "HadbastNo": params.HadbastNo,
                "KhasraNo": params.KhasraNo,
                "Encumbrance": params.Encumbrance,
                "Details": params.Details,
                "Status": params.Status,
                "LandZone": params.LandZone,
                "Width": params.Width,
                "IsNocTakenFromHighWay": params.IsNocTakenFromHighWay,
                "IsNocTakenFromPWD": params.IsNocTakenFromPWD,
                "IsNocTakenFromRailway": params.IsNocTakenFromRailway,
                "IsNocTakenFromIrrigation": params.IsNocTakenFromIrrigation,
                "IsElectircLinePresent": params.IsElectircLinePresent,
                "IsNocTakenFromDefense": params.IsNocTakenFromDefense,
                "IsCourtCase": params.IsCourtCase,
                "IsRejectedByAuthority": params.IsRejectedByAuthority,
                "TempLandDetailId": params.TempLandDetailId,
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

export default saveEcluLandDetailsApi