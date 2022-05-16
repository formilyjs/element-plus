import { usePrefix, IconWidget, useContext } from '@formily/element-plus-prototypes'
import cls from 'classnames'
import { defineComponent, computed, InjectionKey, provide, Ref } from 'vue-demi'
import './styles.less'
import { composeExport } from '@formily/element-plus/esm/__builtins__'
export interface IInputItemsContext {
  width?: string | number
  vertical?: boolean
}

// export interface IInputItemsProps {
//   className?: string
//   style?: React.CSSProperties
//   width?: string | number
//   vertical?: boolean
// }

// export interface IInputItemProps {
//   className?: string
//   style?: React.CSSProperties
//   icon?: React.ReactNode
//   width?: string | number
//   vertical?: boolean
//   title?: React.ReactNode
// }

const InputItemsSymbol: InjectionKey<Ref<IInputItemsContext>> =
  Symbol('IInputItemsContext')

const InputItemsBase = defineComponent({
  props: {
    width: { type: [String, Number], default: '100%' },
    vertical: Boolean,
  },
  setup(props, { slots }) {
    const prefixRef = usePrefix('input-items')
    provide(
      InputItemsSymbol,
      computed(() => props)
    )
    return () => {
      return <div class={cls(prefixRef.value)}>{slots.default?.()}</div>
    }
  },
})

const InputItemsItem = defineComponent({
  props: {
    vertical: Boolean,
    width: String,
    icon: [String, Object, Function],
    title: [String, Object, Function],
  },
  setup(props, { slots }) {
    const prefixRef = usePrefix('input-items-item')
    const ctxRef = useContext(InputItemsSymbol)
    return () => {
      const prefix = prefixRef.value
      const ctx = ctxRef.value
      return (
        <div
          class={cls(prefix, {
            vertical: props.vertical || ctx.vertical,
          })}
          style={{ width: props.width || ctx.width }}
        >
          {props.icon && (
            <div class={prefix + '-icon'}>
              <IconWidget infer={props.icon} size={16} />
            </div>
          )}
          {props.title && <div class={prefix + '-title'}>{props.title}</div>}
          <div class={prefix + '-controller'}>{slots.default?.()}</div>
        </div>
      )
    }
  },
})

export const InputItems = composeExport(InputItemsBase, {
  Item: InputItemsItem,
})
