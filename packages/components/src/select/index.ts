import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from 'vue'
import { PreviewText } from '../preview-text'

import type {
  ElSelect as ElSelectProps,
  ElOption as ElOptionProps,
} from 'element-plus'
import { ElSelect, ElOption } from 'element-plus'
import { resolveComponent } from '../__builtins__'

export type SelectProps = typeof ElSelectProps & {
  options?: Array<typeof ElOptionProps>
}

const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option: typeof ElOptionProps) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      {
                        value: option,
                        label: option,
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(ElOption, option, {
                      default: () => [resolveComponent(slots?.option, option)],
                    })
                  }
                }),
            }
          : slots

      return h(ElSelect, attrs, children)
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({
    dataSource: 'options',
    loading: true,
  }),
  mapReadPretty(PreviewText.Select)
)

export default Select
