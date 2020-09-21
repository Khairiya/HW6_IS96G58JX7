import React from "react";
import logo from './logo.png';
import { Component} from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: {},
      data:[],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then(
        (allData) => {
          this.setState({
            isLoaded: true,
            allData: allData,
          });
        },

        (error) => {
          // handle your errors here
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
      fetch(
        "https://disease.sh/v3/covid-19/countries?sort=cases&allowNull=true"
      )
        .then((res) => res.json())
        .then((data) => {
           this.setState({
           isLoaded: true,
           data: data,
         });
        });
        
  }
  
  render() {
    const { allData } = this.state;
    const{ data } = this.state;

    let update = data.map((item) => {

    const {  country, cases, deaths, recovered, active,  } = item;
      return (
        <tbody >
          <tr>
            <td>{country}</td>
            <td>{cases}</td>
            <td>{active}</td>
            <td>{recovered}</td>
            <td>{deaths}</td>
          </tr>
        </tbody>
      );
    });

    return (
      <body>
        <div className="container">
          <div className="row">
            <p className="toprow">
              <img src={logo} alt="logo" height="30px" />
              Covid-19 Tracker
            </p>
          </div>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-sm-2 box">
              <p>
                Total Cases <i className="fa fa-arrow-alt-circle-up icons"></i>
              </p>
              <p className="counterPara">
                <b>{allData.cases}</b>
              </p>
            </div>
            <div className="col-sm-2 box">
              <p>
                Recovered{" "}
                <i className="fa fa-arrow-alt-circle-down icons-green"></i>
              </p>
              <p className="counterPara">
                <b>{allData.recovered}</b>
              </p>
            </div>
            <div className="col-sm-2 box">
              <p>
                Active Cases <i className="fa fa-arrow-alt-circle-up icons"></i>
              </p>
              <p className="counterPara">
                <b>{allData.active}</b>
              </p>
            </div>
            <div className="col-sm-2 box">
              <p>
                Total Deaths <i className="fa fa-arrow-alt-circle-up icons"></i>
              </p>
              <p className="counterPara">
                <b>{allData.deaths}</b>
              </p>
            </div>
          </div>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Countries</th>
                    <th>Total Cases</th>
                    <th>Recovered</th>
                    <th>Active Cases</th>
                    <th>Deaths</th>
                  </tr>
                </thead>
                {update}
              </table>
            </div>
            <div className="col-sm-4">
              <div className="col align-self-end side-box">
                <div className="row justify-content-center innerBoxPadding">
                  <div className="col-sm-5 inner-box">
                    <b>Health Tips</b>
                  </div>
                </div>
              </div>
              <div>&nbsp;</div>
              <div className="col align-self-end side-box">
                <div className="row justify-content-center innerBoxPadding">
                  <div className="col-sm-6 inner-box">
                    <b>News & Update</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
