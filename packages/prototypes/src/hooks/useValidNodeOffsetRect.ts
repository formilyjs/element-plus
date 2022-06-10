import { CursorStatus, ScreenStatus, TreeNode } from '@designable/core'
import {
  getCurrentInstance,
  shallowRef,
  Ref,
} from 'vue'

import { useDesigner } from './useDesigner'
import { useEffect } from '../shared/useEffect'
import { useViewport } from './useViewport'
import { LayoutObserver } from './observer'

const isEqualRect = (rect1: Partial<DOMRect>, rect2: DOMRect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  )
}

export const useValidNodeOffsetRect = (nodeRef: Ref<TreeNode>) => {
  const { proxy: { $forceUpdate: forceUpdate } } = getCurrentInstance()!
  const vm = getCurrentInstance()!
  const engineRef = useDesigner()
  const viewportRef = useViewport()

  const rectRef = shallowRef<Ref<DOMRect>>(
    viewportRef.value.getValidNodeOffsetRect(nodeRef.value) as any
  )

  const computeRef = shallowRef()
  useEffect(() => {
    computeRef.value = async () => {
      await Promise.resolve()
      if (!vm.isMounted) return
      const viewport = viewportRef.value
      const engine = engineRef.value
      const node = nodeRef.value
      if (
        engine.cursor.status !== CursorStatus.Normal &&
        engine.screen.status === ScreenStatus.Normal
      )
        return
      const nextRect = viewport.getValidNodeOffsetRect(node)
      if (!isEqualRect(rectRef.value, nextRect) && nextRect) {
        rectRef.value = nextRect
        forceUpdate()
      }
    }
    computeRef.value()
  }, [viewportRef, nodeRef])

  useEffect(() => {
    const node = nodeRef.value
    const viewport = viewportRef.value
    const element = viewport.findElementById(node?.id)
    const layoutObserver = new LayoutObserver(computeRef.value)
    if (element && element.isConnected) layoutObserver.observe(element)
    return () => {
      layoutObserver.disconnect()
    }
  }, [nodeRef, viewportRef, engineRef])

  return rectRef
}