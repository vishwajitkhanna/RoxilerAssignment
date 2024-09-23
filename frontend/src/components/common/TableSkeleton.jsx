import React from "react";
import { Box, Skeleton } from "@mui/material";

const TableSkeleton = ({ width }) => {
  const skeletonHeight = 120;
  const containerHeightInVh = 80;
  const containerHeightInPx = (window.innerHeight * containerHeightInVh) / 100;
  const numberOfSkeletons =
    Math.ceil(containerHeightInPx / skeletonHeight / 2) * 2;

  const skeletons = Array.from({ length: numberOfSkeletons }, (_, index) => (
    <Skeleton
      key={index}
      animation="wave"
      sx={{
        height: `${skeletonHeight}px`,
        backgroundColor: index % 2 === 0 ? "#eef7fd" : "#f6f6f6",
      }}
    />
  ));

  return (
    <Box
      sx={{
        height: `${containerHeightInVh}vh`,
        display: "flex",
        flexDirection: "column",
        gap: "1px",
        width: width || "100%",
      }}
    >
      {skeletons}
    </Box>
  );
};

export default TableSkeleton;
