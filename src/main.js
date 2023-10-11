import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from './components/global'


createApp(App).use(store).use(VueAxios, axios).use(global).mount('#app');
