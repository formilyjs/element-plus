<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="Radio.Group"
        :enum="[
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ]"
        :x-content="{
          default: Comp,
        }"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Radio, Submit } from '@formily/element-plus'
import { h } from 'vue'

const Comp = {
  props: {
    option: null,
  },
  render(_1, _2, { option }) {
    return h('span', {}, `${option?.label} [❤]`)
  },
}

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Radio,
  },
})

const log = (value) => {
  console.log(value)
}
</script>
