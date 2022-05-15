import { ISchema } from '@formily/vue'

export const FormGrid: ISchema & { GridColumn?: ISchema } = {
  type: 'object',
  properties: {
    minWidth: {
      default: 100,
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    maxWidth: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    minColumns: {
      default: 0,
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    maxColumns: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    breakpoints: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
    columnGap: {
      default: 10,
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    rowGap: {
      default: 5,
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    colWrap: {
      default: true,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {},
    },
    strictAutoFit: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

FormGrid.GridColumn = {
  type: 'object',
  properties: {
    gridSpan: {
      default: 1,
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
  },
}
