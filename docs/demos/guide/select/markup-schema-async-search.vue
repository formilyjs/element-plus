<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="select"
        title="异步搜索选择框"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          filterable: true,
          remote: true,
          style: {
            width: '240px',
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm, onFieldInit, onFieldReact, DataField } from '@formily/core'
import { action, observable } from '@formily/reactive'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Select, Submit } from '@formily/element-plus'

let timeout
let currentValue

function fetchData(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    callback([
      {
        label: 'AAA',
        value: 'aaa',
      },
      {
        label: 'BBB',
        value: 'ccc',
      },
    ])
  }

  timeout = setTimeout(fake, 300)
}

const useAsyncDataSource = (pattern, service) => {
  const keyword = observable.ref('')

  onFieldInit(pattern, (field) => {
    field.setComponentProps({
      remoteMethod: (value) => {
        keyword.value = value
      },
    })
  })

  onFieldReact(pattern, (field: DataField) => {
    field.loading = true
    service({ field, keyword: keyword.value }).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async ({ keyword }) => {
      if (!keyword) {
        return []
      }
      return new Promise((resolve) => {
        fetchData(keyword, resolve)
      })
    })
  },
})
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Select,
  },
})

const log = (value) => {
  console.log(value)
}
</script>
