import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

export class Menu extends Component {
  static displayName = Menu.name;

  constructor(props) {
    super(props);
    this.state = { beers: [], forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
    this.populateMenuData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  static renderMenuTable(beers) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Tagline</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {beers.map(beer =>
            <tr key={beer.id}>
              <td>{beer.id}</td>
              <td>
                <Link to={`/beers/${beer.id}`}>{beer.name}</Link> {/* Make each row clickable */}
              </td>
              <td>{beer.tagline}</td>
              <img src={beer.image_url} alt={beer.name} width="50" height="50" />
            </tr>
          )}
        </tbody>
      </table>
    );
  }

//   render() {
//     let contents = this.state.loading
//       ? <p><em>Loading...</em></p>
//       : Menu.renderMenuTable(this.state.beers);

//     return (
//       <div>
//         <h1 id="tabelLabel" >Weather forecast</h1>
//         <p>This component demonstrates fetching data from the server.</p>
//         {contents}
//       </div>
//     );
//   }


render() {
    const { beers, loading, searchTerm } = this.state;
  
    let contents;
    if (loading) {
      contents = <p><em>Loading...</em></p>;
    } else {
      if (searchTerm) {
        contents = (
          <div>
            <p>Viewing results for: {searchTerm}</p>
            {Menu.renderMenuTable(beers)}
          </div>
        );
      } else {
        contents = (
          <div>
            {Menu.renderMenuTable(beers)}
          </div>
        );
      }
    }
  
    return (
      <div>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        <Search onSearch={this.handleSearch} />
        {contents}
      </div>
    );
  }
  
  

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

//   async populateMenuData() {
//     const response = await fetch('https://api.punkapi.com/v2/beers');
//     const data = await response.json();
//     this.setState({ beers: data, loading: false });
//   }

    async populateMenuData() {
    const { searchTerm } = this.state;
    const apiUrl = searchTerm
        ? `https://api.punkapi.com/v2/beers?beer_name=${searchTerm}`
        : 'https://api.punkapi.com/v2/beers';

    const response = await fetch(apiUrl);
    const data = await response.json();
    this.setState({ beers: data, loading: false });
    }


  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
  };
}
