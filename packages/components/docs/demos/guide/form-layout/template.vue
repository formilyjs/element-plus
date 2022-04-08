<template>
  <FormProvider :form="form">
    <FormLayout
      :breakpoints="[680]"
      layout="horizontal"
      label-align="left"
      :label-col="6"
      :wrapper-col="10"
    >
      <Field
        name="input"
        title="输入框"
        :decorator="[
          FormItem,
          {
            tooltip: '123',
          },
        ]"
        :component="[Input]"
        :required="true"
      />
      <Field
        name="select"
        title="选择框"
        :decorator="[FormItem]"
        :component="[Select]"
        :required="true"
      />
    </FormLayout>
  </FormProvider>
</template>

<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { FormLayout, FormItem, Input, Select } from '@formily/element-plus'

const form = createForm()
</script>
