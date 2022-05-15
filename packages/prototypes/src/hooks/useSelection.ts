import { useOperation } from './useOperation'
import { computed as reactiveComputed } from '../shared'

export const useSelection = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return reactiveComputed(() => operation.value?.selection)
}
