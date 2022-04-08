import { model } from '@formily/reactive'
import { computed, defineComponent, PropType } from 'vue'
import {
  useField,
  useFieldSchema,
  RecursionField,
  h,
  Fragment,
} from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Schema, SchemaKey } from '@formily/json-schema'
import { ElCollapse, ElCollapseItem, ElBadge } from 'element-plus'
import type { ElCollapseItem as ElCollapseItemProps } from 'element-plus'
import { toArr } from '@formily/shared'
import { GeneralField } from '@formily/core'

import { composeExport, stylePrefix } from '../__builtins__'

type ActiveKeys = string | number | Array<string | number>

type ActiveKey = string | number

type Panels = { name: SchemaKey; props: any; schema: Schema }[]

export interface IFormCollapse {
  activeKeys: ActiveKeys
  hasActiveKey(key: ActiveKey): boolean
  setActiveKeys(key: ActiveKeys): void
  addActiveKey(key: ActiveKey): void
  removeActiveKey(key: ActiveKey): void
  toggleActiveKey(key: ActiveKey): void
}

export interface IFormCollapseProps {
  formCollapse?: IFormCollapse
  activeKey?: ActiveKey
}

const usePanels = (collapseField: GeneralField, schema: Schema) => {
  const panels: Panels = []
  schema.mapProperties((schema, name) => {
    const field = collapseField.query(collapseField.address.concat(name)).take()
    if (field?.display === 'none' || field?.display === 'hidden') return

    if (schema['x-component']?.indexOf('FormCollapse.Item') > -1) {
      panels.push({
        name,
        props: {
          ...schema?.['x-component-props'],
          key: schema?.['x-component-props']?.key || name,
        },
        schema,
      })
    }
  })
  return panels
}

const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
  const formCollapse = model({
    activeKeys: defaultActiveKeys,
    setActiveKeys(keys: ActiveKeys) {
      formCollapse.activeKeys = keys
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true
        }
      } else if (formCollapse.activeKeys == key) {
        return true
      }
      return false
    },
    addActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) return
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key)
    },
    removeActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        formCollapse.activeKeys = formCollapse.activeKeys.filter(
          (item) => item != key
        )
      } else {
        formCollapse.activeKeys = ''
      }
    },
    toggleActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key)
      } else {
        formCollapse.addActiveKey(key)
      }
    },
  })
  return formCollapse
}

const FormCollapse = observer(
  defineComponent({
    inheritAttrs: false,
    props: {
      formCollapse: { type: Object as PropType<IFormCollapse> },
      activeKey: {
        type: [String, Number],
      },
    },
    setup(props, { attrs, emit }) {
      const field = useField()
      const schema = useFieldSchema()
      const prefixCls = `${stylePrefix}-form-collapse`
      const formCollapseRef = computed(
        () => props.formCollapse ?? createFormCollapse()
      )

      const takeActiveKeys = (panels: Panels) => {
        if (props.activeKey) return props.activeKey
        if (formCollapseRef.value?.activeKeys)
          return formCollapseRef.value?.activeKeys
        if (attrs.accordion) return panels[0]?.name
        return panels.map((item) => item.name)
      }

      const badgedHeader = (key: SchemaKey, props: any) => {
        const errors = field.value.form.queryFeedbacks({
          type: 'error',
          address: `${field.value.address.concat(key)}.*`,
        })
        if (errors.length > 0) {
          return h(
            ElBadge,
            {
              class: [`${prefixCls}-errors-badge`],
              value: errors.length,
            },
            { default: () => props.title }
          )
        }
        return props.title
      }

      return () => {
        const panels = usePanels(field.value, schema.value)
        const activeKey = takeActiveKeys(panels)
        return h(
          ElCollapse,
          {
            class: prefixCls,
            modelValue: activeKey,
            onChange: (key: string | string[]) => {
              emit('input', key)
              formCollapseRef.value.setActiveKeys(key)
            },
          },
          {
            default: () => {
              return panels.map(({ props, schema, name }, key) => {
                return h(
                  ElCollapseItem,
                  {
                    key,
                    ...props,
                    name,
                  },
                  {
                    default: () => h(RecursionField, { schema, name }, {}),
                    title: () =>
                      h(
                        'span',
                        {},
                        { default: () => [badgedHeader(name, props)] }
                      ),
                  }
                )
              })
            },
          }
        )
      }
    },
  })
)

export const FormCollapseItem = defineComponent({
  name: 'FFormCollapseItem',
  inheritAttrs: false,
  setup(_props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})

const composeFormCollapse = composeExport(FormCollapse, {
  Item: FormCollapseItem,
  createFormCollapse,
})

export { composeFormCollapse as FormCollapse }
export default composeFormCollapse
