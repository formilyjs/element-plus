import { DatePicker as FormilyDatePicker } from '@formily/element-plus'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const DatePicker: DnFC<VNode> =
  composeExport(FormilyDatePicker, {
    Behavior: createBehavior({
      name: 'DatePicker',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'DatePicker',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.DatePicker),
      },
      designerLocales: AllLocales.DatePicker,
    }),
    Resource: createResource({
      icon: 'DatePickerSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'string',
            title: 'DatePicker',
            'x-decorator': 'FormItem',
            'x-component': 'DatePicker',
          },
        },
      ],
    }),
  })
