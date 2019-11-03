import React, { Component } from "react";
import { withRouter } from "react-router-dom";



import HotMo from "./index.module.less"
@withRouter
class HotMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowHotList: [],
      pos: ""
    };
  }
  componentDidMount() {
    this.setState({
      nowHotList: this.props.nowHotList,
      pos: this.props.pos
    });
  }
  componentWillReceiveProps(props, nextProps) {
    this.setState({
      nowHotList: props.nowHotList,
      pos: props.pos
    });
  }
  navTo(e) {
    let cinemaId = e.target.dataset.id;
    if (e.target.dataset.id) {
      this.props.history.push("/cinema/movie?cityId=" + cinemaId, {
        cityID: this.props.pos.id
      });
    }
  }
  Ck() {
    alert(66);
  }
  picFix(wh) {
    if (wh !== undefined) {
      return wh.replace("w.h", "65.94");
    }
  }

  render() {
    return (
      <div className={HotMo.content_list}>
        <ul
          onClick={e => {
            this.navTo(e);
          }}
        >
          {this.state.nowHotList.map(item => {
            return (
              <li
                key={item.id}
                data-id={item.id}
                onClick={e => {
                  this.navTo(e);
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start"
                  }}
                  className="pointer"
                >
                  <div className={HotMo.pic_show}>
                    <img src={this.picFix(item.img)} data-id={item.id} />
                  </div>
                  <div className={HotMo.info_list + " pointer"}>
                    <h2>{item.nm}</h2>
                    <p>
                      <span className={HotMo.person}>{item.wish}</span> 人想看
                    </p>
                    <p>主演: {item.star}</p>
                    <p>{item.rt}上映</p>
                  </div>
                </div>
                <div
                  className={
                    item.globalReleased
                      ? HotMo.btn_pre + " " + HotMo.red
                      : HotMo.btn_pre
                  }
                  data-id={item.id}
                >
                  <p data-id={item.id} className="pointer">
                    {" "}
                    {item.globalReleased ? "购票" : "预售"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}


export default  HotMovie
