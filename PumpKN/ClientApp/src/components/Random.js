import React, { Component } from 'react';
import { BeerDetailsInfo } from './BeerDetails';

export class Random extends Component {
  constructor(props) {
    super(props);
    this.state = { beer: null, loading: false };
  }

  handleRandomClick = async () => {
    this.setState({ loading: true });

    try {
    //   const response = await fetch('https://api.punkapi.com/v2/beers/random');
      const response = await fetch('/beer/random');
      const data = await response.json();
      const randomBeer = data[0];
      this.setState({ beer: randomBeer, loading: false });
    } catch (error) {
      console.error('Error:', error);
      this.setState({ loading: false });
    }
  };

  renderBeerDetails(beer) {
    return (
      <div>
        <h2>{beer.name}</h2>
        <p>{beer.tagline}</p>
        <p>Description: {beer.description}</p>
        <img src={beer.image_url} alt={beer.name} width="200" height="200" />
        <BeerDetailsInfo beer={beer} />
      </div>
    );
  }

  render() {
    const { beer, loading } = this.state;

    return (
      <div>
        <h1>Random Beer</h1>
        <button onClick={this.handleRandomClick} disabled={loading}>
          {loading ? 'Loading...' : 'Get Random Beer'}
        </button>

        {beer && this.renderBeerDetails(beer)}
      </div>
    );
  }
}

export default Random;
