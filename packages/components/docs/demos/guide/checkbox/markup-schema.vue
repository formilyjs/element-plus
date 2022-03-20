<template>
  <Form :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="single"
        title="是否确认"
        x-decorator="FormItem"
        x-component="Checkbox"
      />
      <SchemaArrayField
        name="multiple"
        title="复选"
        :enum="[
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ]"
        x-decorator="FormItem"
        x-component="Checkbox.Group"
      />
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Checkbox, Submit } from '@formily/element-plus'

const form = createForm()
const { SchemaField, SchemaBooleanField, SchemaArrayField } = createSchemaField(
  {
    components: {
      FormItem,
      Checkbox,
    },
  }
)

const onSubmit = (value) => {
  console.log(value)
}
</script>
