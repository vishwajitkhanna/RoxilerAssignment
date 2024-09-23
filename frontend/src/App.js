import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import API from "./service/api.service";
import BarChart from "./components/BarChart";
import { PieChart } from "./components/PieChart";

const selectUnitOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [selectedFilters, setSelectedFilters] = useState("March");
  const [inputChange, setInputChange] = useState("");
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const customParams = {
      month: selectedFilters,
      search: inputChange,
    };
    try {
      setLoading(true);
      const data = await API.fetchAllData(customParams);
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("err while fetching");
    }
  };

  useEffect(() => {
    const initializeDb = async () => {
      try {
        await API.initializeDb();
        fetchData();
      } catch (error) {
        console.log("Error while initializing DB:", error);
      }
    };
    initializeDb();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedFilters, inputChange]);

  return (
    <Box
      sx={{
        width: "97%",
        mx: "auto",
        display: "flex",
        gap: "20px",
      }}
    >
      <div style={{ width: "50%", height: "94vh", marginTop: "3vh" }}>
        <Table
          setInputChange={setInputChange}
          selectUnitOptions={selectUnitOptions}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          updatedTable={responseData?.transaction?.transactions}
          loading={loading}
        />
      </div>
      <Box
        sx={{
          borderRadius: "20px",
          width: "50%",
          height: "94vh",
          marginTop: "3vh",
          // boxShadow: "0px 3px 6px #0000001F",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            width: "100%",
            height: "50%",
            // boxShadow: "0px 3px 6px #0000001F",
            boxShadow: "none",
            border: "1px solid #E4E4E4",
            overflow: "auto",
          }}
        >
          <PieChart
            data={responseData?.pieChart}
            statistics={responseData?.statistics}
            selectedFilters={selectedFilters}
          />
        </Paper>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            width: "100%",
            height: "50%",
            // boxShadow: "0px 3px 6px #0000001F",
            boxShadow: "none",
            border: "1px solid #E4E4E4",
            overflow: "auto",
          }}
        >
          <BarChart
            actual={responseData?.barChart?.counts}
            categories={responseData?.barChart?.ranges}
            selectedFilters={selectedFilters}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default App;
