import { computed, inject, ref, ComputedRef } from 'vue-demi'
import { DesignerLayoutSymbol } from '../context'
import { IDesignerLayoutContext } from '../types'

export const usePosition = (): ComputedRef<IDesignerLayoutContext['theme']> => {
    const valueRef = inject(DesignerLayoutSymbol, ref())
    return computed(
        () => valueRef.value?.position
    )
}
