import { ElTree as Tree, ElButton as Button, } from 'element-plus'
import { uid } from '@formily/shared'
import { observer } from '@formily/reactive-vue'
import { defineComponent, IconWidget, TextWidget, usePrefix } from '@formily/element-plus-prototypes'
import { Title } from './Title'
import { Header } from './Header'
import { traverseTree } from './shared'
import { ITreeDataSource, INodeItem } from './types'
import './styles.less'
import { GlobalRegistry } from '@designable/core'
import { PropType } from 'vue'

import type { TreeComponentProps as TreeProps } from 'element-plus/es/components/tree/src/tree.type'

const limitTreeDrag = ({ dropPosition }) => {
    if (dropPosition === 0) {
        return false
    }
    return true
}

export interface ITreePanelProps {
    treeDataSource: ITreeDataSource
    allowTree: boolean
    defaultOptionValue: {
        label: string
        value: any
    }[]
}

export const TreePanel = observer(
    defineComponent({
        props: {
            treeDataSource: { type: Object as PropType<ITreePanelProps['treeDataSource']> },
            allowTree: { type: Boolean as PropType<ITreePanelProps['allowTree']> },
            defaultOptionValue: { type: Object as PropType<ITreePanelProps['defaultOptionValue']> }
        },
        setup(props) {
            const prefix = usePrefix('data-source-setter')
            // const dropHandler = (info: Parameters<TreeProps['onNode-drop']>[0]) => {
            //     const dropKey = info.node?.key
            //     const dragKey = info.dragNode?.key
            //     const dropPos = info.node.pos.split('-')
            //     const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
            //     const data = [...props.treeDataSource.dataSource]
            //     // Find dragObject
            //     let dragObj: INodeItem
            //     traverseTree(data, (item, index, arr) => {
            //         if (arr[index].key === dragKey) {
            //             arr.splice(index, 1)
            //             dragObj = item
            //         }
            //     })
            //     if (!info.dropToGap) {
            //         traverseTree(data, (item) => {
            //             if (item.key === dropKey) {
            //                 item.children = item.children || []
            //                 item.children.unshift(dragObj)
            //             }
            //         })
            //     } else if (
            //         (info.node.children || []).length > 0 &&
            //         info.node.expanded &&
            //         dropPosition === 1
            //     ) {
            //         traverseTree(data, (item) => {
            //             if (item.key === dropKey) {
            //                 item.children = item.children || []
            //                 item.children.unshift(dragObj)
            //             }
            //         })
            //     } else {
            //         let ar: any[]
            //         let i: number
            //         traverseTree(data, (item, index, arr) => {
            //             if (item.key === dropKey) {
            //                 ar = arr
            //                 i = index
            //             }
            //         })
            //         if (dropPosition === -1) {
            //             ar.splice(i, 0, dragObj)
            //         } else {
            //             ar.splice(i + 1, 0, dragObj)
            //         }
            //     }
            //     props.treeDataSource.dataSource = data
            // }
            return () => {
                return <>
                    <Header
                        title={
                            <TextWidget token="SettingComponents.DataSourceSetter.dataSourceTree" />
                        }
                        extra={
                            <Button
                                text={true}
                                onClick={() => {
                                    const uuid = uid()
                                    const dataSource = props.treeDataSource!.dataSource
                                    const initialKeyValuePairs = props.defaultOptionValue?.map(
                                        (item) => ({ ...item })
                                    ) || [
                                            {
                                                label: 'label',
                                                value: `${GlobalRegistry.getDesignerMessage(
                                                    `SettingComponents.DataSourceSetter.item`
                                                )} ${dataSource.length + 1}`,
                                            },
                                            { label: 'value', value: uuid },
                                        ]
                                    props.treeDataSource!.dataSource = dataSource.concat({
                                        key: uuid,
                                        duplicateKey: uuid,
                                        map: initialKeyValuePairs,
                                        children: [],
                                    })
                                }}
                                icon={<IconWidget infer="Add" />}
                            >
                                <TextWidget token="SettingComponents.DataSourceSetter.addNode" />
                            </Button>
                        }
                    />
                    <div class={`${prefix + '-layout-item-content'}`}>
                        <Tree
                            draggable={true}
                            allowDrop={props.allowTree ? () => true : limitTreeDrag}
                            defaultExpandAll
                            autoExpandParent
                            data={props.treeDataSource!.dataSource}
                            {...{
                                'onNode-drag-enter': () => { },
                                'onNode-drop': () => { },
                                "onNode-click": (node, treenode, event) => {
                                    const { key } = node
                                    props.treeDataSource!.selectedKey = key.toString()
                                },

                            }}
                            // titleRender={(titleProps: INodeItem) => {
                            //     return (
                            //         <Title
                            //             {...titleProps}
                            //             treeDataSource={props.treeDataSource}
                            //         ></Title>
                            //     )
                            // }}
                            // onSelect={(selectedKeys: string) => {
                            //     if (selectedKeys[0]) {
                            //         props.treeDataSource!.selectedKey = selectedKeys[0].toString()
                            //     }
                            // }}
                            v-slots={{
                                default: ({ data: titleProps }: { data: INodeItem },) => {
                                    return (
                                        <Title
                                            {...titleProps}
                                            treeDataSource={props.treeDataSource}
                                        ></Title>
                                    )
                                }
                            }}
                        ></Tree>
                    </div>
                </>
            }
        }
    })
)
