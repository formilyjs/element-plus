import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { PreviewText } from '@formily/element-plus'
import { ElSelect, ElOption } from 'element-plus'
import { resolveComponent } from '@formily/element-plus/esm/__builtins__'

const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options', 'value'],
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    return () => {
      const options = props.options || []
      const _slots =
        options.length !== 0
          ? {
            default: () =>
              options.map((option) => {
                if (typeof option === 'string') {
                  return h(
                    ElOption,
                    { props: { value: option, label: option } },
                    {
                      default: () => [
                        resolveComponent(slots?.option, { option }),
                      ],
                    }
                  )
                } else {
                  return h(
                    ElOption,
                    {
                      props: {
                        ...option,
                      },
                    },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option.component, {
                          option,
                        }),
                      ],
                    }
                  )
                }
              }),
          }
          : slots
      return (
        <ElSelect modelValue={props.value} v-slots={_slots} {...{ "onUpdate:modelValue": (value: any) => { emit('change', value) } }} />
      )
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
