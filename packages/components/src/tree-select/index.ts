import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import { ElTreeSelect, } from 'element-plus'
import { transformComponent, } from '../__builtins__'
import { DataField } from '@formily/core'
import { toJS } from '@formily/reactive'
export type TreeSelectProps = typeof ElTreeSelect

function tree2flat(children: any, childrenKey: string = 'children'): any {
    let arr: any[] = []
    for (let i = 0; i < children.length; i++) {
        arr.push(children[i])
        if (children?.[i]?.[childrenKey]) {
            arr = arr.concat(tree2flat(children[i][childrenKey], childrenKey))
        }
    }
    return arr
}

const TransformElSelect = transformComponent<TreeSelectProps>(ElTreeSelect, {
    change: 'update:modelValue'
})

const InnerSelect = connect(
    TransformElSelect,
    mapProps({ value: 'modelValue', readOnly: 'readonly' }),
    mapReadPretty(PreviewText.Select)
)

export const TreeSelect = connect(
    InnerSelect,
    mapProps({ dataSource: 'data', loading: true }),
    mapReadPretty(
        connect(PreviewText.Select, mapProps({}, (args: any, field: DataField) => {
            const result = tree2flat(toJS(field.dataSource) || [])
            field.setDataSource(result)
            return args
        }))
    )
)
