import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://doonew.com/yard/api/",
  headers: {
    "App-Authorization": `#AYTHELO9MA4FG6XZA3%ARD3QMLARY5JAIOP8LAQW$`,
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const api = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosClient.get(url, { params });
      return response.data;
    } catch (error) {
      console.error("Looks like there was a problem: ", error);
    }
  },
  post: async (url, params) => {
    try {
      const response = await axiosClient.post(url, params);
      return response.data;
    } catch (error) {
      console.error("Looks like there was a problem: ", error);
    }
  },
  put: async (url, params) => {
    try {
      const response = await axiosClient.put(url, params);
      return response.data;
    } catch (error) {
      console.error("Looks like there was a problem: ", error);
    }
  },
  delete: async (url, params = {}) => {
    try {
      const response = await axiosClient.delete(url, { params });
      return response.data;
    } catch (error) {
      console.error("Looks like there was a problem: ", error);
    }
  },
};
