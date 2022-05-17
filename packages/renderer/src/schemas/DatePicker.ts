import { ISchema } from '@formily,vue'

export const DatePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: {
    editable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    clearable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      default: 'default',
      type: 'string',
      enum: ['large', 'default', 'small', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {

        clearable: true,
      },
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    'start-placeholder': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    'end-placeholder': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    type: {
      default: 'date',
      type: 'string',
      enum: [
        'year',
        'month',
        'date',
        'dates',
        'week',
        'datetime',
        'datetimerange',
        'daterange',
        'monthrange',
      ],
      'x-index': 0,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        clearable: true,
      },
    },
    format: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    align: {
      default: 'left',
      type: 'string',
      enum: ['left', 'center', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {

        clearable: true,
      },
    },
    'popper-class': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    'picker-options': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    'range-separator': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
      },
    },
    'default-value': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        clearable: false
      }
    },
    'default-time': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      'x-component-props': {
        clearable: false
      }
    },
    'value-format': {
      default: 'x',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
      },
    },
    'unlink-panels': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'prefix-icon': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
    'clear-icon': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {

        clearable: true,
      },
    },
  },
}
