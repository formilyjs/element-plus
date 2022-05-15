import { isStr } from '@designable/shared'
import { useAttrs, getCurrentInstance, StyleValue, CSSProperties } from 'vue'

const css2obj = (css) => {
    const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
        o = {}
    css.replace(r, (m, p, v) => (o[p] = v))
    return o
}
export const useStyle = () => {
    let { style = {} } = useAttrs()
    if (isStr(style)) {
        style = css2obj(style)
    }
    return style as CSSProperties
}