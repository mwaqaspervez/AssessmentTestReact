import config from 'config';
import { accountService } from '@/_services';

export const fetchWrapper = {
    get,
    post
}

var token = '';

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: { "Authorization": token, ...authHeader(url) }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.userValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(config.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        if (response.headers.get('token')) {
            token = response.headers.get('token');
        }

        return data;
    });
}