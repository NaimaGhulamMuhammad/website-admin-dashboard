import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import { Container, Table, Row, Col } from "react-bootstrap";

const ComparisonTable = ({ getData, currentState }) => {
  const [optionToCompare, setOptionToCompare] = useState("");
  const [comparisonData, setComparisonData] = useState([]);

  const generateTableRow = (rows = {}) =>
    Object.keys(rows).map((label, i) => {
      const dataKey = rows[label];
      return (
        <tr key={i}>
          <td>{label}</td>
          <td>{currentState[dataKey]}</td>
          {comparisonData[dataKey] ? <td>{comparisonData[dataKey]}</td> : null}
        </tr>
      );
    });

  useEffect(() => {
    if (optionToCompare) {
      const data = getData(optionToCompare);
      setComparisonData(data);
    }
  }, [optionToCompare, getData]);

  const rows = {
    "Organic Source": "organic",
    "Direct Source": "direct",
    "Referral Source": "referral",
    "Social Source": "social",
    Users: "users",
    "New Users": "newUsers",
    "Page Views": "pageViews",
    "Bounce Rate": "bounceRate",
  };

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          Select a date from the dropdown to compare with the current data set:
        </Col>
        <Col>
          {/* Enhancement: Multiselect dropdown to compare multiple months */}
          <Dropdown
            options={currentState.dropdowns}
            onChange={(e) => setOptionToCompare(e.value)}
            value={optionToCompare}
            className='comparison-dropdown'
          />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead className='title'>
          <tr>
            <th>Stats</th>
            <th>{currentState.selected}</th>
            {optionToCompare ? <th>{optionToCompare}</th> : null}
          </tr>
        </thead>
        <tbody>{generateTableRow(rows)}</tbody>
      </Table>
    </Container>
  );
};

export default ComparisonTable;
