import { ISchema } from '@formily/vue'

export const FormLayout: ISchema = {
  type: 'object',
  properties: {
    labelCol: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': { size: 'small' },
    },
    wrapperCol: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': { size: 'small' },
    },
    labelWidth: {
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    wrapperWidth: {
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    colon: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      // 'x-reactions': '{{(field) => { !field.value && field.setValue(true) }}}',
    },
    feedbackLayout: {
      type: 'string',
      enum: ['loose', 'terse', 'popover', 'none', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      // 'x-reactions': "{{ (field) => { !field.value && field.setValue('loose') }}}",
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'default', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      // 'x-reactions': "{{(field) => { !field.value && field.setValue('default') }}}",
    },
    layout: {
      type: 'string',
      enum: ['vertical', 'horizontal', 'inline', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      // 'x-reactions': "{{(field) => { !field.value && field.setValue('horizontal') }}}",
    },
    tooltipLayout: {
      type: 'string',
      enum: ['icon', 'text', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      // 'x-reactions': "{{(field) => { !field.value && field.setValue('icon') }}}",
    },
    labelAlign: {
      type: 'string',
      enum: ['left', 'right', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      // 'x-reactions': "{{(field) => { !field.value && field.setValue('right') }}}",
    },
    wrapperAlign: {
      type: 'string',
      enum: ['left', 'right', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      // 'x-reactions': "{{(field) => { !field.value && field.setValue('left') }}}",
    },
    labelWrap: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    wrapperWrap: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },

    fullness: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    inset: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    shallow: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      // 'x-reactions': '{{(field) => { !field.value && field.setValue(true) }}}',
    },
    bordered: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      // 'x-reactions': '{{(field) => { !field.value && field.setValue(true) }}}',
    },
  },
}
