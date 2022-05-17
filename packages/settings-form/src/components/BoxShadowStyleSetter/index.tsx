import { usePrefix } from '@formily/element-plus-prototypes'
import { useField, FragmentComponent, VueComponent } from '@formily/vue'
import { DataField } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { FoldItem } from '../FoldItem'
import { ColorInput } from '../ColorInput'
import { SizeInput } from '../SizeInput'
import { InputItems } from '../InputItems'
import cls from 'classnames'
import { unref, defineComponent } from 'vue-demi'
export interface IBoxShadowStyleSetterProps {
  value?: string
}

export const BoxShadowStyleSetter =
  observer(
    defineComponent({
      props: { value: String },
      setup(props, { emit }) {
        const fieldRef = useField<DataField>()
        const prefixRef = usePrefix('shadow-style-setter')

        const createBoxShadowConnector = (position: number) => {
          const splited = String(props.value || '')
            .trim()
            .split(' ')
          const result = {
            value: splited[position] || '',
            onChange: (value: any) => {
              splited[position] = value
              emit(
                'change',
                `${splited[0] || ''} ${splited[1] || ''} ${splited[2] || ''
                } ${splited[3] || ''} ${splited[4] || ''}`
              )
            },
          }
          return result
        }

        return () => {
          const field = fieldRef.value
          const prefix = unref(prefixRef)

          // TODO::响应式有点问题
          const connectors = [
            createBoxShadowConnector(0),
            createBoxShadowConnector(1),
            createBoxShadowConnector(2),
            createBoxShadowConnector(3),
            createBoxShadowConnector(4),
          ]

          return (
            <FoldItem class={cls(prefix)} label={field.title} v-slots={
              {
                base: () => {
                  return (
                    <ColorInput
                      value={connectors[4].value}
                      onChange={connectors[4].onChange}
                    />
                  )
                },
                extra: () => {
                  return (
                    <InputItems width="50%">
                      <InputItems.Item icon="AxisX">
                        <SizeInput
                          exclude={['auto']}
                          value={connectors[0].value}
                          onChange={connectors[0].onChange}
                        />
                      </InputItems.Item>
                      <InputItems.Item icon="AxisY">
                        <SizeInput
                          exclude={['auto']}
                          value={connectors[1].value}
                          onChange={connectors[1].onChange}
                        />
                      </InputItems.Item>
                      <InputItems.Item icon="Blur">
                        <SizeInput
                          exclude={['auto']}
                          value={connectors[2].value}
                          onChange={connectors[2].onChange}
                        />
                      </InputItems.Item>
                      <InputItems.Item icon="Shadow">
                        <SizeInput
                          exclude={['auto']}
                          value={connectors[3].value}
                          onChange={connectors[3].onChange}
                        />
                      </InputItems.Item>
                    </InputItems>
                  )
                }
              }
            }>
            </FoldItem>
          )
        }
      },
    })
  )
