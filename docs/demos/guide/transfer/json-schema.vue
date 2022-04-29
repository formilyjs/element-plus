<template>
  <Form :form="form" label-align="left" :label-width="160">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Transfer, Submit } from '@formily/element-plus'

const schema = {
  type: 'object',
  properties: {
    transfer: {
      type: 'array',
      title: '穿梭框',
      enum: [
        { label: '选项1', key: 1 },
        { label: '选项2', key: 2 },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Transfer',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Transfer,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
