import {
  Table as ElTable,
  Table as TableProps,
  TableColumn,
  Row,
} from 'element-plus'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from '@formily/element-plus-prototypes'
import { ArrayBase } from '@formily/element-plus'
import { observer } from '@formily/reactive-vue'
import { LoadTemplate } from '../../common/LoadTemplate'
import cls from 'classnames'
import {
  queryNodesByComponentPath,
  hasNodeByComponentPath,
  findNodeByComponentPath,
  createEnsureTypeItemsNode,
} from '../../shared'
import { useDropTemplate } from '../../hooks'
import { createArrayBehavior } from '../ArrayBase'
import './styles.less'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

import { composeExport } from '@formily/element-plus/src/__builtins__'
import { VueComponent } from '@formily/vue'
import { defineComponent, getCurrentInstance, onMounted } from 'vue-demi'
import { uid } from '@designable/shared'
import { observe } from '@formily/reactive'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const HeaderCell: VueComponent<any> = defineComponent({
  props: { className: { type: String } },
  setup(props, { slots, attrs }) {
    const { proxy: vm } = getCurrentInstance()
    onMounted(() => {
      const element = vm.$el.parentNode.parentNode as HTMLElement
      element.setAttribute(
        'data-designer-node-id',
        props.className.match(/data-id\:([^\s]+)/)?.[1]
      )
    })
    return () => {
      return slots.default?.()
    }
  },
})

const BodyCell: VueComponent<any> = defineComponent({
  props: { className: { type: String } },
  setup(props, { slots, attrs }) {
    const { proxy: vm } = getCurrentInstance()
    onMounted(() => {
      const element = vm.$el.parentNode.parentNode as HTMLElement
      element.setAttribute(
        'data-designer-node-id',
        props.className.match(/data-id\:([^\s]+)/)?.[1]
      )
    })
    return () => {
      return slots.default?.()
    }
  },
})

