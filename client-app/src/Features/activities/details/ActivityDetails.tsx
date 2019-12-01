import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../App/Stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSelectedActivity
  } = activityStore;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            content="Edit"
            color="blue"
            onClick={() => openEditForm(activity!.id)}
          ></Button>
          <Button
            onClick={cancelSelectedActivity}
            basic
            content="Cancel"
            color="grey"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
