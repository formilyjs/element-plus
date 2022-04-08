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
        default="123"
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Reset validate forceClear>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Reset, FormButtonGroup, FormItem, Input } from '@formily/element-plus'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()
</script>
