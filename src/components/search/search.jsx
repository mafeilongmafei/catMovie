import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import Sh from "./index.module.less"
import { setValue , remValue } from "../../store/actions/home.js"

let tim = null;
@withRouter
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.remValue()
  }
  cancel = () => {
    let pathname = this.props.canNavPath;
    this.removeValue()
    this.props.history.push(pathname);
  };
  changeInput = e => {
    let value = e.target.value;
    this.props.setValue(value);
    let onsearch = this.props.onSearch;
    clearInterval(tim)
    tim = setTimeout(() => {
      onsearch(value)
    }, 1000);
  };
  removeValue = () =>{
     this.props.remValue();
     this.props.removeListData()
  }
  render() {
    return (
      <div className={Sh.search}>
        <div className={Sh.from}>
          {/* <div className={Sh.form_children}> */}
            <img
              src="http://s0.meituan.net/bs/?f=myfe/canary:/static/deploy/images/search.png"
              className={Sh.ico}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="搜电影,搜影院"
              className={Sh.input}
              value={this.props.defaultValue}
              onChange={e => {
                this.changeInput(e);
              }}
            />
          {/* </div> */}
          <img
            className={Sh.del_input}
            src="//s0.meituan.net/bs/?f=myfe/canary:/static/deploy/images/close.png"
            onClick={() => {
              this.removeValue();
            }}
          />
        </div>
        <span
          className={Sh.cancel}
          onClick={() => {
            this.cancel();
          }}
        >
          取消
        </span>
      </div>
    );
  }
}
const mapState = state =>{
    return {
      defaultValue: state.home.defaultValue
    };
}
 
export default connect(
  mapState,
  { setValue, remValue }
)(Search);