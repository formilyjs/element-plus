import { clone, uid } from '@formily/shared'
import { createForm, isVoidField, DataField } from '@formily/core'
import { createSchemaField, ISchema } from '@formily/vue'
import { GlobalRegistry } from '@designable/core'
import { requestIdle } from '@designable/shared'
import { usePrefix, TextWidget, defineComponent } from '@formily/element-plus-prototypes'
import { MonacoInput } from '@formily/element-plus-settings-form'
import { markRaw, ref, watch } from 'vue'

import { Form, ArrayTable, Input, Select, FormItem, FormCollapse } from '@formily/element-plus'
import { ElDialog as Modal, ElCard as Card, ElButton as Button, ElTag as Tag, ElTooltip as Tooltip, ElSpace } from 'element-plus'
import { PathSelector } from './PathSelector'
import { FieldPropertySetter } from './FieldPropertySetter'
import { FulfillRunHelper } from './helpers'
import { IReaction } from './types'
import { initDeclaration } from './declarations'
import './styles.less'

export interface IReactionsSetterProps {
    value?: IReaction
    onChange?: (value: IReaction) => void
}

const TypeView = defineComponent({
    props: { value: { type: String } },
    setup(props) {
        return () => {
            const value = props.value
            const text = String(value)
            if (text.length <= 26)
                return (
                    <Tag effect="plain" type="info">
                        {text}
                    </Tag>
                )
            return (
                <Tag effect="plain" type="info">
                    <Tooltip
                        v-slots={{
                            content: (
                                <div style={{ fontSize: 12 }}>
                                    <code>
                                        <pre style={{ whiteSpace: 'pre-wrap', padding: 0, margin: 0 }}>{text}</pre>
                                    </code>
                                </div>
                            )
                        }}
                    >
                        {text.substring(0, 24)}...
                    </Tooltip>
                </Tag>
            )
        }
    }
})

const { SchemaField } = createSchemaField({
    components: {
        Card,
        FormCollapse,
        Input,
        TypeView,
        Select,
        FormItem,
        PathSelector,
        FieldPropertySetter,
        ArrayTable,
        MonacoInput
    }
})

const FieldStateProperties = [
    'value',
    'initialValue',
    'inputValue',
    'inputValues',
    'modified',
    'initialized',
    'title',
    'description',
    'mounted',
    'unmounted',
    'active',
    'visited',
    'loading',
    'errors',
    'warnings',
    'successes',
    'feedbacks',
    'valid',
    'invalid',
    'pattern',
    'display',
    'disabled',
    'readOnly',
    'readPretty',
    'visible',
    'hidden',
    'editable',
    'validateStatus',
    'validating'
]

const FieldStateValueTypes = {
    modified: 'boolean',
    initialized: 'boolean',
    title: 'string',
    description: 'string',
    mounted: 'boolean',
    unmounted: 'boolean',
    active: 'boolean',
    visited: 'boolean',
    loading: 'boolean',
    errors: 'string[]',
    warnings: 'string[]',
    successes: 'string[]',
    feedbacks: `Array<
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  type?: 'error' | 'success' | 'warning'
  code?:
    | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages?: string[]
>
`,
    valid: 'boolean',
    invalid: 'boolean',
    pattern: "'editable' | 'disabled' | 'readOnly' | 'readPretty'",
    display: "'visible' | 'hidden' | 'none'",
    disabled: 'boolean',
    readOnly: 'boolean',
    readPretty: 'boolean',
    visible: 'boolean',
    hidden: 'boolean',
    editable: 'boolean',
    validateStatus: "'error' | 'warning' | 'success' | 'validating'",
    validating: 'boolean'
}

