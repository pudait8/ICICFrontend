import conf from '../config'
import axios from 'axios'

const saveEditApplicationApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "SaveEditApplication",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationType": params.ApplicationType,
                "PropertyRefId": params.PropertyRefId,
                "LandlineNo": "",
                "IdType": 0,
                "IdDetail": "",
                "ApplicationDetail": params.Remark,
                "Remarks": params.Remarks,
                "GPASPA": params.GPASPA,
                "GstNo": "",
                "ApplicationId": params.ApplicationId,
                "OwnerId": params.OwnerId,
                "UploadDocumentId": 0,
                "TransferType": params.TransferType,
                "TransferSubType": params.TransferSubType,
                "TransferPercentage": params.TransferPercentage,
                "PermissionNo": params.PermissionNo,
                "Name": params.Name
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

export default saveEditApplicationApi