import { useCursor, usePrefix, useDesigner } from '../../hooks'
import { CursorStatus } from '@designable/core'
import { autorun, observe } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { NodeTitleWidget } from '../NodeTitleWidget'
import './styles.less'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { defineComponent, ref, unref, onBeforeUnmount } from 'vue-demi'
import { useEffect } from '../../shared/useEffect'

const GhostWidgetComponent = defineComponent({
  setup() {
    const designerRef = useDesigner()
    const cursorRef = useCursor()
    const refInstance = ref<HTMLDivElement>()
    const prefixRef = usePrefix('ghost')

    useEffect(
      () =>
        autorun(() => {
          const cursor = unref(cursorRef)
          const ref = refInstance.value
          const transform = `perspective(1px) translate3d(${cursor.position!.topClientX! - 18
            }px,${cursor.position!.topClientY! - 12}px,0) scale(0.8)`
          if (!ref) return
          ref.style.transform = transform
        }),
      [designerRef, cursorRef]
    )

    return () => {
      const designer = unref(designerRef)
      const cursor = unref(cursorRef)

      const draggingNodes = designer.findDraggingNodes()
      const firstNode = draggingNodes[0]

      const renderNodes = () => {
        return (
          <span
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            <NodeTitleWidget node={firstNode} />
            {draggingNodes.length > 1 ? '...' : ''}
          </span>
        )
      }

      if (!firstNode) return null

      return cursor.status === CursorStatus.Dragging ? (
        <div class={prefixRef.value} ref={refInstance}>
          {renderNodes()}
        </div>
      ) : null
    }
  },
})

export const GhostWidget = composeExport(observer(GhostWidgetComponent), {
  displayName: 'GhostWidget',
})
