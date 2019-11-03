import React, { Component } from "react";

import SMInfo from "./index.module.less";

class searchInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.movies.map(movie => {
          return (
            <div className={SMInfo.movie_cell}>
              <div className={SMInfo.head_portrait}>
                <img src={movie.img} />
              </div>
              <div className={SMInfo.content}>
                <div className={SMInfo.con_title}>
                  <span className={SMInfo.Movi_title}>
                    {movie.nm}
                  </span>
                  <div className={movie.sc ? SMInfo.see : SMInfo.reverSee}>
                    {movie.sc || "暂无评分"}
                  </div>
                </div>
                <div className={SMInfo.con_bom}>
                  <div>
                    <span className={SMInfo.info}>{movie.cat}</span>
                    <span className={SMInfo.info}>{movie.rt}</span>
                  </div>
                  <div
                    className={
                      !movie.globalReleased
                        ? SMInfo.btn
                        : SMInfo.false
                    }
                  >
                    {movie.globalReleased ? "购票" : "想看"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default searchInfo;
