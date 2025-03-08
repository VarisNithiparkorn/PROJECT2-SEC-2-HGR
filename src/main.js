import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import productSection from './componant/productSection.vue'

const app = createApp(App)
app.component('productSection', productSection)
app.mount('#app')
