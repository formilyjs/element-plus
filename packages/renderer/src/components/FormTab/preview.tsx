import { observer } from '@formily/reactive-vue'
import { ElTabs as Tabs, ElTabPane as TabPane } from 'element-plus'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useNodeIdProps,
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  DnFC,
  useSelection,
} from '@formily/element-plus-prototypes'
import { LoadTemplate } from '../../common/LoadTemplate'
import { useDropTemplate } from '../../hooks'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { matchComponent } from '../../shared'

import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { DefineComponent, defineComponent, nextTick, ref } from 'vue-demi'

const parseTabs = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (matchComponent(node, 'FormTab.TabPane')) {
      tabs.push(node)
    }
  })
  return tabs
}

const getCorrectActiveKey = (activeKey: string, tabs: TreeNode[]) => {
  if (tabs.length === 0) return
  if (tabs.some((node) => node.id === activeKey)) return activeKey
  return tabs[tabs.length - 1].id
}
//  {
//   TabPane?: VueComponent<TabPaneProps>
// }
export const FormTab: DnFC<DefineComponent<any>> = composeExport(
  observer(
    defineComponent({
      setup(props, { attrs }) {
        const activeKeyRef = ref<string>()
        const nodeIdRef = useNodeIdProps()
        const nodeRef = useTreeNode()
        const selectionRef = useSelection()
        const designerRef = useDropTemplate('FormTab', (source) => {
          return [
            new TreeNode({
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormTab.TabPane',
                'x-component-props': {
                  label: `Unnamed Title`,
                },
              },
              children: source,
            }),
          ]
        })

        const setActiveKey = (value: string) => {
          activeKeyRef.value = value
          selectionRef.value.select(value)
        }
        return () => {
          const activeKey = activeKeyRef.value
          const nodeId = nodeIdRef.value
          const node = nodeRef.value
          const designer = designerRef.value
          if (!node) return
          const tabs = parseTabs(node)
          const renderTabs = () => {
            if (!node.children?.length) return <DroppableWidget />
            return (
              <Tabs
                {...{
                  ...attrs,
                  modelValue: getCorrectActiveKey(activeKey!, tabs),
                  "onUpdate:modelValue": (id: any) => {
                    setActiveKey(id)
                  }
                }}
              >
                {tabs.map((tab) => {
                  const props = tab.props?.['x-component-props'] || {}
                  const nodeId = {
                    [designer.props.nodeIdAttrName]: tab.id,
                  }
                  return (
                    <TabPane
                      {...nodeId}
                      style={props.style}
                      name={tab.id}
                      key={tab.id}
                      v-slots={{
                        label: () => {
                          return (
                            <span
                              data-content-editable="x-component-props.label"
                              data-content-editable-node-id={tab.id}
                            >
                              {props.label}
                            </span>
                          )
                        }
                      }}
                    >
                      <div
                        style={{
                          padding: '20px 0',
                        }}
                      >
                        {tab.children.length ? (
                          <TreeNodeWidget node={tab} />
                        ) : (
                          <DroppableWidget node={tab} />
                        )}
                      </div>
                    </TabPane>
                  )
                })}
              </Tabs>
            )
          }
          return (
            <div {...nodeId}>
              {renderTabs()}
              <LoadTemplate
                actions={[
                  {
                    title: node.getMessage('addTabPane'),
                    icon: 'AddPanel',
                    onClick: () => {
                      const tabPane = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'FormTab.TabPane',
                          'x-component-props': {
                            label: `Unnamed Title`,
                          },
                        },
                      })
                      node.append(tabPane)
                      setActiveKey(tabPane.id)
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
        name: 'FormTab',
        extends: ['Field'],
        selector: (node) => node.props?.['x-component'] === 'FormTab',
        designerProps: {
          droppable: true,
          allowAppend: (target, source) =>
            target.children.length === 0 ||
            source.every(
              (node) => node.props?.['x-component'] === 'FormTab.TabPane'
            ),
          propsSchema: createVoidFieldSchema(AllSchemas.FormTab),
        },
        designerLocales: AllLocales.FormTab,
      },
      {
        name: 'FormTab.TabPane',
        extends: ['Field'],
        selector: (node) => node.props?.['x-component'] === 'FormTab.TabPane',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props?.['x-component'] === 'FormTab',
          propsSchema: createVoidFieldSchema(AllSchemas.FormTab.TabPane),
        },
        designerLocales: AllLocales.FormTabPane,
      }
    ),
    Resource: createResource({
      icon: 'TabSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormTab',
          },
        },
      ],
    }),
  }
)
