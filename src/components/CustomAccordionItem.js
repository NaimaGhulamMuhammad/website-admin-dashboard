import React from "react";
import { Container, Accordion, Col, Row } from "react-bootstrap";

const CustomAccordionItem = (props) => (
  <Container>
    <Accordion.Toggle eventKey={props.itemNumber} style={{ width: "100%" }}>
      <Row>
        <Col className='heading'>
          <h3>{props.title}</h3>
        </Col>
      </Row>
    </Accordion.Toggle>

    <Accordion.Collapse eventKey={props.itemNumber}>
      {props.children}
    </Accordion.Collapse>
  </Container>
);

export default CustomAccordionItem;
