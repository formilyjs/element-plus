<template>
  <Form :form="form">
    <SchemaField
      :schema="schema"
      :scope="{ useAsyncDataSource, transformAddress }"
    />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Cascader, Submit } from '@formily/element-plus'
import { action } from '@formily/reactive'

const transformAddress = (data = {}) => {
  return Object.entries(data).reduce(
    (
      buf,
      [key, value]: [
        string,
        (
          | { name: string; code: string; cities: number; districts: number }
          | string
        )
      ]
    ) => {
      if (typeof value === 'string')
        return buf.concat({
          label: value,
          value: key,
        })
      const { name, code, cities, districts } = value
      const _cities = transformAddress(cities)
      const _districts = transformAddress(districts)
      return buf.concat({
        label: name,
        value: code,
        children: _cities.length
          ? _cities
          : _districts.length
          ? _districts
          : undefined,
      })
    },
    []
  )
}

const useAsyncDataSource = (url, transform) => {
  return (field) => {
    field.loading = true

    fetch(url)
      .then((res) => res.json())
      .then(
        action.bound((data) => {
          field.dataSource = transform(data)
          field.loading = false
        })
      )
  }
}

const schema = {
  type: 'object',
  properties: {
    cascader: {
      type: 'string',
      title: '地址选择',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-component-props': {
        style: {
          width: '240px',
        },
      },
      'x-reactions': [
        '{{useAsyncDataSource("//unpkg.com/china-location/dist/location.json",transformAddress)}}',
      ],
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Cascader,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
