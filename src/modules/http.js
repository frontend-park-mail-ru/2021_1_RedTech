export async function asyncGetUsing(params = {}) {
    const response = await fetch(params.url, {
        method: params.method,
        body: JSON.stringify(params.body),
        mode: 'cors',
    });

    const parsedJson = await response.json();

    return {
        status: response.status,
        parsedJson,
    };
}
