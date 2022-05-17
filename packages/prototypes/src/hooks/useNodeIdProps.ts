import { TreeNode } from '@designable/core'
import { computed } from 'vue-demi'
import { useDesigner } from './useDesigner'
import { useTreeNode } from './useTreeNode'
import { computed as reactiveComputed } from '../shared'

export const useNodeIdProps = (node?: TreeNode) => {
  const targetRef = useTreeNode()
  const designerRef = useDesigner()
  
  return reactiveComputed(() => {
    return {
      [designerRef.value.props.nodeIdAttrName]: node
        ? node.id
        : targetRef.value.id,
    }
  })
}
