import React, { useState } from "react";
import ProductionChart from "./common/ProductionChart";
import SelectTag from "./common/SelectTag";

function Statistics() {
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
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ProductionChart
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        selectUnitOptions={selectUnitOptions}
      />
    </div>
  );
}

export default Statistics;
