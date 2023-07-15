import { makeRequest } from "./makeRequest";

export function updateTopics(accessToken, data, speakerId, conferenceId) {
  return makeRequest(
    `/topics/update/${speakerId}/${conferenceId}`,
    accessToken,
    {
      method: "PUT",
      data: data,
    }
  );
}
export function getTopicsForAddingToSession(accessToken) {
  return makeRequest(`/topics`, accessToken);
}
