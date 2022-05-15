import { ElInput as Input, ElUpload as Upload } from 'element-plus'
import { usePrefix, IconWidget, useContext } from '@formily/element-plus-prototypes'
import { SettingsFormSymbol } from '../../shared/context'
import cls from 'classnames'
import './styles.less'
import { defineComponent } from 'vue-demi'
export interface ImageInputProps {
  value?: string
}

export const ImageInput = defineComponent({
  props: { value: String },
  emits: ['change'],
  setup(props, { emit }) {
    const prefixRef = usePrefix('image-input')
    const contextRef = useContext(SettingsFormSymbol)

    return () => {
      const prefix = prefixRef.value
      const context = contextRef.value
      return (
        <div class={cls(prefix)}>
          <Input
            {...{
              ...props,
              "onUpdate:modelValue": (e) => {
                emit('change', e)
              }
            }}
            v-slots={{
              prefix: () => {
                return (
                  <Upload
                    action={context.uploadAction}
                    headers={{}}
                    multiple={false}
                    onChange={(params) => {
                      const response = params.file?.response
                      const url =
                        response?.url ||
                        response?.downloadURL ||
                        response?.imageURL ||
                        response?.thumbUrl ||
                        response?.data
                      if (!url) return
                      emit('change', url)
                    }}
                  >
                    <IconWidget
                      infer="CloudUpload"
                      style={{ cursor: 'pointer' }}
                      size={16}
                    />
                  </Upload>
                )
              }
            }}
          >

          </Input>
        </div>
      )
    }
  },
})

export const BackgroundImageInput = defineComponent({
  props: { value: String },
  setup(props, { emit }) {
    return () => {
      const addBgValue = (value: any) => {
        if (/url\([^)]+\)/.test(value)) {
          return value
        }
        return `url(${value})`
      }
      const removeBgValue = (value: any) => {
        const matched = String(value).match(/url\(\s*([^)]+)\s*\)/)
        if (matched?.[1]) {
          return matched?.[1]
        }
        return value
      }
      return (
        <ImageInput
          value={removeBgValue(props.value)}
          onChange={(url) => {
            emit('change', addBgValue(url))
          }}
        />
      )
    }
  },
}) as Vue.Component<any, any, any, ImageInputProps>
