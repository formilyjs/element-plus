<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        x-component="FormLayout"
        :x-component-props="{
          labelCol: 6,
          wrapperCol: 10,
        }"
      >
        <SchemaStringField
          name="input"
          title="输入框"
          x-decorator="FormItem"
          :x-decorator-props="{
            tooltip: '123',
          }"
          x-component="Input"
          :required="true"
        />
        <SchemaStringField
          name="select"
          title="选择框"
          x-decorator="FormItem"
          x-component="Select"
          :required="true"
        />
      </SchemaVoidField>
    </SchemaField>
  </FormProvider>
</template>

<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormLayout, FormItem, Input, Select } from '@formily/element-plus'

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: { FormLayout, FormItem, Input, Select },
})
const form = createForm()
</script>
