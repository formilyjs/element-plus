import { transformComponent } from '../__builtins__'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElInputNumber } from 'element-plus'
import { PreviewText } from '../preview-text'

export type InputNumberProps = typeof ElInputNumber

const TransformElInputNumber = transformComponent<InputNumberProps>(
  ElInputNumber,
  {
    change: 'update:modelValue',
  }
)

export const InputNumber = connect(
  TransformElInputNumber,
  mapProps(
    {
      value: 'modelValue',
      readOnly: 'readonly',
    },
    (props) => {
      let controlsPosition = 'right'
      if (props.controlsPosition) {
        controlsPosition = props.controlsPosition
      }
      return {
        controlsPosition,
        modelValue: props.modelValue,
      }
    }
  ),
  mapReadPretty(PreviewText.Input)
)

export default InputNumber
