import Vue from 'vue'
import App from './App.vue'
import "./icons"; // 注册svg-icon组件

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
