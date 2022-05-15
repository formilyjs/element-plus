import { ISchema } from '@formily/vue'

export const Card: ISchema & { Addition?: ISchema } = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': { size: 'small', clearable: true },
    },
    shadow: {
      type: 'string',
      enum: ['always', 'hover', 'never'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        
      },
    },
  },
}
