import React from "react";
import { Container, Accordion } from "react-bootstrap";

const CustomAccordion = (props) => {
  return (
    <Accordion defaultActiveKey={props.defaultActiveKey}>
      <Container>{props.children}</Container>
    </Accordion>
  );
};

export default CustomAccordion;
