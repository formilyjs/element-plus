<template>
  <Form :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[Input]"
      required
    />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Form, FormItem, Input, Submit } from '@formily/element-plus'

const form = createForm()

const onSubmit = (value) => {
  console.log(value)
}
</script>
