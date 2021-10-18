import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  CustomAccordion,
  Header,
  ComparisonTable,
  CustomAccordionItem,
  Overview,
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
      selected: "Jan 2018",
      organic: null,
      direct: null,
      referral: null,
      social: null,
      users: null,
      chartData: [],
      newUsers: null,
      pageViews: null,
      bounceRate: null,
    };
  }

  getData = (value) => {
    const data = this.state.items;
    const datalen = data.length;
    let chartData = [];
    let organic = 0;
    let direct = 0;
    let referral = 0;
    let social = 0;
    let users = 0;
    let newUsers = 0;
    let pageViews = 0;
    let bounceRate = 0;
    for (let i = 0; i < datalen; i++) {
      if (value === data[i]["month"]) {
        organic = data[i].organic_source;
        direct = data[i].direct_source;
        referral = data[i].referral_source;
        social = data[i].social_source;
        users = data[i].users;
        newUsers = data[i].new_users;
        pageViews = data[i].page_views;
        bounceRate = data[i].bounce_rate;
        console.log(data[i]["month"]);
        chartData.push(
          {
            label: "Organuic",
            value: organic,
          },
          {
            label: "Direct",
            value: direct,
          },
          {
            label: "Referral",
            value: referral,
          },
          {
            label: "Social",
            value: social,
          }
        );
      }
    }
    return {
      organic,
      direct,
      referral,
      social,
      chartData,
      users,
      newUsers,
      bounceRate,
      pageViews,
    };
  };

  setCurrentDataSet = ({
    organic,
    direct,
    referral,
    social,
    chartData,
    users,
    newUsers,
    bounceRate,
    pageViews,
  }) => {
    this.setState({
      organic,
      direct,
      referral,
      social,
      chartData,
      users,
      newUsers,
      bounceRate,
      pageViews,
    });
    console.log(this.state.chartData);
  };

  updateContent = (event) => {
    const data = this.getData(event.value);
    this.setCurrentDataSet(data);
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
        this.setState({
          items: row,
          dropdowns: dropdownMenu,
        });
        this.updateContent({
          label: this.state.selected,
          value: this.state.selected,
        });
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
        label: "New Users ",
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
        <Overview
          sourceData={sourceData}
          userData={userData}
          pageViews={this.state.pageViews}
          users={this.state.users}
          newUsers={this.state.newUsers}
          bounceRate={this.state.bounceRate}
        />
        <CustomAccordion defaultActiveKey='0'>
          <CustomAccordionItem itemNumber='0' title='Compare Stats'>
            <ComparisonTable getData={this.getData} currentState={this.state} />
          </CustomAccordionItem>
        </CustomAccordion>
      </>
    );
  }
}
export default Dashboard;
