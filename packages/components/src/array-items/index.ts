import { defineComponent, h } from 'vue'
import { ArrayField } from '@formily/core'
import { useField, useFieldSchema, RecursionField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { ISchema } from '@formily/json-schema'
import Draggable from 'vuedraggable'

import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { composeExport } from '../__builtins__/shared'

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

export interface IArrayItemsItemProps {
  type?: 'card' | 'divide'
}

const ArrayItemsInner = observer(
  defineComponent({
    name: 'FArrayItems',
    inheritAttrs: false,
    setup() {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = `${stylePrefix}-array-items`
      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []

        const renderItems = () => {
          const itemSlot = ({
            element,
            index,
          }: {
            element: any
            index: number
          }) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items
            const key = getKey(element, index)
            return h(
              'div',
              {},
              h(
                ArrayBase.Item,
                {
                  key,
                  index,
                  record: element,
                },
                {
                  default: () =>
                    h(
                      'div',
                      {
                        class: [`${prefixCls}-item-inner`],
                        index,
                        key,
                      },
                      h(RecursionField, {
                        schema: items,
                        name: index,
                      })
                    ),
                }
              )
            )
          }

          return h(
            Draggable,
            {
              class: [`${prefixCls}-list`],
              value: [],
              list: dataSource,
              handle: `.${stylePrefix}-array-base-sort-handle`,
              itemKey: (item: any, index: number) => getKey(item, index),
              onChange(evt: any) {
                if (evt.moved) {
                  const { oldIndex, newIndex } = evt.moved
                  if (Array.isArray(keyMap)) {
                    keyMap.splice(newIndex, 0, keyMap.splice(oldIndex, 1)[0])
                  }
                  field.move(oldIndex, newIndex)
                }
              },
            },
            { item: itemSlot }
          )
        }
        const renderAddition = () => {
          return schema.reduceProperties((addition, schema) => {
            if (isAdditionComponent(schema)) {
              return h(RecursionField, {
                schema,
                name: 'addition',
              })
            }
            return addition
          }, null)
        }

        return h(
          ArrayBase,
          {
            keyMap,
          },
          {
            default: () =>
              h(
                'div',
                {
                  class: [prefixCls],
                  onChange: () => {
                    return
                  },
                },
                {
                  default: () => [renderItems(), renderAddition()],
                }
              ),
          }
        )
      }
    },
  })
)

const ArrayItemsItem = defineComponent({
  name: 'FArrayItemsItem',
  props: ['type'],
  setup(props, { attrs, slots }) {
    const prefixCls = `${stylePrefix}-array-items`

    return () =>
      h(
        'div',
        {
          class: [`${prefixCls}-${props.type || 'card'}`],
          ...attrs,
          onChange: () => {
            return
          },
        },
        slots
      )
  },
})

export const ArrayItems = composeExport(ArrayItemsInner, {
  Item: ArrayItemsItem,
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

export default ArrayItems
