import { Field } from '@formily/core'
import { defineComponent, h } from 'vue'
import { connect, mapProps, useField, FragmentComponent } from '@formily/vue'
import {
  UploadFilled,
  Upload as UploadIcon,
  Plus,
} from '@element-plus/icons-vue'
import { ElUpload, ElButton, ElIcon } from 'element-plus'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload'

export type UploadProps = typeof ElUpload & {
  textContent?: string
  errorAdaptor?: (error?: ErrorEvent) => string
}

const UploadWrapper = defineComponent({
  name: 'FUpload',
  props: {
    textContent: {
      type: String,
      default: '',
    },
    errorAdaptor: {
      type: Function,
      default(error?: ErrorEvent) {
        return error?.message || ''
      },
    },
    fileList: {
      type: Array,
    },
  },
  setup(curProps: any, { slots, attrs, emit }) {
    return () => {
      const fieldRef = useField<Field>()
      const setFeedBack = (error?: ErrorEvent) => {
        const message = curProps.errorAdaptor!(error)

        fieldRef.value.setFeedback({
          type: 'error',
          code: 'UploadError',
          messages: message ? [message] : [],
        })
      }

      type Fn = (...args: any[]) => any
      const props = {
        ...attrs,
        onChange(file: UploadFile, fileList: UploadFile[]) {
          !(attrs.onChange as Fn)?.(file, fileList)
          setFeedBack()
          emit('change', fileList)
        },

        onRemove(file: UploadFile, fileList: UploadFile[]) {
          !(attrs.onRemove as Fn)?.(file, fileList)
          setFeedBack()
          emit('change', fileList)
        },

        onError(error: ErrorEvent, file: UploadFile, fileList: UploadFile[]) {
          !(attrs.onError as Fn)?.(error, file, fileList)

          setTimeout(() => {
            setFeedBack(error)
          }, 0)
        },
      }
      const children = {
        ...slots,
      } as any
      if (!slots.default) {
        children.default = () => {
          const listType = attrs.listType
          const drag = attrs.drag

          if (drag) {
            return h(
              FragmentComponent,
              {},
              {
                default: () => [
                  h(
                    ElIcon,
                    { style: { fontSize: '60px', margin: '40px 0 16px' } },
                    { default: () => h(UploadFilled, { color: 'gray' }, {}) }
                  ),
                  h(
                    'div',
                    { staticClass: 'el-upload__text' },
                    { default: () => [curProps.textContent] }
                  ),
                ],
              }
            )
          }

          if (listType === 'picture-card') {
            return h(
              Plus,
              {
                style: {
                  width: '28px',
                  height: '28px',
                  marginTop: '60px',
                  color: 'gray',
                },
              },
              {}
            )
          }

          return h(
            ElButton,
            {},
            {
              default: () => [
                h(UploadIcon, { style: { width: '12px', height: '12px' } }),
                curProps.textContent,
              ],
            }
          )
        }
      }
      return h(ElUpload as any, { ...props, ...attrs }, children)
    }
  },
})

export const Upload = connect(
  UploadWrapper,
  mapProps({ readOnly: 'readonly', value: 'fileList' })
)

export default Upload
