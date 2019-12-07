import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function home() {
  return (
    <Container style={{ marginTop: "2em" }}>
      <h1>Home Page</h1>
      <h3>
        Goto <Link to="/activities">Activities</Link>
      </h3>
    </Container>
  );
}
