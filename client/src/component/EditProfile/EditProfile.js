import React, { useState, useEffect } from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { viewProfile } from "../../store/actions/userActions";
import EditAdopterData from "./EditAdopter/EditAdopter";
import EditIndProviderData from "./EditIndProvider/EditIndProvider";
import EditOrgProviderData from "./EditOrgProvider/EditOrgProvider";
import { getAllProvinces } from "../../store/actions/provinceAction";
import useStyles from "./styles";

const EditProfile = () => {
  const [user, setUser] = useState(
    useSelector((state) => state.userLogin.userInfo)
  );
  const currentId = user.id;
  const role = user.role;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile);
  const provinces = useSelector((state) => state.provinces.province);
  const classes = useStyles();

  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      dispatch(viewProfile(currentId));
    }
    if (Object.keys(provinces).length === 0) {
      dispatch(getAllProvinces());
    }
  }, [currentId, dispatch, profile, provinces]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  let editComponent;
  switch (role) {
    case "Adopter":
      editComponent = <EditAdopterData />;
      break;
    case "IndividualProvider":
      editComponent = <EditIndProviderData />;
      break;
    case "OrganizationalProvider":
      editComponent = <EditOrgProviderData />;
      break;
    default:
      console.log(role);
  }

  return (
    <Container component="main" maxWidth="md">
      {profile.loading === false ? (
        Object.keys(profile).length !== 0 &&
        Object.keys(provinces).length !== 0 ? (
          editComponent
        ) : null
      ) : (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default EditProfile;
