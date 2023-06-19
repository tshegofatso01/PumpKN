import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { Search } from "./components/Search";
import BeerDetailsWrapper from "./components/BeerDetails";
import Random from "./components/Random";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/menu',
    element: <Menu />
  },
  {
    path: '/beers/:id', 
    element: <BeerDetailsWrapper />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/random',
    element: <Random />
  }
];

export default AppRoutes;
