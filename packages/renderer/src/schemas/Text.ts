import { ISchema } from '@formily/vue'

export const Text: ISchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
    },
    mode: {
      default: 'normal',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {},
      enum: ['h1', 'h2', 'h3', 'p', 'normal'],
    },
  },
}
