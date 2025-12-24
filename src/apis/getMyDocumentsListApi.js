import conf from '../config'
import axios from 'axios'

export const getMyDocumentsListApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}DMS_DocumentService/GetMyDocumentsList?ApiKey=GetMyDocumentsList&OrgId=${params.OrgId}`,
        data: {
            "SearchText": "",
            "CurrentPageNumber": 1,
            "PageSize": 10,
            "SortOrder": "",
            "FilterParams": {
                "PropertyRefId": params.PropertyRefId
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

export default getMyDocumentsListApi