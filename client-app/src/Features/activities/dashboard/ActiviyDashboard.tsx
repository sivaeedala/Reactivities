import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

// Adding Props type Interface.
interface IProps {
  activities: IActivity[]; // activities array
  handleSelectActivity: (id: string) => void; //handleSelectActivity function
  activity: IActivity | null; //activity Object
  editMode: boolean;
  setEditMode: (editMode: boolean) => void; // need to check can we pass any other parameter.
  setSelectedActivity: (activity: IActivity | null) => void;
  handleSubmit: (activity: IActivity) => void;
  handleEdit: (activity: IActivity) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

const ActiviyDashboard: React.FC<IProps> = ({
  activities,
  handleSelectActivity,
  activity,
  editMode,
  setEditMode,
  setSelectedActivity,
  handleEdit,
  handleSubmit,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            selectedActivity={handleSelectActivity}
            deleteAcitivity={deleteActivity}
            submitting={submitting}
            target={target}
          ></ActivityList>
        </Grid.Column>
        <Grid.Column width={6}>
          {activity && !editMode && (
            <ActivityDetails
              activity={activity}
              setEditMode={setEditMode}
              setSelectedActivity={setSelectedActivity}
            ></ActivityDetails>
          )}
          {editMode && (
            <ActivityForm
              key={(activity && activity.id) || 0}
              setEditMode={setEditMode}
              activity={activity!}
              handleSubmit={handleSubmit}
              handleEdit={handleEdit}
              submitting={submitting}
            ></ActivityForm>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActiviyDashboard;
