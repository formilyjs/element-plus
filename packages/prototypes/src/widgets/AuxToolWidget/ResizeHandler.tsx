import { useDesigner, usePrefix } from '../../hooks'
import { TreeNode } from '@designable/core'
import { defineComponent } from 'vue'

export interface IResizeHandlerProps {
    node: TreeNode
}

export const ResizeHandler = defineComponent({
    name: 'dn-resizehandler',
    props: ['node'],
    setup(props) {
        const designerRef = useDesigner()
        const prefixRef = usePrefix('aux-node-resize-handler')

        const createHandler = (value: string) => {
            const designer = designerRef.value
            return {
                [designer.props.nodeResizeHandlerAttrName!]: value,
                class: {
                    [prefixRef.value]: true,
                    [value]: true
                }
            }
        }

        return () => {
            const allowResize = props.node.allowResize()
            if (!allowResize) return null
            const allowX = allowResize.includes('x')
            const allowY = allowResize.includes('y')
            return <>
                {allowX && <div {...createHandler('left-center')}></div>}
                {allowX && <div {...createHandler('right-center')}></div>}
                {allowY && <div {...createHandler('center-top')}></div>}
                {allowY && <div {...createHandler('center-bottom')}></div>}
                {allowX && allowY && <div {...createHandler('left-top')}></div>}
                {allowY && allowY && <div {...createHandler('right-top')}></div>}
                {allowX && allowY && <div {...createHandler('left-bottom')}></div>}
                {allowY && allowY && <div {...createHandler('right-bottom')}></div>}
            </>
        }
    }
})