import conf from '../config'
import axios from 'axios'
import { getLang, windowPath, getGeoLocation } from '../utils'

export const saveWorkFlowApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveWorkFlowAction",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": params.ApplicationId,
                "DocumentId": params.DocumentId,
                "Remarks": params.Remarks,
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
}

export default saveWorkFlowApi