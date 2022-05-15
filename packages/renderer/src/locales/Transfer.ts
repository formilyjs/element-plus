export const Transfer = {
  'zh-CN': {
    title: '穿梭框',
    settings: {
      'x-component-props': {
        'filter-placeholder': '搜索框占位符',
        'filter-method': '自定义搜索方法',
        'target-order': {
          title: '排序策略',
          tooltip:
            '右侧列表元素的排序策略：若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前',
        },
        titles: '标题',
        'button-texts': '按钮文案',
        'render-content': '自定义数据项渲染函数',
        format: '列表顶部勾选状态文案',
        props: '数据源的字段别名',
        'left-default-checked': '初始状态下左侧列表的已勾选项的 key 数组',
        'right-default-checked': '初始状态下右侧列表的已勾选项的 key 数组',
      },
    },
  },
  'en-US': {
    title: 'Transfer',
    settings: {
      'x-component-props': {
        oneWay: 'One Way',
        operations: { title: 'Operations', tooltip: 'Format：string[]' },
        titles: { title: 'Titles', tooltip: 'Format：string[]' },
        showSearchAll: 'Show Search All',
        filterOption: 'Filter Option',
      },
    },
  },
}
