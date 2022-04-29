// import pageComponents from '@internal/page-components'
import { defineClientAppEnhance } from '@vuepress/client'
import ElementPlus from 'element-plus'
// import '@formily/element-plus/style.ts'

import DumiPreviewer from './components/dumi-previewer.vue'

export default defineClientAppEnhance(({ app }) => {
  // for (const [name, component] of Object.entries(pageComponents)) {
  //   app.component(name, component)
  // }
  app.component('dumi-previewer', DumiPreviewer)
  app.use(ElementPlus, { size: 'small' })
})
