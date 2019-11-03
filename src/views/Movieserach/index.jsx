import React, { Component } from "react";
import { search } from "../../request/api.js";
import Search from "../../components/search/search.jsx";
import Sh from "./index.module.less";

import CinemaDetail from "@/components/cinemaDetail/index.jsx";
import SearchInfo from "../../components/searchInfo/index.jsx";

import Toast from "../../components/toast/toast.js";
class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cinemas: [],
      message: "",
      history: []
    };
  }
  componentDidMount() {
    let history = this.getStorage();
    history = this.set(history);
    this.setState({
      history
    });
  }
  getSearchData = kw => {
    let cityId = this.props.history.location.state.id;
    const hideLoading = Toast.loading("加载中", 0);
    if (!kw) {
      hideLoading();
      this.setState({
        message: "",
        movies: [],
        cinemas: []
      });
      return;
    }
    let data = this.getStorage();
    data.push(kw);
    data = this.set(data);
    this.setState({
      history: data
    });
    this.set(data);
    search(cityId, kw)
      .then(res => {
        if (res.data.movies || res.data.cinemas) {
          hideLoading();
          this.setState({
            message: "",
            movies: (res.data.movies && res.data.movies.list) || [],
            cinemas: (res.data.cinemas && res.data.cinemas.list) || []
          });
        } else {
          hideLoading();
          this.setState({
            message: "没有找到相关内容",
            movies: [],
            cinemas: []
          });
        }
      })
      .catch(err => {
        hideLoading();
        Toast.error("稍后重新访问", 2000);
        this.setState({
          message: "",
          movies: [],
          cinemas: []
        });
      });
  };
  removeListData = () => {
    this.setState({
      message: "",
      movies: [],
      cinemas: []
    });
  };
  //跳转到单个影院详情页面
  navCinemInfo = cinemaID => {
    // let movieID = this.props.location.search.split("=")[1];
    // if (movieID && cinemaID) {
    //   this.props.history.push(`/shows/${movieID}`, {
    //     cinemaID
    //   });
    //}
  };
  getStorage() {
    let data = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    data = this.set(data);
    return data;
  }
  saveStroage(data) {
    localStorage.setItem("searchHistory", JSON.stringify(data));
  }
  deleHistory = e => {
    let value = e.currentTarget.dataset.text;
    let history = this.getStorage();
    let index = history.findIndex(item => {
      return item === value;
    });

    history.splice(index, 1);
    this.saveStroage(history);
    this.setState({
      history
    });
  };
  set(data) {
    let set = new Set(data);
    data = Array.from(set);
    this.saveStroage(data);
    return data;
  }
  render() {
    return (
      <div className="body">
        <div className="navbar">
          <p>猫眼电影</p>
        </div>
        <Search
          canNavPath="/"
          onSearch={this.getSearchData}
          removeListData={this.removeListData}
        />
        {/* this.state.movies.length? Sh.none: */}
        {this.state.history.map(item => {
          return (
            <div
              className={
                this.state.movies.length || this.state.cinemas.length
                  ? Sh.none
                  : Sh.list
              }
              key={item}
            >
              {item}
              <div
                className={Sh.cl}
                data-text={item}
                onClick={e => {
                  this.deleHistory(e);
                }}
              >
                <span className={Sh.span} data-text={item}>
                  x
                </span>
              </div>
            </div>
          );
        })}

        <div className={this.state.message ? Sh.cont_head : Sh.none}>
          <h3>{this.state.message}</h3>
        </div>
        <div
          className={
            this.state.movies && this.state.movies.length
              ? Sh.cont_head
              : Sh.none
          }
        >
          <h3>电影/电视剧/综艺</h3>
        </div>
        <SearchInfo movies={this.state.movies} cinemas={this.state.cinemas} />
        <div
          className={
            this.state.cinemas && this.state.cinemas.length
              ? Sh.cont_head
              : Sh.none
          }
        >
          <h3>影院</h3>
        </div>
        <CinemaDetail
          cinemas={this.state.cinemas}
          navCinemaInfo={this.navCinemInfo}
        />
      </div>
    );
  }
}

export default MovieSearch;
