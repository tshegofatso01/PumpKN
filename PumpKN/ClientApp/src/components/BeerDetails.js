import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

export class BeerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { beer: null, loading: true };
  }

  componentDidMount() {
    const { id } = this.props;
    this.fetchBeerDetails(id);
  }

  async fetchBeerDetails(id) {
    // const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
    const response = await fetch(`/beer/${id}`);
    const data = await response.json();
    this.setState({ beer: data[0], loading: false });
  }

  render() {
    const { beer, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Beer Details</h1>
        <h2>{beer.name}</h2>
        <p>{beer.tagline}</p>
        <img src={beer.image_url} alt={beer.name} width="200" height="200" />
        <p>{beer.description}</p>
      </div>
    );
  }
}

export default function BeerDetailsWrapper() {
  const { id } = useParams();
  return <BeerDetails id={id} />;
}
