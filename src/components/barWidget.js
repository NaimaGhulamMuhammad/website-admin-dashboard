import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function BarWidget(props) {
  const chartConfigs = {
    type: "bar2d", // The chart type
    width: "100%", // Width of the chart
    height: "120", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        bgColor: "#2a2a2a",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: props.data,
    },
  };
  return (
    <div className='widget chart'>
      <div className='title'>{props.title}</div>
      <div className='widgetValue'>
        <ReactFC {...chartConfigs} />
      </div>
    </div>
  );
}
export default BarWidget;
