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
        <BeerDetailsInfo beer={beer} />
      </div>
    );
  }
}

const BeerDetailsWrapper = () => {
  const { id } = useParams();
  return <BeerDetails id={id} />;
};

export default BeerDetailsWrapper;

export const BeerDetailsInfo = ({ beer }) => {
  const {
    name,
    tagline,
    first_brewed,
    description,
    image_url,
    abv,
    ibu,
    target_fg,
    target_og,
    ebc,
    srm,
    ph,
    attenuation_level,
    volume,
    boil_volume,
    method,
    ingredients,
    food_pairing,
    brewers_tips,
    contributed_by,
  } = beer;

  return (
    <div>
      <h3>Basic Information</h3>
      <ul>
        <li>First Brewed: {first_brewed}</li>
        <li>ABV: {abv}%</li>
        <li>IBU: {ibu}</li>
        <li>Target FG: {target_fg}</li>
        <li>Target OG: {target_og}</li>
        <li>EBC: {ebc}</li>
        <li>SRM: {srm}</li>
        <li>pH: {ph}</li>
        <li>Attenuation Level: {attenuation_level}</li>
      </ul>

      <h3>Volume</h3>
      <p>
        {volume.value} {volume.unit}
      </p>

      <h3>Boil Volume</h3>
      <p>
        {boil_volume.value} {boil_volume.unit}
      </p>

      <h3>Method</h3>
      <ul>
        <li>
          Mash Temp: {method.mash_temp[0].temp.value}°{method.mash_temp[0].temp.unit} for {method.mash_temp[0].duration} minutes
        </li>
        <li>
          Fermentation Temp: {method.fermentation.temp.value}°{method.fermentation.temp.unit}
        </li>
      </ul>

      <h3>Ingredients</h3>
      <ul>
        <li>Malt: {ingredients.malt[0].name} - {ingredients.malt[0].amount.value} {ingredients.malt[0].amount.unit}</li>
        <li>
          Hops:
          <ul>
            {ingredients.hops.map((hop, index) => (
              <li key={index}>
                {hop.name} - {hop.amount.value} {hop.amount.unit}, Add: {hop.add}, Attribute: {hop.attribute}
              </li>
            ))}
          </ul>
        </li>
        <li>Yeast: {ingredients.yeast}</li>
      </ul>

      <h3>Food Pairing</h3>
      <ul>
        {food_pairing.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>

      <h3>Brewers Tips</h3>
      <p>{brewers_tips}</p>

      <h3>Contributed By</h3>
      <p>{contributed_by}</p>
    </div>
  );
};
