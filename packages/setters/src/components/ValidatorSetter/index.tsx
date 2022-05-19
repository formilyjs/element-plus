import {
  computed,
  defineComponent,
  getCurrentInstance,
  unref,
  inject,
  provide,
  toRef,
} from 'vue-demi'
import { ArrayField, createForm } from '@formily/core'
import {
  useField,
  Schema,
  ISchema,
  createSchemaField,
  FormProvider,
  SchemaSymbol,
} from '@formily/vue'
// import { SchemaContext } from '@formily/shared'
import { observer } from '@formily/reactive-vue'
import { GlobalRegistry } from '@designable/core'
import {
  ArrayItems,
  FormItem,
  Select,
  Input,
  InputNumber as NumberPicker,
  Switch,
} from '@formily/element-plus'
import {
  FoldItem,
  DrawerSetter,
  ValueInput,
} from '@formily/element-plus-settings-form'
// import { ElSelect, ElOption } from 'element-plus'
import { ElSelect, ElOption as Option } from 'element-plus'
import { createContext } from '@formily/element-plus/__builtins__/shared'
import { isStr } from '@designable/shared'

export interface IValidatorSetterProps {
  value?: any
  onChange?: (value: any) => void
}

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      items: {
        type: 'void',
        'x-component': 'Space',
        properties: {
          sort: {
            type: 'void',
            'x-component': 'ArrayItems.SortHandle',
          },
          drawer: {
            // type: 'void',
            type: 'object',
            title: '配置规则',
            'x-component': 'DrawerSetter',
            properties: {
              triggerType: {
                type: 'string',
                title: '触发类型',
                'x-decorator': 'FormItem',
                enum: [
                  {
                    label: '输入时',
                    value: 'onInput',
                  },
                  {
                    label: '聚焦时',
                    value: 'onFocus',
                  },
                  {
                    label: '失焦时',
                    value: 'onBlur',
                  },
                ],
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择',
                },
              },
              validator: {
                type: 'string',
                title: '自定义校验器',
                'x-decorator': 'FormItem',
                'x-component': 'ValueInput',
                'x-component-props': {
                  include: ['EXPRESSION'],
                },
                'x-decorator-props': {
                  tooltip: '格式: function (value){ return "Error Message"}',
                },
              },
              message: {
                type: 'string',
                title: '错误消息',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-decorator-props': {
                  tooltip:
                    '错误消息只对当前规则集的一个内置规则生效，如果需要对不同内置规则定制错误消息，请拆分成多条规则',
                },
              },
              format: {
                type: 'string',
                title: '格式校验',
                enum: GlobalRegistry.getDesignerMessage(
                  'SettingComponents.ValidatorSetter.formats'
                ),
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择',
                },
              },
              pattern: {
                type: 'string',
                title: '正则表达式',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  'suffix-icon': () => <i>/</i>,
                  'prefix-icon': () => <i>/</i>,
                },
              },
              len: {
                type: 'string',
                title: '长度限制',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
              max: {
                type: 'string',
                title: '长度/数值小于',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
              min: {
                type: 'string',
                title: '长度/数值大于',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
              exclusiveMaximum: {
                type: 'string',
                title: '长度/数值小于等于',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
              exclusiveMinimum: {
                type: 'string',
                title: '长度/数值大于等于',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
              },
              whitespace: {
                type: 'string',
                title: '不允许空白符',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              required: {
                type: 'string',
                title: '是否必填',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
            },
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayItems.MoveDown',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayItems.MoveUp',
          },
          remove: {
            type: 'void',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加校验规则',
          'x-component': 'ArrayItems.Addition',
          'x-component-props': {
            style: {
              marginBottom: '10px',
            },
          },
        },
      },
    },
  },
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
              allowClear: true,
            },
          },
          pattern: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              prefix: '/',
              suffix: '/',
            },
          },
          len: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          max: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          min: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          exclusiveMaximum: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          exclusiveMinimum: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
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
      const form = createForm()
      const { SchemaField } = createSchemaField({
        components: {
          ArrayItems,
          DrawerSetter,
          FormItem,
          Select,
          Input,
          NumberPicker,
          ValueInput,
          Switch,
        },
      })

      const SchemaContext = createContext<ISchema>(null)

      return () => {
        const field = unref(fieldRef)
        return (
          <FoldItem
            label={field.title}
            v-slots={{
              base: () => {
                return (
                  <ElSelect
                    modelValue={
                      Array.isArray(props.value) ? undefined : props.value
                    }
                    {...{
                      'onUpdate:modelValue': props.onChange,
                    }}
                    clearable
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
                  </ElSelect>
                )
              },
              extra: () => {
                // return (
                //   <FormProvider form={field.form}>
                //     <SchemaField schema={schema} />
                //   </FormProvider>
                // )
                // return (
                //   <SchemaContext.Provider value={new Schema(ValidatorSchema)}>
                //     <ArrayItems />
                //   </SchemaContext.Provider>
                // )

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
