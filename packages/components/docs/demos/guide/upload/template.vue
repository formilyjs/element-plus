<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <ArrayField
      name="upload"
      title="上传"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: '上传',
        },
      ]"
      required
    />
    <ArrayField
      name="upload2"
      title="卡片上传"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          listType: 'picture-card',
          action: 'https://formily-vue.free.beeceptor.com/file',
        },
      ]"
      required
    />
    <ArrayField
      name="upload3"
      title="拖拽上传"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: '将文件拖到此处，或者点击上传',
          drag: true,
        },
      ]"
      required
    />
    <ArrayField
      name="custom"
      title="自定义按钮"
      :decorator="[FormItem]"
      :component="[
        Upload,
        {
          action: 'https://formily-vue.free.beeceptor.com/file',
        },
      ]"
      required
      ><UploadButton
    /></ArrayField>
    <FormButtonGroup align-form-item>
      <Submit @submit="onSubmit">提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { createForm } from '@formily/core'
import { ArrayField } from '@formily/vue'
import {
  Form,
  FormItem,
  Upload,
  Submit,
  FormButtonGroup,
} from '@formily/element-plus'
import { ElButton } from 'element-plus'

const UploadButton = () => {
  return h(ElButton, {}, '上传图片')
}

const form = createForm()

const onSubmit = (value) => {
  console.log(value)
}
</script>
