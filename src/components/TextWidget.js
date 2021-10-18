import React from "react";

function TextWidget(props) {
  return (
    <div className="widget">
      <div className="title">{props.title}</div>
      <div className="widgetValue">
        <div className="value">{props.value}</div>
        <div className="desc">{props.desc}</div>
      </div>
    </div>
  );
}
export default TextWidget;
