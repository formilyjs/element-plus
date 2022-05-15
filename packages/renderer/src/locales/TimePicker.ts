import { createLocales } from '@designable/core'
import { DatePicker } from './DatePicker'

export const TimePicker = createLocales(DatePicker, {
  'zh-CN': {
    title: '时间选择',
    settings: {
      'x-component-props': {
        'is-range': { title: '时间范围选择' },
        'arrow-control': { title: '使用箭头' },
      },
    },
  },
  'en-US': {
    title: 'Time Picker',
    settings: {
      'x-component-props': {
        'is-range': { title: '时间范围选择' },
        'arrow-control': { title: '使用箭头' },
      },
    },
  },
})
