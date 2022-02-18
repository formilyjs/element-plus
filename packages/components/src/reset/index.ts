import { IFieldResetOptions } from '@formily/core'
import { h, useParentForm } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'

import type { ElButton as ElButtonProps } from 'element-plus'
import { ElButton } from 'element-plus'

export type ResetProps = IFieldResetOptions & typeof ElButtonProps

export const Reset = observer(
  defineComponent({
    name: 'FReset',
    props: {
      forceClear: {
        type: Boolean,
        default: false,
      },
      validate: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots }: any) {
      const formRef = useParentForm()
      return () => {
        const form = formRef?.value
        return h(
          ElButton,
          {
            ...attrs,
            onClick: (e: MouseEvent) => {
              if (attrs?.click) {
                if (attrs.click(e) === false) return
              }
              form
                ?.reset('*', {
                  forceClear: props.forceClear,
                  validate: props.validate,
                })
                .then(attrs.resetValidateSuccess as (e: any) => void)
                .catch(attrs.resetValidateFailed as (e: any) => void)
            },
          },
          slots
        )
      }
    },
  })
)

export default Reset
