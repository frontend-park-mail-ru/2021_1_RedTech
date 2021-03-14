export async function asyncGetUsing(params = {}) {
    const response = await fetch(params.url, {
        method: params.method,
        body: JSON.stringify(params.body),
        mode: 'cors',
        credentials: 'include',
    });

    const parsedJson = await response.json();

    return {
        status: response.status,
        parsedJson,
    };
}

export async function asyncGetUsingAvatar(params = {}) {
    const response = await fetch(params.url, {
        method: params.method,
        body: params.body,
        mode: 'cors',
        credentials: 'include',
    });

    const parsedJson = await response.json();

    return {
        status: response.status,
        parsedJson,
    };
}
