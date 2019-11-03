import axios from "axios";
// import qs from "qs";

let instance = axios.create({
  // baseURL: "http://m.maoyan.com",
  timeout: 1000
});
//处理自己新建的axios没有 all等方法
instance.__proto__ = axios;

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
instance.interceptors.request.use(
  function(config) {
    // 显示loading
    return config;
  },
  function(error) {
    // 请求错误时弹框提示，或做些其他事
    return Promise.reject(error);
  }
);

// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
    // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState(response) {
  // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response;
  } else {
    alert("数据获取错误");
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState(res) {
  // 隐藏loading
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res.data.code === "000000") {
    alert("success");
    return res;
  }
}
let request = (url, method = "get", params) => {

  let me = method.toUpperCase();
  let httpDefault = {
    url,
    method: me,
    params: me === "GET" || me === "DELETE" ? params : null,
    data: me === "PSOT" || me === "PUT" ? params : null
  };

  return new Promise((resolve, reject) => {
    instance(httpDefault)
      .then(res => {
        // successState(res);
        resolve(res);
      })
      .catch(response => {
        // errorState(response);
        reject(response);
      });
  });
};
let requestAll = arr => {
  return new Promise((resolve , reject)=>{
    instance.all(arr).then(
      instance.spread(function(acct, perms) {
        // 两个请求现在都执行完成
        resolve([acct, perms]);
      })
    );
  })
  
};

export { request, requestAll };
