import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Menu extends Component {
  static displayName = Menu.name;

  constructor(props) {
    super(props);
    this.state = { beers: [], searchResults: [], searchTerm: '', loading: true };
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

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;

    if (searchTerm.trim() === '') {
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?beer_name=${searchTerm}`
      );
      const data = await response.json();

      this.setState({ searchResults: data, loading: false });
    } catch (error) {
      console.error('Error:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { beers, searchResults, searchTerm, loading } = this.state;
    const isSearching = searchTerm !== '';

    let contents = loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : isSearching ? (
      <div>
        <p>Viewing search results for: {searchTerm}</p>
        {Menu.renderMenuTable(searchResults)}
      </div>
    ) : (
      Menu.renderMenuTable(beers)
    );

    return (
      <div>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>

        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleSearchChange}
            placeholder="Search beers"
          />
          <button type="submit">Search</button>
        </form>

        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

  async populateMenuData() {
    const response = await fetch('https://api.punkapi.com/v2/beers');
    const data = await response.json();
    this.setState({ beers: data, loading: false });
  }
}
