import conf from '../config'
import axios from 'axios'

export const getDocumentListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}DMS_DocumentService/GetApplicationDocumentList`,
        data: {
            "ApiKey": "GetApplicationDocumentList",
            "OrgId": params.OrgId,
            "ApiParams": {
                "OrgId": params.OrgId,
                "PropertyRefId": params.PropertyRefId,
                "ApplicationTypeId": params.ApplicationTypeId,
                "ApplicationId": params.ApplicationId ? params.ApplicationId : 0
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

export default getDocumentListApi