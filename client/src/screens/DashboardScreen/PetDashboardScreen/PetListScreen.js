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
  Grid,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import Row from "../../../component/PetOfferRow/PetOfferRow";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userPetOffers,
  deletePetOffer,
  updateStatus,
} from "../../../store/actions/petOfferActions";
import { Alert } from "@material-ui/lab";
import { Add, AddCircle } from "@material-ui/icons";
import useStyles from "./styles";

// Table Headers
const headers = [
  { id: "collapse", label: "", minWidth: 5, hide: false },
  { id: "photo", label: "Foto", minWidth: 50, hide: true },
  { id: "name", label: "Nama", minWidth: 10, hide: false },
  { id: "category", label: "Kategori", minWidth: 170, hide: true },
  { id: "status", label: "Status", minWidth: 50, hide: false },
  { id: "created", label: "Tanggal Dibuat", minWidth: 170, hide: true },
  { id: "action", label: "Aksi", minWidth: 50, hide: false },
];

const PetListScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteOffer, setDeleteOffer] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);

  // Get data from reducer
  const petOfferList = useSelector((state) => state.userPetOfferList);
  const { loading, error, petOffers, componentLoading } = petOfferList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Delete offer and change status action
  useEffect(() => {
    if (deleteOffer) {
      dispatch(deletePetOffer(userInfo.id, deleteOffer));
      setDeleteOffer(null);
    }
    if (changeStatus) {
      const data = { status: changeStatus.status };
      dispatch(updateStatus(changeStatus.id, data));
    }
  }, [dispatch, deleteOffer, userInfo, changeStatus]);

  // Get Pet Offer List data
  useEffect(() => {
    dispatch(userPetOffers(userInfo.id));
  }, [dispatch, userInfo]);

  // Page settings on table
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Grid container>
        <Grid item md={6} xs={10}>
          <Typography variant="h6" className={classes.pageTitle}>
            Daftar Penawaran Hewan
          </Typography>
        </Grid>
        <Grid item md={6} xs={2}>
          <div className={classes.addContainer}>
            <Button
              size="small"
              className={classes.addButton}
              component={Link}
              to="/dashboard/pet/create"
              variant="contained"
              color="primary"
              fontWeight="fontWeightBold"
            >
              <Add size="small" />
              Penawaran
            </Button>
            <IconButton
              className={classes.addIcon}
              component={Link}
              to="/dashboard/pet/create"
            >
              <AddCircle size="small" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
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
                {petOffers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((petOffer) => (
                    <Row
                      key={petOffer._id}
                      petOffer={petOffer}
                      setDeleteOffer={setDeleteOffer}
                      setChangeStatus={setChangeStatus}
                      compLoading={componentLoading}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
            component="div"
            count={petOffers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      )}
    </>
  );
};

export default PetListScreen;
