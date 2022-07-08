/*
 * @Author: Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyirght: 2016-2022 Wolfgang Kowarschick
 * @license: MIT
 */

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
