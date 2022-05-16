import { Switch } from '@formily/element-plus'
import { defineComponent } from 'vue-demi'

export interface IFormItemSwitcherProps {
  value?: string
  // onChange?: (value: string) => void
}

export const FormItemSwitcher = defineComponent({
  props: { value: {} },
  setup(props, { emit }) {
    return () => {
      return (
        <Switch
          modelValue={props.value === 'FormItem'}
          {...{
            "onUpdate:modelValue": (value) => {
              emit('change', value ? 'FormItem' : undefined)
            }
          }}
        />
      )
    }
  },
})
