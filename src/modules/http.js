export async function asyncGetUsing(params = {}) {
    const headers = {
        'Content-Type' : 'application/json'
    };
    const response = await fetch(params.url, {
        method: params.method,
        body: JSON.stringify(params.body),
        headers: headers,
    });

    const parsedJson = await response.json();

    return {
        status: response.status,
        parsedJson,
    };
}



// module.exports = { asyncGetUsing };
