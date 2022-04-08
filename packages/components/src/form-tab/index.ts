import { defineComponent, reactive, computed, PropType } from 'vue'
import { observer } from '@formily/reactive-vue'
import { model } from '@formily/reactive'
import {
  h,
  useField,
  useFieldSchema,
  RecursionField,
  Fragment,
} from '@formily/vue'
import { Schema, SchemaKey } from '@formily/json-schema'
import { ElTabs, ElTabPane, ElBadge } from 'element-plus'
import { stylePrefix, composeExport } from '../__builtins__'

export interface IFormTab {
  activeKey: string
  setActiveKey(key: string): void
}

export interface IFormTabProps {
  formTab?: IFormTab
}

export interface IFormTabPaneProps {
  key: string | number
}

type Tabs = { name: SchemaKey; props: any; schema: Schema }[]

const useTabs = () => {
  const tabsField = useField()
  const schema = useFieldSchema()
  const tabs: Tabs = reactive([])
  schema.value.mapProperties((schema, name) => {
    const field = tabsField.value
      .query(tabsField.value.address.concat(name))
      .take()
    if (field?.display === 'none' || field?.display === 'hidden') return

    if (schema['x-component']?.indexOf('TabPane') > -1) {
      tabs.push({
        name,
        props: {
          name: schema?.['x-component-props']?.name || name,
          ...schema?.['x-component-props'],
        },
        schema,
      })
    }
  })
  return tabs
}

const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return formTab
}

const FormTab = observer(
  defineComponent({
    inheritAttrs: false,
    props: {
      formTab: { type: Object as PropType<IFormTab> },
      value: {
        type: String,
      },
    },
    setup(props, { attrs, emit }: any) {
      const field = useField()
      const prefixCls = `${stylePrefix}-form-tab`
      const formTabRef = computed(() => props.formTab ?? createFormTab())

      const takeActiveKey = (tabs: Tabs) => {
        return props?.value || formTabRef.value?.activeKey || tabs?.[0]?.name
      }

      const badgedHeader = (key: SchemaKey, props: any) => {
        const errors = field.value.form.queryFeedbacks({
          type: 'error',
          address: `${field.value.address.concat(key)}.*`,
        })
        if (errors.length) {
          return h(
            ElBadge,
            {
              class: [`${prefixCls}-errors-badge`],
              value: errors.length,
            },
            { default: () => props.label }
          )
        }
        return props.label
      }

      return () => {
        const tabs = useTabs()
        const activeKey = takeActiveKey(tabs)

        return h(
          ElTabs,
          {
            ...attrs,
            class: [prefixCls],
            modelValue: activeKey,
            onChange: (key: string) => {
              emit('input', key)
              formTabRef.value.setActiveKey?.(key)
            },
          },
          {
            default: () =>
              tabs.map(({ props, schema, name }, key) => {
                return h(
                  ElTabPane,
                  {
                    key,
                    ...props,
                  },
                  {
                    default: () => h(RecursionField, { schema, name }, {}),
                    label: () =>
                      h(
                        'div',
                        {},
                        { default: () => [badgedHeader(name, props)] }
                      ),
                  }
                )
              }),
          }
        )
      }
    },
  })
)

const FormTabPane = defineComponent<IFormTabPaneProps>({
  name: 'FFormTabPane',
  inheritAttrs: false,
  setup(_props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})

export const composeFormTab = composeExport(FormTab, {
  TabPane: FormTabPane,
  createFormTab,
})

export { composeFormTab as FormTab }
export default composeFormTab
