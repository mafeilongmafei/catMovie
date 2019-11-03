import React, { Component, createRef } from "react";
import Swiper from "swiper";
import "../../../node_modules/swiper/dist/css/swiper.min.css";
import Buy from "./index.module.less";
import "./index.css";
// import "./index2.css"

import { getSomeCinemaDetail } from "@/request/api.js";

let swiper;
export default class BuyMovie extends Component {
  constructor() {
    super();
    this.state = {
      cinemaData: {},
      movies: [],
      //电影默认展示那部电影的index
      selectedMovieSeq: 0,
      dealList: [],
      //默认展示电影播放的时间的index
      dateIndex: 0
    };
    this.obj = createRef();
  }
  componentDidMount() {
    this.getCinemaDetail();
  }
  componentDidUpdate() {
    this.initSwiper();
  }
  initSwiper() {
    swiper = new Swiper(".swiper-container", {
      slideToClickedSlide: true, //点击居中
      slidesPerView: "auto", //分组显示
      spaceBetween: 30, //页面间隙
      centeredSlides: true, //页面居中
      slideActiveClass: "Sactive",

      autoplayDisableOnInteraction: false // 用户拖拽不滚动问题
    });
    swiper.slideTo(this.state.selectedMovieSeq, 1000, false);
  }

  //获取数据
  getCinemaDetail() {
    let movieID = parseInt(this.props.match.params.movieId);

    let cinemaId = parseInt(this.props.history.location.state.cinemaID);

    getSomeCinemaDetail(cinemaId, movieID).then(res => {
      this.setState({
        cinemaData: res.cinemaData,
        movies: res.showData.movies,
        selectedMovieSeq: res.showData.selectedMovieSeq,
        dealList: res.dealList.dealList
      });
    });
  }
  //处理散场和开场电影时间
  filteDate(DateString) {
    let date = new Date(parseInt(DateString));
    let h = date
      .getHours()
      .toString()
      .padStart(2, "0");

    let f = date
      .getMinutes()
      .toString()
      .padStart(2, "0");
    return `${h}:${f}`;
  }
  // 切换展示那部电影信息
  switchSelectIndex = e => {
    /* let index = swiper.activeIndex;
 this.setState({
      selectedMovieSeq: index
    });    */
    let index = e.currentTarget.dataset.id.split("&")[1] - 0;
    this.setState({
      selectedMovieSeq: index
    });
  };
  //点击切换播放时间index
  selectDateIndex = e => {
    let index = e.currentTarget.dataset.index - 0;
    this.setState({
      dateIndex: index
    });
  };
  //处理单人双人数据
  filter(str) {
    let ds = str.slice(0, 2);
    let ti = ds === "单人" || ds === "双人" ? ds : "单人";
    return (
      <div className={Buy.neal_params}>
        <span>{ti}</span>
        {str}
      </div>
    );
  }
  //去影院位置
  toNavAddress() {
    let { lat, lng, nm } = this.state.cinemaData;
    window.location.href = `https://uri.amap.com/marker?position=${lng},${lat}&name=${nm}&callnative=1`;
  }
  picFix(wh) {
    if (wh !== undefined) {
      return wh.replace("w.h", "65.94");
    }
  }

