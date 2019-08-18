// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import Axios from 'axios'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
import EventBus from './EventBus.js'
Vue.prototype.$bus = EventBus;
import MySwipe from './components/Common/MySwipe.vue'
import moment from 'moment';
Vue.component(MySwipe.name, MySwipe);
// 将axios挂在到vue对象上.prototype(原型)

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://localhost:8081/api/'

// Vue.prototype.$axios = Axios;
// Axios.defaults.baseURL = 'http://localhost:8080/api/';

// 定义过滤器，对商品的名称进行截取。
// str存的是要过滤的数据，num存的是限定过滤的内容，这里的是10
Vue.filter('showTitle', function(str, num) {
    if (str.length < num) {
        return str
    } else {
        return str.substr(0, num) + '...'
    }

})

// 第一个参数，过滤器的名称，第二个参数一个函数，函数第一个参数表示从要过滤的数据
// 第二个参数，过滤的条件。
Vue.filter('converTime', function(data, formatStr) {
    // 这里需要用到moment这个组件。
    return moment(data).format(formatStr);
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})