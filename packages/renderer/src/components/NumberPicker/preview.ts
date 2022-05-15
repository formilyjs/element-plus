import { InputNumber as FormilyInputNumber } from '@formily/element-plus'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

const NumberPicker: DnFC<VueComponent<typeof FormilyInputNumber>> =
  composeExport(FormilyInputNumber, {
    Behavior: createBehavior({
      name: 'InputNumber',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'InputNumber',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.InputNumber),
      },
      designerLocales: AllLocales.InputNumber,
    }),
    Resource: createResource({
      icon: 'NumberPickerSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'number',
            title: 'InputNumber',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              'controls-position': 'right',
            },
          },
        },
      ],
    }),
  })

export const InputNumber = NumberPicker
