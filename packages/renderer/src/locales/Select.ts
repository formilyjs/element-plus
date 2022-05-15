export const Select = {
  'zh-CN': {
    title: '选择框',
    settings: {
      'x-component-props': {
        multiple: { title: '多选' },
        'value-key': {
          title: '键名',
          tooltip: '作为 value 唯一标识的键名，绑定值为对象类型时必填',
        },
        size: { title: '尺寸', dataSource: ['大', '小', '迷你', '继承'] },
        clearable: { title: '可以清空选项' },
        'collapse-tags': {
          title: '文字展示',
          tooltip: '多选时是否将选中值按文字的形式展示',
        },
        'multiple-limit': {
          title: '最多项目数',
          tooltip: '多选时用户最多可以选择的项目数，为 0 则不限制',
        },
        placeholder: { title: '占位符' },
        filterable: { title: '创建新条目' },
        'allow-create': {
          title: '可搜索',
          tooltip: '是否允许用户创建新条目，需配合 filterable 使用',
        },
        'no-match-text': { title: '无匹配时显示的文字' },
        'no-data-text': { title: '选项为空时显示的文字' },
        'popper-class': { title: '保留当前的搜索关键词' },
        'reserve-keyword': {
          title: '可搜索',
          tooltip: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
        },
        'popper-append-to-body': {
          title: '插入至 body',
          tooltip:
            '是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false',
        },
        'automatic-dropdown': {
          title: '自动弹出选项菜单',
          tooltip:
            '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单',
        },
      },
    },
  },
  'en-US': {
    title: 'Select',
    settings: {
      'x-component-props': {
        multiple: { title: '多选' },
        'value-key': {
          title: '键名',
          tooltip: '作为 value 唯一标识的键名，绑定值为对象类型时必填',
        },
        size: { title: '尺寸', dataSource: ['大', '小', '迷你', '继承'] },
        clearable: { title: '可以清空选项' },
        'collapse-tags': {
          title: '文字展示',
          tooltip: '多选时是否将选中值按文字的形式展示',
        },
        'multiple-limit': {
          title: '项目数',
          tooltip: '多选时用户最多可以选择的项目数，为 0 则不限制',
        },
        placeholder: { title: '占位符' },
        filterable: { title: '创建新条目' },
        'allow-create': {
          title: '可搜索',
          tooltip: '是否允许用户创建新条目，需配合 filterable 使用',
        },
        'no-match-text': { title: '无匹配时显示的文字' },
        'no-data-text': { title: '选项为空时显示的文字' },
        'popper-class': { title: '保留当前的搜索关键词' },
        'reserve-keyword': {
          title: '可搜索',
          tooltip: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
        },
        'popper-append-to-body': {
          title: '插入至 body',
          tooltip:
            '是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false',
        },
        'automatic-dropdown': {
          title: '自动弹出选项菜单',
          tooltip:
            '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单',
        },
      },
    },
  },
}
