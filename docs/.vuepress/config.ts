import path from 'path'
import utils from './util'
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import vueJsx from '@vitejs/plugin-vue-jsx'

const componentFiles = utils
  .getFiles(path.resolve(__dirname, '../guide'))
  .map((item) => item.replace(/(\.md)$/, ''))
  .filter((item) => !['el-form', 'el-form-item', 'index'].includes(item))

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  title: 'Element-plus',
  description: 'Alibaba unified front-end form solution',
  dest: './doc-site',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/element-plus/dist/index.css',
      },
    ],
  ],
  theme: 'vuepress-theme-dumi',
  themeConfig: {
    logo: '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
    navbar: [
      {
        text: 'ElementPlus',
        link: '/guide/',
      },
      {
        text: '主站',
        link: 'https://formilyjs.org',
      },
      {
        text: 'GITHUB',
        link: 'https://github.com/formilyjs/element-plus.git',
      },
    ],
    sidebar: {
      '/guide/': ['/guide/index.md', ...componentFiles],
    },
    lastUpdated: true,
    smoothScroll: true,
  },
  markdown: {
    code: {
      lineNumbers: false,
    },
  },
  alias: {
    '@formily/element-plus': path.resolve(
      __dirname,
      '../../packages/components/src'
    ),
  },
  plugins: [
    'vuepress-plugin-typescript',
    // '@vuepress/back-to-top',
    // '@vuepress/last-updated',
    // '@vuepress-dumi/dumi-previewer',
    // [
    //   '@vuepress/medium-zoom',
    //   {
    //     selector: '.content__default :not(a) > img',
    //   },
    // ],
  ],
  bundlerConfig: {
    viteOptions: {
      plugins: [
        vueJsx({
          // options are passed on to @vue/babel-plugin-jsx
        }),
      ],
    },
  },
})
