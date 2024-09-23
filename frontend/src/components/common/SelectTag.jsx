import React from "react";

function SelectTag({
  options,
  value,
  setSelectedFilters,
  defaultValue,
  width,
  fontSize2,
  height,
  page,
}) {
  const handleChange = (e) => {
    setSelectedFilters(e.target.value)
  };

  return (
    <div
      style={{
        width: width || "30%",
        height: height || "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <select
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #dAdAdA",
          borderRadius: "25px",
          backgroundColor: "white",
          fontSize: fontSize2 || "12px",
          boxShadow: page === "inventory" ? "0px 3px 6px #0000001F" : null,
        }}
        value={value}
        onChange={handleChange}
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectTag;
