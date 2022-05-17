import { TreeNode } from '@designable/core'
import { observer } from '@formily/reactive-vue'
import { useTreeNode, useNodeIdProps } from '../../hooks'
import { NodeTitleWidget } from '../NodeTitleWidget'
import { INodeActionsWidgetActionProps, NodeActionsWidget } from '../NodeActionsWidget'
import './styles.less'
import { CSSProperties } from '@vue/runtime-dom'
import { defineComponent } from 'vue-demi'
import { PropType } from 'vue'

export interface IDroppableWidgetProps {
  node?: TreeNode
  actions?: INodeActionsWidgetActionProps[]
  placeholder?: boolean
  height?: number
  style?: CSSProperties
  hasChildren?: boolean
}

export const DroppableWidget = observer(
  defineComponent({
    name: 'DnDroppableWidget',
    props: {
      node: { type: Object as PropType<TreeNode> },
      height: {},
      actions: { type: Array as PropType<Array<IDroppableWidgetProps>> }
    },
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps(props.node)

      return () => {
        const target = props.node ?? nodeRef.value
        if (!target) return
        const children = slots.default?.()
        const hasChildren = target.children?.length > 0 && children
        return (
          <div {...nodeIdRef.value}>
            {hasChildren && children}
            {!hasChildren && (
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
)
