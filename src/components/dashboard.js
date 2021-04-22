import React, { Component } from "react";
import TextWidget from "./textWidget";
import BarWidget from "./barWidget";
import DoughnutWidget from "./doughnutWidget";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Col, Row, Container, Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./dashboard.css";

//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdowns: [],
      selected: "jan 2018",
      organic: null,
      direct: null,
      referral: null,
      social: null,
      users: null,
      chartData: [],
      newUsers: null,
      pageviews: null,
      bounceRate: null
    };
  }
  getData = (value) => {
    const data = this.state.items;
    const datalen = data.length;
    let chartData = [];
    let organicSource = 0;
    let directSource = 0;
    let referralSource = 0;
    let socialSource = 0;
    let users = 0;
    let newUsers = 0;
    let pageViews = 0;
    let bounceRate = 0;
    for (let i = 0; i < datalen; i++) {
      if (value === data[i]["month"]) {
        organicSource = data[i].organic_source;
        directSource = data[i].direct_source;
        referralSource = data[i].referral_source;
        socialSource = data[i].social_source;
        users = data[i].users;
        newUsers = data[i].new_users;
        pageViews = data[i].page_views;
        bounceRate = data[i].bounce_rate;
         console.log(data[i]["month"])
        chartData.push(
          {
            label: "Organuic",
            value: organicSource
          },
          {
            label: " direct",
            value: directSource
          },
          {
            label: "referral",
            value: referralSource
          },
          {
            label: "Social",
            value: socialSource
          }
        );
      }
    }

    this.setState({
      organic: organicSource,
      direct: directSource,
      referral: referralSource,
      social: socialSource,
      chartData: chartData,
      users: users,
      newUsers: newUsers,
      bounceRate: bounceRate,
      pageViews: pageViews
    });
    console.log(this.state.chartData);
  };
  updateContent = (event) => {
    this.getData(event.value);
    this.setState({ selected: event.value });
  };
  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let dataValues = data.valueRanges[0].values;
        let row = [];
        for (let i = 1; i < dataValues.length; i++) {
          let rowValues = {};
          for (let j = 0; j < dataValues[i].length; j++) {
            rowValues[dataValues[0][j]] = dataValues[i][j];
          }
          row.push(rowValues);
        }
        let dropdownMenu = [];
        for (let i = 0; i < row.length; i++) {
          dropdownMenu.push(row[i].month);
        }
        dropdownMenu = Array.from(new Set(dropdownMenu)).reverse();
        this.setState(
          {
            items: row,
            dropdowns: dropdownMenu,
            selected: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    const sourceData = [
      {
        label: "Organic ",
        value: this.state.organic
      },
      {
        label: "Direct ",
        value: this.state.direct
      },
      {
        label: "Referral ",
        value: this.state.referral
      },
      {
        label: "Social",
        value: this.state.social
      }
    ];
    const userData = [
      {
        label: "Users ",
        value: this.state.users
      },
      {
        label: "New users ",
        value: this.state.newUsers
      }
    ];
    return (
      <>
        <Container fluid className="head">
          <Row>
            <Col lg={6} xs={6}>
             <h2> Dashboard</h2>
            </Col>
            <Col>
              <Dropdown
                options={this.state.dropdowns}
                onChange={this.updateContent}
                value={this.state.selected}
              />
            </Col>
          </Row>
        </Container >
        <Container >
        
          <Row>
          
            <Col className="heading">
              <h2>Source Overview</h2>
            </Col>
          
          </Row>
          
          <Row>
            
              <Col lg={3}>
                <TextWidget title="Organic Source" value={this.state.organic} />
              </Col>
              <Col lg={3}>
                <TextWidget title="Direct Source" value={this.state.direct} />
              </Col>
             
              <Col lg={3}>
                <TextWidget
                  title="Referral Source"
                  value={this.state.referral}
                />
             </Col>
             <Col lg={3}>
                <TextWidget title="Social Source" value={this.state.social} />
              </Col>
            <Col >
              <BarWidget title="Sources overview" data={sourceData} />
            </Col>
           
          </Row>
          <Accordion defaultActiveKey="0">
            <Container>
          <Row>
          <Accordion.Toggle eventKey="0">
            <Col className="heading">
              <h2>Page and Users Overview</h2>
            </Col>
            </Accordion.Toggle>
          </Row>
          <Accordion.Collapse eventKey="0">
          <Row>
            <Col lg={6}>
              <Col>
                <TextWidget title="Page Views" value={this.state.pageViews} />
              
                <TextWidget title="Users" value={this.state.users} />
                <TextWidget
                  title="New Users"
                  value={this.state.newUsers}
                />
              </Col>
            </Col>
            <Col lg={6}>
              <DoughnutWidget title="Users overview" data={userData} />
              <TextWidget title="Bounce Rate" value={this.state.bounceRate} />
            </Col>
          </Row>
          </Accordion.Collapse>
          </Container>
          </Accordion>
        </Container>
      </>
    );
  }
}
export default Dashboard;
