import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DataLib from '../packages'
import './assets/styles/index.scss'

createApp(App).use(router).use(DataLib).mount('#app')
