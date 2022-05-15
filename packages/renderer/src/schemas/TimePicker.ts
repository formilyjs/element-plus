import { ISchema } from '@formily/vue'

export const CommonTimePickerAPI = {
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
  'is-range': {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  'arrow-control': {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
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
  },
  'value-format': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      
      clearable: true,
    },
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
}

export const TimePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: CommonTimePickerAPI,
}
