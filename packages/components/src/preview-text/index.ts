import { defineComponent, computed, toRef, Ref, h } from 'vue'
import {
  createContext,
  resolveComponent,
  useContext,
  composeExport,
} from '../__builtins__/shared'
import { Field } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { useField } from '@formily/vue'
import { isArr, isValid } from '@formily/shared'
import { stylePrefix } from '../__builtins__/configs'
import { InputProps } from '../input'
import type { SelectProps } from '../select'
import type { CascaderProps } from '../cascader'
import type { DatePickerProps } from '../date-picker'
import type { TimePickerProps } from '../time-picker'
import { Space } from '../space'
import { ElTag } from 'element-plus'

const prefixCls = `${stylePrefix}-preview-text`
const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: Ref<any>) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value?.value) && value?.value !== ''
      ? value?.value
      : resolveComponent(placeholderCtx.value) || 'N/A'
  })
  return placeholder
}

const Input = defineComponent({
  name: 'FPreviewTextInput',
  props: ['value'],
  setup(props, { attrs, slots }) {
    const value = toRef(props, 'value')
    const placeholder = usePlaceholder(value)
    return () => {
      return h(
        Space,
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () =>
            [
              slots?.prepend?.(),
              slots?.prefix?.(),
              placeholder.value,
              slots?.suffix?.(),
              slots?.append?.(),
            ].filter((child) => !!child),
        }
      )
    }
  },
})

const Select = observer(
  defineComponent<SelectProps>({
    name: 'FPreviewTextSelect',
    setup(_props, { attrs }) {
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as SelectProps
      const dataSource: any[] = field?.dataSource?.length
        ? field.dataSource
        : props?.options?.length
        ? props.options
        : []
      const placeholder = usePlaceholder()
      const getSelected = () => {
        const value = props.value
        if (props.multiple) {
          return isArr(value)
            ? value.map((val) => ({ label: val, value: val }))
            : []
        } else {
          return isValid(value) ? [{ label: value, value }] : []
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        if (!selected.length) {
          return h(
            ElTag,
            {},
            {
              default: () => placeholder.value,
            }
          )
        }
        return selected.map(({ value, label }, key) => {
          const text =
            dataSource?.find((item) => item.value == value)?.label || label
          return h(
            ElTag,
            {
              key,
              type: 'info',
              effect: 'light',
            },
            {
              default: () => text || placeholder.value,
            }
          )
        })
      }

      return () => {
        return h(
          Space,
          {
            class: [prefixCls],
            style: attrs.style,
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

const Cascader = observer(
  defineComponent<CascaderProps>({
    name: 'FPreviewTextCascader',
    setup(_props, { attrs }) {
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as CascaderProps
      const dataSource: any[] = field?.dataSource?.length
        ? field.dataSource
        : props?.options?.length
        ? props.options
        : []
      const placeholder = usePlaceholder()
      const valueKey = props.props?.value || 'value'
      const labelKey = props.props?.label || 'label'
      const getSelected = () => {
        return isArr(props.value) ? props.value : []
      }

      const findLabel: (value: any, dataSource: any) => any = (
        value,
        dataSource
      ) => {
        for (let i = 0; i < dataSource?.length; i++) {
          const item = dataSource[i]
          if (item?.[valueKey] === value) {
            return item?.[labelKey]
          } else {
            const childLabel = findLabel(value, item?.children)
            if (childLabel) return childLabel
          }
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        if (!selected?.length) {
          return h(
            ElTag,
            {},
            {
              default: () => placeholder.value,
            }
          )
        }
        return selected.map((value, key) => {
          const text = findLabel(value, dataSource)
          return h(
            ElTag,
            {
              key,
              type: 'info',
              effect: 'light',
            },
            {
              default: () => text || placeholder.value,
            }
          )
        })
      }

      return () => {
        return h(
          Space,
          {
            class: [prefixCls],
            style: attrs.style,
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

const DatePicker = defineComponent<DatePickerProps>({
  name: 'FPreviewTextDatePicker',
  setup(_props, { attrs }) {
    const props = attrs as unknown as DatePickerProps
    const placeholder = usePlaceholder()
    const getLabels = () => {
      if (isArr(props.value)) {
        const labels = (props.value as any[]).map(
          (value: string | Date) => value || placeholder.value
        )

        return labels.join('~')
      } else {
        return props.value || placeholder.value
      }
    }

    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => getLabels(),
        }
      )
    }
  },
})

const TimePicker = defineComponent<TimePickerProps>({
  name: 'FPreviewTextTimePicker',
  setup(_props, { attrs }) {
    const props = attrs as unknown as TimePickerProps
    // const format = props.pickerOptions?.format || 'HH:mm:ss'
    const placeholder = usePlaceholder()
    const getLabels = () => {
      if (isArr(props.value)) {
        const labels = props.value.map(
          (value: string | Date) => value || placeholder.value
        )

        return labels.join('~')
      } else {
        return props.value || placeholder.value
      }
    }

    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => getLabels(),
        }
      )
    }
  },
})

const Text = defineComponent<any>({
  name: 'FPreviewText',
  setup(_props, { attrs }) {
    const placeholder = usePlaceholder()

    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => placeholder.value,
        }
      )
    }
  },
})

export const PreviewText = composeExport(Text, {
  Input,
  Select,
  Cascader,
  DatePicker,
  TimePicker,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
}) as any

export default PreviewText
