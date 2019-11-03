import React, { Component } from "react";
import { connect } from "react-redux";
import { Link  , Switch , Route , Redirect , NavLink} from "react-router-dom";
import { setPos } from "../../store/actions/home";
import { getLocation, getHotList } from "../../request/api";

import { withRouter } from "react-router-dom";

import {HotMovie, HomeSearch , Mine} from "../index.js"
import HotMo from "@/views/hotMovie/index.module.less";
import homeSear from "@/views/homeSearch/index.module.less";


@withRouter
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowHotList: []
    };
  }
  componentDidMount() {
    this.getPosi();
  }
  //获取用户位置
  getPosi() {
    if (!this.props.pos.nm) {
      getLocation().then(res => {
        this.props.setPos(res.data);
        this.getHotPlayMovie();
      });
    } else {
      this.getHotPlayMovie();
    }
  }
  //获取正在热映
  getHotPlayMovie() {
    getHotList(this.props.pos.id).then(res => {
      this.setState({
        nowHotList: res.data.movieList
      });
    });
  }
  toPosition(url) {
    this.props.history.push(url);
  }
  navTo = () => {
    console.log(this.props);
    this.props.history.push("/search", this.props.pos);
  };
 

  render() {
    let Hot = this.props.location.pathname;
    // 记住这里不能写let xx = null
    let switchViews;
    let hotView;
    if (Hot === "/home/nowList") {
      hotView = "";
      hotView = (
        <div className={HotMo.white_bg}>
          <div className={HotMo.city_entry}>
            <span
              className={HotMo.city_name}
              onClick={() => {
                this.toPosition("/position");
              }}
            >
              {" "}
              {this.props.pos.nm || ""}
            </span>
            <i className="iconfont icon-lower-triangle" />
          </div>
          <div className={HotMo.hot_switch}>
            <div className={HotMo.hot_item}>正在热映</div>
            <div className={HotMo.hot_item}>即将上映</div>
          </div>
          <div className={HotMo.search_entry}>
            <i
              className={"iconfont icon-sousuo" + " " + HotMo.search}
              onClick={() => {
                this.navTo();
              }}
            />
          </div>
        </div>
      );
    } else if (Hot === "/home/movie") {
      switchViews = "";
      switchViews = (
        <div className={homeSear.serach_border}>
          <div
            className={homeSear.searchCity}
            onClick={() => {
              this.toPosition("/position");
            }}
          >
            <span>{this.props.pos.nm || ""}</span>
            <i className="iconfont icon-lower-triangle" />
          </div>
          <div
            className={homeSear.searchInput}
            onClick={() => {
              this.navTo();
            }}
          >
            <span>搜影院</span>
            <i className="iconfont icon-sousuo" />
          </div>
        </div>
      );
    } else {
      switchViews = "";
      hotView = "";
    }
    return (
      <div className="container">
        <div className="navbar">
          <p>猫眼电影</p>
        </div>
        {hotView}

        <Switch>
          <Route
            path="/home/nowList"
            render={routeProps => {
              return (
                <HotMovie
                  nowHotList={this.state.nowHotList}
                  pos={this.props.pos}
                />
              );
            }}
          />
          <Route
            path="/home/movie"
            render={() => {
              return <HomeSearch header={switchViews} />;
            }}
          />
          <Route path="/home/mine" component={Mine} />
          <Redirect to="/home/nowList" from="/home" />
        </Switch>

        <div className="footer">
          <ul>
            <li>
              <NavLink to="/home/nowList" activeClassName="activeTabar">
                <i className="iconfont icon-dianying" />
                电影
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/movie" activeClassName="activeTabar">
                <i className="iconfont icon-yingyuan" />
                影院
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/mine" activeClassName="activeTabar">
                <i className="iconfont icon-wode" />
                我的
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapState = state => {
  return {
    pos: state.home.posi
  };
};
export default connect(
  mapState,
  { setPos }
)(Home);
