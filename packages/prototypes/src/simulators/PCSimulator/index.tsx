import cls from 'classnames'
import { defineComponent } from 'vue-demi'
import { usePrefix } from '../../hooks'
import './styles.less'
// export interface IPCSimulatorProps extends HTMLDivElement {
//   className?: string
//   style?: any // CSSProperties
// }
export const PCSimulator = defineComponent({
  name: 'DnPCSimulator',
  props: {
    className: {},
  },
  setup(props, { attrs, slots }) {
    const prefix = usePrefix('pc-simulator')

    return () => {
      return (
        <div {...attrs} class={cls(prefix.value, props.className)}>
          {slots.default?.()}
        </div>
      )
    }
  },
})
