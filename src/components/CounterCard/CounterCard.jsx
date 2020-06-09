import React from "react";
import "./CounterCard.css";

class CounterCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: "",
    };
  }

  async componentDidMount() {
    this.setState({ items: this.props.confirmed });
  }
  render() {
    return (
      <div className="bodyCC">
        <div className="containerCC">
          <div className="boxCC">
            <div
              className="img-boxCC"
              id={`Confirmed: ${this.props.confirmed}`}
            >
              <img
                src="https://img.icons8.com/dusk/96/coronavirus.png"
                alt=""
              />
            </div>
          </div>
          <div className="boxCC">
            <div className="img-boxCC" id={`Deaths: ${this.props.deaths}`}>
              <img src="https://img.icons8.com/color/96/thriller.png" alt="" />
            </div>
            <div className="infectedCC">
              <div className="contentCC">
                <h2>Deaths: {this.props.deaths}</h2>
                <p id="demo"></p>
              </div>
            </div>
          </div>
          <div className="boxCC">
            <div
              className="img-boxCC"
              id={`Recovered: ${this.props.recovered}`}
            >
              <img src="https://img.icons8.com/color/96/recovery.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CounterCard;
