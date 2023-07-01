import axios from "axios";
// how to use ->
// makeRequest("/login", {
//   method: "POST",
//   data: { username: "abc", password: 123 },
//   accessToken,
// });
// though if you want to set state at error you cant use this
export function makeRequest(endpoint, accessToken, options) {
  const baseURL =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_APP_BASE_URL
      : "/api";
  return axios({
    ...options,
    url: baseURL + endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return Promise.reject(err?.response?.data?.error ?? "Error");
    });
}
// the optional chaining is for a frontend error
//err.response.data.message is only errors from our server
