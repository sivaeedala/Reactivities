import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../Models/activity";
import Navbar from "../../Features/nav/Navbar";
import ActiviyDashboard from "../../Features/activities/dashboard/ActiviyDashboard";
import agent from "../API/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]); // actvivities State passed to ActivityDetails Component
  // Selected activity State
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false); // editmode state, used to display create form or not

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");
  // Used for Fetching ActivityData from API
  useEffect(() => {
    // Making API calls from Agent.actvities.
    agent.Activities.list()
      .then(response => {
        let formatActivities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          formatActivities.push(activity);
        });

        setActivities(formatActivities); // setState for activities
      })
      .then(() => setLoading(false));
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
    setSubmitting(true);
    // First adding the activity into DB and then setting it to State.
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]); // Set Activities State with new activity
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEdit = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        const updActivity = [
          ...activities.filter(a => a.id !== activity.id),
          activity
        ];
        setActivities(updActivity);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  if (loading)
    return <LoadingComponent content="Loading Activities"></LoadingComponent>;

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
          submitting={submitting}
          target={target}
        ></ActiviyDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
