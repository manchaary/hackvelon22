import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getTeams = async () =>
  await instance.get("/predict/teams").then((res) => res.data);

export const getPrediction = async (teams) =>
  await instance.get(`/predict/football/${teams}`).then((res) => res.data);

export const getMatches = async () =>
  await instance.get(`/get_dates`).then((res) => res.data);
