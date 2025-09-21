import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const PaymentHistory = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // MUI uses 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  const fetchPayments = async () => {
    try {
      if (!token) {
        toast.error("Please log in to access payment history");
        return;
      }

      setLoading(true);

      const res = await RequestHandler(
        `${process.env.REACT_APP_API_URL}payments/?page=${
          page + 1
        }&limit=${rowsPerPage}`,
        "GET",
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (res.success) {
        const data = res.data?.data?.payments || [];
        const total = res.data?.data?.pagination?.total || 0;
        console.log("Data Payments", res);

        setRows(data);
        setTotalRows(total);
      } else {
        toast.error("Failed to fetch payment history");
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      toast.error("Something went wrong while fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when changing rows per page
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
        border: "0.89px solid #EBEBEE",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ flex: "1 1 auto", overflowY: "auto", boxShadow: "none" }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Stripe Charge ID</TableCell>
                <TableCell>Stripe Invoice ID</TableCell>
                <TableCell>Stripe Subscription ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography>No payment history found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => (
                  <TableRow key={row._id || index}>
                    <TableCell>
                      {row.stripeChargeId || row._id || "—"}
                    </TableCell>
                    <TableCell>
                      {row.date ? new Date(row.date).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell>${row.amount ?? "—"}</TableCell>
                    <TableCell>{row.transactionType || "N/A"}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          row.status === "Completed"
                            ? "green"
                            : row.status === "Failed"
                            ? "red"
                            : "blue",
                      }}
                    >
                      {row.status || "—"}
                    </TableCell>
                    <TableCell>{row.description || "—"}</TableCell>
                    <TableCell>{row.paymentMethod || "—"}</TableCell>
                    {/* <TableCell>
                      {row.receiptUrl ? (
                        <a
                          href={row.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Receipt
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell> */}
                     <TableCell>{row.stripeChargeId || "—"}</TableCell>
                      <TableCell>{row.stripeInvoiceId || "—"}</TableCell>
                       <TableCell>{row.stripeSubscriptionId || "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {!loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Total Records: {totalRows}
          </Typography>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default PaymentHistory;
