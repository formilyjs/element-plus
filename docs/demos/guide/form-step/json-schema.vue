<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" :scope="{ formStep }" />
    <FormConsumer>
      <template #default>
        <FormButtonGroup>
          <ElButton
            :disabled="!formStep.allowBack"
            @click="
              () => {
                formStep.back()
              }
            "
          >
            上一步
          </ElButton>
          <ElButton
            :disabled="!formStep.allowNext"
            @click="
              () => {
                formStep.next()
              }
            "
          >
            下一步
          </ElButton>
          <Submit :disabled="formStep.allowNext" @submit="log">提交</Submit>
        </FormButtonGroup>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, FormConsumer } from '@formily/vue'
import {
  FormItem,
  FormStep,
  FormButtonGroup,
  Submit,
  Input,
} from '@formily/element-plus'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      'x-component': 'FormStep',
      'x-component-props': {
        formStep: '{{formStep}}',
      },
      properties: {
        step1: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第一步',
          },
          properties: {
            aaa: {
              type: 'string',
              title: 'AAA',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step2: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第二步',
          },
          properties: {
            bbb: {
              type: 'string',
              title: 'BBB',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step3: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第三步',
          },
          properties: {
            ccc: {
              type: 'string',
              title: 'CCC',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}
const form = createForm()
const formStep = FormStep.createFormStep()

const log = () => {
  formStep.submit(console.log)
}
</script>

<style lang="scss" scoped></style>
