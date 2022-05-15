import { ElBreadcrumb as Breadcrumb, ElBreadcrumbItem as BreadcrumbItem } from 'element-plus'
import { FragmentComponent as Fragment } from '@formily/vue'
import { useCurrentNode, useSelection, usePrefix, useHover } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'
import './styles.less'
import { defineComponent } from 'vue-demi'

export interface INodePathWidgetProps {
  workspaceId?: string
  maxItems?: number
}

export const NodePathWidget = defineComponent({
  props: ['workspaceId', 'maxItems'],
  setup(props) {
    const selectedRef = useCurrentNode(props.workspaceId)
    const selectionRef = useSelection(props.workspaceId)
    const hoverRef = useHover(props.workspaceId)
    const prefixRef = usePrefix('node-path')

    return () => {
      if (!selectedRef.value) return null
      const maxItems = props.maxItems ?? 3
      const nodes = selectedRef.value
        .getParents()
        .slice(0, maxItems - 1)
        .reverse()
        .concat(selectedRef.value)
      return (
        <Breadcrumb class={prefixRef.value}>
          {nodes.map((node, key) => {
            return (
              <BreadcrumbItem key={key}>
                {key === 0 && (
                  <IconWidget infer="Position" style={{ marginRight: '3px' }} />
                )}
                <a
                  href=""
                  onMouseenter={() => {
                    hoverRef.value.setHover(node)
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    selectionRef.value.select(node)
                  }}
                >
                  <NodeTitleWidget {...{ node: node }} />
                </a>
              </BreadcrumbItem>
            )
          })}
        </Breadcrumb>
      )
    }
  },
})
