<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Password, Submit } from '@formily/element-plus'

const schema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      title: '密码框',
      'x-decorator': 'FormItem',
      'x-component': 'Password',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Password,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
