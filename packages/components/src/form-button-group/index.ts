import { h } from '@formily/vue'
import { defineComponent } from 'vue'
import { Space, SpaceProps } from '../space'
import { FormBaseItem } from '../form-item'
import { stylePrefix } from '../__builtins__'

export type FormButtonGroupProps = Omit<SpaceProps, 'align' | 'size'> & {
  align?: 'left' | 'right' | 'center'
  gutter?: number
  className?: string
  alignFormItem: boolean
}

export const FormButtonGroup = defineComponent({
  name: 'FFormButtonGroup',
  props: {
    align: {
      type: String,
      default: 'left',
    },
    gutter: {
      type: Number,
      default: 8,
    },
    alignFormItem: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const prefixCls = `${stylePrefix}-form-button-group`
    return () => {
      if (props.alignFormItem) {
        return h(
          FormBaseItem,
          {
            colon: false,
            label: ' ',
            ...attrs,
            style: {
              margin: 0,
              padding: 0,
              width: '100%',
            },
          },
          {
            default: () => h(Space, { size: props.gutter }, slots),
          }
        )
      } else {
        return h(
          Space,
          {
            ...attrs,
            class: [prefixCls],
            style: {
              justifyContent:
                props.align === 'left'
                  ? 'flex-start'
                  : props.align === 'right'
                  ? 'flex-end'
                  : 'center',
              display: 'flex',
            },
            size: props.gutter,
          },
          slots
        )
      }
    }
  },
})

export default FormButtonGroup
