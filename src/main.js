import './assets/main.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CreateView from './components/CreateView.vue'
import CurrentView from './components/CurrentView.vue'
import HistoryView from './components/HistoryView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/create',
            component: CreateView
        },
        {
            path: '/current',
            component: CurrentView
        },
        {
            path: '/history',
            component: HistoryView
        }
    ]
})


createApp(App).use(router).mount('#app')