<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="switch"
        title="开关"
        x-decorator="FormItem"
        x-component="Switch"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Switch, Submit } from '@formily/element-plus'

const form = createForm()
const { SchemaField, SchemaBooleanField } = createSchemaField({
  components: {
    FormItem,
    Switch,
  },
})

const log = (value) => {
  console.log(value)
}
</script>
