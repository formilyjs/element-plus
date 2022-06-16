import cls from 'classnames'
import { ElDialog as Modal, ElButton as Button, ElSpace } from 'element-plus'
import { Form } from '@formily/core'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { usePrefix, useTheme, TextWidget } from '@formily/element-plus-prototypes'
import { DataSettingPanel } from './DataSettingPanel'
import { TreePanel } from './TreePanel'
import { transformDataToValue, transformValueToData } from './shared'
import { IDataSourceItem, ITreeDataSource } from './types'
import './styles.less'

import { CSSProperties, defineComponent, PropType, ref, watch, markRaw } from 'vue'

export interface IDataSourceSetterProps {
    onChange: (dataSource: IDataSourceItem[]) => void
    value: IDataSourceItem[]
    allowTree?: boolean
    allowExtendOption?: boolean
    defaultOptionValue?: {
        label: string
        value: any
    }[]
    effects?: (form: Form<any>) => void
}
export const DataSourceSetter = observer(
    defineComponent({
        props: {
            value: { type: Array as PropType<IDataSourceSetterProps['value']>, default: () => [] },
            allowTree: { type: Boolean as PropType<IDataSourceSetterProps['allowTree']>, default: true },
            allowExtendOption: { type: Boolean as PropType<IDataSourceSetterProps['allowExtendOption']>, default: true },
            defaultOptionValue: { type: Array as PropType<IDataSourceSetterProps['defaultOptionValue']> },
            effects: { type: Function as PropType<IDataSourceSetterProps['effects']> },
            onChange: { type: Function as PropType<IDataSourceSetterProps['onChange']> }
        },
        inheritAttrs: false,
        emits: ['change'],
        setup(props, { emit }) {
            const theme = useTheme()
            const prefixRef = usePrefix('data-source-setter')
            const modalVisibleRef = ref(false)
            const treeDataSourceRef = ref()
            watch(
                [() => props.value, modalVisibleRef],
                () => {
                    treeDataSourceRef.value = markRaw(
                        observable({
                            dataSource: transformValueToData(props.value),
                            selectedKey: ''
                        })
                    )
                },
                { immediate: true }
            )

            const openModal = () => (modalVisibleRef.value = true)
            const closeModal = () => (modalVisibleRef.value = false)
            return () => {
                const modalVisible = modalVisibleRef.value
                const treeDataSource = treeDataSourceRef.value
                const prefix = prefixRef.value
                return (
                    <>
                        <Button onClick={openModal}>
                            <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
                        </Button>
                        <Modal
                            {...{ onClosed: closeModal }}
                            v-slots={{
                                title: () => <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />,
                                footer: () => (
                                    <ElSpace>
                                        <Button onClick={closeModal}>Canel</Button>
                                        <Button
                                            onClick={() => {
                                                props.onChange?.(transformDataToValue(treeDataSource.dataSource))
                                                closeModal()
                                            }}
                                            type="primary"
                                        >
                                            OK
                                        </Button>
                                    </ElSpace>
                                )
                            }}
                            modelValue={modalVisible}
                            width="65%"
                            destroyOnClose
                        >
                            <div class={`${cls(prefix)} ${prefix + '-' + theme} ${prefix + '-layout'}`}>
                                <div class={`${prefix + '-layout-item left'}`}>
                                    <TreePanel defaultOptionValue={props.defaultOptionValue} allowTree={props.allowTree} treeDataSource={treeDataSource}></TreePanel>
                                </div>
                                <div class={`${prefix + '-layout-item right'}`}>
                                    <DataSettingPanel allowExtendOption={props.allowExtendOption} treeDataSource={treeDataSource} effects={props.effects}></DataSettingPanel>
                                </div>
                            </div>
                        </Modal>
                    </>
                )
            }
        }
    })
)
