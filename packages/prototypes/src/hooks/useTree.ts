import { computed, markRaw } from 'vue-demi'
import { useOperation } from './useOperation'
import { computed as reactiveComputed } from '../shared'

export const useTree = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return reactiveComputed(() => operation.value?.tree)
}
