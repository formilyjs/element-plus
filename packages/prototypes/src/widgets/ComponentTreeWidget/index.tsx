import { VueComponent } from '@formily/vue'
import { useTree, usePrefix, useDesigner, useComponents } from '../../hooks'
import { TreeNodeSymbol, DesignerComponentsSymbol } from '../../context'
import { IDesignerComponents } from '../../types'
import { TreeNode, GlobalRegistry } from '@designable/core'
import { observer } from '@formily/reactive-vue'
import cls from 'classnames'
import './styles.less'
import { defineComponent, PropType, provide, ref, toRef } from 'vue-demi'
import { composeExport } from '@formily/element-plus/src/__builtins__'

export interface IComponentTreeWidgetProps {
  components: IDesignerComponents
}

export interface ITreeNodeWidgetProps {
  node: TreeNode
  // children?: React.ReactChild
}

export const TreeNodeWidgetComponent =
  defineComponent({
    name: 'DnTreeNodeWidget',
    props: {
      node: Object as PropType<TreeNode>,
    },
    setup(props) {
      const designerRef = useDesigner(props.node?.designerProps?.effects)
      const componentsRef = useComponents()

      provide(TreeNodeSymbol, toRef(props, 'node'))

      return () => {
        const node = props.node!
        const renderChildren = () => {
          if (node?.designerProps?.selfRenderChildren) return []
          return node?.children?.map((child) => {
            return <TreeNodeWidget {...{ node: child }} key={child.id} />
          })
        }

        // may need to change
        const renderProps = (extendsProps: any = {}) => {
          return {
            ...node.designerProps?.defaultProps,
            ...extendsProps,
            ...node.props,
            ...node.designerProps?.getComponentProps?.(node),
          }
        }

        const renderComponent = () => {
          const componentName = node.componentName
          const Component = componentsRef.value?.[componentName]

          const dataId = {}
          if (Component) {
            if (designerRef.value) {
              dataId[designerRef.value?.props?.nodeIdAttrName] = node.id
            }
            const { style, ...attrs } = renderProps(dataId)
            return (
              <Component {...attrs} key={node.id} style={style}>
                {renderChildren()}
              </Component>
            )
          } else {
            if (node?.children?.length) {
              return <>{renderChildren()}</>
            }
          }
        }
        if (!node) return null
        if (node.hidden) return null
        return renderComponent()
      }
    },
  })

export const TreeNodeWidget = observer(TreeNodeWidgetComponent)

export const ComponentTreeWidgetComponent =
  observer(
    defineComponent({
      name: 'DnComponentTreeWidget',
      props: { components: [Object] },
      setup(props) {
        const treeRef = useTree()
        const prefixRef = usePrefix('component-tree')
        const designerRef = useDesigner()

        GlobalRegistry.registerDesignerBehaviors(props.components!)
        provide(DesignerComponentsSymbol, toRef(props, 'components'))

        return () => {
          const dataId: Record<string, string> = {}
          if (designerRef.value && treeRef.value && designerRef.value?.props?.nodeIdAttrName) {
            dataId[designerRef.value.props.nodeIdAttrName!] = treeRef.value.id
          }
          return (
            <div class={cls(prefixRef.value)} {...dataId}>
              <TreeNodeWidget {...{ node: treeRef.value }} />
            </div>
          )
        }
      },
    })
  )

export const ComponentTreeWidget = composeExport(ComponentTreeWidgetComponent, {
  displayName: 'ComponentTreeWidget',
})
