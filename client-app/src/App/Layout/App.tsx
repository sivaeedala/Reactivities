import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../Features/nav/Navbar";
import ActiviyDashboard from "../../Features/activities/dashboard/ActiviyDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router";
import home from "../../Features/home/home";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDetails from "../../Features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={home} />
      <Route
        path="/(.+)"
        render={() => (
          <Fragment>
            <Navbar></Navbar>
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActiviyDashboard} />
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route
                key={location.key}
                path={["/createActivity", "/edit/:id"]}
                component={ActivityForm}
              />
              {/* <Route path="/editActivity/:id" component={ActivityForm} /> */}
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App)); // withRouter which allows to get loaction
