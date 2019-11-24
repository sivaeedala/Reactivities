import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../Models/activity";
import axios from "axios";
import Navbar from "../../Features/nav/Navbar";
import ActiviyDashboard from "../../Features/activities/dashboard/ActiviyDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]); // actvivities State passed to ActivityDetails Component
  // Selected activity State
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false); // editmode state, used to display create form or not

  // Used for Fetching ActivityData from API
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activity")
      .then(response => {
        let formatActivities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          formatActivities.push(activity);
        });

        setActivities(formatActivities); // setState for activities
      });
  }, []);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]); // setState for selectedActivity.
    setEditMode(false);
  };

  // Used when user clicks on Create Activity in NavBar.
  const handleOpenCreatFrom = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleSubmit = (activity: IActivity) => {
    const newActivity = [...activities, activity];
    setActivities(newActivity);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEdit = (activity: IActivity) => {
    const updActivity = [
      ...activities.filter(a => a.id !== activity.id),
      activity
    ];
    setActivities(updActivity);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
  };

  return (
    <Fragment>
      <Navbar handleCreateFrom={handleOpenCreatFrom}></Navbar>
      <Container style={{ marginTop: "7em" }}>
        <ActiviyDashboard
          activities={activities}
          handleSelectActivity={handleSelectedActivity}
          activity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          deleteActivity={handleDelete}
        ></ActiviyDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
