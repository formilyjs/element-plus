// import React, { useRef } from 'react'
import { observer } from '@formily/reactive-vue'
import {
  Engine,
  DragStartEvent,
  DragMoveEvent,
  DragStopEvent,
  ScreenStatus
} from '@designable/core'
import {
  calcSpeedFactor,
  createUniformSpeedAnimation,
  isStr,
} from '@designable/shared'
import { useScreen, useDesigner, usePrefix } from '../../hooks'
import { IconWidget } from '../../widgets'
import { ResizeHandle, ResizeHandleType } from './handle'

import cls from 'classnames'
import './styles.less'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  ref,
  Ref,
  watch,
} from 'vue-demi'
import { observe } from '@formily/reactive'
import { useEffect } from '../../shared/useEffect'

const useResizeEffect = (
  container: Ref<HTMLDivElement | undefined>, // React.MutableRefObject<HTMLDivElement>,
  content: Ref<HTMLDivElement | undefined>, // React.MutableRefObject<HTMLDivElement>,
  engine: Engine
) => {
  let status: ResizeHandleType | null
  let startX: number = 0
  let startY: number = 0
  let startWidth: number = 0
  let startHeight: number = 0
  let animationX: any
  let animationY: any

  const getStyle = (status: ResizeHandleType) => {
    if (status === ResizeHandleType.Resize) return 'nwse-resize'
    if (status === ResizeHandleType.ResizeHeight) return 'ns-resize'
    if (status === ResizeHandleType.ResizeWidth) return 'ew-resize'
  }

  const updateSize = (deltaX: number, deltaY: number) => {
    const containerRect = container.value?.getBoundingClientRect()
    if (!container.value || !containerRect) return
    if (status === ResizeHandleType.Resize) {
      engine.screen.setSize(startWidth + deltaX, startHeight + deltaY)
      container.value.scrollBy(
        containerRect.width + deltaX,
        containerRect.height + deltaY
      )
    } else if (status === ResizeHandleType.ResizeHeight) {
      engine.screen.setSize(startWidth, startHeight + deltaY)
      container.value.scrollBy(
        container.value.scrollLeft,
        containerRect.height + deltaY
      )
    } else if (status === ResizeHandleType.ResizeWidth) {
      engine.screen.setSize(startWidth + deltaX, startHeight)
      container.value.scrollBy(
        containerRect.width + deltaX,
        container.value.scrollTop
      )
    }
  }

  engine.subscribeTo(DragStartEvent, (e) => {
    if (!engine.workbench.currentWorkspace?.viewport) return

    const target = e.data.target as HTMLElement
    if (target?.closest('*[data-designer-resize-handle]')) {
      const rect = content.value?.getBoundingClientRect()
      if (!rect) return
      status = target.getAttribute(
        'data-designer-resize-handle'
      ) as ResizeHandleType
      engine.cursor.setStyle(getStyle(status)!)
      engine.cursor.setType(status)
      startX = e.data.topClientX || 0
      startY = e.data.topClientY || 0
      startWidth = rect.width
      startHeight = rect.height
      engine.screen.setStatus(ScreenStatus.Resizing)
    }
  })
  engine.subscribeTo(DragMoveEvent, (e: any) => {
    if (!engine.workbench.currentWorkspace?.viewport) return
    if (!status) return
    const containerRect = container.value?.getBoundingClientRect()
    if (!container.value || !containerRect) return
    const deltaX = e.data.topClientX - startX
    const deltaY = e.data.topClientY - startY
    const distanceX = Math.floor(containerRect.right - e.data.topClientX)
    const distanceY = Math.floor(containerRect.bottom - e.data.topClientY)
    const factorX = calcSpeedFactor(distanceX, 10)
    const factorY = calcSpeedFactor(distanceY, 10)
    updateSize(deltaX, deltaY)
    if (distanceX <= 10) {
      if (!animationX) {
        animationX = createUniformSpeedAnimation(1000 * factorX, (delta) => {
          updateSize(deltaX + delta, deltaY)
        })
      }
    } else {
      if (animationX) {
        animationX = animationX()
      }
    }

    if (distanceY <= 10) {
      if (!animationY) {
        animationY = createUniformSpeedAnimation(300 * factorY, (delta) => {
          updateSize(deltaX, deltaY + delta)
        })
      }
    } else {
      if (animationY) {
        animationY = animationY()
      }
    }
  })
  engine.subscribeTo(DragStopEvent, () => {
    if (!status) return
    status = null
    engine.cursor.setStyle('')
    engine.screen.setStatus(ScreenStatus.Normal)
    if (animationX) {
      animationX = animationX()
    }
    if (animationY) {
      animationY = animationY()
    }
  })
}

/**
 * InputNumber ElmentUI 显示不了100%
 * @param content
 */
function useScreenModifier(screenRef: Ref<Engine['screen']>, contentRef: Ref<HTMLDivElement | undefined>) {
  useEffect(() => {
    const screen = screenRef.value
    const content = contentRef.value
    if (isStr(screen.height) && isStr(screen.width)) {
      Promise.resolve().then(() => screen.setSize(content?.clientWidth, content?.clientHeight))
    }
  }, [contentRef, () => screenRef.value.height])
  // watch(contentRef, })
}

const ResponsiveSimulatorComponent = defineComponent({
  name: "ResponsiveSimulatorComponent",
  props: {},
  setup(props, { attrs, slots }) {
    const contentRef = ref<HTMLDivElement>()
    const containerRef = ref<HTMLDivElement>()
    const prefixRef = usePrefix('responsive-simulator')
    const screenRef = useScreen()


    useDesigner((engine) => {
      useResizeEffect(containerRef, contentRef, engine)
    })

    useScreenModifier(screenRef, contentRef)

    return () => {
      return (
        <div
          {...attrs}
          class={cls(prefixRef.value)}
          style={{
            height: '100%',
            width: '100%',
            minHeight: '100px',
            position: 'relative',
          }}
        >
          <div
            ref={containerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              overflow: 'overlay',
            }}
          >
            <div
              ref={contentRef}
              style={{
                width: isStr(screenRef.value.width)
                  ? screenRef.value.width
                  : screenRef.value.width + 'px',
                height: isStr(screenRef.value.height)
                  ? screenRef.value.height
                  : screenRef.value.height + 'px',
                paddingRight: '15px',
                paddingBottom: '15px',
                position: 'relative',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {slots.default?.()}
              <ResizeHandle type={ResizeHandleType.Resize} >
                <IconWidget
                  infer="DragMove"
                  style={{ pointerEvents: 'none' }}
                />
              </ResizeHandle>
              <ResizeHandle type={ResizeHandleType.ResizeHeight}>
                <IconWidget infer="Menu" style={{ pointerEvents: 'none' }} />
              </ResizeHandle>
              <ResizeHandle type={ResizeHandleType.ResizeWidth}>
                <IconWidget infer="Menu" style={{ pointerEvents: 'none' }} />
              </ResizeHandle>
            </div>
          </div>
        </div>
      )
    }
  },
})
export const ResponsiveSimulator = observer(ResponsiveSimulatorComponent)
