import conf from '../config'
import axios from 'axios'

export const saveApplicationAsDraftApi = async (params) => {
    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/SaveApplicationAsDraft`,
        data: params,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9,en-GB;q=0.8",
            "Connection": "keep-alive",
            "Origin": window.location.origin,
            "Referer": window.location.href,
            "User-Agent": navigator.userAgent,
        }
    });
    return response
}

export default saveApplicationAsDraftApi







