import { defineComponent } from '@vue/runtime-core'
import { usePrefix } from '../hooks'
import { useStyle } from '../shared'
import { composeExport } from '@formily/element-plus/src/__builtins__'

export interface IWorkspaceItemProps {
  style?: any
  flexable?: boolean
}

const WorkspacePanelComponent = defineComponent({
  name: 'DnWorkspacePanel',
  setup(props, { slots }) {
    const prefix = usePrefix('workspace-panel')
    return () => <div class={prefix.value}>{slots.default?.()}</div>
  },
})

const WorkspacePanelItem = defineComponent({
  name: 'DnWorkspacePanelItem',
  props: ['flexable'],
  setup(props, { slots }) {
    const prefix = usePrefix('workspace-panel-item')
    return () => {
      const style = useStyle()
      return (
        <div
          class={prefix.value}
          style={{
            ...style,
            flexGrow: props.flexable ? 1 : 0,
            flexShrink: props.flexable ? 1 : 0,
          }}
        >
          {slots.default?.()}
        </div>
      )
    }
  },
})

export const WorkspacePanel = composeExport(WorkspacePanelComponent, {
  Item: WorkspacePanelItem,
})
