import { onBeforeUnmount, onMounted, watch, WatchSource } from 'vue-demi'
import { watch as reactiveWatch } from './reactive'

export function useEffect(
  func: () => void | (() => void | null),
  dependency: WatchSource | WatchSource[]
) {
  const disposes: Array<(() => void) | void> = []
  const disposeAll = () => disposes.forEach((fn) => fn?.())

  reactiveWatch(
    dependency,
    () => {
      disposeAll()
      disposes.push(func?.())
    },
    { immediate: true }
  )

  onBeforeUnmount(disposeAll)
}
