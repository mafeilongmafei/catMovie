import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route , Redirect , Switch } from "react-router-dom";
import "./assets/css/index.less"
import "./assets/css/iconfont/iconfont.css"
import { mainRouter } from "./routes/index" 
import store from "@/store/index.js";
// import config from "./request/config"
//导入lib_flexlible 
import "../node_modules/lib-flexible/flexible";



import * as serviceWorker from "./serviceWorker";








const render = () => {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <Switch>
          {mainRouter.map(route => {
            return (
              <Route
                path={route.pathname}
                component={route.component}
                exact={route.exact}
                key={route.pathname}
              />
            );
          })}
          <Redirect to="/home" from="/" exact />
          <Redirect to="/404" />
        </Switch>
      </Provider>
    </Router>,
    document.getElementById("root")
  );
}
render();
 store.subscribe(render)  //订阅Redux的状态
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
