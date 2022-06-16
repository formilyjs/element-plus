import { computed, unref } from 'vue-demi'
import { DesignerLayoutSymbol, useContext } from '../context'
import { useLayout } from './useLayout'

export const usePrefix = (after = '') => {
    const layoutRef = useLayout()
    const usePrefixContext = computed(
        () => unref(layoutRef)?.prefixCls + after
    )
    return usePrefixContext
}
