import { defineComponent, ref, watchEffect, Ref, h } from 'vue'
import {
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElEmpty,
  ElRow,
  ElBadge,
} from 'element-plus'
import { ArrayField } from '@formily/core'
import { useField, useFieldSchema, RecursionField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { ISchema } from '@formily/json-schema'

import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { composeExport } from '../__builtins__/shared'

type ElCollapseProps = typeof ElCollapse
type ElCollapseItemProps = typeof ElCollapseItem

export type IArrayCollapseProps = ElCollapseProps & {
  defaultOpenPanelCount?: number
}

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}

const range = (count: number) => Array.from({ length: count }).map((_, i) => i)

const takeDefaultActiveKeys = (
  dataSourceLength: number,
  defaultOpenPanelCount: number,
  accordion = false
) => {
  if (accordion) {
    return 0
  }
  if (dataSourceLength < defaultOpenPanelCount) return range(dataSourceLength)

  return range(defaultOpenPanelCount)
}

const insertActiveKeys = (
  activeKeys: number[] | number,
  index: number,
  accordion = false
) => {
  if (accordion) return index
  if ((activeKeys as number[]).length <= index)
    return (activeKeys as number[]).concat(index)
  return (activeKeys as number[]).reduce((buf, key) => {
    if (key < index) return buf.concat(key)
    if (key === index) return buf.concat([key, key + 1])
    return buf.concat(key + 1)
  }, [] as number[])
}

export const ArrayCollapseInner = observer(
  defineComponent({
    name: 'FArrayCollapse',
    props: {
      defaultOpenPanelCount: {
        type: Number,
        default: 5,
      },
      onChange: { type: Function },
    },
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = `${stylePrefix}-array-collapse`
      const activeKeys: Ref<number[] | number> = ref([])

      watchEffect(() => {
        const field = fieldRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        if (!field.modified && dataSource.length) {
          activeKeys.value = takeDefaultActiveKeys(
            dataSource.length,
            props.defaultOpenPanelCount,
            attrs.accordion as boolean
          )
        }
      })

      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        if (!schema) throw new Error('can not found schema object')

        const renderItems = () => {
          if (!dataSource.length) {
            return null
          }

          const items = dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items
            const key = getKey(item, index)
            const panelProps = field
              .query(`${field.address}.${index}`)
              .get('componentProps')
            const props: ElCollapseItemProps = items?.['x-component-props']
            const headerTitle = panelProps?.title || props.title || field.title
            const path = field.address.concat(index)
            const errors = field.form.queryFeedbacks({
              type: 'error',
              address: `${path}.**`,
            })

            const title = h(
              ArrayBase.Item,
              {
                index,
                record: item,
              },
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      schema: items,
                      name: index,
                      filterProperties: (schema: ISchema) => {
                        if (!isIndexComponent(schema)) return false
                        return true
                      },
                      onlyRenderProperties: true,
                    },
                    {}
                  ),
                  errors.length
                    ? h(
                        ElBadge,
                        {
                          class: [`${prefixCls}-errors-badge`],
                          value: errors.length,
                        },
                        { default: () => headerTitle }
                      )
                    : headerTitle,
                ],
              }
            )
            const extra = h(
              ArrayBase.Item,
              {
                index,
                record: item,
              },
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      schema: items,
                      name: index,
                      filterProperties: (schema: ISchema) => {
                        if (!isOperationComponent(schema)) return false
                        return true
                      },
                      onlyRenderProperties: true,
                    },
                    {}
                  ),
                ],
              }
            )
            const content = h(
              RecursionField,
              {
                schema: items,
                name: index,
                filterProperties: (schema: ISchema) => {
                  if (isIndexComponent(schema)) return false
                  if (isOperationComponent(schema)) return false
                  return true
                },
              },
              {}
            )

            return h(
              ElCollapseItem,
              {
                ...props,
                ...panelProps,
                name: index,
                key,
              },
              {
                default: () => [
                  h(
                    ArrayBase.Item,
                    {
                      index,
                      record: item,
                    },
                    {
                      default: () => [content],
                    }
                  ),
                ],
                title: () => {
                  return h(
                    ElRow,
                    {
                      style: { flex: 1 },
                      type: 'flex',
                      justify: 'space-between',
                    },
                    {
                      default: () => [
                        // title(),
                        // extra
                        h('span', {}, title),
                        h('span', {}, extra),
                      ],
                    }
                  )
                },
              }
            )
          })

          return h(
            ElCollapse,
            {
              class: [`${prefixCls}-item`],
              ...attrs,
              modelValue: activeKeys.value,
              onChange: (keys: number[] | number) => {
                activeKeys.value = keys
              },
            },
            {
              default: () => [items],
            }
          )
        }
        const renderAddition = () => {
          return schema.reduceProperties((addition, schema) => {
            if (isAdditionComponent(schema)) {
              return h(
                RecursionField,
                {
                  schema,
                  name: 'addition',
                },
                {}
              )
            }
            return addition
          }, null)
        }
        const renderEmpty = () => {
          if (dataSource?.length) return
          return h(
            ElCard,
            {
              class: [`${prefixCls}-item`],
              shadow: 'never',
              ...attrs,
              header: attrs.title || field.title,
            },
            {
              default: () =>
                h(ElEmpty, { description: 'No Data', imageSize: 100 }, {}),
            }
          )
        }

        return h(
          'div',
          {
            class: [prefixCls],
          },
          h(
            ArrayBase,
            {
              keyMap,
              add: (index: number) => {
                activeKeys.value = insertActiveKeys(
                  activeKeys.value,
                  index,
                  attrs.accordion as boolean
                )
              },
            },
            {
              default: () => [renderEmpty(), renderItems(), renderAddition()],
            }
          )
        )
      }
    },
  })
)

export const ArrayCollapseItem = defineComponent<ElCollapseItemProps>({
  name: 'FArrayCollapseItem',
  setup(_props, { slots }) {
    return () => h('div', {}, slots)
  },
})

export const ArrayCollapse = composeExport(ArrayCollapseInner, {
  Item: ArrayCollapseItem,
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
  useRecord: ArrayBase.useRecord,
})

export default ArrayCollapse
