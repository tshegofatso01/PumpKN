import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', searchResults: [] };
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;

    this.setState({ loading: true });

    try {
    //   const response = await fetch(
    //     `https://api.punkapi.com/v2/beers?beer_name=${searchTerm}`
    //   );
      const response = await fetch(
        `/search/?beer_name=${searchTerm}`
      );
      const data = await response.json();

      this.setState({ searchResults: data, loading: false });
    } catch (error) {
      console.error('Error:', error);
      this.setState({ loading: false });
    }
  };

  renderSearchTable(beers) {
    return (
      <table className='table table-striped' aria-labelledby='tabelLabel'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Tagline</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {beers.map((beer) => (
            <tr key={beer.id}>
              <td>{beer.id}</td>
              <td>
                <Link to={`/beers/${beer.id}`}>{beer.name}</Link>
              </td>
              <td>{beer.tagline}</td>
              <td>
                <img src={beer.image_url} alt={beer.name} width='50' height='50' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const { searchTerm, searchResults } = this.state;

    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type='text'
            value={searchTerm}
            onChange={this.handleSearchChange}
            placeholder='Search by name or tagline'
          />
          <button type='submit'>Search</button>
        </form>

        {searchResults.length > 0 ? (
          this.renderSearchTable(searchResults)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  }
}

export default Search;
