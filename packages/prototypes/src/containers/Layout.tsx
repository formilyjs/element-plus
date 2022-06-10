import { defineComponent, provide, ref, watch, computed, PropType } from 'vue'
import { IDesignerLayoutProps } from '../types'
import {
  DesignerLayoutSymbol,
  IDesignerLayoutContext,
  useContext,
} from '../context'
import { each } from '@designable/shared'

export const Layout = defineComponent({
  name: 'Layout',
  props: {
    theme: { type: String as PropType<IDesignerLayoutProps['theme']>, default: 'light' },
    prefixCls: { type: String as PropType<IDesignerLayoutProps['prefixCls']>, default: 'dn-' },
    variables: { type: Object as PropType<IDesignerLayoutProps['variables']>, default: () => { } },
    position: { type: String as PropType<IDesignerLayoutProps['position']>, default: 'fixed' }
  },
  setup(props, { slots }) {
    const layoutRef = useContext<IDesignerLayoutContext>(DesignerLayoutSymbol)
    const containerRef = ref<HTMLDivElement>()

    watch(containerRef, () => {
      if (containerRef.value) {
        each(props.variables!, (value, key) => {
          containerRef.value?.style?.setProperty(`--${key}`, value)
        })
      }
    })

    if (layoutRef.value) {
      return () => {
        return slots.default?.()
      }
    }

    provide(
      DesignerLayoutSymbol,
      computed(() => {
        return {
          theme: props.theme!,
          prefixCls: props.prefixCls!,
          position: props.position!
        }
      })
    )

    return () => {
      return (
        <div
          ref={containerRef}
          class={{
            [`${props.prefixCls}app`]: true,
            [`${props.prefixCls}${props.theme}`]: props.theme,
          }}
        >
          {slots.default?.()}
        </div>
      )
    }
  },
})
