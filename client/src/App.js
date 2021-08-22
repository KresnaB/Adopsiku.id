import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";

import Navbar from "./component/Navbar/Navbar";
import useStyles from "./styles";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import CategorySearch from "./screens/SearchScreen/CategorySearch/CategorySearch";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import PetOfferScreen from "./screens/PetOfferScreen/PetOfferScreen";
import HomeDashboardScreen from "./screens/DashboardScreen/HomeDashboardScreen/HomeDashboardScreen";
import PetListScreen from "./screens/DashboardScreen/PetDashboardScreen/PetListScreen";
import PetOfferCreateScreen from "./screens/DashboardScreen/PetOfferCreateScreen/PetOfferCreateScreen";
import PetOfferEditScreen from "./screens/DashboardScreen/PetOfferEditScreen/PetOfferEditScreen";
import UserTypeScreen from "./screens/RegisterScreen/UserTypeScreen/UserTypeScreen";
import ProviderTypeScreen from "./screens/RegisterScreen/ProviderTypeScreen/ProviderTypeScreen";
import Register from "./screens/RegisterScreen/Register/Register";
import ProfileCompletionScreen from "./screens/RegisterScreen/ProfileCompletionScreen/ProfileCompletionScreen";
import ViewProfile from "./component/Profile/ViewProfile/ViewProfile";
import EditProfile from "./component/EditProfile/EditProfile";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
import Drawer from "./component/Drawer/Drawer";
import ProviderScreen from "./screens/ProviderScreen/ProviderScreen";
import EmailSent from "./screens/EmailVerificationScreen/EmailSent";
import VerifyingEmail from "./screens/EmailVerificationScreen/VerifyingEmail";
import ResendEmail from "./screens/EmailVerificationScreen/ResendEmail";
import SearchResult from "./screens/SearchScreen/SearchResult/SearchResult";
import ApplyAdoption from "./screens/AdoptionReqScreen/ApplyAdoption/ApplyAdoption";
import AdopterAdoptionList from "./screens/AdoptionReqScreen/AdopterAdoptionList/AdopterAdoptionList";
import UpdateAdoption from "./screens/AdoptionReqScreen/UpdateAdoption/UpdateAdoption";
// import AdoptionReqList from "./screens/DashboardScreen/AdoptionReqScreen/AdoptionReqScreen";
import AdoptionReqScreen from "./screens/DashboardScreen/AdoptionReqScreen/AdoptionReqScreen";
import CreateReport from "./screens/ConditionReportScreen/CreateReport/CreateReport";
import ReportDetail from "./screens/ConditionReportScreen/ReportDetail/ReportDetail";
import AdoptionsList from "./screens/ConditionReportScreen/AdoptionsList/AdoptionsList";
import ReportListScreen from "./screens/DashboardScreen/ReportListScreen/ReportListScreen";
import AdoptionsListAdp from "./screens/ConditionReportScreen/AdoptionsListAdp/AdoptionsListAdp";
import EditReportScreen from "./screens/ConditionReportScreen/EditReport/EditReportScreen";
//import ChatScreen from "./screens/ChatScreen/ChatScreen";
import ChatScreen from "./screens/Chat/ChatScreen";
import StartConversationScreen from "./screens/Chat/StartConversationScreen";

