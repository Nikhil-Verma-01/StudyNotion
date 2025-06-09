import axois from "axios";

export const axoisInstance = axois.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axoisInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    })
}