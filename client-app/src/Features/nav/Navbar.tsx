import React, { useContext } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import ActivityStore from "../../App/Stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  // handleCreateFrom: () => void;
}

const Navbar: React.FC<IProps> = () => {
  const activityStore = useContext(ActivityStore);
  const { openCreatForm } = activityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={openCreatForm}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

//Navbar.propTypes = {};

export default observer(Navbar);
