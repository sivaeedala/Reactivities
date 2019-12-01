import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/Stores/activityStore";

const ActiviyDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity: activity, editMode } = activityStore;

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList></ActivityList>
        </Grid.Column>
        <Grid.Column width={6}>
          {activity && !editMode && <ActivityDetails></ActivityDetails>}
          {editMode && (
            <ActivityForm
              key={(activity && activity.id) || 0}
              activity={activity!}
            ></ActivityForm>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(ActiviyDashboard);
