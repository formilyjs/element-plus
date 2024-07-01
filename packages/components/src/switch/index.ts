import { transformComponent } from '../__builtins__'
import { connect, mapProps } from '@formily/vue'
import { ElSwitch } from 'element-plus'

export type SwitchProps = typeof ElSwitch

const TransformElSwitch = transformComponent<SwitchProps>(ElSwitch, {
  change: 'update:modelValue',
})

export const Switch = connect(
  TransformElSwitch,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  })
)

export default Switch
