import conf from '../config'
import axios from 'axios'
import { getArchitectToken } from '../utils'

const getArchitectDashboardApi = async (params) => {
    const architect = getArchitectToken()
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
        data: {
            "ApiKey": "GetArchitectProfile",
            "OrgId": +params.OrgId,
            "ApiParams": {
                "EnterprenurId": +architect.EnterprenurId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "ArchitectToken": architect.ArchitectToken,
            "ArchitectTokenKey": architect.ArchitectTokenKey,
        }
    });

    return response
};

export default getArchitectDashboardApi