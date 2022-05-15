export const ArrayTable = {
  'zh-CN': {
    title: '自增表格',
    addSortHandle: '添加排序',
    addColumn: '添加列',
    addIndex: '添加索引',
    addOperation: '添加操作',
    settings: {
      'x-component-props': {
        stripe: { title: '斑马纹' },
        border: { title: '纵向边框' },
        'show-header': { title: '显示表头' },
        fit: { title: '宽度自撑开' },
      },
    },
  },
  'en-US': {
    title: 'Array Table',
    addSortHandle: 'Add Sort Handle',
    addColumn: 'Add Column',
    addIndex: 'Add Index',
    addOperation: 'Add Operations',
    settings: {
      'x-component-props': {
        stripe: { title: '斑马纹' },
        border: { title: '纵向边框' },
        'show-header': { title: '显示表头' },
        fit: { title: '宽度自撑开' },
      },
    },
  },
}

export const ArrayTableColumn = {
  'zh-CN': {
    title: '表格列',
    settings: {
      'x-component-props': {
        label: '标题',
        prop: '字段名称',
        align: {
          title: '内容对齐',
          dataSource: ['左', '中', '右'],
        },
        'min-width': '最小宽度',
        width: '宽度',
        fixed: {
          title: '固定',
          dataSource: ['左', '右'],
        },
        'header-align': {
          title: '表头对齐',
          dataSource: ['左', '中', '右'],
        },
        sortable: '排序',
        resizable: '改变宽度',
      },
    },
  },
  'en-US': {
    title: 'Column',
    settings: {
      'x-component-props': {
        label: '标题',
        prop: '字段名称',
        align: {
          title: '内容对齐',
          dataSource: ['左', '中', '右'],
        },
        'min-width': '最小宽度',
        width: '宽度',
        fixed: {
          title: '固定',
          dataSource: ['左', '右'],
        },
        'header-align': {
          title: '表头对齐',
          dataSource: ['左', '中', '右'],
        },
        sortable: '排序',
        resizable: '改变宽度',
      },
    },
  },
}
