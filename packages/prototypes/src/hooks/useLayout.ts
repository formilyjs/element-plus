
import { computed, inject, ref, ComputedRef } from 'vue-demi'
import { DesignerLayoutSymbol } from '../context'
import { IDesignerLayoutContext } from '../types'

export const useLayout = (): ComputedRef<IDesignerLayoutContext> => {
    return window['__DESIGNABLE_LAYOUT__'] ? ref(window['__DESIGNABLE_LAYOUT__']) : inject(DesignerLayoutSymbol, ref())
}
