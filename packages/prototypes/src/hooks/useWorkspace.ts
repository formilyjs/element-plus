import { useDesigner } from './useDesigner'
import { WorkspaceSymbol, useContext } from '../context'
import { Workspace } from '@designable/core'
import { ref, computed, Ref } from 'vue-demi'
import { computed as reactiveComputed } from '../shared'

export const useWorkspace = (id?: string): Ref<Workspace> => {
  const designer = useDesigner()
  const workspaceRef = ref()

  const WorkspaceSymbolRef = useContext(WorkspaceSymbol)

  if (window['__DESIGNABLE_WORKSPACE__']) {
    workspaceRef.value = window['__DESIGNABLE_WORKSPACE__']
    return workspaceRef
  }

  return reactiveComputed(() => {
    const workspaceId = id || WorkspaceSymbolRef?.value.id
    if (workspaceId) {
      return designer.value.workbench.findWorkspaceById(workspaceId)
    }
    return designer.value.workbench.currentWorkspace
  })
}
