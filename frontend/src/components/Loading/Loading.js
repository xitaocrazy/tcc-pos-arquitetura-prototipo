import React from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";

const Loading = () => (
  <Container>
    <Row>
      <Col md={{ span: 6, offset: 6 }}>
        <Spinner animation="border" variant="secondary" />
      </Col>
    </Row>
  </Container>
);

export default Loading;
