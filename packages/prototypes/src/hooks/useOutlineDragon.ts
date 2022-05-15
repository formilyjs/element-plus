import { computed } from 'vue-demi'
import { useOperation } from './useOperation'
import { computed as reactiveComputed } from '../shared'

export const useOutlineDragon = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return reactiveComputed(() => operation.value?.outlineDragon)
}
