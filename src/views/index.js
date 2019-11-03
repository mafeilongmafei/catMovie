import Loadable from "react-loadable"

import Loading from "../components/loading/index"

const Home = Loadable({
    loader : ()=>import("./home/index.jsx"),
    loading :Loading 
})
const BuyMovie = Loadable({
  loader: () => import("./buyMovie/index.jsx"),
  loading :Loading 
});
const Login = Loadable({
  loader: () => import("./login/index.jsx"),
  loading :Loading 
});
const MovieInfo = Loadable({
  loader: () => import("./movieInfon/index.jsx"),
  loading :Loading 
});
const HomeSearch= Loadable({
  loader: () => import("./homeSearch/index.jsx"),
  loading: Loading
});
const HotMovie= Loadable({
  loader: () => import("./hotMovie/index.jsx"),
  loading: Loading
});
const position = Loadable({
  loader: () => import("./position/index.jsx"),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import("./notFound/index.jsx"),
  loading: Loading
}); 

const Mine= Loadable({
  loader: () => import("./mine/index.jsx"),
  loading: Loading
}); 

const Search = Loadable({
  loader: () => import("./Movieserach/index.jsx"),
  loading: Loading
}); 





export {
  Home,
  BuyMovie,
  Login,
  MovieInfo,
  HomeSearch,
  HotMovie,
  position,
  NotFound,
  Mine,
  Search,
};