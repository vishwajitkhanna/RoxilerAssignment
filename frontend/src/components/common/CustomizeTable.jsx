import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CustomPagination from "./CustomPagination";
import TableSkeleton from "./TableSkeleton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ECECEC",
    fontSize: "13px",
    color: "#4A4A4A",
    padding: "8px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "13px",
    padding:"3px 8px",
    "&:last-child": {
      color: "#A9A9A9",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F2F8FB",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "td, th": {
    border: 0,
  },
  "& .css-1u9ya20-MuiTableCell-root": {
    borderBottom: "none",
  },
}));

export default function CustomizeTable({
  updatedTable,
  loading,
}) {
  const [pageData, setPageData] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });
  const [paginationData, setPaginationData] = useState({
    totalRows: updatedTable?.length || 0,
  });

  useEffect(() => {
    setPaginationData((prev) => ({
      ...prev,
      totalRows: updatedTable?.length || 0,
    }));
  }, [updatedTable]);

  const totalPages = Math.ceil(
    paginationData.totalRows / pageData.itemsPerPage
  );

  const handleChangePage = (newPage) => {
    setPageData((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
  };

  const handleChangeItemsPerPage = (items) => {
    setPageData((prevState) => ({
      ...prevState,
      currentPage: 1,
      itemsPerPage: items,
    }));
  };

  const [expandedRows, setExpandedRows] = useState({});

  const toggleDescription = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const startIndex = (pageData.currentPage - 1) * pageData.itemsPerPage;
  const currentItems = updatedTable?.slice(
    startIndex,
    startIndex + pageData.itemsPerPage
  );

  return (
    <Paper sx={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <TableContainer>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Sold</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <tr>
              <td colSpan="7">
                <TableSkeleton />
              </td>
            </tr>
          ) : (
            <TableBody>
              {currentItems?.length === 0 ? (
                <TableRow hover sx={{ cursor: "pointer" }}>
                  <TableCell scope="row" align="center" colSpan={7}>
                    <div
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: "20px",
                        width: "100%",
                      }}
                    >
                      No data available
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                currentItems?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{item?.id}</StyledTableCell>
                    <StyledTableCell>{item?.title}</StyledTableCell>
                    <StyledTableCell>
                      <div
                        onClick={() => toggleDescription(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {expandedRows[item.id]
                          ? item.description
                          : `${item.description.substring(0, 50)}...`}{" "}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.price.toFixed(2).replace(/\.00$/, "")}
                    </StyledTableCell>
                    <StyledTableCell>{item?.category}</StyledTableCell>
                    <StyledTableCell>
                      {item?.sold === false ? "false" : "true"}
                    </StyledTableCell>
                    <StyledTableCell>
                      <img
                        src={item.image}
                        alt={item.altText || "Image"}
                        style={{ width: "35px", height: "auto" }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {updatedTable?.length !== 0 && (
        <CustomPagination
          currentPage={pageData?.currentPage}
          totalPages={totalPages}
          changePage={handleChangePage}
          changeItemsPerPage={handleChangeItemsPerPage}
          minRows={10}
        />
      )}
    </Paper>
  );
}
