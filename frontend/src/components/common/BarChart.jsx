import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Paper } from "@mui/material";

const BarChart = ({
  actual = [5, 10, 8, 3, 12, 6, 15],
  categories = ["LPG", "LCN", "MCN", "HCN", "LCO", "CLO", "Coke"],
}) => {
  const [state] = useState({
    chart: {
      type: "column",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          color: "#404040",
          fontSize: "10px",
          fontWeight: "600",
        },
      },
    },
    yAxis: {
      tickAmount: 6,
      title: "",
      labels: {
        format: "{text}%",
        style: {
          color: "#404040",
          fontSize: "10px",
          fontWeight: "600",
        },
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
        },
      },
      bar: {
        pointWidth: 10,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}%",
        },
      },
    },
    series: [
      {
        maxPointWidth: 20,
        showInLegend: false,
        name: "Actual",
        data: actual,
        color: "#00ffff",
      },
    ],
  });

  return (
    <Paper
      sx={{
        marginBottom: "0.5rem",
        boxShadow: "none",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={state} />
    </Paper>
  );
};

export default BarChart;
