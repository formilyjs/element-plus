import { ElInput, ElColorPicker } from 'element-plus'
import { usePrefix } from '@formily/element-plus-prototypes'
import './styles.less'
import { defineComponent } from 'vue-demi'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput = defineComponent({
  props: ['value'],
  emits: ['change'],
  setup(props, { emit }) {
    const prefixRef = usePrefix('color-input')
    return () => {
      return (
        <div class={prefixRef.value}>
          <ElInput
            modelValue={props.value}
            placeholder="Color"
            {...{
              'onUpdate:modelValue': (e) => {
                emit('change', e)
              }
            }}
            v-slots={{
              prefix: () => {
                return (
                  <ElColorPicker
                    modelValue={props.value}
                    {...{
                      'onUpdate:modelValue': (e) => {
                        emit('change', e)
                      }
                    }}
                  />
                )
              }
            }}
          />
        </div>
      )
    }
  },
})
