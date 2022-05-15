import { computed } from 'vue-demi'
import { useCurrentNode } from './useCurrentNode'
import { useSelected } from './useSelected'
import { computed as reactiveComputed } from '../shared'

export const useCurrentNodeSelected = () => {
  const nodeRef = useCurrentNode()
  const selectedRef = useSelected()
  return reactiveComputed(
    () =>
      selectedRef.value.length === 1 &&
      nodeRef.value.id === selectedRef.value?.[0]
  )
}
