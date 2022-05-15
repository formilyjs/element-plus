import ActionsWidget from './actions-widget.vue'
import SchemaEditorWidget from './schema-editor-widget'
import PreviewWidget from './preview-widget'
import LogoWidget from './logo-widget.vue'
import { App } from 'vue'

export default function install(app: App) {
  app.component('ActionsWidget', ActionsWidget)
  app.component('SchemaEditorWidget', SchemaEditorWidget)
  app.component('PreviewWidget', PreviewWidget)
  app.component('LogoWidget', LogoWidget)
}
