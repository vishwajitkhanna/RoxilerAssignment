import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import SelectTag from "./SelectTag";

const ProductionChart = ({
  page,
  goodPrediction = 0,
  suspiciousPrediction = 0,
  actualGood = 0,
  actualScrap = 0,
  totalParts = 0,
  selectUnitOptions,
  selectedFilters,
  setSelectedFilters,
}) => {
  const predictionData = [
    {
      name: "Good Prediction",
      y: goodPrediction,
      color: "#4285F4",
      dataLabels: {
        enabled: false,
      },
    },
    {
      name: "Suspicious Prediction",
      y: suspiciousPrediction,
      color: "#EA8600",
      dataLabels: {
        enabled: false,
      },
    },
  ];

  const actualData = [
    {
      name: "Actual Good",
      y: actualGood,
      color: "#34A853",
      dataLabels: {
        enabled: true,
        distance: -75,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "#34A853",
          textOutline: "none",
        },
        formatter: function () {
          return `${((this.y / totalParts) * 100).toFixed(1)}%`;
        },
      },
    },
    {
      name: "Actual Scrap",
      y: actualScrap,
      color: "#EA4335",
      dataLabels: {
        enabled: false,
      },
    },
  ];

  const predictionPercentageData = predictionData.map((part) => ({
    ...part,
    y: (part.y / totalParts) * 100,
  }));

  const actualPercentageData = actualData.map((part) => ({
    ...part,
    y: (part.y / totalParts) * 100,
  }));

  const [state, setState] = useState({});

  useEffect(() => {
    setState((prevOptions) => ({
      ...prevOptions,
      chart: {
        toolbar: {
          show: false,
        },
        backgroundColor: "transparent",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Statistics",
        align: "left",
        style: {
          color: page === "home" ? "white" : "black",
          fontSize: "16px",
          fontWeight: "500",
        },
      },
      tooltip: {
        formatter: function () {
          return `${this.point.name}: <b>${this.y.toFixed(2)}%</b>`;
        },
      },
      plotOptions: {
        pie: {
          borderColor: page === "home" ? "#245377" : "#DFDFDF",
          borderWidth: 2.5,
          dataLabels: {
            enabled: true,
            format: "{point.y:.2f}%",
            style: {
              fontSize: "15px",
              fontWeight: "bold",
              color: "#47BB66",
              textOutline: "none",
            },
            distance: -30,
          },
          innerSize: "70%",
          showInLegend: false,
          slicedOffset: 0,
          states: {
            hover: {
              halo: {
                size: 3,
              }, // Decrease the border width on hover
            },
          },
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: "Prediction",
          type: "pie",
          innerSize: "70%",
          size: "60%",
          data: predictionPercentageData,
        },
        {
          name: "Actual",
          type: "pie",
          innerSize: "75%",
          size: "90%",
          data: actualPercentageData,
        },
      ],
    }));
  }, [page, goodPrediction, suspiciousPrediction, actualGood, actualScrap]);

  const labels = [...predictionData, ...actualData].map((point, index) => (
    <div
      key={index}
      style={{ width: "100%", display: "flex", alignItems: "center" }}
    >
      <div
        style={{
          width: "15px",
          height: "15px",
          marginRight: "5px",
          borderRadius: "2px",
          backgroundColor: point.color,
        }}
      ></div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 500,
          fontSize: "12px",
          color: page === "home" ? "white" : "black",
        }}
      >
        <p>{point.name}</p>
        <p>{point.y}</p>
      </div>
    </div>
  ));

  return (
    <div
      id="chart"
      style={{
        display: "flex",
        width: "100%",
        padding: "10px",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={state}
        containerProps={{
          style: {
            flex: "1",
            minHeight: "270px",
            maxHeight: "270px",
            maxWidth: "55%",
            justifyContent: "space-between",
          },
        }}
      />
      <div
        style={{
          width: "45%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingBottom: "45px",
          gap: "15px",
          paddingRight: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <SelectTag
            width={"70%"}
            options={selectUnitOptions}
            value={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        {labels}
      </div>
    </div>
  );
};

export default ProductionChart;
