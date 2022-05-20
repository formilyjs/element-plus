import { useField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { FormLayout } from '@formily/element-plus'
import {
  usePrefix,
  IconWidget,
  useStyle,
} from '@formily/element-plus-prototypes'
import {
  defineComponent,
  unref,
  ref,
  onUpdated,
  nextTick,
  Component,
} from 'vue-demi'
import { Teleport } from 'vue'
import { ElButton } from 'element-plus'
import cls from 'classnames'
import './styles.less'

export interface IDrawerSetterProps {
  text: Component
}

export const DrawerSetter = observer(
  defineComponent({
    name: 'DrawerSetter',
    props: { text: undefined },
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      const visible = ref(false)
      const remove = ref(false)
      const root = ref(null)
      // const toCls = ref('')
      const fieldRef = useField()
      const prefixRef = usePrefix('drawer-setter')
      const formWrapperCls = usePrefix('settings-form-wrapper')
      const handleOpen = () => {
        visible.value = true
      }

      const handleClose = () => {
        remove.value = true
        setTimeout(() => {
          visible.value = false
          remove.value = false
        }, 150)
      }

      // onUpdated(async () => {
      //   await nextTick()
      //   const wrapperCls = unref(formWrapperCls)
      //   toCls.value = '.' + wrapperCls
      //   console.log('-----------.' + wrapperCls)
      //   // const wrapper = document.querySelector('.' + wrapperCls)
      //   // if (wrapper) {
      //   //   root.value = wrapper
      //   //   wrapper.setAttribute('id', 'remark')
      //   // }
      // })
      const field = unref(fieldRef)
      const prefix = unref(prefixRef)

      // const renderDrawer = () => {
      //   console.log('toCls.value', toCls.value)
      //   if (visible) {
      //     return (

      //     )
      //   }
      //   return null
      // }

      return () => {
        return (
          <>
            <ElButton onClick={handleOpen}>
              {props.text || field.title}
            </ElButton>
            {visible.value && (
              <Teleport to=".dn-settings-form-wrapper">
                <div
                  class={cls(
                    prefix,
                    'animate__animated animate__slideInRight',
                    {
                      animate__slideOutRight: remove.value,
                    }
                  )}
                  {...attrs}
                >
                  <div class={prefix + '-header'} onClick={handleClose}>
                    <IconWidget infer="Return" size={18} />
                    <span class={prefix + '-header-text'}>
                      {props.text || field.title}
                    </span>
                  </div>
                  <div class={prefix + '-body'}>
                    <FormLayout
                      colon={false}
                      labelWidth={120}
                      labelAlign="left"
                      wrapperAlign="right"
                      feedbackLayout="none"
                      tooltipLayout="text"
                    >
                      {slots.default?.()}
                    </FormLayout>
                  </div>
                </div>
              </Teleport>
            )}
          </>
        )
      }
    },
  })
)
