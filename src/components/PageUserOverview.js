import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import TextWidget from "./TextWidget";
import DoughnutWidget from "./DoughnutWidget";

const PageUserOverview = ({
  userData,
  pageViews,
  users,
  newUsers,
  bounceRate,
}) => (
  <Container fluid>
    <Row>
      <Col>
        <TextWidget title='Page Views' value={pageViews} />
      </Col>
      <Col>
        <TextWidget title='Bounce Rate' value={bounceRate} />
      </Col>
    </Row>
    <Row>
      <Col>
        <TextWidget title='Users' value={users} />
      </Col>
      <Col>
        <TextWidget title='New Users' value={newUsers} />
      </Col>
    </Row>
    <Row>
      <Col lg={3}>
        <DoughnutWidget title='Users overview' data={userData} />
      </Col>
    </Row>
  </Container>
);

export default PageUserOverview;
