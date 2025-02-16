import React, { useContext } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/Stores/activityStore";
import { Link } from "react-router-dom";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate: activities,
    submitting,
    deleteActivity,
    target
  } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => {
          return (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city},{activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  ></Button>
                  <Button
                    name={activity.id}
                    loading={target === activity.id && submitting}
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={e => deleteActivity(e, activity.id)}
                  ></Button>
                  <Label basic content={activity.category}></Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
