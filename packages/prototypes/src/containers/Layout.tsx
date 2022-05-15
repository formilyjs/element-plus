import { defineComponent, provide, ref } from 'vue'
import { IDesignerLayoutProps } from '../types'
import {
  FragmentComponent as Fragment,
  VueComponent,
  h as CreateElement,
} from '@formily/vue'
import {
  DesignerLayoutSymbol,
  IDesignerLayoutContext,
  useContext,
} from '../context'

export const Layout = defineComponent({
  name: 'Layout',
  props: {
    theme: { type: String, default: 'light' },
    prefixCls: { type: String, default: 'dn-' },
  },
  setup(props: IDesignerLayoutProps, { slots }) {
    const layoutRef = useContext<IDesignerLayoutContext>(DesignerLayoutSymbol)

    if (layoutRef.value) {
      return () => {
        return slots.default?.()
      }
    }

    provide(
      DesignerLayoutSymbol,
      ref({
        theme: props.theme,
        prefixCls: props.prefixCls,
      } as IDesignerLayoutProps)
    )

    return () => {
      return (
        <div class={{
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
