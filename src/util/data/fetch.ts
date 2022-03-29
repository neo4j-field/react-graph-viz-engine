export async function fetchGraphQLDataJSON(url: string, query: string) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({query: query})
      });
    const data = await response.json();
    return data;
}