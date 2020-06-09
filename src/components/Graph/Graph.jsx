import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import "./Graph.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartWithZoom extends Component {
  constructor() {
    super();
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateDataPoints(noOfDps) {
    var xVal = "",
      yVal = 0;
    var dps = [];
    if (this.props.start === "yes") {
      for (var i = 0; i < noOfDps; i++) {
        yVal = this.props.graphData[i].totalConfirmed;
        xVal = new Date(this.props.graphData[i].reportDate).toDateString();
        dps.push({ label: xVal, y: yVal });
      }
    } else if (this.props.start === "no") {
      for (let i = 0; i < noOfDps; i++) {
        yVal = this.props.graphData[i].Confirmed;
        xVal = new Date(this.props.graphData[i].Date).toDateString();
        dps.push({ label: xVal, y: yVal });
      }
    }
    return dps;
  }

  generateDataPoints2(noOfDps) {
    var xVal = "",
      yVal = 0;
    var dead = [];
    if (this.props.start === "yes") {
      for (var i = 0; i < noOfDps; i++) {
        console.log(this.props.graphData[0]);
        yVal = this.props.graphData[i].deaths.total;
        xVal = new Date(this.props.graphData[i].reportDate).toDateString();
        dead.push({ label: xVal, y: yVal });
      }
    } else if (this.props.start === "no") {
      for (let i = 0; i < noOfDps; i++) {
        yVal = this.props.graphData[i].Deaths;
        xVal = new Date(this.props.graphData[i].Date).toDateString();
        dead.push({ label: xVal, y: yVal });
      }
    }
    return dead;
  }

  generateDataPoints3(noOfDps) {
    var xVal = "",
      yVal = 0;
    var recover = [];
    if (this.props.start === "no") {
      for (let i = 0; i < noOfDps; i++) {
        yVal = this.props.graphData[i].Recovered;
        xVal = new Date(this.props.graphData[i].Date).toDateString();
        recover.push({ label: xVal, y: yVal });
      }
      return recover;
    }
    return null;
  }

  render() {
    const options = {
      theme: "light2", // "light1", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Covid 19 Case Graph",
      },
      axisY: {
        includeZero: false,
      },
      data: [
        {
          type: "area",
          dataPoints: this.generateDataPoints(this.props.graphData.length),
        },

        {
          type: "area",
          color: "green",
          dataPoints: this.generateDataPoints3(this.props.graphData.length),
        },

        {
          type: "area",
          color: "red",
          dataPoints: this.generateDataPoints2(this.props.graphData.length),
        },
      ],
    };
    return (
      <div className="Graph">
        <div className="ChartWithZoom">
          {/* <h1>React Line Chart With Zooming / Panning</h1> */}
          <CanvasJSChart
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        </div>
      </div>
    );
  }
}
export default ChartWithZoom;
