import { useDragon, usePrefix } from '../../hooks'
import { ClosestPosition } from '@designable/core'
import { observer } from '@formily/reactive-vue'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { defineComponent } from 'vue-demi'
import { isNum } from '@designable/shared'

export const InsertionComponent = observer(
  defineComponent({
    name: 'Insertion',
    props: [],
    setup() {
      const viewportDragon = useDragon()
      const prefix = usePrefix('aux-insertion')

      return () => {
        const createInsertionStyle = (): any => {
          const closestDirection = viewportDragon.value.closestDirection
          const closestRect = viewportDragon.value.closestOffsetRect
          const isInlineLayout =
            viewportDragon.value.getClosestLayout() === 'horizontal'
          const baseStyle: any = {
            position: 'absolute',
            transform: 'perspective(1px) translate3d(0,0,0)',
            top: 0,
            left: 0,
          }
          if (!closestRect) return baseStyle
          if (
            closestDirection === ClosestPosition.Before ||
            closestDirection === ClosestPosition.ForbidBefore
          ) {
            baseStyle.width = 2
            baseStyle.height = closestRect.height
            baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`
          } else if (
            closestDirection === ClosestPosition.After ||
            closestDirection === ClosestPosition.ForbidAfter
          ) {
            baseStyle.width = 2
            baseStyle.height = closestRect.height
            baseStyle.transform = `perspective(1px) translate3d(${closestRect.x + closestRect.width - 2
              }px,${closestRect.y}px,0)`
          } else if (
            closestDirection === ClosestPosition.InnerAfter ||
            closestDirection === ClosestPosition.Under ||
            closestDirection === ClosestPosition.ForbidInnerAfter ||
            closestDirection === ClosestPosition.ForbidUnder
          ) {
            if (isInlineLayout) {
              baseStyle.width = 2
              baseStyle.height = closestRect.height
              baseStyle.transform = `perspective(1px) translate3d(${closestRect.x + closestRect.width - 2
                }px,${closestRect.y}px,0)`
            } else {
              baseStyle.width = closestRect.width
              baseStyle.height = 2
              baseStyle.transform = `perspective(1px) translate3d(${closestRect.x
                }px,${closestRect.y + closestRect.height - 2}px,0)`
            }
          } else if (
            closestDirection === ClosestPosition.InnerBefore ||
            closestDirection === ClosestPosition.Upper ||
            closestDirection === ClosestPosition.ForbidInnerBefore ||
            closestDirection === ClosestPosition.ForbidUpper
          ) {
            if (isInlineLayout) {
              baseStyle.width = 2
              baseStyle.height = closestRect.height
              baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`
            } else {
              baseStyle.width = closestRect.width
              baseStyle.height = 2
              baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`
            }
          }
          if (closestDirection.includes('FORBID')) {
            baseStyle.backgroundColor = 'red'
          }
          Object.keys(baseStyle).forEach((key) => {
            const value = baseStyle[key]
            isNum(value) && (baseStyle[key] = value + 'px')
          })
          return baseStyle
        }
        return <div class={prefix.value} style={createInsertionStyle()}></div>
      }
    },
  })
)

export const Insertion = composeExport(InsertionComponent, {
  displayName: 'Insertion',
})
