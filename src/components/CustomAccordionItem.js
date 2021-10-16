import React from "react";
import { Container, Accordion, Col, Row } from "react-bootstrap";

const CustomAccordionItem = (props) => (
  <Container>
    <Row>
      <Accordion.Toggle
        eventKey={props.itemNumber}
        className='accordion-button'
      >
        <Col className='heading'>
          <h2>{props.title}</h2>
        </Col>
      </Accordion.Toggle>
    </Row>

    <Accordion.Collapse eventKey={props.itemNumber}>
      {props.children}
    </Accordion.Collapse>
  </Container>
);

export default CustomAccordionItem;
