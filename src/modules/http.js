export async function asyncGetUsing(params = {}) {
    const response = await fetch(params.url, {
        method: params.method,
        body: JSON.stringify(params.body),
        mode: 'cors',
        // headers : {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Credentials': 'true',
        //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
        // },
    });

    const parsedJson = await response.json();

    return {
        status: response.status,
        parsedJson,
    };
}



// module.exports = { asyncGetUsing };
