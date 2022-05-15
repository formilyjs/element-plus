import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from 'vue'
import { PreviewText } from '@formily/element-plus'
import { ElSelect, ElOption } from 'element-plus'
import { resolveComponent } from '@formily/element-plus/src/__builtins__'

const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options', 'value'],
  setup(props, { attrs, slots }) {
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
        <ElSelect modelValue={props.value} v-slots={_slots}>
        </ElSelect>
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
