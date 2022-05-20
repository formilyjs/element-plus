import { defineComponent, unref, provide, toRef } from 'vue-demi'
import { ArrayField } from '@formily/core'
import { useField, Schema, ISchema, SchemaSymbol } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { GlobalRegistry } from '@designable/core'
import { ArrayItems } from '@formily/element-plus'
import { FoldItem } from '@formily/element-plus-settings-form'
import { ElSelect as Select, ElOption as Option } from 'element-plus'
import { isStr } from '@designable/shared'

export interface IValidatorSetterProps {
  value?: any
  onChange?: (value: any) => void
}

const SchemaContextProvider = defineComponent({
  props: ['value'],
  setup(props, { slots }) {
    provide(SchemaSymbol, toRef(props, 'value'))
    return () => {
      return slots.default?.()
    }
  },
})

const ValidatorSchema: ISchema = {
  type: 'array',
  items: {
    type: 'object',
    'x-decorator': 'ArrayItems.Item',
    'x-decorator-props': {
      style: {
        alignItems: 'center',
        borderRadius: 3,
        paddingTop: 6,
        paddingBottom: 6,
      },
    },
    properties: {
      sortable: {
        type: 'void',
        'x-component': 'ArrayItems.SortHandle',
        'x-component-props': { style: { marginRight: 10 } },
      },
      drawer: {
        type: 'void',
        'x-component': 'DrawerSetter',
        properties: {
          triggerType: {
            type: 'string',
            enum: ['onInput', 'onFocus', 'onBlur'],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
          },
          validator: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
            'x-component-props': {
              include: ['EXPRESSION'],
            },
          },
          message: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
          },
          format: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              clearable: true,
            },
          },
          pattern: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              'suffix-icon': () => <i>/</i>,
              'prefix-icon': () => <i>/</i>,
            },
          },
          len: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
          },
          max: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
          },
          min: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
          },
          exclusiveMaximum: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
          },
          exclusiveMinimum: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
          },
          whitespace: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
          required: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
      moveDown: {
        type: 'void',
        'x-component': 'ArrayItems.MoveDown',
        'x-component-props': { style: { marginLeft: 10 } },
      },
      moveUp: {
        type: 'void',
        'x-component': 'ArrayItems.MoveUp',
        'x-component-props': { style: { marginLeft: 5 } },
      },
      remove: {
        type: 'void',
        'x-component': 'ArrayItems.Remove',
        'x-component-props': { style: { marginLeft: 5 } },
      },
    },
  },
  properties: {
    addValidatorRules: {
      type: 'void',
      'x-component': 'ArrayItems.Addition',
      'x-component-props': {
        style: {
          marginBottom: '10px',
        },
      },
    },
  },
}

export const ValidatorSetter = observer(
  defineComponent({
    props: ['value', 'onChange'],
    setup(props, { attrs, slots }) {
      const fieldRef = useField<ArrayField>()

      return () => {
        const field = unref(fieldRef)
        return (
          <FoldItem
            label={field.title}
            v-slots={{
              base: () => {
                return (
                  <Select
                    modelValue={
                      Array.isArray(props.value) ? undefined : props.value
                    }
                    {...{
                      'onUpdate:modelValue': props.onChange,
                    }}
                    clearable={true}
                    placeholder={GlobalRegistry.getDesignerMessage(
                      'SettingComponents.ValidatorSetter.pleaseSelect'
                    )}
                  >
                    {GlobalRegistry.getDesignerMessage(
                      'SettingComponents.ValidatorSetter.formats'
                    ).map((item) => {
                      if (isStr(item))
                        return <Option label={item} value={item} />
                      return <Option label={item.label} value={item.value} />
                    })}
                  </Select>
                )
              },
              extra: () => {
                return (
                  <SchemaContextProvider value={new Schema(ValidatorSchema)}>
                    <ArrayItems />
                  </SchemaContextProvider>
                )
              },
            }}
          ></FoldItem>
        )
      }
    },
  })
)
