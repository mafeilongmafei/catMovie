import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCinemaInfo,
  getMovieDetail,
  getCinemasMovieInfo
} from "@/request/api.js";
import MoviIn from "./index.module.less";

import CinemaDetail from "../../components/cinemaDetail/index.jsx";

let j = 8;
class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cinemas: [],
      bol: true,
      objY: 0,
      message: "",
      ci: [],
      detailMovie: {}
    };
  }
  loading() {
    j = j + 3;
    return this.state.ci.slice(j, j + 3);
  }
  componentDidMount() {
    j = 8;
    //去出掉#root上的display:flex
    let root = document.getElementById("root");
    root.style.display = "block";
    let cityId = this.props.history.location.state.cityID;
    let movieID = this.props.location.search.split("=")[1];
    let arr = [getMovieDetail(movieID), getCinemaInfo(cityId)];
    //axis并发
    getCinemasMovieInfo(arr).then(acct => {
      this.setState({
        cinemas: acct[1].data.cinemas.slice(0, 8),
        objY: 0, //MoviIn.date的offsetTop
        ci: acct[1].data.cinemas,
        detailMovie: acct[0].data.detailMovie
      } , ()=>{
        this.forceUpdate()
      });
    });

    // 挂载滚动监听
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    //移除滚动监听
    window.removeEventListener("scroll", this.handleScroll);
  }
  //后退
  back = () => {
    this.props.history.goBack();
  };

  //滚动距离 = window.scrollY
  //元素的实际高度  xx.clientHeight  xxx.offsetHeight
  // 文档的占页面的高度   = 浏览器视口的高度 - 元素的offsetTop

  //到达底部 元素的实际高度 = 文档的占页面的高度 + window.scrollY
  handleScroll = () => {
    //滚动距离
    let WY = window.scrollY;
    let date = document.getElementById("date");
    let Mo = document.getElementsByClassName("movie_info--2cQIh")[0];
    //元素的实际高度
    let CHeight = Mo.clientHeight;
    //文档占页面的高度
    let ToBoHeight = this.getWindowHeight() - Mo.offsetTop;
    //到底了
    if (ToBoHeight + WY >= CHeight - 30) {
      let cinemas = this.state.cinemas;
      let data = this.loading();
      if (!data.length) {
        this.setState({
          message: "木有了..."
        });
        return;
      }

      this.setState(
        {
          message: "加载中..."
        },
        () => {
          setTimeout(() => {
            data.forEach(item => {
              cinemas.push(item);
              this.setState({
                cinemas
              });
            });
          }, 1000);
        }
      );
    }

    //某一元素的高度
    let clientH = Mo.clientHeight;
    //获取MoviIn.date的offsetTop只让他执行一次
    //滑动的距离大于等于 就让加样式 , 不大于就原来的样子
    if (this.state.bol) {
      //获取MoviIn.date元素距离offsetTop
      let obj = document.getElementsByClassName(MoviIn.date)[0];
      let objY = obj.offsetTop;
      this.setState({
        bol: false,
        objY
      });
    }
    //一旦滚动条滚动的距离等于  MoviIn.date元素距离offsetTop
    if (WY >= this.state.objY) {
      //给他们的父元素加
      date.style.cssText =
        " width: 100% ; position: fixed;top: 0;background-color: #fff;}";
    } else {
      //否则这样样式去掉
      date.style.cssText = "";
    }
  };
  //浏览器视口的高度
  getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  //跳转到单个影院详情页面
  navCinemInfo = cinemaID => {
    let movieID = this.props.location.search.split("=")[1];
    if (movieID && cinemaID) {
      this.props.history.push(`/shows/${movieID}`, {
        cinemaID
      });
    }
  };
  fixed(nm){
    if(nm){
     let num = parseInt(nm) / 10000;
     return num.toFixed(1); 
    }
  }
  render() {
    let MovieDetail = this.state.detailMovie;
    return (
      <div className={MoviIn.body}>
        <div className="navbar">
          <div className={MoviIn.nav_wrap_left }>
            <i
              className="iconfont icon-right"
              onClick={() => {
                this.back();
              }}
            />
          </div>
          <div className={MoviIn.nav_right}>{MovieDetail.nm}</div>
        </div>

        <div className={MoviIn.movie_detail}>
          <div className={MoviIn.movie_filter}>
            <div
              className={MoviIn.poster_bg}
              style={{
                backgroundImage: MovieDetail.albumImg
              }}
            />
            <div className={MoviIn.detail}>
              <div className={MoviIn.poster}>
                <img src={MovieDetail.albumImg} />
              </div>
              <div className={MoviIn.content}>
                <div className={MoviIn.line_ellipsis}>{MovieDetail.nm}</div>
                <div
                  className={MoviIn.title_en_name + " " + MoviIn.line_ellipsis}
                >
                  {MovieDetail.enm}
                </div>
                <div className={MoviIn.score + " " + MoviIn.line_ellipsis}>
                  {MovieDetail.sc}
                  <span className={MoviIn.snum}>
                    {this.fixed(MovieDetail.snum) + "万人评"}
                  </span>
                </div>
                <div className={MoviIn.type + " " + MoviIn.line_ellipsis}>
                  <span>{MovieDetail.cat}</span>
                  <div className={MoviIn.type_group + " " + MoviIn.op}>
                    <img
                      style={{ width: ".693333rem" }}
                      className={MoviIn.imax}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAeCAYAAABwmH1PAAACn0lEQVRYhe2ZUW7TQBCGv0RBrUSl+KW8po/lqTkAknOBCN+gewPCDdwbmBuYGwRxAILEAZoneHRf6QNBAgmJSsvDjOu18TqWnBLV5JdW68zMemd2Z2bH2YG1FuAp8Bw4BUb0C3fALfAZ+Dmw1p4AL4Ane1Xr4fEb+DQCzhFjvwJr4Nc+tXoAHAMXwDPgfIi4MfTTWBCb1vp8OqSI2T4amyO3bTTcqxp7wMHgvqONwVNgBRiHliht0WJ8pLKJhx8ofwXMGuZfqmwdlg3jy7DWzrXhaTMriB3aSmmbhnF5y1R25eEbW2DpkUka+E08t82ttfOuLj2mvPNVRMBkyztyL/kIvATOPDJr5bvzzYBXwM0WPe7R1eDvQNzA3+byU6QoeEvh8sYja3S+BFmUAHFlkIXdbJkL6G5wguxgVMObASFijA/5gqSI8k07da3yY5Vd6vNr5bVCV4NT7et20mgfe8YGyELdIAknf98Ev9EpsoAXyGK+w58Ma9HV4EwVCClnyDPgEonLzDM2QnbIVTjV3jTMufQ8t8IuzuFYe+PQFhVe07jUoWXIIoXUJ6/AkXfjuTV2YXCGKHlJkUwMklVXnjEziuz9DbBOC5VeFyZ53F5RjufW2NXHfgx8UCU2/O2qVRjt31CfXRcqs6jQQmRxY6VFyFGV0K4I6lx4VAuMjfZZhecWHoH+rsrUFRNGf0+dQufMkQucwib6F4WHixjZ2QnluKzCaN/kAe6Z7J63hnIS3FAciSn+0vMeuzQ4RY6YPJn4kLteU+xlSA4IVW6CnAZ1Y66RmB7TvNAADKy1c31+v034kWMOh8/D/uNgcN8xRP6ZB/n/tq840v5uiFxDgHyBHNXLP2ocI9/dALf/3VXLwMpl2gly5dLny7QvwI8/pysRaQplMrsAAAAASUVORK5CYII="
                    />
                  </div>
                </div>
                <div
                  className={
                    MoviIn.src + " " + MoviIn.line_ellipsis + " " + MoviIn.op
                  }
                >
                  {MovieDetail.src + "/" + MovieDetail.episodeDur + "/分钟"}
                </div>
                <div
                  className={
                    MoviIn.pubDesc +
                    " " +
                    MoviIn.line_ellipsis +
                    " " +
                    MoviIn.op
                  }
                >
                  {MovieDetail.pubDesc}
                </div>
              </div>
            </div>
            <div className={MoviIn.arrow_g}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAS5JREFUOBGVkktuwkAMhpOoJ+hhSouE2HbDgiVCNCAOVtQHnINHhbgMJ6g6/f9gR848kmDJeOzxZ3scskzEOfcKXUMLjXXZByYQhJlqMvz3PM//1E9Z7fJoEp5wXvWZoILRZQtg7xVYdhXQzuR2XoEB/NYCOSkVdKI/g441BnuBbmI7aMAE7ilgxyaboYOD4RMO9EWiTwhgJksBLtEvUNolRmGvwJG+yDNsXSB4s2aplR3M4Y80BnuGfiQ7m0Q2qP6JJvaLc/VpTKx5lPe9IfpibviMb+4lOXYXyGLRsRPgSTsSpASdW8Av+YQ3Er+NzgIuELdvZMcAZIUaBsgpCA55IZIEeV+NLSC32hskXCTAH9xFRyWkUsgSrhqAJfjpL8fch0dMMIGWMkmYEIn8Az5Wgp5LHlhmAAAAAElFTkSuQmCC" />
            </div>
          </div>
        </div>
        <div id="date">
          <div className={MoviIn.date}>
            <ul className={MoviIn.scroll}>
              <li className={MoviIn.selectData}>今天8月1号</li>
              <li>明天8月2号</li>
              <li>后天8月3号</li>
              <li>明天8月2号</li>
              <li>后天8月3号</li>
              <li>明天8月2号</li>
              <li>后天8月3号</li>
            </ul>
          </div>
          {/* <div className={MoviIn.filterMoview}>
            <ul>
              <li>
                <span>全城</span>
                <i className="iconfont icon-lower-triangle" />
              </li>
              <li>
                <span>品牌</span>
                <i className="iconfont icon-lower-triangle" />
              </li>
              <li>
                <span>特色</span>
                <i className="iconfont icon-lower-triangle" />
              </li>
            </ul>
          </div> */}
        </div>
        <CinemaDetail
          cinemas={this.state.cinemas}
          navCinemaInfo={this.navCinemInfo}
        />
        <div className={this.state.message ? MoviIn.message : MoviIn.none}>
          {this.state.message}
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
export default connect(mapState)(MovieInfo);
