import { computed } from 'vue-demi'
import { useWorkspace } from './useWorkspace'
import { computed as reactiveComputed } from '../shared'

export const useOutline = (workspaceId?: string) => {
  const workspace = useWorkspace(workspaceId)
  return reactiveComputed(() => workspace.value?.outline)
}
