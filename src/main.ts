

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'



// import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
// window.bootstrap = require('bootstrap');
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' // 引用bootstrap的js

import 'bootstrap/dist/css/bootstrap.css' // 引用bootstrap的样式
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' // 引用bootstrap的js


import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/main.css'

import vueCountryRegionSelect from 'vue3-country-region-select'


const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(vueCountryRegionSelect);

app.mount('#app')
