

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
    postFormData
};

async function get(url) {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function postFormData(url, body) {
    const requestOptions = {
        method: 'POST',
        body: body
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url, body) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    if (!response.ok) {
        return response.json().then(resPayload =>{return Promise.reject(resPayload.message)})
    }
    else{
        return response.json()
    }
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json())