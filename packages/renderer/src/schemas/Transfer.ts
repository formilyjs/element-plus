import { ISchema } from '@formily/vue'

export const Transfer: ISchema = {
  type: 'object',
  properties: {
    filterable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'filter-placeholder': {
      type: 'string',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      'x-component-props': {
        clearable: true,
        
      },
    },
    'filter-method': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    'target-order': {
      type: 'string',
      enum: ['original', 'push', 'unshift'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    titles: {
      type: 'void',
      'x-component': 'div',
      'x-decorator': 'FormItem',
      properties: {
        'titles[0]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            
            clearable: true,
          },
        },
        'titles[1]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            
            clearable: true,
          },
        },
      },
    },
    'button-texts': {
      type: 'void',
      'x-component': 'div',
      'x-decorator': 'FormItem',
      properties: {
        'button-texts[0]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            
            clearable: true,
          },
        },
        'button-texts[1]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            
            clearable: true,
          },
        },
      },
    },
    'render-content': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    format: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    props: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    'left-default-checked': {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '字符串数组',
      items: {
        type: 'void',
        'x-component': 'Space',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              
              clearable: true,
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    'right-default-checked': {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '字符串数组',
      items: {
        type: 'void',
        'x-component': 'Space',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              
              clearable: true,
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}
