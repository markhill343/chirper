async function getJson(p_url: string) {
  return fetch(p_url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`'${response.url}' not found`);
    }
  });
}

export default getJson;
