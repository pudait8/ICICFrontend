import conf from '../config'
import axios from 'axios'

const getAppointmentHistoryApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            ApiKey: "GetAppointmentHistory",
            OrgId: params.OrgId,
            ApiParams: {
                "ApplicationId": params.ApplicationId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
            "ArchitectToken": params.ArchitectToken,
            "ArchitectTokenKey": params.ArchitectTokenKey,
        }
    });

    return response
};

export default getAppointmentHistoryApi