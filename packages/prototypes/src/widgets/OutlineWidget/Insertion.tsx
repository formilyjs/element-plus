import { useOutlineDragon, usePrefix } from '../../hooks'
import { ClosestPosition } from '@designable/core'
import { observer } from '@formily/reactive-vue'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { defineComponent } from 'vue-demi'
import { CSSProperties } from '@vue/runtime-dom'
import { isNum } from '@designable/shared'
export interface IInsertionProps {
  workspaceId?: string
}

// export const Insertion: React.FC<IInsertionProps> = observer(({ workspaceId }) => {
//   const outlineDragon = useOutlineDragon(workspaceId)
//   const prefix = usePrefix('outline-tree-insertion')
//   const createInsertionStyle = (): React.CSSProperties => {
//     const closestDirection = outlineDragon.closestDirection
//     const closestRect = outlineDragon.closestOffsetRect
//     const baseStyle: React.CSSProperties = {
//       position: 'absolute',
//       transform: 'perspective(1px) translate3d(0,0,0)',
//       top: 0,
//       left: 0,
//     }
//     if (!closestRect) return baseStyle
//     if (
//       closestDirection === ClosestPosition.After ||
//       closestDirection === ClosestPosition.InnerAfter ||
//       closestDirection === ClosestPosition.Under ||
//       closestDirection === ClosestPosition.ForbidAfter ||
//       closestDirection === ClosestPosition.ForbidInnerAfter ||
//       closestDirection === ClosestPosition.ForbidUnder
//     ) {
//       baseStyle.width = closestRect.width
//       baseStyle.height = 2
//       baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y + closestRect.height - 2}px,0)`
//     } else if (
//       closestDirection === ClosestPosition.Before ||
//       closestDirection === ClosestPosition.InnerBefore ||
//       closestDirection === ClosestPosition.Upper ||
//       closestDirection === ClosestPosition.ForbidBefore ||
//       closestDirection === ClosestPosition.ForbidInnerBefore ||
//       closestDirection === ClosestPosition.ForbidUpper
//     ) {
//       baseStyle.width = closestRect.width
//       baseStyle.height = 2
//       baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`
//     }
//     if (closestDirection.includes('FORBID')) {
//       baseStyle.backgroundColor = 'red'
//     } else {
//       baseStyle.backgroundColor = ''
//     }
//     return baseStyle
//   }

//   if (!outlineDragon?.closestNode) return null

//   return <div className={prefix} style={createInsertionStyle()}></div>
// })
const InsertionComponent = defineComponent({
  props: ['workspaceId'],
  setup(props) {
    const outlineDragonRef = useOutlineDragon(props.workspaceId)
    const prefixRef = usePrefix('outline-tree-insertion')
    return () => {
      const outlineDragon = outlineDragonRef.value
      const prefix = prefixRef.value
      const createInsertionStyle = (): CSSProperties => {
        const closestDirection = outlineDragon.closestDirection
        const closestRect = outlineDragon.closestOffsetRect
        const baseStyle: CSSProperties = {
          position: 'absolute',
          transform: 'perspective(1px) translate3d(0,0,0)',
          top: 0,
          left: 0,
        }
        if (!closestRect) return baseStyle
        if (
          closestDirection === ClosestPosition.After ||
          closestDirection === ClosestPosition.InnerAfter ||
          closestDirection === ClosestPosition.Under ||
          closestDirection === ClosestPosition.ForbidAfter ||
          closestDirection === ClosestPosition.ForbidInnerAfter ||
          closestDirection === ClosestPosition.ForbidUnder
        ) {
          baseStyle.width = closestRect.width
          baseStyle.height = 2
          baseStyle.transform = `perspective(1px) translate3d(${
            closestRect.x
          }px,${closestRect.y + closestRect.height - 2}px,0)`
        } else if (
          closestDirection === ClosestPosition.Before ||
          closestDirection === ClosestPosition.InnerBefore ||
          closestDirection === ClosestPosition.Upper ||
          closestDirection === ClosestPosition.ForbidBefore ||
          closestDirection === ClosestPosition.ForbidInnerBefore ||
          closestDirection === ClosestPosition.ForbidUpper
        ) {
          baseStyle.width = closestRect.width
          baseStyle.height = 2
          baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`
        }
        if (closestDirection.includes('FORBID')) {
          baseStyle.backgroundColor = 'red'
        } else {
          baseStyle.backgroundColor = ''
        }
        Object.keys(baseStyle).forEach((key) => {
          const value = baseStyle[key]
          isNum(value) && (baseStyle[key] = value + 'px')
        })
        return baseStyle
      }
      if (!outlineDragon?.closestNode) return null

      return <div class={prefix} style={createInsertionStyle()}></div>
    }
  },
})

export const Insertion = composeExport(observer(InsertionComponent), {
  displayName: 'Insertion',
})
