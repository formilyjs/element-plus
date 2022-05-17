import { ISchema } from '@formily/vue'

export const ArrayTable: ISchema & { Addition?: ISchema; Column?: ISchema } = {
  type: 'object',
  properties: {
    stripe: {
      default: false,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    border: {
      default: false,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'show-header': {
      default: true,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    fit: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      default: 'small',
      type: 'string',
      enum: ['large', 'default', 'small'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {

      },
    },
  },
}

const Column: ISchema = {
  type: 'object',
  properties: {
    label: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    prop: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    width: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {

      },
    },
    'min-width': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {

      },
    },
    fixed: {
      type: 'string',
      enum: ['left', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {

        clearable: true,
      },
      'x-reactions': (field) => {
        if (field.value === '') {
          field.display = 'none'
        } else {
          field.display = 'visible'
        }
      },
    },
    sortable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    resizable: {
      default: true,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    align: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {

      },
    },
  },
}

const Addition: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    method: {
      type: 'string',
      enum: ['push', 'unshift'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'push',
        optionType: 'button',
      },
    },
    defaultValue: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
  },
}

ArrayTable.Column = Column
ArrayTable.Addition = Addition
