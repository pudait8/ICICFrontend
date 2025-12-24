import conf from '../config'
import axios from 'axios'

export const getPropertyDetailByNocNumberApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetUserLinkedPropertyDetailsByTransferPerNo",
            "OrgId": params.OrgId,
            "ApiParams": {
                "TransferPermissionNo": params.TransferPermissionNo,
                "ApplicationType": params.ApplicationTypeId,
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });
    return response
}

export default getPropertyDetailByNocNumberApi