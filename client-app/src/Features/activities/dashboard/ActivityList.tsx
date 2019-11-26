import React, { SyntheticEvent } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";

interface IProps {
  activities: IActivity[];
  selectedActivity: (id: string) => void;
  deleteAcitivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectedActivity,
  deleteAcitivity,
  submitting,
  target
}) => {
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
                    floated="right"
                    content="View"
                    color="blue"
                    onClick={() => selectedActivity(activity.id)}
                  ></Button>
                  <Button
                    name={activity.id}
                    loading={target === activity.id && submitting}
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={e => deleteAcitivity(e, activity.id)}
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

export default ActivityList;
