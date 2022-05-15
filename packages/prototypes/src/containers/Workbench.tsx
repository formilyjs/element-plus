import { observer } from '@formily/reactive-vue'
import { useWorkbench } from '../hooks'
import { Workspace } from './Workspace'
import { defineComponent } from 'vue-demi'
import { h as CreateElement } from '@formily/vue'

const WrokbenchComponent = defineComponent({
  name: 'Workbench',
  setup(props, { slots }) {
    const workbench = useWorkbench()
    return () => {
      return (
        <Workspace id={workbench.value.currentWorkspace?.id}>
          {slots.default?.()}
        </Workspace>
      )
    }
  },
})

export const Workbench = observer(WrokbenchComponent)
