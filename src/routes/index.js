import {
  Home,
  BuyMovie,
  Login,
  MovieInfo,
  HomeSearch,
  HotMovie,
  position,
  NotFound,
  Search,
} from "../views/index.js";
import shiyan from "../components/loading/index.jsx"

export const mainRouter = [
  {
    pathname: "/home",
    component: Home,
    exact: false,
    title: "电影"
  },
  {
    pathname: "/Login",
    component: Login,
    exact: true,
    title: "登录"
  },
  {
    pathname: "/404",
    component: NotFound,
    exact: true,
    title: "NotFound"
  },
  {
    pathname: "/position",
    component: position,
    exact: true,
    title: "城市"
  },
  {
    pathname: "/cinema/movie",
    component: MovieInfo,
    exact: true
  },
  {
    pathname: "/shows/:movieId",
    component: BuyMovie,
    exact: true
  },
  {
    pathname: "/search",
    component: Search,
    exact: true
  },
  {
    pathname : "/loading",
    component : shiyan,
    exact :true
  }
];
