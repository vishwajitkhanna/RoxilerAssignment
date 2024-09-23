import React, { useEffect, useState } from "react";
import BarChart from "./common/BarChart";
import SelectTag from "./common/SelectTag";
import API from "../service/api.service";

function TransactionChart() {
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
  const [selectedFilters, setSelectedFilters] = useState("March");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    const customParams = {
      month: selectedFilters,
    };
    try {
      setLoading(true);
      const data = await API.fetchTable(customParams);
      setChartData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("err while fetching");
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedFilters]);

  console.log("first",chartData)

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <p>Bar Chart Stats</p>
        <SelectTag
          width={"30%"}
          options={selectUnitOptions}
          value={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
      <BarChart />
    </div>
  );
}

export default TransactionChart;
