// import React, { Fragment, useRef, useMemo } from 'react'
import { FormItem } from '@formily/element-plus'
import { useField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { observable } from '@formily/reactive'
import { IconWidget, usePrefix } from '@formily/element-plus-prototypes'
import cls from 'classnames'
import './styles.less'
import { defineComponent, ref, unref } from 'vue-demi'
import { composeExport } from '@formily/element-plus/src/__builtins__'

const ExpandedMap = new Map<string, boolean>()

const FoldItemComponent = observer(
  defineComponent({
    name: 'DnFoldItem',
    props: ['label'],
    setup(props, { attrs, slots }) {
      const fieldRef = useField()
      const expand = observable.ref(
        ExpandedMap.get(fieldRef.value.address.toString())
      )
      const prefixRef = usePrefix('fold-item')

      return () => {
        const field = unref(fieldRef)

        return (
          <div class={cls(prefixRef.value)}>
            <div
              class={prefixRef.value + '-base'}
              onClick={() => {
                expand.value = !expand.value
                ExpandedMap.set(field.address.toString(), expand.value)
              }}
            >
              <FormItem.BaseItem
                {...attrs}
                label={
                  () => <span
                    class={cls(prefixRef.value + '-title', {
                      expand: expand.value,
                    })}
                  >
                    {slots.extra && <IconWidget infer="Expand" size={10} />}
                    {props.label}
                  </span>
                }
              >
                <div
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {slots.base?.()}
                </div>
              </FormItem.BaseItem>
            </div>
            {expand.value && slots.extra && (
              <div class={prefixRef.value + '-extra'}>{slots.extra?.()}</div>
            )}
          </div>
        )
      }
    },
  })
)

export const FoldItem = composeExport(FoldItemComponent, {
  Base: composeExport((props, { slots }) => slots.default?.(), {
    displayName: 'FoldItem.Base',
  }),
  Extra: composeExport((props, { slots }) => slots.default?.(), {
    displayName: 'FoldItem.Extra',
  }),
})
