import React, { Component } from "react";
import "../../../node_modules/swiper/dist/css/swiper.min.css";
import Swiper from "../../../node_modules//swiper/dist/js/swiper.min.js";
import "./index.css";
var swiper;
class shiyan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      threshold: 52.5, // 拖动距离
      slideActiveClass: "Sactive"
    });
    swiper.on("touchMove", () => {
      let tranlate = swiper.getTranslate();
      this.props.scrollMove(tranlate);
    });
    swiper.on("touchEnd", () => {
      let tranlate = swiper.getTranslate();
      this.scroll(tranlate, swiper);
    });
  }
  switchSIndex(e) {
    let index = e.currentTarget.dataset.id.split("&")[1] - 0;
    this.props.switchSelectIndex(e, index, swiper);
  }
  scroll(tranlate) {
    this.props.distanceScroll(tranlate, swiper);
  }
  picFix(wh) {
    if (wh !== undefined) {
      return wh.replace("w.h", "65.94");
    }
  }
  render() {
   
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {this.props.movie.map((item, index) => {
            return (
              <div className="swiper-slide" key={item.img}>
                <img
                  src={this.picFix(item.img)}
                  alt=""
                  data-id={item.id + "&" + index}
                  onClick={e => {
                    this.switchSIndex(e);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default shiyan;
