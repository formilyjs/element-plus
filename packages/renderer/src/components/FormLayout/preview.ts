import { FormLayout as FormilyFormLayout } from '@formily/element-plus'
import { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { withContainer } from '../../common/Container'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '@formily/element-plus/src/__builtins__'

export const FormLayout =
  composeExport(withContainer(FormilyFormLayout), {
    Behavior: createBehavior({
      name: 'FormLayout',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'FormLayout',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.FormLayout),
      },
      designerLocales: AllLocales.FormLayout,
    }),
    Resource: createResource({
      icon: 'FormLayoutSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormLayout',
          },
        },
      ],
    }),
  })
