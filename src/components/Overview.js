import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import BarWidget from "./BarWidget";
import TextWidget from "./TextWidget";
import DoughnutWidget from "./DoughnutWidget";

const Overview = ({
  sourceData,
  userData,
  pageViews,
  users,
  newUsers,
  bounceRate,
  selectedValue,
}) => (
  <>
    <Container>
      <Row>
        <Col className='heading'>
          <h3>{selectedValue} Overview</h3>
        </Col>
      </Row>
      <Row>
        {sourceData.map((source) => (
          <Col lg={3} key={source.label}>
            <TextWidget title={`${source.label} Source`} value={source.value} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <BarWidget title='Sources Overview' data={sourceData} />
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <TextWidget title='Users' value={users} />
            </Col>
            <Col>
              <TextWidget title='New Users' value={newUsers} />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextWidget title='Page Views' value={pageViews} />
            </Col>
            <Col>
              <TextWidget title='Bounce Rate' value={bounceRate} />
            </Col>
          </Row>
        </Col>
        <Col>
          <DoughnutWidget title='Users overview' data={userData} />
        </Col>
      </Row>
    </Container>
  </>
);
export default Overview;
