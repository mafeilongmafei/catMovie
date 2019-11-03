import React, { Component } from 'react';
import my from "./index.module.less"
class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div className={my.body}>
            <div className={my.body_top}>
              <img
                src="https://img.meituan.net/maoyanuser/b9a2e18c357dadbdcba8db89448a5ffb15298.png"
                className={my.head_icon}
              />
            </div>
            <div className={my.orders}>
              <p>我的订单</p>
              <ul>
                <li>
                  <i />
                  <p>电影</p>
                </li>
                <li>
                  <i />
                  <p>商城</p>
                </li>
              </ul>
            </div>
            <div className={my.group}>
              <ul>
                <li>
                  <span>在线观影</span>
                  <span>></span>
                </li>
                <li>
                  <span>在线观影</span>
                  <span>></span>
                </li>
                <li>
                  <span>在线观影</span>
                  <span>></span>
                </li>
              </ul>
            </div>
          </div>
        );
    }
}
 
export default Mine;