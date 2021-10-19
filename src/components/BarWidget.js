import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import GammelTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
ReactFC.fcRoot(FusionCharts, Charts, GammelTheme);

function BarWidget(props) {
  const chartConfigs = {
    type: "bar2d", // The chart type
    width: "100%", // Width of the chart
    height: "200", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        theme: "gammel", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: props.data,
    },
  };
  return (
    <div className='widget chart shadow-lg'>
      <ReactFC {...chartConfigs} />
    </div>
  );
}
export default BarWidget;
