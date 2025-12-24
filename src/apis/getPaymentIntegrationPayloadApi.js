import conf from '../config'
import axios from 'axios'
import { getLang, windowPath, getGeoLocation } from '../utils'

export const getPaymentIntegrationPayloadApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveGeneratePaymentRequestFromPortal",
            "OrgId": params.OrgId,
            "ApiParams": {
                "EntityType": params.EntityType ? params.EntityType : 104,
                "PropertyRefId": params.PropertyRefId,
                "OrgId": params.OrgId,
                "TotalDueAmount": params.TotalDueAmount,
                "headDetails": params.headDetails,
                "DemandNoteId": params.DemandNoteId ? params.DemandNoteId : 0
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "AuthToken": params.AuthToken,
            "AuthTokenKey": params.AuthTokenKey,
            "ArchitectToken": params.ArchitectToken,
            "ArchitectTokenKey": params.ArchitectTokenKey,
        }
    })

    return response
}

export default getPaymentIntegrationPayloadApi