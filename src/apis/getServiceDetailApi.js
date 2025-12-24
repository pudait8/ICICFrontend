import conf from './../config'
import axios from 'axios'

const getServiceDetailApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PortalService/GetItem`,
        data: {
            ApiKey: "GetPortalApplicationType",
            OrgId: params.OrgId,
            ApiParams: { "ApplTypeId": `${params.serviceId}` }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Language": getLang(),
            // "FormURL": windowPath(),
            // "GeoLocation": getGeoLocation(),
        }
    });

    return response
};

export default getServiceDetailApi