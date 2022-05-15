import { ISchema } from '@formily/vue'

export const Space: ISchema = {
  type: 'object',
  properties: {
    align: {
      type: 'string',
      enum: ['start', 'end', 'center', 'baseline'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    direction: {
      type: 'string',
      enum: ['vertical', 'horizontal'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'horizontal',
        optionType: 'button',
      },
    },
    size: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        defaultValue: 8,
      },
    },
    split: {
      'x-visible': false,
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    wrap: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
