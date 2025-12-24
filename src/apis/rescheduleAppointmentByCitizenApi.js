import conf from '../config'
import axios from 'axios'

export const rescheduleAppointmentByCitizenApi = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "RescheduleAppointmentByCitizen",
            "OrgId": params.OrgId,
            "ApiParams": {
                "ApplicationId": params.ApplicationId,
                "AppointmentId": params.AppointmentId,
                "NewAppointmentDatewithSlot": params.NewAppointmentDatewithSlot,
                "Remarks": params.Remarks,
                "RescheduledBy": params.RescheduledBy,
                "VerifiedDocuments": [{}]
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

export default rescheduleAppointmentByCitizenApi