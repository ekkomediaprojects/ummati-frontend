import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const PaymentHistory = () => {
  // Sample data for the table
  const rows = [
    {
      id: "#15267",
      date: "Mar 1, 2023",
      amount: 100,
      questions: 1,
      status: "Success",
    },
    {
      id: "#153587",
      date: "Jan 26, 2023",
      amount: 300,
      questions: 3,
      status: "Success",
    },
    {
      id: "#12436",
      date: "Feb 12, 2033",
      amount: 100,
      questions: 1,
      status: "Success",
    },
    {
      id: "#16879",
      date: "Feb 12, 2033",
      amount: 500,
      questions: 5,
      status: "Success",
    },
    {
      id: "#16378",
      date: "Feb 28, 2033",
      amount: 500,
      questions: 5,
      status: "Rejected",
    },
    {
      id: "#16609",
      date: "March 13, 2033",
      amount: 100,
      questions: 1,
      status: "Success",
    },
    {
      id: "#16907",
      date: "March 18, 2033",
      amount: 100,
      questions: 1,
      status: "Pending",
    },
  ];

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        maxWidth: "90%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: { xm: "auto", md: "700px" },
        width: "100%",
        border: "0.89px solid #EBEBEE"

      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
          boxShadow: "none", 
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Total Questions</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.questions}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        row.status === "Success"
                          ? "green"
                          : row.status === "Rejected"
                          ? "red"
                          : "blue",
                    }}
                  >
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        {/* Rows per page on the extreme left */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={() => ""}
            sx={{
              ".MuiTablePagination-actions": { display: "none" },
              ".MuiTablePagination-spacer": { display: "none" },
              ".MuiTablePagination-select": {
                padding: "0",
              },
              border: "none", // Removes border from the entire component
              boxShadow: "none", // Removes any potential shadow
            }}
          />
        </Box>

        {/* Pagination controls on the right */}
        <Box>
          <TablePagination
            rowsPerPageOptions={[]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            sx={{
              ".MuiTablePagination-spacer": { display: "none" },
              ".MuiTablePagination-toolbar": { justifyContent: "flex-end" },
              border: "none", // Removes border from the entire component
              boxShadow: "none", // Removes any potential shadow
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentHistory;