  render() {
    let {
      cinemaData,
      movies,
      selectedMovieSeq,
      dealList,
      dateIndex
    } = this.state;

    let shopDateList =
      movies[selectedMovieSeq] && movies[selectedMovieSeq].shows[dateIndex];
    console.log(shopDateList);
    return (
      <div>
        <div className={Buy.navbar}>
          <div className={Buy.nav_wrap_left}>
            <i
              className="iconfont icon-right"
              onClick={() => {
                this.props.history.goBack();
              }}
            />
          </div>
          <div className={Buy.nav_right}>{cinemaData.nm}</div>
        </div>
        <div className={Buy.position}>
          <div className={Buy.shop}>
            <h2 className={Buy.nnm}>{cinemaData.nm}</h2>
            <p>{cinemaData.addr}</p>
          </div>
          <div className={Buy.clickPosi}>
            <img
              onClick={() => {
                this.toNavAddress();
              }}
              src="data:image/png;base64,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"
            />
          </div>
        </div>

        <div className={Buy.movie_detail}>
          <div className={Buy.movie_filter}>
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {movies.map((item, index) => {
                  return (
                    <div className="swiper-slide" key={item.img}>
                      <img
                        src={this.picFix(item.img)}
                        alt=""
                        data-id={item.id + "&" + index}
                        onClick={e => {
                          this.switchSelectIndex(e);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={Buy.poster_bg}
              // style={{
              //   backgroundImage:
              //     "url(http://p0.meituan.net/65.94/movie/005955214d5b3e50c910d7a511b0cb571445301.jpg)"
              // }}
            >
              <img
                src={
                  movies[selectedMovieSeq] &&
                  this.picFix(movies[selectedMovieSeq].img)
                }
                alt=""
                className={Buy.poster_bg}
              />
            </div>
            <div className={Buy.post_bg_filter} />
          </div>
        </div>
        <div className={Buy.movie_title}>
          <div className={Buy.movie_cen}>
            <h2>{movies[selectedMovieSeq] && movies[selectedMovieSeq].nm}</h2>
            <p>
              {movies[selectedMovieSeq] &&
                (movies[selectedMovieSeq].sc === "0.0"
                  ? "未评"
                  : movies[selectedMovieSeq].sc)}
            </p>
            <span>分</span>
          </div>
          <div className={Buy.des}>
            <ul className={Buy.author}>
              <li>
                {movies[selectedMovieSeq] && movies[selectedMovieSeq].desc}
              </li>
            </ul>
          </div>
        </div>
        <div className={Buy.playDate}>
          <ul className={Buy.scroll}>
            {movies[selectedMovieSeq] &&
              movies[selectedMovieSeq].shows.map((movie, index) => {
                return (
                  <li
                    onClick={e => {
                      this.selectDateIndex(e);
                    }}
                    data-index={index}
                    className={index === dateIndex ? Buy.selectDate : ""}
                    key={movie.dateShow}
                  >
                    {movie.dateShow}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={Buy.shopBody}>
          <ul
            className={
              movies[selectedMovieSeq] && shopDateList.plist.length
                ? ""
                : Buy.none
            }
          >
            {movies[selectedMovieSeq] &&
              shopDateList.plist.map(item => {
                return (
                  <li className={Buy.shopDetail} key={item.seqNo}>
                    <div className={Buy.rime_block}>
                      <p className={Buy.begin}>{this.filteDate(item.seqNo)}</p>
                      <span className={Buy.end}> {item.tm}散场</span>
                    </div>
                    <div className={Buy.info_block}>
                      <div className={Buy.lan}>中文{item.tp}</div>
                      <div className={Buy.hall}>{item.th}</div>
                    </div>
                    <div className={Buy.price}>
                      <p>¥{item.vipPrice}</p>
                    </div>
                    <div className={Buy.btn_block}>购票</div>
                  </li>
                );
              })}
          </ul>
          <div
            className={
              movies[selectedMovieSeq] && shopDateList.length
                ? Buy.h_list
                : Buy.none
            }
          >
            今日场次播放完
          </div>
        </div>
        <div className={Buy.meal}>
          <div className={Buy.meal_title}>影院超值套餐</div>
          <div className={Buy.meal_list}>
            <ul>
              {dealList.length &&
                dealList.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className={Buy.meal_img}>
                        <img
                          src="http://p0.meituan.net/440.0/movie/afb09db841dbe78ceffa1a8b5b96d0fa55315.jpg@750w_750h_1e_1c"
                          alt=""
                        />
                      </div>
                      <div className={Buy.meal_info}>
                        {this.filter(item.title)}
                        <div className={Buy.shop_num}>
                          {item.curNumberDesc}杯
                        </div>
                        <div className={Buy.orice_shop}>
                          <span>¥{item.price}</span>
                          <div className={Buy.btn_block}>去购买</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
