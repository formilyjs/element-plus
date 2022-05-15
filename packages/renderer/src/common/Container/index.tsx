import { DroppableWidget } from '@formily/element-plus-prototypes'
import { VueComponent } from '@formily/vue'
import './styles.less'
import { defineComponent } from 'vue-demi'
import { uid } from '@designable/shared'
import { VNode } from 'vue'

export const Container = defineComponent({
  name: 'DnContainer',
  setup(props, { slots }) {
    return () => {
      return <DroppableWidget v-slots={slots} key={uid()}></DroppableWidget>
    }
  },
})

export const withContainer = (Target: VNode) => {
  return defineComponent({
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <DroppableWidget>
            <Target attrs={attrs} v-slots={slots} />
          </DroppableWidget>
        )
      }
    },
  })
}
