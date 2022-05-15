import { computed } from 'vue-demi'
import { useDesigner } from './useDesigner'
import { computed as reactiveComputed } from '../shared'

export const useCursor = () => {
  const designer = useDesigner()
  return reactiveComputed(() => designer.value?.cursor)
}
