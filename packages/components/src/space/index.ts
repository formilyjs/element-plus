import { defineComponent, SetupContext, h } from 'vue'
import type { VNode } from 'vue'
import { stylePrefix } from '../__builtins__'
import { each } from '@formily/shared'
import { useFormLayout } from '../form-layout'
import { isValidElementNode } from "element-plus/es/utils/vue/vnode"

export type SpaceProps = {
  size: 'small' | 'middle' | 'large' | number
  direction: 'horizontal' | 'vertical'
  align: 'start' | 'end' | 'center' | 'baseline'
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

export const Space = defineComponent({
  name: 'FSpace',
  props: ['size', 'direction', 'align'],
  inheritAttrs: false,
  setup(props: SpaceProps, { slots }: SetupContext) {
    const layout = useFormLayout()

    const resolveItems: (children: VNode[]) => VNode[] = (children: VNode[]) => {
      return children.reduce((buffer, children) => {
        if (!isValidElementNode(children)) {
          if (children.children)
            return buffer.concat(resolveItems(children.children as VNode[]))
          return buffer
        }
        return buffer.concat(children)
      }, [] as VNode[])
    }

    return () => {
      const {
        align,
        size = layout.value?.spaceGap ?? 'small',
        direction = 'horizontal',
      } = props

      const prefixCls = `${stylePrefix}-space`
      const children = slots.default?.()

      // 获取子节点数量
      let items: VNode[] = resolveItems(children)
    
      const len = items.length

      if (len === 0) {
        return null
      }

      const mergedAlign =
        align === undefined && direction === 'horizontal' ? 'center' : align
      const marginDirection = 'marginRight' // directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

      const someSpaceClass = {
        [prefixCls]: true,
        [`${prefixCls}-${direction}`]: true,
        [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
      }

      const itemClassName = `${prefixCls}-item`

      const renderItems = items.map((child, i) =>
        h(
          'div',
          {
            class: itemClassName,
            key: `${itemClassName}-${i}`,
            style:
              i === len - 1
                ? {}
                : {
                  [direction === 'vertical'
                    ? 'marginBottom'
                    : marginDirection]:
                    typeof size === 'string'
                      ? `${spaceSize[size]}px`
                      : `${size}px`,
                },
          },
          { default: () => [child] }
        )
      )

      return h('div', { class: someSpaceClass }, { default: () => renderItems })
    }
  },
})

export default Space
