import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item exact as={NavLink} to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            as={Link}
            positive
            content="Create Activity"
            to="/createActivity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

//Navbar.propTypes = {};

export default observer(Navbar);
