export const FormTab = {
  'zh-CN': {
    title: '选项卡',
    addTabPane: '添加选项卡',
    settings: {
      'x-component-props': {
        type: { title: '类型', dataSources: ['card', 'border-card'] },
        closable: '可关闭',
        addable: '可增加',
        editable: '可增加和关闭',
        stretch: '宽度是否自撑开',
        'tab-position': '	选项卡所在位置',
        'before-leave':
          '切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。',
      },
    },
  },
  'en-US': {
    title: 'Tabs',
    addTabPane: 'Add Panel',
    settings: {
      'x-component-props': {
        animated: 'Enable Animated',
        centered: 'Label Centered',
        tab: 'Tab Title',
        type: {
          title: 'Type',
          dataSource: [
            { label: 'Line', value: 'line' },
            { label: 'Card', value: 'card' },
          ],
        },
      },
    },
  },
}

export const FormTabPane = {
  'zh-CN': {
    title: '选项卡面板',
    settings: {
      'x-component-props': {
        label: '面板标题',
        disabled: '禁用',
        name: {
          title: '列表中的顺序值',
          tooltip: `该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'`,
        },
        closable: '标签是否可关闭',
        lazy: '标签是否延迟渲染',
      },
    },
  },
  'en-US': {
    title: 'Tab Panel',
    settings: {
      'x-component-props': {
        label: '面板标题',
        disabled: '禁用',
        name: {
          title: '列表中的顺序值',
          tooltip: `该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'`,
        },
        closable: '标签是否可关闭',
        lazy: '标签是否延迟渲染',
      },
    },
  },
}
