import { useDesigner } from './useDesigner'
import { computed as reactiveComputed } from '../shared'
import { Engine } from '@designable/core'

export const useScreen = () => {
  const designer = useDesigner()
  return reactiveComputed<Engine['screen']>(() => designer.value?.screen)
}
