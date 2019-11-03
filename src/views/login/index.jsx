import React, { Component } from 'react';
import "./index.css"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div className="container">
            <div className="navbar">
              <div className="nav-wrap-left">
                <a
                  className="back"
                  href="#"
                  onClick={() => {
                    window.history.back();
                    return false;
                  }}
                >
                  <i className="iconfont icon-right" />
                </a>
              </div>
              <p>猫眼电影</p>
            </div>
            <div className="login">
              <div className="login_top">
                <span className="select">美团账号登录</span>
                <span>手机验证登录</span>
              </div>
              <div className="login_bottom">
                <input
                  type="text"
                  name=""
                  placeholder="账户名,用户名,邮箱"
                  className="input"
                
                />
                <div className="hander" />
                <input
                  type="password"
                  name=""
                  placeholder="密码"
                  className="input"
                  
                />
                <div className="btn_login">登录</div>
                <div className="bottom">
                  <p>立即注册</p>
                  <p>找回密码</p>
                </div>
                <div className="copyright">
                  <span>
                    © 猫眼电影 客服电话：
                    <a
                      data-evt="ft/hotline"
                      href="tel:4006705335"
                      className="phone"
                    >
                      400-670-5335
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
 
export default Login;