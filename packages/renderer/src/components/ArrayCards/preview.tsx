import { Card, Card as CardProps, Row, Col } from 'element-plus'
import { TreeNode, createResource } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from '@formily/element-plus-prototypes'
import { ArrayBase, ArrayBaseMixins, Space } from '@formily/element-plus'
import { observer } from '@formily/reactive-vue'
import { LoadTemplate } from '../../common/LoadTemplate'
import { useDropTemplate } from '../../hooks'
import {
  hasNodeByComponentPath,
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  findNodeByComponentPath,
  createNodeId,
} from '../../shared'
import { createArrayBehavior } from '../ArrayBase'
import cls from 'classnames'
import './styles.less'

import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { FragmentComponent as Fragment } from '@formily/vue'
import { uid } from '@designable/shared'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const isArrayCardsOperation = (name: string) =>
  name === 'ArrayCards.Remove' ||
  name === 'ArrayCards.MoveDown' ||
  name === 'ArrayCards.MoveUp'

export const ArrayCards: DnFC<VueComponent<CardProps & ArrayBaseMixins>> =
  composeExport(
    observer(
      defineComponent({
        props: { title: {} },
        setup(props, { slots }) {
          const nodeRef = useTreeNode()
          const nodeIdRef = useNodeIdProps()

          const designerRef = useDropTemplate('ArrayCards', (source) => {
            const indexNode = new TreeNode({
              componentName: nodeRef.value.componentName,
              props: {
                type: 'void',
                'x-component': 'ArrayCards.Index',
              },
            })
            const additionNode = new TreeNode({
              componentName: nodeRef.value.componentName,
              props: {
                type: 'void',
                title: 'Addition',
                'x-component': 'ArrayCards.Addition',
              },
            })
            const removeNode = new TreeNode({
              componentName: nodeRef.value.componentName,
              props: {
                type: 'void',
                title: 'Addition',
                'x-component': 'ArrayCards.Remove',
              },
            })
            const moveDownNode = new TreeNode({
              componentName: nodeRef.value.componentName,
              props: {
                type: 'void',
                title: 'Addition',
                'x-component': 'ArrayCards.MoveDown',
              },
            })
            const moveUpNode = new TreeNode({
              componentName: nodeRef.value.componentName,
              props: {
                type: 'void',
                title: 'Addition',
                'x-component': 'ArrayCards.MoveUp',
              },
            })

            const objectNode = new TreeNode({
              componentName: nodeRef.value.componentName,
              props: {
                type: 'object',
              },
              children: [
                indexNode,
                ...source,
                removeNode,
                moveDownNode,
                moveUpNode,
              ],
            })
            return [objectNode, additionNode]
          })

          return () => {
            const node = nodeRef.value
            const nodeId = nodeIdRef.value
            const designer = designerRef.value

            const renderCard = () => {
              if (node.children.length === 0) return <DroppableWidget />
              const additions = queryNodesByComponentPath(node, [
                'ArrayCards',
                'ArrayCards.Addition',
              ])
              const indexes = queryNodesByComponentPath(node, [
                'ArrayCards',
                '*',
                'ArrayCards.Index',
              ])
              const operations = queryNodesByComponentPath(node, [
                'ArrayCards',
                '*',
                isArrayCardsOperation,
              ])
              const children = queryNodesByComponentPath(node, [
                'ArrayCards',
                '*',
                (name) => name.indexOf('ArrayCards.') === -1,
              ])
              return (
                <ArrayBase disabled>
                  <ArrayBase.Item index={0}>
                    <Card
                      props={props}
                      class={cls('ant-formily-array-cards-item')}
                      header={props.title}
                    >
                      <Row slot="header" justify="space-between" type="flex">
                        <span>
                          {indexes.map((node, key) => (
                            <TreeNodeWidget key={key} node={node} />
                          ))}
                          <span data-content-editable="x-component-props.title">
                            {props.title}
                          </span>
                        </span>
                        <span>
                          {operations.map((node) => (
                            <TreeNodeWidget key={node.id} node={node} />
                          ))}
                          {slots.extra?.()}
                        </span>
                      </Row>

                      <div
                        key={uid()}
                        attrs={{
                          ...createNodeId(
                            designer,
                            ensureObjectItemsNode(node).id
                          ),
                        }}
                      >
                        {children.length ? (
                          children.map((node) => (
                            <TreeNodeWidget key={node.id} node={node} />
                          ))
                        ) : (
                          <DroppableWidget key={node.id} node={node} />
                        )}
                      </div>
                    </Card>
                    {/* TODO::some how cannot make it working */}
                    <Row justify="center" type="flex">
                      {additions.map((node) => {
                        return <ArrayBase.Addition title="添加条目" />
                      })}
                    </Row>
                  </ArrayBase.Item>
                </ArrayBase>
              )
            }

            return (
              <div attrs={nodeId} class="dn-array-cards">
                {renderCard()}
                <LoadTemplate
                  actions={[
                    {
                      title: node.getMessage('addIndex'),
                      icon: 'AddIndex',
                      onClick: () => {
                        if (
                          hasNodeByComponentPath(node, [
                            'ArrayCards',
                            '*',
                            'ArrayCards.Index',
                          ])
                        )
                          return
                        const indexNode = new TreeNode({
                          componentName: node.componentName,
                          props: {
                            type: 'void',
                            'x-component': 'Button',
                          },
                        })
                        ensureObjectItemsNode(node).append(indexNode)
                      },
                    },

                    {
                      title: node.getMessage('addOperation'),
                      icon: 'AddOperation',
                      onClick: () => {
                        const oldAdditionNode = findNodeByComponentPath(node, [
                          'ArrayCards',
                          'ArrayCards.Addition',
                        ])
                        if (!oldAdditionNode) {
                          const additionNode = new TreeNode({
                            componentName: node.componentName,
                            props: {
                              type: 'void',
                              title: 'Addition',
                              'x-component': 'ArrayCards.Addition',
                            },
                          })
                          ensureObjectItemsNode(node).insertAfter(additionNode)
                        }
                        const oldRemoveNode = findNodeByComponentPath(node, [
                          'ArrayCards',
                          '*',
                          'ArrayCards.Remove',
                        ])
                        const oldMoveDownNode = findNodeByComponentPath(node, [
                          'ArrayCards',
                          '*',
                          'ArrayCards.MoveDown',
                        ])
                        const oldMoveUpNode = findNodeByComponentPath(node, [
                          'ArrayCards',
                          '*',
                          'ArrayCards.MoveUp',
                        ])
                        if (!oldRemoveNode) {
                          ensureObjectItemsNode(node).append(
                            new TreeNode({
                              componentName: node.componentName,
                              props: {
                                type: 'void',
                                'x-component': 'ArrayCards.Remove',
                              },
                            })
                          )
                        }
                        if (!oldMoveDownNode) {
                          ensureObjectItemsNode(node).append(
                            new TreeNode({
                              componentName: node.componentName,
                              props: {
                                type: 'void',
                                'x-component': 'ArrayCards.MoveDown',
                              },
                            })
                          )
                        }
                        if (!oldMoveUpNode) {
                          ensureObjectItemsNode(node).append(
                            new TreeNode({
                              componentName: node.componentName,
                              props: {
                                type: 'void',
                                'x-component': 'ArrayCards.MoveUp',
                              },
                            })
                          )
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
      Behavior: createArrayBehavior('ArrayCards'),
      Resource: createResource({
        icon: 'ArrayCardsSource',
        elements: [
          {
            componentName: 'Field',
            props: {
              type: 'array',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayCards',
              'x-component-props': {
                title: `Title`,
              },
            },
          },
        ],
      }),
      Addition: ArrayBase.Addition,
      Index: ArrayBase.Index,
      Item: ArrayBase.Item,
      MoveDown: ArrayBase.MoveDown,
      MoveUp: ArrayBase.MoveUp,
      Remove: ArrayBase.Remove,
      SortHandle: ArrayBase.SortHandle,
    }
  )
