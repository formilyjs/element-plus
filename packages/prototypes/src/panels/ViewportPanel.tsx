import { defineComponent } from 'vue-demi'
import { WorkspacePanel } from './WorkspacePanel'
import { Simulator } from '../containers'

export const ViewportPanel = defineComponent({
  name: 'DnViewportPanel',
  setup(props, { attrs, slots }) {
    return () => {
      return (
        <WorkspacePanel.Item {...attrs} flexable={true} >
          <Simulator> {slots.default?.()} </Simulator>
        </WorkspacePanel.Item>
      )
    }
  },
})
