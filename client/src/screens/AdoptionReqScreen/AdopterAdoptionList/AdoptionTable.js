import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import useStyles from "./styles";
import { cancelAdoption, viewAdoptionsByAdopter } from "../../../store/actions/adoptionRequestActions";
import AdoptionReqRow from "../../../component/AdoptionReqRow/AdoptionReqRow";

// Table Headers
const headers = [
  { id: "pet", label: "Hewan", minWidth: 50, hide: true },
  { id: "provider", label: "Penyedia hewan", minWidth: 50, hide: false },
  { id: "date", label: "Tanggal pengajuan", minWidth: 50, hide: true },
  { id: "status", label: "Status", minWidth: 50, hide: false },
  { id: "action", label: "Detail", minWidth: 50, hide: false },
];

const AdoptionTable = ({status}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteOffer, setDeleteOffer] = useState(null);

  // Get data from reducer
  const adoptionReqList = useSelector((state) => state.adoptionReqList);
  const { loading, error, adoptionReq, componentLoading } = adoptionReqList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Delete offer and change status action
  useEffect(() => {
    if (deleteOffer) {
      dispatch(cancelAdoption(deleteOffer));
      setDeleteOffer(null);
    }
  }, [dispatch, deleteOffer, userInfo]);

  // Get Pet Offer List data
  useEffect(() => {
    dispatch(viewAdoptionsByAdopter(userInfo.id));
  }, [dispatch, userInfo, status]);

  // Page settings on table
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log(status)

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align={header.align}
                      style={{ minWidth: header.minWidth }}
                      className={
                        header.hide ? classes.tableHeadHide : classes.tableHead
                      }
                    >
                      {header.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              {status === "" ?
                adoptionReq
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((adoption) => (
                    <AdoptionReqRow
                      key={adoption._id}
                      adoptionReq={adoption}
                      setDeleteOffer={setDeleteOffer}
                      compLoading={componentLoading}
                    />
                  )):
                  adoptionReq
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((adoption) => adoption.status === status-1)
                  .map((adoption) => (
                    <AdoptionReqRow
                      key={adoption._id}
                      adoptionReq={adoption}
                      setDeleteOffer={setDeleteOffer}
                      compLoading={componentLoading}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25, 100]}
            component="div"
            count={!status?adoptionReq.length:[adoptionReq.find(adoption => adoption.status = status)].length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      )}
    </>
  );
};

export default AdoptionTable;