import { TreeNode } from '@designable/core'
import { observer } from '@formily/reactive-vue'
import { IconWidget } from '../IconWidget'
import { useDesigner, usePrefix, } from '../../hooks'
import { useStyle } from '../../shared'
import { ElButton } from 'element-plus'
import { CSSProperties, defineComponent } from 'vue'
import { PropType } from 'vue'

export interface IDragHandlerProps {
  node: TreeNode
}

export const DragHandler = observer(
  defineComponent({
    name: 'DragHandler',
    props: { node: { type: Object as PropType<TreeNode> } },
    setup(props) {
      const designerRef = useDesigner()
      const style = useStyle()
      const prefixRef = usePrefix('aux-drag-handler')

      return () => {
        const prefix = prefixRef.value
        const designer = designerRef.value
        const node = props.node!
        if (node === node.root || !node.allowDrag()) return null
        const handlerProps = {
          [designer.props.nodeDragHandlerAttrName!]: 'true',
        }
        return (
          <button {...handlerProps} class={prefix} style={style}>
            <IconWidget infer="Move" />
          </button>
        )
      }
    }
  })

)

DragHandler.displayName = 'DragHandler'
