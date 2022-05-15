import { usePrefix } from '../../hooks'
import cls from 'classnames'
import { defineComponent } from '@vue/runtime-core'
export enum ResizeHandleType {
  Resize = 'RESIZE',
  ResizeWidth = 'RESIZE_WIDTH',
  ResizeHeight = 'RESIZE_HEIGHT',
}

export interface IResizeHandleProps {
  type?: ResizeHandleType
}

export const ResizeHandle = defineComponent({
  props: ['type'],
  setup(props, { slots, attrs }) {
    const prefixRef = usePrefix('resize-handle')
    return () => {
      return (
        <div
          {...attrs}
          data-designer-resize-handle={props.type}
          class={cls(prefixRef.value, {
            [`${prefixRef.value}-${props.type}`]: !!props.type,
          })}
        >
          {slots.default?.()}
        </div>
      )
    }
  },
})
