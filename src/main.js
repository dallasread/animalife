import { createApp } from 'vue'
import App from '@/components/app/component.vue'
import './registerServiceWorker'
import Vue3TouchEvents from "vue3-touch-events";

createApp(App).use(Vue3TouchEvents).mount('#app')
