/**
 *
 * @param {string } method
 * @param {string} url
 * @param {any} data
 * @returns
 */
export async function requester(method, url, data) {
  const options = {};

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.headers = {
      "Content-Type": "application/json",
    };

    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const result = response.json();

  if (!response.ok) {
    console.log(response);

    throw result;
  }

  return result;
}
export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");

export default {
  get,
  post,
  put,
  del,
};
