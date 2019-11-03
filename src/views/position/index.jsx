import React, { Component  , createRef} from "react";
import { getCityList, getLocation } from "../../request/api.js";
import { connect } from "react-redux";

import { setPos } from "../../store/actions/home";
import po from "./index.module.less";

let ar = ["list", "hotList"];
class PositionCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      hotList: [],
      loa: null,
      storag: []
    };
    // this.myRef = React.createRef();
  }

  componentDidMount() {
    // [ { index : A , citys : [ { id : 1 , num : city}]}]
    //本地数据
    let d = this.getData();
    if (d[0].length > 0) {
      this.setState({
        hotList: d[1],
        cityList: d[0]
      });
    } else {
      //获取数据
      getCityList().then(res => {
        this.filterCity(res.data.cities);
      });
    }
    getLocation().then(res => {
      let data = this.getCity("lately");
      if (!data.length) {
        data.push({ nm: res.data.nm, id: res.data.id });
      }
      let bol = data.every(item => {
        return item.id != res.data.id;
      });
      if (bol) {
        data.push({ nm: res.data.nm, id: res.data.id });
      }
      if (data.length > 3) {
        data.splice(-1, 1);
      }
      this.saveCity([{ name: "lately", data }]);
      this.setState({
        loa: res.data.nm,
        storag: data
      });
    });
  }
  filterCity(data) {
    let list = this.state.cityList;
    let hotList = this.state.hotList;
    data.forEach(city => {
      let letter = city.py.substring(0, 1).toUpperCase();
      if (city.isHot) {
        hotList.push({ id: city.id, nm: city.nm });
      }
      if (this.isExist(letter)) {
        //如果有就是增加
        for (let n = 0; n < list.length; n++) {
          if (list[n].index === letter) {
            list[n].citys.push({ id: city.id, nm: city.nm });
          }
        }
        //没有新增
      } else {
        list.push({
          index: letter,
          citys: [{ id: city.id, nm: city.nm }]
        });
      }
    });

    list.sort((x, y) => {
      if (x.index > y.index) {
        return 1;
      } else {
        return -1;
      }
    });
    //保存到本地
    let s = [{ name: "list", data: list }, { name: "hotList", data: hotList }];
    this.saveCity(s);
    this.setState({
      cityList: list,
      hotList
    });
  }
  //是否存在
  isExist(letter) {
    let len = this.state.cityList.length;
    let list = this.state.cityList;
    for (let i = 0; i < len; i++) {
      if (list[i].index === letter) {
        return true;
      }
    }
    return false;
  }
  //跳转
  skip(e, index) {
    let p = document.getElementsByClassName(po.ppp);
    let col = document.getElementsByClassName(po.switcColor);
    col.length && (col[0].className = "");
    //  let con = document.getElementsByClassName("switch_city")[0];
    //   con.scrollTop = p[index].offsetTop
    // window.scrollBy(0, p[index].offsetTop);
    //父元素子元素小才能出现滚动条
    window.scrollTo(0, p[index].offsetTop);

    e.target.setAttribute("class", po.switcColor);
  }
  selectCity(e) {
     e.stopPropagation();
    if(e.target.dataset.id){
       let arr = e.target.dataset.id.split("&");
       let da = { id: arr[0], nm: arr[1] };
       this.props.setPos(da);
       let data = this.getCity("lately");
       let bol = data.every(item => {
         return item.id != da.id;
       });
       if (bol) {
         data.unshift(da);
         if (data.length > 3) {
           data.splice(-1, 1);
         }
         this.saveCity([{ name: "lately", data }]);
       }
       this.props.history.push("/home/nowList");
    }
   
  }
  saveCity = obj => {
    obj.forEach(item => {
      localStorage.setItem(item.name, JSON.stringify(item.data));
    });
  };
  getCity = name => {
    return JSON.parse(localStorage.getItem(name) || "[]");
  };
  getData() {
    //从本地加载数据
    let d = ar.map(item => {
      return this.getCity(item);
    });
    return d;
  }
  render() {
    return (
      <div className={po.container}>
        <div className={po.mask}>
          <ul>
            <li>
              <a href="#hot">热门</a>
            </li>
            <li>
              <a href="#lately"> 最近</a>
            </li>
            <li>
              <a href="#posi"> 定位</a>
            </li>
            {this.state.cityList.map((city, index) => {
              return (
                <li
                  key={city.index}
                  onClick={e => {
                    this.skip(e, index);
                  }}
                >
                  {city.index}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={po.hot_city}>
          <ul>
            <li>
              <p className={po.city_title} id="posi">
                定位城市
              </p>
              <ul>
                <li className={po.li}>
                  {this.state.loa || "定位失败请重试"}
                </li>
              </ul>
            </li>
            <li>
              <p className={po.city_title} id="lately">
                最近访问城市
              </p>
              <ul
                onClick={e => {
                  this.selectCity(e);
                }}
              >
                {this.state.storag.map(item => {
                  return (
                    <li
                      className={po.li}
                      key={item.id + Math.random()}
                      data-id={item.id + "&" + item.nm}
                    >
                      <p data-id={item.id + "&" + item.nm} className="pointer">
                        {item.nm}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <p className={po.city_title} id="hot">
                热门城市
              </p>
              <ul
                onClick={e => {
                  this.selectCity(e);
                }}
              >
                {this.state.hotList.map(list => {
                  return (
                    <li
                      className={po.li}
                      key={list.id}
                      data-id={list.id + "&" + list.nm}
                    >
                      <p data-id={list.id + "&" + list.nm} className="pointer">
                        {" "}
                        {list.nm}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
        <div className={po.switch_city}>
          <ul>
            {this.state.cityList.map(city => {
              return (
                <li key={city.index}>
                  <p
                    className={po.city_title + " " + po.ppp}
                    id={po.city_title}
                  >
                    {city.index}
                  </p>
                  <ul
                    onClick={e => {
                      this.selectCity(e);
                    }}
                  >
                    {city.citys.map(item => {
                      return (
                        <li
                          className={po.li2}
                          key={item.id}
                          data-id={item.id + "&" + item.nm}
                        >
                          <p
                            data-id={item.id + "&" + item.nm}
                            className="pointer"
                          >
                            {" "}
                            {item.nm}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
const mapstate = state => {
  return {
    pos: state.home.posi
  };
};

export default connect(
  mapstate,
  { setPos }
)(PositionCity);

//createRef
