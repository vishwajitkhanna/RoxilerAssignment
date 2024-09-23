import axios from "axios";
import { API_URLs } from "./http.service";

export default {
  initializeDb: async function () {
    const { data } = await axios.get(API_URLs.initialize);
    return data;
  },
  fetchTable: async function (params) {
    const { data } = await axios.get(API_URLs.fetchTable, {
      params,
    });
    return data;
  },
  fetchStatistics: async function (params) {
    const { data } = await axios.get(API_URLs.fetchStatistics, {
      params,
    });
    return data;
  },
  fetchBarChart: async function (params) {
    const { data } = await axios.get(API_URLs.fetchBarChart, {
      params,
    });
    return data;
  },
  fetchPieChart: async function (params) {
    const { data } = await axios.get(API_URLs.fetchPieChart, {
      params,
    });
    return data;
  },
  fetchAllData: async function (params) {
    const { data } = await axios.get(API_URLs.fetchAllData, {
      params,
    });
    return data;
  },
};
