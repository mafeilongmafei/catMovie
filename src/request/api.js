import { request, requestAll } from "./axios.js";

export const getCityList = () => {
  return request("/api/cityList");
  // return request("/ajax/movieOnInfoList");
};
export const getLocation = () => {
  return request("/api/getLocation");
};
export const getHotList = id => {
  // return request(`/api/movieOnInfoList?cityId=${id}`);
  return request("/api/movieOnInfoList", "GET", { cityId: id });
};

export const getCinemaInfo = cityid => {
  return request(`/api/cinemaList?cityId=${cityid}`);
};
export const search = (cityId, kW) => {
  return request(`/api/searchList?kw=${kW}&cityId=${cityId}`);
};
export const getMovieDetail = movieId => {
  return request(`/api/detailmovie?movieId=${movieId}`);
};

export const getCinemasMovieInfo = arr => {
  return requestAll(arr);
};

export const getCinemaList = cityId => {
  return request(`/api/cinemaList?cityId=${cityId}`);
};

export const getSomeCinemaDetail = (cinemaId, movieId) => {
  return request(`/ajax/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`);
};