export const ReactionsSetter = defineComponent({
    props: { value: { type: [Array, Object] } },
    inheritAttrs: false,
    emits: ['change'],
    setup(props, { emit, attrs }) {
        const modalVisibleRef = ref(false)
        const innerVisibleRef = ref(false)
        const formRef = ref()
        const formCollapseRef = ref()
        const prefixRef = usePrefix('reactions-setter')

        watch(
            [() => props.value, modalVisibleRef],
            () => {
                formRef.value = markRaw(
                    createForm({
                        values: clone(props.value)
                    })
                )
            },
            { immediate: true }
        )

        watch(
            [modalVisibleRef],
            () => {
                formCollapseRef.value = markRaw(FormCollapse.createFormCollapse(['deps', 'state']))
            },
            { immediate: true }
        )

        const openModal = () => (modalVisibleRef.value = true)
        const closeModal = () => (modalVisibleRef.value = false)

        watch(
            modalVisibleRef,
            value => {
                if (value) {
                    requestIdle(
                        () => {
                            initDeclaration().then(() => {
                                innerVisibleRef.value = true
                            })
                        },
                        {
                            timeout: 400
                        }
                    )
                } else {
                    innerVisibleRef.value = false
                }
            },
            { immediate: true }
        )

        return () => {
            const innerVisible = innerVisibleRef.value
            const modalVisible = modalVisibleRef.value
            const form = formRef.value
            const formCollapse = formCollapseRef.value
            const prefix = prefixRef.value
            return (
                <>
                    <Button onClick={openModal}>
                        <TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />
                    </Button>
                    <Modal
                        key={modalVisible + ''}
                        {...{ onClosed: closeModal }}
                        v-slots={{
                            title: () => <TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />,
                            footer: () => (
                                <ElSpace>
                                    <Button onClick={closeModal}>Cancel</Button>
                                    <Button
                                        onClick={() => {
                                            form.submit((values: ISchema['x-reactions']) => {
                                                emit('change', values)
                                            })
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
                        width="70%"
                        destroyOnClose
                        top="100px"
                    >
                        <div class={prefix}>
                            {innerVisible && (
                                <Form form={form}>
                                    <SchemaField
                                        schema={{
                                            type: 'object',
                                            properties: {
                                                collapse: {
                                                    type: 'void',
                                                    'x-component': 'FormCollapse',
                                                    'x-component-props': {
                                                        formCollapse,
                                                        defaultActiveKey: ['deps', 'state'],
                                                        style: { marginBottom: '10px' }
                                                    },
                                                    properties: {
                                                        deps: {
                                                            type: 'void',
                                                            'x-component': 'FormCollapse.Item',
                                                            'x-component-props': {
                                                                key: 'deps',
                                                                title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.relationsFields')
                                                            },
                                                            properties: {
                                                                dependencies: {
                                                                    default: [{}],
                                                                    type: 'array',
                                                                    'x-component': 'ArrayTable',
                                                                    'x-component-props': { border: true, fit: true },
                                                                    items: {
                                                                        type: 'object',
                                                                        properties: {
                                                                            column1: {
                                                                                type: 'void',
                                                                                'x-component': 'ArrayTable.Column',
                                                                                'x-component-props': {
                                                                                    title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.sourceField'),
                                                                                    minWidth: 240
                                                                                },
                                                                                properties: {
                                                                                    source: {
                                                                                        'x-decorator': 'FormItem',
                                                                                        'x-component': 'PathSelector',
                                                                                        'x-component-props': {
                                                                                            placeholder: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.pleaseSelect')
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                            column2: {
                                                                                type: 'void',
                                                                                'x-component': 'ArrayTable.Column',
                                                                                'x-component-props': {
                                                                                    title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.sourceProperty'),
                                                                                    minWidth: 200
                                                                                },
                                                                                properties: {
                                                                                    property: {
                                                                                        default: 'value',
                                                                                        'x-decorator': 'FormItem',
                                                                                        'x-component': 'Select',
                                                                                        'x-component-props': {
                                                                                            showSearch: true
                                                                                        },
                                                                                        enum: FieldStateProperties
                                                                                    }
                                                                                }
                                                                            },
                                                                            column3: {
                                                                                type: 'void',
                                                                                'x-component': 'ArrayTable.Column',
                                                                                'x-component-props': {
                                                                                    title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.variableName'),
                                                                                    minWidth: 200
                                                                                },
                                                                                properties: {
                                                                                    name: {
                                                                                        'x-decorator': 'FormItem',
                                                                                        'x-validator': {
                                                                                            pattern: /^[$_a-zA-Z]+[$_a-zA-Z0-9]*$/,
                                                                                            message: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.variableNameValidateMessage')
                                                                                        },
                                                                                        'x-component': 'Input',
                                                                                        'x-component-props': {
                                                                                            placeholder: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.pleaseInput')
                                                                                        },
                                                                                        'x-content': { prepend: '$deps.' },
                                                                                        'x-reactions': (field: DataField) => {
                                                                                            if (isVoidField(field)) return
                                                                                            field.query('.source').take(source => {
                                                                                                if (isVoidField(source)) return
                                                                                                if (source.value && !field.value && !field.modified) {
                                                                                                    field.value = source.inputValues[1]?.props?.name || `v_${uid()}`
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                            column4: {
                                                                                type: 'void',
                                                                                'x-component': 'ArrayTable.Column',
                                                                                'x-component-props': {
                                                                                    title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.variableType'),
                                                                                    ellipsis: {
                                                                                        showTitle: false
                                                                                    },
                                                                                    minWidth: 200,
                                                                                    align: 'center'
                                                                                },
                                                                                properties: {
                                                                                    type: {
                                                                                        default: 'any',
                                                                                        'x-component': 'TypeView',
                                                                                        'x-reactions': (field: DataField) => {
                                                                                            if (isVoidField(field)) return
                                                                                            const property = field.query('.property').get('inputValues')
                                                                                            if (!property) return
                                                                                            property[0] = property[0] || 'value'
                                                                                            field.query('.source').take(source => {
                                                                                                if (isVoidField(source)) return
                                                                                                if (source.value) {
                                                                                                    if (property[0] === 'value' || property[0] === 'initialValue' || property[0] === 'inputValue') {
                                                                                                        field.value = source.inputValues[1]?.props?.type || 'any'
                                                                                                    } else if (property[0] === 'inputValues') {
                                                                                                        field.value = `any[]`
                                                                                                    } else if (property[0]) {
                                                                                                        field.value = FieldStateValueTypes[property[0]]
                                                                                                    } else {
                                                                                                        field.value = 'any'
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                            column5: {
                                                                                type: 'void',
                                                                                'x-component': 'ArrayTable.Column',
                                                                                'x-component-props': {
                                                                                    title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.operations'),
                                                                                    align: 'center',
                                                                                    minWidth: 80
                                                                                },
                                                                                properties: {
                                                                                    remove: {
                                                                                        type: 'void',
                                                                                        'x-component': 'ArrayTable.Remove'
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    },
                                                                    properties: {
                                                                        addition: {
                                                                            type: 'void',
                                                                            title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.addRelationField'),
                                                                            'x-component': 'ArrayTable.Addition',
                                                                            'x-component-props': {
                                                                                style: { marginTop: '8px' }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        state: {
                                                            type: 'void',
                                                            'x-component': 'FormCollapse.Item',
                                                            'x-component-props': {
                                                                class: 'reaction-state',
                                                                title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.propertyReactions'),
                                                                key: 'state'
                                                            },
                                                            properties: {
                                                                'fulfill.state': {
                                                                    type: 'object',
                                                                    'x-component': 'FieldPropertySetter'
                                                                }
                                                            }
                                                        },
                                                        run: {
                                                            type: 'void',
                                                            'x-component': 'FormCollapse.Item',
                                                            'x-component-props': {
                                                                key: 'run',
                                                                title: GlobalRegistry.getDesignerMessage('SettingComponents.ReactionsSetter.actionReactions'),
                                                                class: 'reaction-runner'
                                                            },
                                                            properties: {
                                                                'fulfill.run': {
                                                                    type: 'string',
                                                                    'x-component': 'MonacoInput',
                                                                    'x-component-props': {
                                                                        width: '100%',
                                                                        height: 400,
                                                                        language: 'typescript',
                                                                        helpCode: FulfillRunHelper,
                                                                        options: {
                                                                            minimap: {
                                                                                enabled: false
                                                                            }
                                                                        }
                                                                    },
                                                                    'x-reactions': (field: DataField) => {
                                                                        const deps = field.query('dependencies').value()
                                                                        if (Array.isArray(deps)) {
                                                                            field.componentProps.extraLib = `
                                                                        declare var $deps : {
                                                                            ${deps.map(({ name, type }) => {
                                                                                if (!name) return ''
                                                                                return `${name}?:${type || 'any'},`
                                                                            })}
                                                                        }
                                                                        `
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    ></SchemaField>
                                </Form>
                            )}
                        </div>
                    </Modal>
                </>
            )
        }
    }
})
