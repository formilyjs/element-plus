import { NodeActionsWidget } from '@formily/element-plus-prototypes'
import type { VNode, CSSProperties } from '@vue/runtime-dom'
import type { VueComponent } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { PropType } from 'vue'

export interface ITemplateAction {
  title: VNode
  tooltip?: VNode
  icon?: string | VNode
  onClick: () => void
}

export interface ILoadTemplateProps {
  className?: string
  style?: CSSProperties
  actions?: ITemplateAction[]
}

export const LoadTemplate = defineComponent({
  props: { actions: Array as PropType<Array<ITemplateAction>> },
  setup(props, { attrs, slots }) {
    return () => {
      return (
        <NodeActionsWidget>
          {props.actions?.map((action, key) => {
            return (
              <NodeActionsWidget.Action
                {...action}
                key={key}
                onClick={action.onClick}
              />
            )
          })}
        </NodeActionsWidget>
      )
    }
  },
})
