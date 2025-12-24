import conf from '../config'
import axios from 'axios'

export const fetchLocationList = async (AuthorityId) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetUniqueSectorLocationList",
            "OrgId": AuthorityId,
            "ApiParams": { "OrgId": AuthorityId }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}


export const fetchSectorList = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetSectorsList",
            "OrgId": params.AuthorityId,
            "ApiParams": {
                "OrgId": params.AuthorityId,
                "LocationName": params.LocationName
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}

export const fetchUsageTypesList = async (params) => {

    const response = await axios({
        method: 'post',
        url: `${conf.api.base_url}Gateway_AuthService/ViewDetail`,
        data: {
            "ApiKey": "GetPropertyMappedUsageTypeList",
            "OrgId": params.AuthorityId,
            "ApiParams": {
                "SectorId": params.SectorId
            }
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    return response
}