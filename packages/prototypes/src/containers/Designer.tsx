import { Engine, GlobalRegistry } from '@designable/core'
import { DesignerEngineSymbol } from '../context'
import { IDesignerProps } from '../types'
import { GhostWidget } from '../widgets'
import { useDesigner } from '../hooks/useDesigner'
import { Layout } from './Layout'
import * as icons from '../icons'
import {
  defineComponent,
  onBeforeUnmount,
  provide,
  ref,
  toRef,
  PropType,
  watchEffect,
} from 'vue-demi'

GlobalRegistry.registerDesignerIcons(icons)

export const Designer = defineComponent({
  props: {
    engine: {
      type: Object as PropType<IDesignerProps['engine']>,
    },
    theme: { type: String as PropType<IDesignerProps['theme']>, default: 'light' },
    prefixCls: { type: String as PropType<IDesignerProps['prefixCls']>, default: 'dn-' },
    variables: { type: Object as PropType<IDesignerProps['variables']>, default: () => { } }
  },
  setup(props, { slots }) {
    const engine = useDesigner()
    const refInstance = ref<Engine | null>(null)

    provide(DesignerEngineSymbol, toRef(props, 'engine'))

    watchEffect(() => {
      if (props.engine) {
        if (props.engine && refInstance.value) {
          if (props.engine !== refInstance.value) {
            refInstance.value.unmount()
          }
        }
        props.engine.mount()
        refInstance.value = props.engine
      }
    })

    onBeforeUnmount(() => {
      if (props.engine) {
        props.engine.unmount()
      }
    })

    if (engine.value)
      throw new Error(
        'There can only be one Designable Engine Context'
      )

    return () => {
      return (
        <Layout {...{ theme: props.theme, prefixCls: props.prefixCls }}>
          {slots.default?.()}
          <GhostWidget />
        </Layout>
      )
    }
  },
})
