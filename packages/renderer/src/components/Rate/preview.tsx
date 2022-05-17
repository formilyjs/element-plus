import { ElRate } from 'element-plus'
import { composeExport, transformComponent } from '@formily/element-plus/src/__builtins__'
import { connect, mapProps, VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@formily/element-plus-prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

const RateInner = connect(transformComponent(ElRate, {
  change: 'onUpdate:modelValue'
}), mapProps({ value: 'modelValue' }))

export const Rate: DnFC<VNode> = composeExport(RateInner, {
  Behavior: createBehavior({
    name: 'Rate',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'Rate',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Rate),
    },
    designerLocales: AllLocales.Rate,
  }),
  Resource: createResource({
    icon: 'RateSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: 'Rate',
          'x-decorator': 'FormItem',
          'x-component': 'Rate',
        },
      },
    ],
  }),
})
