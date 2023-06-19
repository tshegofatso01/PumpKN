import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Menu extends Component {
  static displayName = Menu.name;

  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      searchResults: [],
      searchTerm: '',
      loading: true,
      showAllItems: true,
      currentPage: 1,
      itemsPerPage: 25,
    };
  }

  componentDidMount() {
    this.populateMenuData();
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    const searchTerm = new FormData(event.target).get('searchTerm');

    console.log(event.target.searchTerm.value);
    this.setState({ searchTerm: searchTerm });

    if (searchTerm.trim() === '') {
      return;
    }

    this.setState({ loading: true });

    try {
    //   const response = await fetch(
    //     `https://api.punkapi.com/v2/beers?beer_name=${searchTerm}`
    //   );
      const response = await fetch(
        `https://localhost:7297/search/?beer_name=${searchTerm}`
      );
      const data = await response.json();

      this.setState({ searchResults: data, loading: false, showAllItems: false });
    } catch (error) {
      console.error('Error:', error);
      this.setState({ loading: false });
    }
  };

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
                <Link to={`/beers/${beer.id}`}>{beer.name}</Link>
              </td>
              <td>{beer.tagline}</td>
              <td>
                <img src={beer.image_url} alt={beer.name} width="50" height="50" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    const {
      beers,
      searchResults,
      searchTerm,
      loading,
      showAllItems,
      currentPage,
      itemsPerPage,
    } = this.state;
    const isSearching = searchTerm !== '';
  
    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = isSearching ? searchResults : beers;
    const currentItemsSlice = currentItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = 13; //Math.ceil(currentItems.length / itemsPerPage);
  
    let contents = loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <div>
        {isSearching && (
          <p>Viewing search results for: {searchTerm}</p>
        )}
        {Menu.renderMenuTable(currentItems)}
      </div>
    );
  
    if (!showAllItems && !isSearching && searchResults.length === 0) {
      contents = <p>No beers found.</p>;
    }
  
    return (
      <div>
        <h1 id="tabelLabel">Beers</h1>
        <p>List of beers.</p>
  
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            name='searchTerm'
            placeholder="Search beers"
          />
          <button type="submit">Search</button>
        </form>
  
        {contents}
  
        {/* Pagination */}
        {currentItems.length >= itemsPerPage && (
          <div>
            <button
              disabled={currentPage === 1}
              onClick={this.handlePrevPage}
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={this.handleNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }

  async populateMenuData() {
    const { currentPage, itemsPerPage } = this.state;
    // const response = await fetch(
    //   `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${itemsPerPage}`
    // );

    const response = await fetch(
        `https://localhost:7297/beer/menu?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
      );
    const data = await response.json();
    this.setState({ beers: data, loading: false });
  }

  handlePrevPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1,
      loading: true,
    }), this.populateMenuData);
  };

  handleNextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      loading: true,
    }), this.populateMenuData);
  };
}
