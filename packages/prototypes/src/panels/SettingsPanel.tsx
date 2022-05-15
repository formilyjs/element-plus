import { requestIdle } from '@designable/shared'
import { observer } from '@formily/reactive-vue'
import { TextWidget, IconWidget } from '../widgets'
import { usePrefix, useWorkbench } from '../hooks'
import cls from 'classnames'
import { defineComponent, ref, watchEffect } from 'vue-demi'

export interface ISettingPanelProps {
  title?: any
  extra?: any
}

export const SettingsPanel = observer(
  defineComponent({
    props: ['title', 'extra'],
    setup(props, { slots }) {
      const prefixRef = usePrefix('settings-panel')
      const workbenchRef = useWorkbench()
      const innerVisible = ref(true)
      const pinning = ref(false)
      const visible = ref(true)

      watchEffect(() => {
        if (visible.value || workbenchRef.value.type === 'DESIGNABLE') {
          if (!innerVisible.value) {
            requestIdle(() => {
              requestAnimationFrame(() => {
                innerVisible.value = true
              })
            })
          }
        }
      })

      return () => {
        if (workbenchRef.value.type !== 'DESIGNABLE') {
          if (innerVisible.value) innerVisible.value = false
          return null
        }
        if (!visible.value) {
          if (innerVisible) innerVisible.value = false
          return (
            <div
              class={prefixRef.value + '-opener'}
              onClick={() => {
                visible.value = true
              }}
            >
              <IconWidget infer="Setting" size={'20px'} />
            </div>
          )
        }

        return (
          <div class={cls(prefixRef.value, { pinning: pinning.value })}>
            <div class={prefixRef.value + '-header'}>
              <div class={prefixRef.value + '-header-title'}>
                <TextWidget>{props.title}</TextWidget>
              </div>
              <div class={prefixRef.value + '-header-actions'}>
                <div class={prefixRef.value + '-header-extra'}>
                  {props.extra}
                </div>
                {!pinning.value && (
                  <IconWidget
                    infer="PushPinOutlined"
                    key={prefixRef.value + '-header-pin'}
                    class={prefixRef.value + '-header-pin'}
                    onClick={() => {
                      pinning.value = !pinning.value
                    }}
                  />
                )}
                {pinning.value && (
                  <IconWidget
                    infer="PushPinFilled"
                    key={prefixRef.value + '-pin-filled'}
                    class={prefixRef.value + '-pin-filled'}
                    onClick={() => {
                      pinning.value = !pinning.value
                    }}
                  />
                )}
                <IconWidget
                  infer="Close"
                  class={prefixRef.value + '-header-close'}
                  onClick={() => {
                    visible.value = false
                  }}
                />
              </div>
            </div>
            <div class={prefixRef.value + '-body'}>
              {innerVisible.value && slots.default?.()}
            </div>
          </div>
        )
      }
    },
  })
)
