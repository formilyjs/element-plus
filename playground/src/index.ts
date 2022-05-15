import './styles.less'
import App from './app.vue'
import { createApp } from 'vue'
import WidgetsInstaller from './widgets'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App).use(ElementPlus).use(WidgetsInstaller)
app.mount('#app')
