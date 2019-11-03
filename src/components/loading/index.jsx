import React , { Component } from "react"
import "./index.css"
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        );
    }
}
 
export default Loading;