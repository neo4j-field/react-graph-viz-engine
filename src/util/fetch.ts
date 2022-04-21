export async function fetchGraphQLDataJSON(url: string, query: string) {
    const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({query: query})
      });
    const data = await response.json();
    return data;
}