import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { Paper } from "@mui/material";
import StopRoundedIcon from "@mui/icons-material/StopRounded";

const StatItem = ({ iconColor, label, value }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <p style={{ display: "flex", alignItems: "center" }}>
      <StopRoundedIcon
        sx={{
          color: iconColor,
          fontSize: "30px",
        }}
      />
      {label}
    </p>
    <span>{value}</span>
  </div>
);

export const PieChart = ({ data, statistics,selectedFilters }) => {
  const [state, setState] = useState({
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
        color: "black",
        fontSize: "16px",
        fontWeight: "500",
      },
    },
    plotOptions: {
      pie: {
        borderColor: "#DFDFDF",
        borderWidth: 3.5,
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f}%",
          style: {
            fontSize: "15px",
            fontWeight: "bold",
            color: "#47BB66",
            textOutline: "none",
          },
          distance: -100,
        },
        innerSize: "70%",
        backgroundColor: "red",
        showInLegend: false,
        slicedOffset: 0,
      },
    },
    legend: {
      enabled: false,
    },
  });

  useEffect(() => {
    const seriesData = data?.map((item) => ({
      name: item._id,
      y: item.count,
      dataLabels: {
        enabled: false,
      },
    }));
    setState((prev) => ({
      ...prev,
      title: {
        text: "Statistics - "+ selectedFilters,
      },
      series: [
        {
          name: "Quantity",
          type: "pie",
          data: seriesData,
        },
      ],
    }));
  }, [data]);

  return (
    <Paper
      id="chart"
      sx={{
        display: "flex",
        width: "100%",
        padding: "10px",
        justifyContent: "space-between",
        boxSizing: "border-box",
        marginBottom: "0.5rem",
        // boxShadow: "0px 3px 6px #0000001F",
        boxShadow: "none",
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={state}
        containerProps={{
          style: {
            flex: "1",
            minHeight: "250px",
            maxHeight: "250px",
            maxWidth: "55%",
            justifyContent: "space-between",
          },
        }}
      />
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingBottom: "45px",
          gap: "10px",
          paddingRight: "10px",
        }}
      >
        <StatItem
          iconColor="#EA8600"
          label="Total Sale"
          value={statistics?.totalSales.toFixed(2).replace(/\.00$/, "")}
        />
        <StatItem
          iconColor="#34A853"
          label="Total Sold Item"
          value={statistics?.soldItems}
        />
        <StatItem
          iconColor="#EA4335"
          label="Total Not Sold Item"
          value={statistics?.notSoldItems}
        />
      </div>
    </Paper>
  );
};