// TableProps<any>
export const ArrayTable: DnFC<VueComponent<TableProps>> = composeExport(
  observer(
    defineComponent({
      props: { className: {} },
      setup(props, { attrs, slots }) {
        const nodeRef = useTreeNode()
        const nodeIdRef = useNodeIdProps()
        useDropTemplate('ArrayTable', (source) => {
          const sortHandleNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: [
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.SortHandle',
                },
              },
            ],
          })
          const indexNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: [
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.Index',
                },
              },
            ],
          })
          const columnNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: source.map((node) => {
              node.props.title = undefined
              return node
            }),
          })

          const operationNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: [
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.Remove',
                },
              },
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.MoveDown',
                },
              },
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.MoveUp',
                },
              },
            ],
          })
          const objectNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'object',
            },
            children: [sortHandleNode, indexNode, columnNode, operationNode],
          })
          const additionNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              title: 'Addition',
              'x-component': 'ArrayTable.Addition',
            },
          })
          return [objectNode, additionNode]
        })

        useDropTemplate('ArrayTable.Column', (source) => {
          return source.map((node) => {
            node.props.title = undefined
            return node
          })
        })

        return () => {
          const node = nodeRef.value
          const nodeId = nodeIdRef.value
          const columns = queryNodesByComponentPath(node, [
            'ArrayTable',
            '*',
            'ArrayTable.Column',
          ])
          const additions = queryNodesByComponentPath(node, [
            'ArrayTable',
            'ArrayTable.Addition',
          ])

          const defaultRowKey = () => {
            return node.id
          }

          const renderTable = () => {
            if (node.children.length === 0) return <DroppableWidget />
            return (
              <ArrayBase disabled>
                {/* TODO:: rerender table cuz table resizes when insert new value */}
                <ElTable
                  size="small"
                  bordered
                  key={uid()}
                  attrs={attrs}
                  rowKey={defaultRowKey}
                  class={cls('element-formily-array-table', props.className)}
                  style={{ marginBottom: '10px' }}
                  data={[{ id: '1' }]}
                >
                  {columns.map((node, index) => {
                    const children = node.children.map((child) => {
                      return <TreeNodeWidget node={child} key={child.id} />
                    })
                    const props = node.props['x-component-props']
                    return (
                      <TableColumn
                        attrs={props}
                        key={node.id}
                        dataIndex={node.id}
                        class={`data-id:${node.id}`}
                        scopedSlots={{
                          default: ({ row, column, $index }) => {
                            return (
                              <BodyCell
                                attrs={{ className: `data-id:${node.id}` }}
                              >
                                <ArrayBase.Item index={$index}>
                                  {children.length > 0 ? children : 'Droppable'}
                                </ArrayBase.Item>
                              </BodyCell>
                            )
                          },
                          header: ({ column, $index }) => {
                            return (
                              <HeaderCell
                                attrs={{ className: `data-id:${node.id}` }}
                              >
                                <span data-content-editable="x-component-props.label">
                                  {props.label}
                                </span>
                              </HeaderCell>
                            )
                          },
                        }}
                      ></TableColumn>
                    )
                  })}
                  {columns.length === 0 && (
                    <TableColumn>
                      <DroppableWidget />
                    </TableColumn>
                  )}
                </ElTable>
                {/* TODO::some how cannot make it working */}
                <Row justify="center" type="flex">
                  {additions.map((node) => {
                    return <ArrayBase.Addition title="添加条目" />
                  })}
                </Row>
              </ArrayBase>
            )
          }
          return (
            <div attrs={nodeId} class="dn-array-table">
              {renderTable()}
              <LoadTemplate
                actions={[
                  {
                    title: node.getMessage('addSortHandle'),
                    icon: 'AddSort',
                    onClick: () => {
                      if (
                        hasNodeByComponentPath(node, [
                          'ArrayTable',
                          '*',
                          'ArrayTable.Column',
                          'ArrayTable.SortHandle',
                        ])
                      )
                        return
                      const tableColumn = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            label: `排序`,
                          },
                        },
                        children: [
                          {
                            componentName: 'Field',
                            props: {
                              type: 'void',
                              'x-component': 'ArrayTable.SortHandle',
                            },
                          },
                        ],
                      })
                      ensureObjectItemsNode(node).prepend(tableColumn)
                    },
                  },
                  {
                    title: node.getMessage('addIndex'),
                    icon: 'AddIndex',
                    onClick: () => {
                      if (
                        hasNodeByComponentPath(node, [
                          'ArrayTable',
                          '*',
                          'ArrayTable.Column',
                          'ArrayTable.Index',
                        ])
                      )
                        return
                      const tableColumn = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            label: `序号`,
                          },
                        },
                        children: [
                          {
                            componentName: 'Field',
                            props: {
                              type: 'void',
                              'x-component': 'ArrayTable.Index',
                            },
                          },
                        ],
                      })
                      const sortNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        '*',
                        'ArrayTable.Column',
                        'ArrayTable.SortHandle',
                      ])
                      if (sortNode) {
                        sortNode.parent.insertAfter(tableColumn)
                      } else {
                        ensureObjectItemsNode(node).prepend(tableColumn)
                      }
                    },
                  },
                  {
                    title: node.getMessage('addColumn'),
                    icon: 'AddColumn',
                    onClick: () => {
                      const operationNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        '*',
                        'ArrayTable.Column',
                        (name) => {
                          return (
                            name === 'ArrayTable.Remove' ||
                            name === 'ArrayTable.MoveDown' ||
                            name === 'ArrayTable.MoveUp'
                          )
                        },
                      ])
                      const tableColumn = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            label: `Title`,
                          },
                        },
                      })
                      if (operationNode) {
                        operationNode.parent.insertBefore(tableColumn)
                      } else {
                        ensureObjectItemsNode(node).append(tableColumn)
                      }
                    },
                  },
                  {
                    title: node.getMessage('addOperation'),
                    icon: 'AddOperation',
                    onClick: () => {
                      const oldOperationNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        '*',
                        'ArrayTable.Column',
                        (name) => {
                          return (
                            name === 'ArrayTable.Remove' ||
                            name === 'ArrayTable.MoveDown' ||
                            name === 'ArrayTable.MoveUp'
                          )
                        },
                      ])
                      const oldAdditionNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        'ArrayTable.Addition',
                      ])
                      if (!oldOperationNode) {
                        const operationNode = new TreeNode({
                          componentName: 'Field',
                          props: {
                            type: 'void',
                            'x-component': 'ArrayTable.Column',
                            'x-component-props': {
                              label: `操作`,
                            },
                          },
                          children: [
                            {
                              componentName: 'Field',
                              props: {
                                type: 'void',
                                'x-component': 'ArrayTable.Remove',
                              },
                            },
                            {
                              componentName: 'Field',
                              props: {
                                type: 'void',
                                'x-component': 'ArrayTable.MoveDown',
                              },
                            },
                            {
                              componentName: 'Field',
                              props: {
                                type: 'void',
                                'x-component': 'ArrayTable.MoveUp',
                              },
                            },
                          ],
                        })
                        ensureObjectItemsNode(node).append(operationNode)
                      }
                      if (!oldAdditionNode) {
                        const additionNode = new TreeNode({
                          componentName: 'Field',
                          props: {
                            type: 'void',
                            title: 'Addition',
                            'x-component': 'ArrayTable.Addition',
                          },
                        })
                        ensureObjectItemsNode(node).insertAfter(additionNode)
                      }
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
    Behavior: createBehavior(createArrayBehavior('ArrayTable'), {
      name: 'ArrayTable.Column',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'ArrayTable.Column',
      designerProps: {
        droppable: true,
        allowDrop: (node) =>
          node.props['type'] === 'object' &&
          node.parent?.props?.['x-component'] === 'ArrayTable',
        propsSchema: createVoidFieldSchema(AllSchemas.ArrayTable.Column),
      },
      designerLocales: AllLocales.ArrayTableColumn,
    }),
    Resource: createResource({
      icon: 'ArrayTableSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'array',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTable',
          },
        },
      ],
    }),
    Column: () => null,
    Index: ArrayBase.Index,
    SortHandle: ArrayBase.SortHandle,
    Addition: ArrayBase.Addition,
    Remove: ArrayBase.Remove,
    MoveDown: ArrayBase.MoveDown,
    MoveUp: ArrayBase.MoveUp,
    useArray: ArrayBase.useArray,
    useIndex: ArrayBase.useIndex,
    useRecord: ArrayBase.useRecord,
  }
)
