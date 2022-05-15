// import React, { useEffect, useRef } from 'react'
import { CursorStatus, CursorType } from '@designable/core'
import {
  useViewport,
  useCursor,
  useDesigner,
  usePrefix,
  useOperation,
} from '../../hooks'
import { Insertion } from './Insertion'
import { Selection } from './Selection'
import { FreeSelection } from './FreeSelection'
import { Cover } from './Cover'
import { DashedBox } from './DashedBox'
import './styles.less'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { computed, defineComponent, onBeforeUnmount } from 'vue-demi'

const setCursorState = (contentWindow: Window, state: string) => {
  const valueRoot = document?.getElementsByTagName?.('html')?.[0]
  const root = contentWindow?.document?.getElementsByTagName('html')?.[0]
  if (root) {
    root.style.cursor = state
  }
  if (valueRoot) {
    valueRoot.style.cursor = state
  }
}

const AuxToolWidgetComponent = defineComponent({
  name: 'DnAuxToolWidget',
  props: [],
  setup(props, { refs }) {
    const engineRef = useDesigner()
    const viewportRef = useViewport()
    const operationRef = useOperation()
    const cursorRef = useCursor()
    const prefixRef = usePrefix('auxtool')
    const _ref = computed<HTMLDivElement>(() => refs.ref as HTMLDivElement)

    let engineSubs: any = []

    // [engine, viewport]
    const cb1 = engineRef.value.subscribeWith('viewport:scroll', () => {
      if (viewportRef.value.isIframe && _ref.value) {
        _ref.value.style.transform = `perspective(1px) translate3d(${-viewportRef
          .value.scrollX}px,${-viewportRef.value.scrollY}px,0)`
      }
    })
    // [engine, cursor, viewportDragon, viewport, operation]
    const cb2 = engineRef.value.subscribeWith(
      ['drag:move', 'drag:stop'],
      () => {
        if (cursorRef.value.status !== CursorStatus.Dragging) {
          setCursorState(viewportRef.value.contentWindow, 'default')
        } else {
          if (cursorRef.value.type === CursorType.Move) {
            if (operationRef.value.getDragNodes().length) {
              // todo: update cusor will trigger document layout rerender https://bugs.chromium.org/p/chromium/issues/detail?id=664066
              // if (viewportDragon.closestDirection === ClosestPosition.Inner) {
              //   setCursorState(viewport.contentWindow, 'copy')
              // } else {
              setCursorState(viewportRef.value.contentWindow, 'move')
              //}
            }
          } else {
            if (cursorRef.value.type === CursorType.ResizeWidth) {
              setCursorState(viewportRef.value.contentWindow, 'ew-resize')
            } else if (cursorRef.value.type === CursorType.ResizeHeight) {
              setCursorState(viewportRef.value.contentWindow, 'ns-resize')
            } else if (cursorRef.value.type === CursorType.Resize) {
              setCursorState(viewportRef.value.contentWindow, 'nwse-resize')
            } else {
              setCursorState(viewportRef.value.contentWindow, 'default')
            }
          }
        }
      }
    )
    engineSubs.push(cb1, cb2)

    onBeforeUnmount(() => {
      engineSubs.map((enginecb) => enginecb())
    })

    return () => {
      if (!viewportRef.value) return null

      return (
        <div ref="ref" class={prefixRef.value}>
          <Insertion />
          <DashedBox />
          <Selection />
          <Cover />
          <FreeSelection />
        </div>
      )
    }
  },
})

export const AuxToolWidget = composeExport(AuxToolWidgetComponent, {
  displayName: 'AuxToolWidget',
})
