import { TreeSelect as FTreeSelect } from '@formily/element-plus'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { DefineComponent } from 'vue'

export const TreeSelect: DnFC<DefineComponent<any>> =
  composeExport(FTreeSelect, {
    Behavior: createBehavior({
      name: 'TreeSelect',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'TreeSelect',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.TreeSelect),
      },
      designerLocales: AllLocales.TreeSelect,
    }),
    Resource: createResource({
      icon: 'TreeSelectSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'TreeSelect',
            'x-decorator': 'FormItem',
            'x-component': 'TreeSelect',
          },
        },
      ],
    }),
  })
