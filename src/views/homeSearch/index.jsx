import React, { Component } from "react";
import { connect } from "react-redux"
import HomSear from "./index.module.less"

import { getCinemaList } from "../../request/api"

import CinemaDetail from "@/components/cinemaDetail/index.jsx"
import { setPos } from "../../store/actions/home";
import { getLocation
} from "../../request/api";


class HomeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cinemas: []
    };
  }
  componentDidMount() {
    
  }
  getcinemasInfo = () => {
    let cityID = this.props.pos.id;
    getCinemaList(cityID).then(res => {
      this.setState({
        cinemas: res.data.cinemas
      });
    });
  };
  componentDidMount() {
    this.getPosi();
  }
  //获取用户位置
  getPosi() {
    if (!this.props.pos.nm) {
      getLocation().then(res => {
        this.props.setPos(res.data);
        this.getcinemasInfo();
      });
    } else {
      this.getcinemasInfo();
    }
  }
  //跳转到单个影院详情页面
  navCinemInfo = cinemaID =>{
    // let movieID = this.props.location.search.split("=")[1];
    // if (movieID && cinemaID) {
    //   this.props.history.push(`/shows/${movieID}`, {
    //     cinemaID
    //   });
      //}
  };
  render() {
    return (
      <div style={{ width: "100%", height: "85.2%" }}>
        {this.props.header}
        <div className={HomSear.movie_info}>
          <CinemaDetail
            cinemas={this.state.cinemas}
            navCinemaInfo={this.navCinemInfo}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    pos: state.home.posi
  };
}
export default connect(
  mapState,
  { setPos }
)(HomeSearch);


  
       
