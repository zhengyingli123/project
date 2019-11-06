import React from 'react'
import ReactDOM from 'react-dom';
import App from './router'
import 'antd/dist/antd.css';//全局引入样式
import * as serviceWorker from './serviceWorker';
import axios from './utils/axios'
import {Provider} from 'react-redux'
import store from './store/store'

React.Component.prototype.$axios=axios;
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
