import { createLocales } from '@designable/core'

export const DatePicker = {
  'zh-CN': {
    title: '日期选择',
    settings: {
      'x-component-props': {
        editable: { title: '文本框可输入' },
        clearable: { title: '显示清除按钮' },
        size: { title: '尺寸' },
        placeholder: '非范围选择时的占位内容',
        'start-placeholder': '开始日期占位内容',
        'end-placeholder': '结束日期占位内容',
        type: { title: '显示类型' },
        format: { title: '显示在输入框中的格式' },
        align: { title: '对齐方式' },
        'popper-class': { title: '下拉框的类名' },
        'picker-options': { title: '选项' },
        'range-separator': { title: '分隔符' },
        'default-value': { title: '默认显示的时间' },
        'default-time': { title: '范围选择时选中日期所使用的当日内具体时刻' },
        'value-format': { title: '绑定值的格式。不指定则绑定值为 Date 对象' },
        'unlink-panels': { title: '面板联动' },
        'prefix-icon': { title: '头部图标' },
        'clear-icon': { title: '清空图标' },
      },
    },
    'en-US': {
      title: 'DatePicker',
      settings: {
        'x-component-props': {
          editable: { title: '文本框可输入' },
          clearable: { title: '显示清除按钮' },
          size: { title: '尺寸' },
          placeholder: '非范围选择时的占位内容',
          'start-placeholder': '范围选择时开始日期的占位内容',
          'end-placeholder': '范围选择时结束日期的占位内容',
          type: { title: '显示类型' },
          format: { title: '显示在输入框中的格式' },
          align: { title: '对齐方式' },
          'popper-class': { title: '下拉框的类名' },
          'picker-options': { title: '选项' },
          'range-separator': { title: '分隔符' },
          'default-value': { title: '默认显示的时间' },
          'default-time': { title: '范围选择时选中日期所使用的当日内具体时刻' },
          'value-format': { title: '绑定值的格式。不指定则绑定值为 Date 对象' },
          'unlink-panels': { title: '面板联动' },
          'prefix-icon': { title: '头部图标' },
          'clear-icon': { title: '清空图标' },
        },
      },
    },
  },
}
