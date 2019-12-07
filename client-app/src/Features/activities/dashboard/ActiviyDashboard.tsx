import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import ActivityStore from "../../../App/Stores/activityStore";

const ActiviyDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  // Used for Fetching ActivityData from API
  useEffect(() => {
    activityStore.loadingActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities"></LoadingComponent>;
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList></ActivityList>
        </Grid.Column>
        <Grid.Column width={6}>
          <h1>Activities</h1>
          {/* {activity && !editMode && <ActivityDetails></ActivityDetails>}
          {editMode && (
            <ActivityForm
              key={(activity && activity.id) || 0}
              activity={activity!}
            ></ActivityForm>
          )} */}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(ActiviyDashboard);
