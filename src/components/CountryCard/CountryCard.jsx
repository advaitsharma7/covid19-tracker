import axios from "axios";
import React from "react";
import "./CountryCard.css";

class CountryCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    await axios
      .get("https://covid19.mathdro.id/api/countries")

      .then((res) => {
        console.log(res);
        this.setState({ items: res.data.countries });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { items } = this.state;
    var select = document.getElementById("select");
    for (let i = 0; i < items.length; i++) {
      var option = document.createElement("OPTION"),
        txt = document.createTextNode(items[i].name);
      option.appendChild(txt);
      if (items[i].iso2 === undefined) {
        if (items[i].iso3 === undefined) {
          option.setAttribute("value", items[i].name);
        } else {
          option.setAttribute("value", items[i].iso3);
        }
      } else {
        option.setAttribute("value", items[i].iso2);
      }
      select.insertBefore(option, select.lastChild);
    }
    return (
      <div className="body">
        <div className="container">
          <div className="box">
            <div className="img-box" title="Choose a Country">
              <img src="https://img.icons8.com/color/200/america.png" alt="" />
            </div>
            <div className="country">
              <div className="content">
                <select
                  id="select"
                  onChange={(e) => {
                    this.props.func(e.target.value);
                  }}
                >
                  <option value="World">Global</option>
                  <option></option>
                </select>
                <p id="demo"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CountryCard;
