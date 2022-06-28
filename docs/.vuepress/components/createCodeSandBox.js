import { getParameters } from 'codesandbox/lib/api/define'

const CodeSandBoxHTML = '<div id="app"></div>'
const CodeSandBoxJS = `
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
`

const createForm = ({ method, action, data }) => {
  const form = document.createElement('form') // 构造 form
  form.style.display = 'none' // 设置为不显示
  form.target = '_blank' // 指向 iframe

  // 构造 formdata
  Object.keys(data).forEach((key) => {
    const input = document.createElement('input') // 创建 input

    input.name = key // 设置 name
    input.value = data[key] // 设置 value

    form.appendChild(input)
  })

  form.method = method // 设置方法
  form.action = action // 设置地址

  document.body.appendChild(form)

  // 对该 form 执行提交
  form.submit()

  document.body.removeChild(form)
}

export function createCodeSandBox(codeStr) {
  const parameters = getParameters({
    files: {
      'sandbox.config.json': {
        content: {
          template: 'node',
          infiniteLoopProtection: true,
          hardReloadOnChange: false,
          view: 'browser',
          container: {
            port: 8080,
            node: '14',
          },
        },
      },
      'tsconfig.json': {
        content: `{
          "compilerOptions": {
            "target": "esnext",
            "module": "esnext",
            "strict": true,
            "jsx": "preserve",
            "moduleResolution": "node",
            "skipLibCheck": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "forceConsistentCasingInFileNames": true,
            "useDefineForClassFields": true,
            "sourceMap": true,
            "baseUrl": ".",
            "types": [
              "webpack-env"
            ],
            "paths": {
              "@/*": [
                "src/*"
              ]
            },
            "lib": [
              "esnext",
              "dom",
              "dom.iterable",
              "scripthost"
            ]
          },
          "include": [
            "src/**/*.ts",
            "src/**/*.tsx",
            "src/**/*.vue",
            "tests/**/*.ts",
            "tests/**/*.tsx"
          ],
          "exclude": [
            "node_modules"
          ]
        }
        `
      },
      'package.json': {
        content: {
          scripts: {
            serve: 'vue-cli-service serve',
            build: 'vue-cli-service build',
            lint: 'vue-cli-service lint',
          },
          dependencies: {
            '@formily/element-plus': 'latest',
            "core-js": "^3.8.3",
            "vue": "^3.2.13"
          },
          devDependencies: {
            "@vue/cli-plugin-babel": "~5.0.0",
            "@vue/cli-service": "~5.0.0",
            "@vue/cli-plugin-typescript": "~5.0.0",
            "sass": "^1.32.7",
            "sass-loader": "^12.0.0",
            "typescript": "latest"
          },
          babel: {
            presets: [
              [
                '@vue/cli-plugin-babel/preset',
              ],
            ],
          },
          vue: {
            devServer: {
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              host: '0.0.0.0',
              allowedHosts: 'all',
            },
          },
        },
      },
      'src/shims-vue.d.ts': {
        content: `
        /* eslint-disable */
        declare module '*.vue' {
          import type { DefineComponent } from 'vue'
          const component: DefineComponent<{}, {}, any>
          export default component
        }
      `
      },
      'src/App.vue': {
        content: codeStr,
      },
      'src/main.ts': {
        content: CodeSandBoxJS,
      },
      'public/index.html': {
        content: CodeSandBoxHTML,
      },
    },
  })

  createForm({
    method: 'post',
    action: 'https://codesandbox.io/api/v1/sandboxes/define',
    data: {
      parameters,
      query: 'file=/src/App.vue',
    },
  })
}
