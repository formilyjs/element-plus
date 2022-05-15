import { computed } from 'vue-demi'
import { useOperation } from './useOperation'
import { computed as reactiveComputed } from '../shared'

export const useHover = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return reactiveComputed(() => operation.value?.hover)
}
