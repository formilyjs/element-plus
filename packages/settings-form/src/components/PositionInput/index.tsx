import { usePrefix } from '@formily/element-plus-prototypes'
import cls from 'classnames'
import './styles.less'
import { defineComponent, ref, unref, watch } from 'vue-demi'

export interface IPositionInputProps {
  value?: string
  onChange?: (value: string) => void
}

export const PositionInput =
  defineComponent({
    name: 'DnPositionInput',
    props: { value: String },
    emits: ['change'],
    setup(props, { emit }) {
      const prefixRef = usePrefix('position-input')
      const currentRef = ref(props.value)

      watch(
        () => props.value,
        () => {
          if (!props.value) {
            currentRef.value = 'center'
          }
        }
      )

      return () => {
        const prefix = unref(prefixRef)
        const current = unref(currentRef)
        const createCellProps = (type: string) => ({
          class: cls(prefix + '-cell', { active: current === type }),
          onClick() {
            currentRef.value = type
            emit('change', type)
          },
        })
        const cellProps = {
          top: createCellProps('top'),
          left: createCellProps('left'),
          center: createCellProps('center'),
          right: createCellProps('right'),
          bottom: createCellProps('bottom'),
        }
        return (
          <div class={cls(prefix)}>
            <div class={prefix + '-row'}>
              <div
                class={cellProps.top.class}
                onClick={cellProps.top.onClick}
              >
                ┳
              </div>
            </div>
            <div class={prefix + '-row'}>
              <div
                class={cellProps.left.class}
                onClick={cellProps.left.onClick}
              >
                ┣
              </div>
              <div
                class={cellProps.center.class}
                onClick={cellProps.center.onClick}
              >
                ╋
              </div>
              <div
                class={cellProps.right.class}
                onClick={cellProps.right.onClick}
              >
                ┫
              </div>
            </div>
            <div class={prefix + '-row'}>
              <div
                class={cellProps.bottom.class}
                onClick={cellProps.bottom.onClick}
              >
                ┻
              </div>
            </div>
          </div>
        )
      }
    },
  })
