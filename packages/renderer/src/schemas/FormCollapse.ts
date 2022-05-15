import { ISchema } from '@formily/vue'

export const FormCollapse: ISchema & { CollapsePanel?: ISchema } = {
  type: 'object',
  properties: {
    accordion: {
      default: true,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

FormCollapse.CollapsePanel = {
  type: 'object',
  properties: {
    title: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {  clearable: true },
    },
    disabled: {
      default: false,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
