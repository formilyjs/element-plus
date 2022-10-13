<template>
  <FormProvider :form="form">
    <Field
      name="password"
      title="密码框"
      :decorator="[FormItem]"
      :component="[Password]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { FormItem, Password, Submit } from '@formily/element-plus'

const form = createForm()

const log = (value) => {
  console.log(value)
}
</script>
