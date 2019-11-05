import axios from 'axios';
// import store from '../store/store'
// import actionCreator from '../store/actionCreator'
// import webStorage from './webstorage';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('请求拦截器',config)
    if(!config.data){
      config.data={}
    }
    // token 存在什么地方，是由后端决定的
    // 1、cookie   2、header  3、参数传递
    // config.data.token=webStorage.getItem('token') // 全局获取token并添加到请求中
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('响应拦截器',response.data)
    let {err}=response.data
    let arr=[-997,-998]
    if(arr.indexOf(err)>=0){
      //
      // let action=actionCreator.changeTokenModal(false)
      // store.dispatch(action)
    }
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default axios