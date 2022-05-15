import { Operation } from '@designable/core'
import { onFieldInputValueChange } from '@formily/core'
import { Ref } from 'vue-demi'
let timeRequest = null

export const useSnapshot = (operation: Operation, keyup: Ref<boolean>) => {
  // TODO::usesnapshot is causing problem but dont know what this is
  // the elementui's input-number emit('input') event by immediate watcher
  // also CreateForm effect changes schema by locales which cause label goes to null
  // workaround listen to keyup event, if keyup event is fired then snapshot, otherwise no snapshots
  onFieldInputValueChange('*', () => {
    if (!keyup.value) return
    clearTimeout(timeRequest)
    timeRequest = setTimeout(() => {
      operation.snapshot('update:node:props')
      keyup.value = false
    }, 1000)
  })
}
