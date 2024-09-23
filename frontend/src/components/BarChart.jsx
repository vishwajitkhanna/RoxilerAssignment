import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Paper } from "@mui/material";

const BarChart = ({ actual = [], categories = [], selectedFilters }) => {
  const [state, setState] = useState({
    chart: {
      type: "column",
      height: 260,
      toolbar: {
        show: false,
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Bar Chart Stats",
      align: "left",
      style: {
        color: "black",
        fontSize: "16px",
        fontWeight: "500",
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
          format: "{point.y}",
        },
      },
    },
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      title: {
        text: "Bar Chart Stats - " + selectedFilters,
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
        tickAmount: 5,
        title: "",
        labels: {
          format: "{text}",
          style: {
            color: "#404040",
            fontSize: "10px",
            fontWeight: "600",
          },
        },
      },
      series: [
        {
          maxPointWidth: 20,
          showInLegend: false,
          name: "Quantity",
          data: actual,
          color: "#00ffff",
        },
      ],
    }));
  }, [actual, categories]);

  return (
    <Paper
      sx={{
        marginBottom: "0.5rem",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={state} />
    </Paper>
  );
};

export default BarChart;
