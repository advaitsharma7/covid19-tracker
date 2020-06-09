import React from "react";
import "./App.css";
import CountryCard from "./components/CountryCard/CountryCard.jsx";
import CounterCard from "./components/CounterCard/CounterCard.jsx";
import Graph from "./components/Graph/Graph.jsx";
import Axios from "axios";

class App extends React.Component {
  state = {
    confirmed: "",
    country: "",
    recovered: "",
    deaths: "",
    date: "",
    data: "",
    start: "",
  };

  confirmedData = async (url) => {
    console.log(url);
    await Axios.get(url)
      .then((res) => {
        this.setState({ confirmed: res.data.confirmed.value });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  recoveredData = async (url) => {
    await Axios.get(url)
      .then((res) => {
        this.setState({ recovered: res.data.recovered.value });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deathData = async (url) => {
    await Axios.get(url)
      .then((res) => {
        this.setState({ deaths: res.data.deaths.value });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  graphData = async (url) => {
    await Axios.get(url)
      .then((res) => {
        console.log(url);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.confirmedData("https://covid19.mathdro.id/api");
    this.recoveredData("https://covid19.mathdro.id/api");
    this.deathData("https://covid19.mathdro.id/api");
    this.graphData("https://covid19.mathdro.id/api/daily");
    this.setState({ start: "yes" });
  }

  handleCountryChange = async (country) => {
    this.setState({ country: country, start: "no" });
    const urlGlobal = "https://covid19.mathdro.id/api/countries";
    var urlCountry = urlGlobal + "/" + country;
    var graphUrl = "https://api.covid19api.com/total/country/" + country;
    console.log(graphUrl);
    if (country === "World") {
      this.setState({ start: "yes" });
      graphUrl = "https://covid19.mathdro.id/api/daily";
      urlCountry = "https://covid19.mathdro.id/api";
    }

    this.confirmedData(urlCountry);
    this.recoveredData(urlCountry);
    this.deathData(urlCountry);
    this.graphData(graphUrl);
    // console.log(this.state.country);
    // console.log(this.state.confirmed);
    // console.log(this.state.recovered);
    // console.log(this.state.deaths);
  };

  render() {
    const { data, country, confirmed, recovered, deaths, start } = this.state;
    return (
      <div>
        {console.log(data)}
        <img
          className="covidicon"
          src={require("./covid19icon4.png")}
          alt="Covid19 Icon"
        ></img>
        <CountryCard func={this.handleCountryChange} />
        <CounterCard
          country={country}
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
        />
        <Graph graphData={data} start={start} />
      </div>
    );
  }
}

export default App;
