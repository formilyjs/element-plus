<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Checkbox, Submit } from '@formily/element-plus'

const schema = {
  type: 'object',
  properties: {
    checkbox: {
      type: 'number',
      title: '是否确认',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
    },
    checkboxGroup: {
      type: 'array',
      title: '复选',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
      enum: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ],
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Checkbox,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
