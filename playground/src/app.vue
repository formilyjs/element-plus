<template>
  <Designer :engine="engine">
    <Workbench>
      <StudioPanel>
        <template #logo>
          <LogoWidget />
        </template>
        <template #actions>
          <actions-widget />
        </template>
        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" :sources="sources.Inputs" />
            <ResourceWidget title="sources.Layouts" :sources="sources.Layouts" />
          </CompositePanelItem>
          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanelItem>
          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanelItem>
        </CompositePanel>
        <WorkspacePanel>
          <ToolbarPanel>
            <DesignerToolsWidget />
            <ViewToolsWidget :use="['DESIGNABLE', 'JSONTREE', 'PREVIEW']" />
          </ToolbarPanel>
          <ViewportPanel>
            <ViewPanel type="DESIGNABLE">
              <ComponentTreeWidget :components="components"></ComponentTreeWidget>
            </ViewPanel>
            <ViewPanel type="JSONTREE" :scrollable="false">
              <template #default="tree, onChange">
                <SchemaEditorWidget :tree="tree" @change="onChange"></SchemaEditorWidget>
              </template>
            </ViewPanel>
            <ViewPanel type="PREVIEW" :scrollable="false">
              <template #default="tree">
                <PreviewWidget :tree="tree" />
              </template>
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm />
        </SettingsPanel>
      </StudioPanel>
    </Workbench>
  </Designer>
</template>
<script lnag="ts">
import { createDesigner, GlobalRegistry } from '@designable/core'
import {
  Designer,
  Workbench,
  StudioPanel,
  CompositePanel,
  SettingsPanel,
  WorkspacePanel,
  ToolbarPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  ViewPanel,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  ComponentTreeWidget,
  ViewportPanel,
} from '@formily/element-plus-prototypes'
import { Input, Card, Form, Field } from '@formily/element-plus-renderer'
import { SettingsForm } from '@formily/element-plus-settings-form'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
})
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Designer,
    Workbench,
    StudioPanel,
    CompositePanel,
    CompositePanelItem: CompositePanel.Item,
    SettingsPanel,
    WorkspacePanel,
    ToolbarPanel,
    DesignerToolsWidget,
    ViewToolsWidget,
    ViewPanel,
    HistoryWidget,
    OutlineTreeWidget,
    ResourceWidget,
    ComponentTreeWidget,
    ViewportPanel,
    SettingsForm,
  },
  setup() {
    const engine = createDesigner({
      shortcuts: [],
      rootComponentName: 'Form',
    })

    return {
      engine,
      components: { Form, Field, Input, Card },
      sources: {
        Inputs: [Input],
        Arrays: [],
        Displays: [],
        Layouts: [Card],
      },
    }
  },
})
</script>
