export const Cascader = {
  'zh-CN': {
    title: '联级选择',
    settings: {
      'x-component-props': {
        props: '属性',
        size: { title: '尺寸', dataSource: ['大', '小', '迷你', '继承'] },
        'show-all-levels': {
          title: '路径',
          tooltip: '输入框中是否显示选中值的完整路径',
        },
        'collapse-tags': {
          title: '折叠标签',
          tooltip: '多选模式下是否折叠Tag',
        },
        separator: '选项分隔符',
        debounce: '去抖延迟',
        'before-filter': '筛选之前钩子',
        'popper-class': '自定义浮层类名',
        'filter-method': '过滤钩子',
      },
    },
  },
  'en-US': {
    title: 'Cascader',
    settings: {
      'x-component-props': {
        changeOnSelect: {
          title: 'Change On Select',
          tooltip: 'Click on each level of menu option value will change',
        },
        displayRender: {
          title: 'Display Render',
          tooltip:
            'The rendering function displayed after selection, the default is label => label.join("/")	',
        },
        fieldNames: {
          title: 'Field Names',
          tooltip:
            'Defaults：{ label: "label", value: "value", children: "children" }',
        },
      },
    },
  },
}
