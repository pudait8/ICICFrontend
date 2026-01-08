import conf from '../config'
import axios from 'axios'
import { getAuthData } from '../utils'

export const getDraftApplicationDetailsApi = async (params) => {
    let AuthId = getAuthData().AuthId
    let AuthKey = getAuthData().AuthKey

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetDraftApplicationDetails`,
        data: params,
        headers: {
            "Content-Type": "application/json",
            "AuthId": AuthId ?? "",
            "AuthKey": AuthKey ?? "",
            "Language": "en",
            "FormURL": window.location.origin + window.location.pathname,
            "GeoLocation": "28.6139,77.2090", // Default coordinates, you might want to get actual location
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9,en-GB;q=0.8",
            "Connection": "keep-alive",
            "Origin": window.location.origin,
            "Referer": window.location.href,
            "User-Agent": navigator.userAgent,
        }
    });
    return response;
}

export default getDraftApplicationDetailsApi

