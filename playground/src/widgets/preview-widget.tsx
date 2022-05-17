import { transformToSchema } from '@designable/formily-transformer'
import { createForm, Form as IForm } from '@formily/core'
import { Form, FormLayout } from '@formily/element-plus'
import * as ElementUI from '@formily/element-plus'
import { connect, createSchemaField, mapProps } from '@formily/vue'
import { shallowRef, defineComponent, computed } from 'vue'
import { Card, Text, Rate, Slider, TreeSelect } from '@formily/element-plus-renderer'

const { SchemaField } = createSchemaField({
  components: {
    ...ElementUI,
    Card,
    Text,
    Rate,
    Slider,
    TreeSelect,
    Password: connect(ElementUI.Input, mapProps({}, (args) => ({ ...args, type: 'password', showPassword: true })))
  },
})

export default defineComponent({
  name: 'PreviewWidget',
  props: ['tree'],
  setup(props) {
    const formRef = shallowRef<IForm>(createForm())
    const treeSchemaRef = computed(() => {
      return transformToSchema(props.tree)
    })

    return () => {
      const form = formRef.value
      const { form: formProps, schema } = treeSchemaRef.value
      console.log(schema)
      return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto', background: 'var(--dn-composite-panel-tabs-content-bg-color)' }}>
          <Form previewTextPlaceholder={" "} form={form} {...formProps}>
            <SchemaField schema={schema} />
          </Form>
        </div>
      )
    }
  },
})
