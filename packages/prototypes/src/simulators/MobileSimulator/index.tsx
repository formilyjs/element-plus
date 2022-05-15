import { MobileBody } from './body'
import { usePrefix } from '../../hooks'
import cls from 'classnames'
import './styles.less'
import { defineComponent } from 'vue-demi'
// export interface IMobileSimulatorProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   className?: string
//   style?: React.CSSProperties
// }

export const MobileSimulator = defineComponent({
  setup(props, { attrs, slots }) {
    const prefixRef = usePrefix('mobile-simulator')
    return () => {
      return (
        <div {...attrs} class={cls(prefixRef.value)}>
          <div class={prefixRef.value + '-content'}>
            <MobileBody>{slots.default?.()}</MobileBody>
          </div>
        </div>
      )
    }
  },
})
