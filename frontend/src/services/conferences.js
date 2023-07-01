import { makeRequest } from "./makeRequest";

export function getConferences(accessToken) {
  return makeRequest("/conferences", accessToken);
}

export function deleteConference(conferenceId, accessToken) {
  return makeRequest(`/conferences/${conferenceId}`, accessToken, {
    method: "DELETE",
  });
}

export function addConference(accessToken, data) {
  return makeRequest(`/conferences`, accessToken, {
    method: "POST",
    data: data,
  });
}
