<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        required
        name="input1"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaStringField
        required
        title="输入框"
        name="input2"
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Submit @submit="handleSubmit">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Submit, FormButtonGroup, FormItem, Input } from '@formily/element-plus'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: { FormItem, Input },
})

const form = createForm()

const handleSubmit = (values) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(values)
      resolve(void 0)
    }, 2000)
  })
}
</script>
