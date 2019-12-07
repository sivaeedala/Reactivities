import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../App/Stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface IDetails {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IDetails>> = ({
  match,
  history
}) => {
  const activitystore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initilizeFormActivity, // alias name to activity.
    loadActivity,
    clearActivity
  } = activitystore;

  // const initilizeForm = () => {
  //   if (initilizeFormActivity) {
  //     return initilizeFormActivity;
  //   } else {
  //     return {
  //       id: "",
  //       title: "",
  //       description: "",
  //       category: "",
  //       date: "",
  //       city: "",
  //       venue: ""
  //     };
  //   }
  // };

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        // added this to setActivity after activity is loaded from mobx store
        // during the refresh of browser, where useState is running before loadActivity completed
        // And extra condition is that if Activity exists then SetActivity.
        initilizeFormActivity && setActivity(initilizeFormActivity);
      });
    }

    return () => {
      clearActivity();
    };
  }, [
    match.params.id,
    loadActivity,
    initilizeFormActivity,
    clearActivity,
    activity.id.length
  ]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({
      ...activity,
      [name]: value
    });
  };

  const handleInputSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      //handleSubmit(newActivity);
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  return (
    <Segment clearing>
      {
        <Form onSubmit={handleInputSubmit}>
          <Form.Input
            placeholder="title"
            name="title"
            onChange={handleInputChange}
            value={activity.title}
          ></Form.Input>
          <Form.TextArea
            rows={2}
            placeholder="description"
            name="description"
            onChange={handleInputChange}
            value={activity.description}
          ></Form.TextArea>
          <Form.Input
            placeholder="category"
            name="category"
            onChange={handleInputChange}
            value={activity.category}
          ></Form.Input>
          <Form.Input
            type="dateTime-local"
            name="date"
            onChange={handleInputChange}
            placeholder="date"
            value={activity.date}
          ></Form.Input>
          <Form.Input
            placeholder="city"
            name="city"
            onChange={handleInputChange}
            value={activity.city}
          ></Form.Input>
          <Form.Input
            placeholder="venue"
            name="venue"
            onChange={handleInputChange}
            value={activity.venue}
          ></Form.Input>
          <Button
            loading={submitting}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            onClick={() => history.push("/activities")}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      }
    </Segment>
  );
};

export default observer(ActivityForm);
