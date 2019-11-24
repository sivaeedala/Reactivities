import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";

interface IProps {
  handleCreateFrom: () => void;
}

const Navbar: React.FC<IProps> = ({ handleCreateFrom }) => {
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
            onClick={handleCreateFrom}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

Navbar.propTypes = {};

export default Navbar;
