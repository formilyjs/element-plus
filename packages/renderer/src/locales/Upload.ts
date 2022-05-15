import { createLocales } from '@designable/core'

export const Upload = {
  'zh-CN': {
    title: '上传',
    settings: {
      'x-component-props': {
        textContent: '上传文案',
        action: '上传地址',
        headers: '请求头',
        multiple: '多选模式',
        data: '数据/参数',
        name: '文件名称',
        'with-credentials': '携带Cookie',
        'show-file-list': '文件列表',
        drag: '拖拽上传',
        accept: '可接受类型',
        'list-type': {
          title: '列表类型',
          dataSource: ['文本', '图片', '卡片'],
        },
        'auto-upload': '自动上传',
        limit: '最大数量',
      },
    },
  },
  'en-US': {
    title: 'Upload',
    settings: {
      'x-component-props': {
        textContent: 'Text Content',
        action: 'Action',
        headers: 'Headers',
        multiple: 'Multiple',
        data: 'Data',
        name: 'Name',
        'with-credentials': 'With Credentials',
        'show-file-list': 'Show File List',
        drag: 'Drag',
        accept: 'Accept',
        'list-type': {
          title: 'List Type',
          dataSource: ['Text', 'Picture', 'Picture Card'],
        },
        'auto-upload': 'Auto Upload',
        limit: 'Limit',
      },
    },
  },
}

export const UploadDragger = createLocales(Upload, {
  'zh-CN': {
    title: '拖拽上传',
    settings: {
      'x-component-props': {},
    },
  },
  'en-US': {
    title: 'UploadDragger',
    settings: {
      'x-component-props': {},
    },
  },
})
