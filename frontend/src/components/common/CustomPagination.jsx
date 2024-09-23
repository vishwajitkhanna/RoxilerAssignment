import React, { useState } from "react";
import { Select, MenuItem, Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const styles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
  },
  itemsPerPageContainer: {
    fontSize: "15px",
  },
  itemsPerPageSelect: {
    border: "none",
    borderRadius: "20px",
    width: "80px",
    textAlign: "center",
    height: "35px",
    marginLeft: 1,
    marginRight: 1,
  },
  pageNavigationContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
  },
  chevronIcon: {
    borderRadius: "50%",
    backgroundColor: "#404040",
    color: "white",
    marginLeft: 1,
    marginRight: 1,
    cursor: "pointer",
  },
  currentPageBox: {
    padding: 0.5,
    border: "1px solid #E4E4E4",
    borderRadius: "20px",
    width: "50px",
    textAlign: "center",
    fontSize: "15px",
    marginRight: 1,
  },
};

function CustomPagination({
  currentPage,
  totalPages,
  changePage,
  changeItemsPerPage,
  minRows,
  setMinRows = null,
  page,
}) {
  const [items, setItems] = useState(minRows || 10);

  const itemsOnPage = [10, 25, 50, 100];

  const handlePrevClick = () => {
    if (currentPage > 1) changePage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) changePage(currentPage + 1);
  };

  const handleItemsChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItems(newItemsPerPage);
    changeItemsPerPage(newItemsPerPage);
    if (setMinRows) {
      setMinRows(newItemsPerPage);
    }
  };

  return (
    <Box sx={styles.paginationContainer}>
      <Box>
        {page === "small" ? null : (
          <span style={styles.itemsPerPageContainer}>Showing: </span>
        )}
        {/* {page == "small" ? null : ( */}
        <Select
          value={items}
          onChange={handleItemsChange}
          sx={styles.itemsPerPageSelect}
        >
          {itemsOnPage.map((option, index) => (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {/* )} */}
        {page === "small" ? null : (
          <span style={styles.itemsPerPageContainer}>Items per page</span>
        )}
      </Box>
      <Box sx={styles.pageNavigationContainer}>
        <span>Page:</span>
        <ChevronLeftIcon sx={styles.chevronIcon} onClick={handlePrevClick} />
        <Typography sx={styles.currentPageBox}>{currentPage}</Typography>
        <span>of {totalPages}</span>
        <ChevronRightIcon sx={styles.chevronIcon} onClick={handleNextClick} />
      </Box>
    </Box>
  );
}

export default CustomPagination;
