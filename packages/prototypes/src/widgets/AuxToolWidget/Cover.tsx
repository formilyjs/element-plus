import {
  useViewport,
  useDragon,
  useCursor,
  useValidNodeOffsetRect,
  usePrefix,
} from '../../hooks'
import { observer } from '@formily/reactive-vue'
import { CursorStatus, ClosestPosition } from '@designable/core'
import cls from 'classnames'
import { defineComponent, toRef } from 'vue-demi'
import { FragmentComponent as Fragment } from '@formily/vue'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { isNum } from '@designable/shared'

// interface ICoverRectProps {
//   node: TreeNode
//   dragging?: boolean
//   dropping?: boolean
// }

const CoverRect = defineComponent({
  name: 'CoverRect',
  props: ['dragging', 'dropping', 'node'],
  setup(props) {
    const prefixRef = usePrefix('aux-cover-rect')
    const rectRef = useValidNodeOffsetRect(toRef(props, 'node'))

    return () => {
      const rect = rectRef.value
      const createCoverStyle = () => {
        const baseStyle: any = {
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }
        if (rect) {
          baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`
          baseStyle.height = isNum(rect.height)
            ? rect.height + 'px'
            : rect.height
          baseStyle.width = isNum(rect.width) ? rect.width + 'px' : rect.width
        }
        return baseStyle
      }
      return (
        <div
          class={cls(prefixRef.value, {
            dragging: props.dragging,
            dropping: props.dropping,
          })}
          style={createCoverStyle()}
        ></div>
      )
    }
  },
})

const CoverComponent = observer(
  defineComponent({
    name: 'CoverComponent',
    setup() {
      const viewportDragonRef = useDragon()
      const viewportRef = useViewport()
      const cursorRef = useCursor()

      return () => {
        if (cursorRef.value.status !== CursorStatus.Dragging) return null

        const renderDropCover = () => {
          if (
            !viewportDragonRef.value.closestNode ||
            !viewportDragonRef.value.closestNode?.allowAppend(
              viewportDragonRef.value.dragNodes
            ) ||
            viewportDragonRef.value.closestDirection !== ClosestPosition.Inner
          )
            return null
          return (
            <CoverRect
              {...{
                dropping: true,
                node: viewportDragonRef.value.closestNode,
              }}
            />
          )
        }

        return (
          <>
            {viewportDragonRef.value.dragNodes.map((node) => {
              if (!node) return
              if (!viewportRef.value.findElementById(node.id)) return
              return (
                <CoverRect
                  key={node.id}
                  {...{ dragging: true, node: node }}
                />
              )
            })}
            {renderDropCover()}
          </>
        )
      }
    },
  })
)

export const Cover = composeExport(CoverComponent, { displayName: 'Cover' })
