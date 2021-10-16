import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import BarWidget from "./BarWidget";
import TextWidget from "./TextWidget";

const SourceOverview = ({ sourceData }) => (
  <Container>
    <Row>
      <Col className='heading'>
        <h2>Source Overview</h2>
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
);
export default SourceOverview;
