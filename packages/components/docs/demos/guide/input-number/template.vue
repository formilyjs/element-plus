<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[
        InputNumber,
        {
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { FormItem, InputNumber, Submit } from '@formily/element-plus'

const form = createForm()

const log = (value) => {
  console.log(value)
}
</script>
