import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../Features/nav/Navbar";
import ActiviyDashboard from "../../Features/activities/dashboard/ActiviyDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../Stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);
  // Used for Fetching ActivityData from API
  useEffect(() => {
    activityStore.loadingActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities"></LoadingComponent>;

  return (
    <Fragment>
      <Navbar></Navbar>
      <Container style={{ marginTop: "7em" }}>
        <ActiviyDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
