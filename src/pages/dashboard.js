import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  CustomAccordion,
  Header,
  PageUserOverview,
  SourceOverview,
  CustomAccordionItem,
} from "../components";

import "./dashboard.css";

//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg",
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
      bounceRate: null,
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
        console.log(data[i]["month"]);
        chartData.push(
          {
            label: "Organuic",
            value: organicSource,
          },
          {
            label: " direct",
            value: directSource,
          },
          {
            label: "referral",
            value: referralSource,
          },
          {
            label: "Social",
            value: socialSource,
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
      pageViews: pageViews,
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
            selected: "Jan 2018",
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    const sourceData = [
      {
        label: "Organic ",
        value: this.state.organic,
      },
      {
        label: "Direct ",
        value: this.state.direct,
      },
      {
        label: "Referral ",
        value: this.state.referral,
      },
      {
        label: "Social",
        value: this.state.social,
      },
    ];
    const userData = [
      {
        label: "Users ",
        value: this.state.users,
      },
      {
        label: "New users ",
        value: this.state.newUsers,
      },
    ];
    return (
      <>
        <Header
          options={this.state.dropdowns}
          onChange={this.updateContent}
          value={this.state.selected}
        />
        <SourceOverview sourceData={sourceData} />
        <CustomAccordion defaultActiveKey='0'>
          <CustomAccordionItem itemNumber='0' title='Page and User Overview'>
            <PageUserOverview
              userData={userData}
              pageViews={this.state.pageViews}
              users={this.state.users}
              newUsers={this.state.newUsers}
              bounceRate={this.state.bounceRate}
            />
          </CustomAccordionItem>
        </CustomAccordion>
      </>
    );
  }
}
export default Dashboard;
