// import React, { useEffect, useState, useRef } from 'react'
import { TreeNode } from '@designable/core'
import { useHover, useSelection, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'
import { observer } from '@formily/reactive-vue'
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
} from 'vue-demi'
import { CSSProperties, Ref } from '@vue/runtime-dom'
import { composeExport } from '@formily/element-plus/src/__builtins__'

const useMouseHover = (
  refInstance: Ref<HTMLElement | undefined>,
  enter?: () => void,
  leave?: () => void
) => {
  let unmounted = ref(false)
  let timer: NodeJS.Timeout

  const onMouseOver = (e: MouseEvent) => {
    const target: HTMLElement = e.target as any
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (unmounted.value) return
      const result = unref(refInstance) as any
      if (result?.contains(target)) {
        enter && enter()
      } else {
        leave && leave()
      }
    }, 100)
  }

  onMounted(() => {
    document.addEventListener('mouseover', onMouseOver)
  })

  onBeforeUnmount(() => {
    unmounted.value = true
    document.removeEventListener('mouseover', onMouseOver)
  })
}

export interface ISelectorProps {
  node: TreeNode
  style?: CSSProperties
}

const SelectorComponent = observer(
  defineComponent({
    name: 'SelectorComponent',
    props: ['node'],
    setup(props, { }) {
      const expand = ref(false)
      const setExpand = (value: boolean) => {
        expand.value = value
      }

      const hoverRef = useHover()
      const refInstance = ref<HTMLDivElement>()

      const selectionRef = useSelection()
      const prefixRef = usePrefix('aux-selector')

      useMouseHover(
        refInstance,
        () => {
          setExpand(true)
        },
        () => {
          setExpand(false)
        }
      )

      return () => {
        const node = props.node
        const renderIcon = (node: TreeNode) => {
          const icon = node.designerProps.icon
          if (icon) {
            return <IconWidget infer={icon} />
          }
          if (node === node.root) {
            return <IconWidget infer="Page" />
          } else if (node.designerProps?.droppable) {
            return <IconWidget infer="Container" />
          }
          return <IconWidget infer="Component" />
        }

        const parents = node.getParents()

        const renderMenu = () => {
          return (
            <div
              class={prefixRef.value + '-menu'}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
              }}
            >
              {parents.slice(0, 4).map((parent: TreeNode) => {
                return (
                  <button
                    key={parent.id}
                    onClick={() => {
                      selectionRef.value.select(parent.id)
                    }}
                    onMouseenter={() => {
                      hoverRef.value.setHover(parent)
                    }}
                  >
                    {renderIcon(parent)}
                    <span
                      style={{ transform: 'scale(0.85)', marginLeft: '2px' }}
                    >
                      <NodeTitleWidget node={parent} />
                    </span>
                  </button>
                )
              })}
            </div>
          )
        }

        return (
          <div ref={refInstance} class={prefixRef.value}>
            <button
              class={prefixRef.value + '-title'}
              onMouseenter={() => {
                hoverRef.value.setHover(node)
              }}
            >
              {renderIcon(node)}
              <span>
                <NodeTitleWidget node={node} />
              </span>
            </button>
            {expand.value && renderMenu()}
          </div>
        )
      }
    },
  })
)

export const Selector = composeExport(SelectorComponent, {
  displayName: 'Selector',
})
