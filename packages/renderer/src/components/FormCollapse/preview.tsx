import { observer } from '@formily/reactive-vue'
import { FragmentComponent, VueComponent } from '@formily/vue'
import { Collapse, CollapseItem } from 'element-plus'
import {
  Collapse as CollapseProps,
  CollapseItem as CollapsePanelProps,
} from 'element-plus'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
  TreeNodeWidget,
  DnFC,
  useSelection,
} from '@formily/element-plus-prototypes'
import { toArr } from '@formily/shared'
import { LoadTemplate } from '../../common/LoadTemplate'
import { useDropTemplate } from '../../hooks'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { matchComponent } from '../../shared'
import { defineComponent, nextTick, ref } from 'vue-demi'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { uid } from '@designable/shared'

const parseCollapse = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (matchComponent(node, 'FormCollapse.CollapsePanel')) {
      tabs.push(node)
    }
  })
  return tabs
}
// CollapsePanel: FragmentComponent,
// & {
//   CollapsePanel?: VueComponent<CollapsePanelProps>
// }
export const FormCollapse: DnFC<VueComponent<CollapseProps>> = composeExport(
  observer(
    defineComponent({
      name: 'DnFormCollapse',
      props: { accordion: Boolean },
      setup(props, { attrs }) {
        const activeKeyRef = ref<string | string[]>([])

        const setActiveKey = (value) => {
          activeKeyRef.value = value
        }
        const nodeRef = useTreeNode()
        const nodeIdRef = useNodeIdProps()
        const selectionRef = useSelection()

        const designerRef = useDropTemplate('FormCollapse', (source) => {
          const panelNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
              'x-component-props': {
                header: `Unnamed Title`,
              },
            },
            children: source,
          })

          setActiveKey(toArr(activeKeyRef.value).concat(panelNode.id))
          return [panelNode]
        })

        const getCorrectActiveKey = (
          activeKey: string[] | string,
          tabs: TreeNode[]
        ) => {
          if (!tabs.length || !activeKey?.length) {
            if (props.accordion) {
              return tabs[0]?.id
            }
            return tabs.map((item) => item.id)
          }
          if (
            tabs.some((node) =>
              Array.isArray(activeKey)
                ? activeKey.includes(node.id)
                : node.id === activeKey
            )
          ) {
            return props.accordion ? activeKey[activeKey.length - 1] : activeKey
          }
          return props.accordion
            ? tabs[tabs.length - 1].id
            : [tabs[tabs.length - 1].id]
        }

        return () => {
          const node = nodeRef.value
          const nodeId = nodeIdRef.value
          const activeKey = activeKeyRef.value
          const designer = designerRef.value

          const panels = parseCollapse(node)

          const renderCollapse = () => {
            if (!node.children?.length) return <DroppableWidget />
            return (
              <Collapse
                attrs={attrs}
                value={getCorrectActiveKey(activeKey, panels)}
                accordion={props.accordion}
              >
                {panels.map((panel) => {
                  const props = panel.props['x-component-props'] || {}
                  return (
                    <CollapseItem attrs={attrs} key={panel.id} name={panel.id}>
                      <span
                        // attrs={{
                        //   [designer.props.nodeIdAttrName]: panel.id,
                        // }}
                        data-content-editable="x-component-props.title"
                        data-content-editable-node-id={panel.id}
                        slot="title"
                      >
                        {props.title}
                      </span>
                      <div
                        style={{
                          padding: '20px 0',
                        }}
                        attrs={{
                          [designer.props.nodeIdAttrName]: panel.id,
                        }}
                      >
                        {/* TODO::reactive的flow，重新渲染了整个子树 */}
                        {panel.children.length ? (
                          <TreeNodeWidget node={panel} />
                        ) : (
                          <DroppableWidget node={panel} />
                        )}
                      </div>
                    </CollapseItem>
                  )
                })}
              </Collapse>
            )
          }
          return (
            <div attrs={nodeId}>
              {renderCollapse()}
              <LoadTemplate
                actions={[
                  {
                    title: node.getMessage('addCollapsePanel'),
                    icon: 'AddPanel',
                    onClick: () => {
                      const tabPane = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'FormCollapse.CollapsePanel',
                          'x-component-props': {
                            header: `Unnamed Title`,
                          },
                        },
                      })
                      node.append(tabPane)
                      const keys = toArr(activeKey)
                      setActiveKey(keys.concat(tabPane.id))
                      nextTick(() => {
                        selectionRef.value.select(tabPane.id)
                      })
                    },
                  },
                ]}
              />
            </div>
          )
        }
      },
    })
  ),
  {
    Behavior: createBehavior(
      {
        name: 'FormCollapse',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormCollapse',
        designerProps: {
          droppable: true,
          allowAppend: (target, source) =>
            target.children.length === 0 ||
            source.every(
              (node) =>
                node.props['x-component'] === 'FormCollapse.CollapsePanel'
            ),
          propsSchema: createVoidFieldSchema(AllSchemas.FormCollapse),
        },
        designerLocales: AllLocales.FormCollapse,
      },
      {
        name: 'FormCollapse.CollapsePanel',
        extends: ['Field'],
        selector: (node) =>
          node.props['x-component'] === 'FormCollapse.CollapsePanel',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props['x-component'] === 'FormCollapse',
          propsSchema: createVoidFieldSchema(
            AllSchemas.FormCollapse.CollapsePanel
          ),
        },
        designerLocales: AllLocales.FormCollapsePanel,
      }
    ),
    Resource: createResource({
      icon: 'CollapseSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormCollapse',
          },
        },
      ],
    }),
  }
)
