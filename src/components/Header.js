import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Header = ({ options, onChange, value }) => (
  <Container fluid className='head'>
    <Row>
      <Col lg={6} xs={6}>
        <h2> Dashboard</h2>
      </Col>
      <Col>
        <Dropdown options={options} onChange={onChange} value={value} />
      </Col>
    </Row>
  </Container>
);

export default Header;
