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
import {
  updateAdoptionStatus,
  viewAdoptionsByProvider,
} from "../../../store/actions/adoptionRequestActions";
import { updateStatus } from "../../../store/actions/petOfferActions";
import AdoptionReqPrvRow from "../../../component/AdoptionReqPrvRow/AdoptionReqPrvRow";

// Table Headers
const headers = [
  { id: "pet", label: "Hewan", minWidth: 50, hide: true },
  { id: "provider", label: "Pengadopsi", minWidth: 50, hide: false },
  { id: "date", label: "Tanggal pengajuan", minWidth: 50, hide: true },
  { id: "status", label: "Status", minWidth: 50, hide: false },
  { id: "action", label: "Detail", minWidth: 50, hide: false },
];

const AdoptionPrvTable = ({ status }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [changeStatus, setChangeStatus] = useState(null);

  // Get data from reducer
  const adoptionReqList = useSelector((state) => state.provAdoptionReqList);
  const { loading, error, adoptionReq, componentLoading } = adoptionReqList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (changeStatus) {
      const data = { status: changeStatus.status };
      dispatch(updateAdoptionStatus(changeStatus.id, data));
      dispatch(
        updateStatus(changeStatus.offerId, {
          status: changeStatus.offerStatus,
          offer: changeStatus.id,
        })
      );
    }
  }, [dispatch, changeStatus]);

  // Get Pet Offer List data
  useEffect(() => {
    dispatch(viewAdoptionsByProvider(userInfo.id));
  }, [dispatch, userInfo, status]);

  // Page settings on table
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log(status);

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper className={classes.tablePaper}>
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
                {status === ""
                  ? adoptionReq
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((adoption) => (
                        <AdoptionReqPrvRow
                          key={adoption._id}
                          adoptionReq={adoption}
                          setChangeStatus={setChangeStatus}
                          compLoading={componentLoading}
                        />
                      ))
                  : adoptionReq
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .filter((adoption) => adoption.status === status - 1)
                      .map((adoption) => (
                        <AdoptionReqPrvRow
                          key={adoption._id}
                          adoptionReq={adoption}
                          setChangeStatus={setChangeStatus}
                          compLoading={componentLoading}
                        />
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25, 100]}
            component="div"
            count={
              !status
                ? adoptionReq.length
                : [adoptionReq.find((adoption) => (adoption.status = status))]
                    .length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      )}
    </>
  );
};

export default AdoptionPrvTable;
