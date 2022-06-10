import { useDesigner, usePrefix } from '../../hooks'
import { TreeNode } from '@designable/core'
import { IconWidget } from '../IconWidget'
import cls from 'classnames'
import { defineComponent } from 'vue'

export interface ITranslateHandlerProps {
    node: TreeNode
}

export const TranslateHandler = defineComponent({
    props: ['node'],
    setup(props) {
        const designerRef = useDesigner()
        const prefix = usePrefix('aux-node-translate-handler')
        const createHandler = (value: string) => {
            const designer = designerRef.value
            return {
                [designer.props.nodeTranslateAttrName!]: value,
                class: cls(prefix, value),
            }
        }
        return () => {
            const allowTranslate = props.node.allowTranslate()
            if (!allowTranslate) return null
            return (
                <div {...createHandler('translate')}>
                    <IconWidget infer="FreeMove" />
                </div>
            )
        }
    }
})