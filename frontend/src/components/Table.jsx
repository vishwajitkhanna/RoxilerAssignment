import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, InputBase, Paper } from "@mui/material";
import React from "react";
import CustomizeTable from "./common/CustomizeTable";
import SelectTag from "./common/SelectTag";

function Table({
  setInputChange,
  selectUnitOptions,
  selectedFilters,
  setSelectedFilters,
  updatedTable,
  loading,
}) {
  const handleSearchInputChange = (e) => {
    setInputChange(e.target.value);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "13px",
        }}
      >
        <InputBase
          type="text"
          placeholder="Search transaction..."
          onChange={handleSearchInputChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: "#9F9F9F",
                  ml: "3px",
                  mr: "-3px",
                  width: "20px",
                  height: "20px",
                }}
              />
            </InputAdornment>
          }
          sx={{
            borderRadius: "20px",
            width: "30%",
            height: "32px",
            border: "1px solid #dAdAdA",
            // mr: 2,
          }}
        />
        <SelectTag
          options={selectUnitOptions}
          value={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
      <Paper
        sx={{
          borderRadius: "20px",
          width: "100%",
          height: `calc(94vh - 45px)`,
          // marginTop: "3vh",
          // boxShadow: "0px 3px 6px #0000001F",
          boxShadow: "none",
          border: "1px solid #E4E4E4",
          overflow: "hidden",
        }}
      >
        <CustomizeTable updatedTable={updatedTable} loading={loading} />
      </Paper>
    </div>
  );
}

export default Table;
