import { TreeNode } from '@designable/core'
import { observer } from '@formily/reactive-vue'
import { useTreeNode, useNodeIdProps } from '../../hooks'
import { NodeTitleWidget } from '../NodeTitleWidget'
import { NodeActionsWidget } from '../NodeActionsWidget'
import './styles.less'
import { CSSProperties } from '@vue/runtime-dom'
import { defineComponent } from 'vue-demi'

export interface IDroppableWidgetProps {
  node?: TreeNode
  actions?: Record<string, any>[]
  height?: number
  style?: CSSProperties
  className?: string
}

export const DroppableWidget = observer(
  defineComponent({
    name: 'DnDroppableWidget',
    props: ['node', 'actions', 'height'],
    setup(props, { slots }) {
      const currentNodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps(props.node)

      return () => {
        const target = props.node ?? currentNodeRef.value
        const hasChildren = target.children?.length > 0
        return (
          <div {...nodeIdRef.value}>
            {hasChildren ? (
              slots.default?.()
            ) : (
              <div
                style={{ height: props.height + 'px' }}
                class="dn-droppable-placeholder"
              >
                <NodeTitleWidget node={target} />
              </div>
            )}
            {props.actions?.length ? (
              <NodeActionsWidget>
                {props.actions.map((action, key) => (
                  <NodeActionsWidget.Action {...action} key={key} />
                ))}
              </NodeActionsWidget>
            ) : null}
          </div>
        )
      }
    },
  })
  //   ({ node, actions, height, style, className, ...props }) => {

  // }
)
