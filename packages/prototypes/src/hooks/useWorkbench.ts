import { computed } from 'vue-demi'
import { useDesigner } from './useDesigner'
import { computed as reactiveComputed } from '../shared'

export const useWorkbench = () => {
  const designer = useDesigner()
  return reactiveComputed(() => designer.value.workbench)
}