const App = () => {
  const classes = useStyles();
  const isLogin = useSelector((state) => state.userLogin.userInfo);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="xl" className={classes.container}>
        <Route path="/" exact>
          <main className={classes.content}>
            <Toolbar />
            <HomeScreen />
          </main>
        </Route>
        <Route path="/search" exact>
          <main className={classes.content}>
            <Toolbar />
            <CategorySearch />
          </main>
        </Route>
        <Route
          path="/search/result/:category"
          exact
          render={(props) => (
            <main className={classes.content}>
              <SearchResult category={props.match.params.category} />
            </main>
          )}
        />
        <Route
          path="/petoffer/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              <PetOfferScreen id={props.match.params.id} />
            </main>
          )}
        />
        <Route path="/landingpage" exact>
          <main className={classes.content}>
            <LandingScreen />
          </main>
        </Route>
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/usertype/register" exact>
          <main className={classes.content}>
            <UserTypeScreen />
          </main>
        </Route>
        <Route path="/providertype/register" exact>
          <main className={classes.content}>
            <ProviderTypeScreen />
          </main>
        </Route>
        <Route
          path="/register/:role"
          exact
          render={(props) => (
            <main className={classes.content}>
              <Register role={props.match.params.role} />
            </main>
          )}
        />
        <Route path="/emailsent" exact>
          <main className={classes.content}>
            <EmailSent />
          </main>
        </Route>
        <Route path="/resend" exact>
          <main className={classes.content}>
            <ResendEmail />
          </main>
        </Route>
        <Route path="/confirmation/:id" exact>
          <main className={classes.content}>
            <VerifyingEmail />
          </main>
        </Route>

        <Route path="/profilecompletions" exact>
          {isLogin ? (
            <main className={classes.content}>
              <Toolbar />
              <ProfileCompletionScreen />
            </main>
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/myprofile" exact>
          {isLogin ? (
            <main className={classes.content}>
              <Toolbar />
              <ViewProfile />
            </main>
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/updateprofile" exact>
          {isLogin ? (
            <main className={classes.content}>
              <Toolbar />
              <EditProfile />
            </main>
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/conversations" exact>
          {isLogin ? (
            isLogin.role === "Adopter" ? (
              <main className={classes.content}>
                <Toolbar />
                <ChatScreen />
              </main>
            ) : (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <ChatScreen />
                </main>
              </div>
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route
          path="/start/conversations/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              <Toolbar />
              <StartConversationScreen id={props.match.params.id} />
            </main>
          )}
        />
        <Route
          path="/provider/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              <ProviderScreen id={props.match.params.id} />
            </main>
          )}
        />
        {/* <Route path="/dashboard" exact>
          {isLogin ? (
            isLogin.role !== "Adopter" ? (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <HomeDashboardScreen />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route> */}
        <Route path="/dashboard/pet" exact>
          {isLogin ? (
            isLogin.role !== "Adopter" ? (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <PetListScreen />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/dashboard/pet/create" exact>
          {isLogin ? (
            isLogin.role !== "Adopter" ? (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <PetOfferCreateScreen />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route
          path="/dashboard/pet/edit/:id"
          exact
          render={(props) => (
            <div className={classes.flex}>
              <Drawer />
              <main className={classes.content}>
                <Toolbar />
                <PetOfferEditScreen id={props.match.params.id} />
              </main>
            </div>
          )}
        />
        <Route path="/dashboard/myprofile" exact>
          {isLogin ? (
            isLogin.role !== "Adopter" ? (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <ViewProfile />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/dashboard/updateprofile" exact>
          {isLogin ? (
            isLogin.role !== "Adopter" ? (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <EditProfile />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route
          path="/adoption/apply/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              {isLogin ? (
                <ApplyAdoption id={props.match.params.id} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )}
            </main>
          )}
        />
        <Route
          path="/adoption/update/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              <UpdateAdoption id={props.match.params.id} />
            </main>
          )}
        />
        <Route path="/adoptions" exact>
          {isLogin ? (
            isLogin.role === "Adopter" ? (
              <div className={classes.flex}>
                <main className={classes.content}>
                  <Toolbar />
                  <AdopterAdoptionList />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/dashboard/adoptions" exact>
          {isLogin ? (
            isLogin.role !== "Adopter" ? (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <AdoptionReqScreen />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route path="/dashboard/reports" exact>
          {isLogin ? (
            isLogin.role !== "Adopter" ? (
              <div className={classes.flex}>
                <Drawer />
                <main className={classes.content}>
                  <Toolbar />
                  <AdoptionsList />
                </main>
              </div>
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route
          path="/dashboard/reportslist/:id"
          exact
          render={(props) => (
            <div className={classes.flex}>
              <Drawer />
              <main className={classes.content}>
                <Toolbar />
                <ReportListScreen id={props.match.params.id} />
              </main>
            </div>
          )}
        />
        <Route
          path="/dashboard/detail/:id"
          exact
          render={(props) => (
            <div className={classes.flex}>
              <Drawer />
              <main className={classes.content}>
                <Toolbar />
                <ReportDetail id={props.match.params.id} />
              </main>
            </div>
          )}
        />
        <Route
          path="/report/detail/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              <Toolbar />
              <ReportDetail id={props.match.params.id} />
            </main>
          )}
        />
        <Route path="/reports" exact>
          {isLogin ? (
            <main className={classes.content}>
              <Toolbar />
              <AdoptionsListAdp />
            </main>
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
        <Route
          path="/reportslist/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              <Toolbar />
              <ReportListScreen id={props.match.params.id} />
            </main>
          )}
        />
        <Route
          path="/report/edit/:id"
          exact
          render={(props) => (
            <main className={classes.content}>
              <Toolbar />
              <EditReportScreen id={props.match.params.id} />
            </main>
          )}
        />
        <Route path="/report/create" exact>
          {isLogin ? (
            <main className={classes.content}>
              <Toolbar />
              <CreateReport />
            </main>
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Route>
      </Container>
    </BrowserRouter>
  );
};

export default App;
