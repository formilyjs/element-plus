import { TextWidget, usePrefix } from '@formily/element-plus-prototypes'
import { ElMenu as Menu, ElMenuItem as MenuItem } from 'element-plus'
import { MonacoInput } from '@formily/element-plus-settings-form'
import { isPlainObj, reduce } from '@formily/shared'
import { FieldProperties } from './properties'
import { defineComponent, ref } from 'vue'

export interface IFieldProperty {
    [key: string]: string
}

export interface IFieldPropertySetterProps {
    extraLib?: string
    value?: IFieldProperty
    onChange?: (value: IFieldProperty) => void
}

const template = (code: string) => {
    if (!code) return
    return code.trim()
}

export const FieldPropertySetter = defineComponent({
    props: { value: { type: Object }, extraLib: {} },
    emits: ['change'],
    setup(props, { emit }) {
        const selectKeyRef = ref('visible')
        const setSelectKey = (value: string) => (selectKeyRef.value = value)
        const prefixRef = usePrefix('field-property-setter')

        const parseExpression = (expression: string) => {
            if (!expression) return ''
            return String(expression).match(/^\{\{([\s\S]*)\}\}$/)?.[1] || ''
        }

        const filterEmpty = (value: object) => {
            return reduce(
                value,
                (buf, value, key) => {
                    if (!value || value === '{{}}') return buf
                    buf[key] = value
                    return buf
                },
                {} as Record<string, any>
            )
        }

        return () => {
            const prefix = prefixRef.value
            const value = { ...props.value }
            const selectKey = selectKeyRef.value
            const currentProperty = FieldProperties.find(item => item.key === selectKey)
            return (
                <div class={prefix}>
                    <Menu
                        mode="vertical"
                        style={{
                            width: '200px',
                            height: '300px',
                            paddingRight: '4px',
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}
                        defaultActive={selectKey}
                        onSelect={selectedKey => {
                            setSelectKey(selectedKey)
                        }}
                    >
                        {FieldProperties.map(key => {
                            if (isPlainObj(key)) {
                                return (
                                    <MenuItem index={key.key}>
                                        <TextWidget token={`SettingComponents.ReactionsSetter.${key.token || key.key}`} />
                                    </MenuItem>
                                )
                            }
                            return (
                                <MenuItem index={key}>
                                    <TextWidget token={`SettingComponents.ReactionsSetter.${key}`} />
                                </MenuItem>
                            )
                        })}
                    </Menu>
                    <div class={prefix + '-coder-wrapper'}>
                        <div class={prefix + '-coder-start'}>
                            {`$self.${selectKey} = (`}
                            <span
                                style={{
                                    fontSize: 14,
                                    marginLeft: 10,
                                    color: '#888',
                                    fontWeight: 'normal'
                                }}
                            >
                                {'//'} <TextWidget token="SettingComponents.ReactionsSetter.expressionValueTypeIs" /> {'`'}
                                {currentProperty?.type}
                                {'`'}
                            </span>
                        </div>
                        <div class={prefix + '-coder'}>
                            <MonacoInput
                                key={selectKey}
                                language="javascript.expression"
                                extraLib={props.extraLib as string}
                                helpCode={template(currentProperty?.helpCode)}
                                value={parseExpression(value[selectKey])}
                                height={226}
                                options={{
                                    lineNumbers: 'off',
                                    wordWrap: 'on',
                                    glyphMargin: false,
                                    folding: false,
                                    lineDecorationsWidth: 0,
                                    lineNumbersMinChars: 0,
                                    minimap: {
                                        enabled: false
                                    }
                                }}
                                onChange={expression => {
                                    emit(
                                        'change',
                                        filterEmpty({
                                            ...value,
                                            [selectKey]: `{{${expression}}}`
                                        })
                                    )
                                }}
                            />
                        </div>
                        <div class={prefix + '-coder-end'}>{`)`}</div>
                    </div>
                </div>
            )
        }
    }
})
