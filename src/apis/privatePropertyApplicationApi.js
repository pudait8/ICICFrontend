import conf from '../config'
import axios from 'axios'

export const privatePropertyApplicationApi = async (params) => {

    // console.log('params', params);
    // const response = await axios({
    //     method: 'post',
    //     url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
    //     data: {
    //         "ApiKey": "SaveDraftPropertyApplication",
    //         "OrgId": params.OrgId,
    //         "ApiParams": {
    //             "ApplicationId": params.ApplicationId,
    //             "ApplicationType": params.ApplicationTypeId,
    //             "PropertyRefId": params.PropertyRefId,
    //             "OwnerId": params.OwnerId,
    //             "Name": params.OwnerName,
    //             "IdType": 0,
    //             "IdDetail": "",
    //             "ApplicationDetail": params.Remark,
    //             "GPASPA": "N",
    //             "GstNo": "",
    //             "TemporaryApplicationId": params.TemporaryApplicationId,
    //             "TransferType": params.TransferType,
    //             "TransferSubType": params.TransferSubType,
    //             "TransferPercentage": params.TransferPercentage,
    //             "SubmitType": params.SubmitType,
    //             "AppointmentDate": params.AppointmentDate,
    //         }
    //     },
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //         "AuthToken": params.AuthToken,
    //         "AuthTokenKey": params.AuthTokenKey,
    //     }
    // });

    // return response
}

export default privatePropertyApplicationApi