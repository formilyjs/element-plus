import { createForm } from '@formily/core'
import { Form, FormLayout } from '@formily/element-plus'
import { observe } from '@formily/reactive'
import {
  IconWidget,
  NodePathWidget,
  useCurrentNode,
  useOperation,
  usePrefix,
  useSelected,
  useWorkbench,
  useEffect
} from '@formily/element-plus-prototypes'
import { SchemaField } from './SchemaField'
import { SettingsFormSymbol } from './shared/context'
import { useLocales, useSnapshot } from './effects'
import { ElEmpty as Empty, ElConfigProvider } from 'element-plus'
import cls from 'classnames'
import './styles.less'
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  shallowRef,
  watch,
} from 'vue-demi'
import { cancelIdle, requestIdle } from '@designable/shared'
// eslint-disable-next-line
const GlobalState = {
  idleRequest: null,
}
// className?: string
// style?: CSSProperties
// uploadAction?: string
// components?: Record<string, VueComponent<any>>
// effects?: (form: Form) => void
// scope?: any
function useKeyUp() {
  const keyboardRef = ref(false)

  const listener = () => {
    keyboardRef.value = true
  }
  window.addEventListener('keyup', listener)

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', listener)
  })

  return keyboardRef
}
export const SettingsForm = defineComponent({
  name: 'DnSettingsForm',
  props: ['uploadAction', 'components', 'effects', 'scope', 'headers'],
  inheritAttrs: false,
  setup(props, { attrs }) {
    const workbenchRef = useWorkbench()
    const prefixRef = usePrefix('settings-form')

    const currentWorkspace =
      workbenchRef.value?.activeWorkspace ||
      workbenchRef.value?.currentWorkspace
    const currentWorkspaceId = currentWorkspace?.id

    const operationRef = useOperation(currentWorkspaceId)
    const nodeRef = useCurrentNode(currentWorkspaceId)
    const selectedRef = useSelected(currentWorkspaceId)
    const keyupRef = useKeyUp()
    const idleTaskRef = ref<number>()

    // [node, node?.props, schema, operation, isEmpty]
    const formRef = shallowRef()
    const sourceRef = shallowRef()

    useEffect(() => {
      idleTaskRef.value && cancelIdle(idleTaskRef.value)
      idleTaskRef.value = requestIdle(() => {
        sourceRef.value = {
          key: nodeRef.value.id,
          schema: nodeRef.value?.designerProps?.propsSchema,
          isEmpty: !(
            nodeRef.value &&
            nodeRef.value.designerProps?.propsSchema &&
            selectedRef.value.length === 1
          ),
        }
        formRef.value = createForm({
          initialValues: nodeRef.value?.designerProps?.defaultProps,
          values: nodeRef.value?.props,
          effects(form) {
            useLocales(nodeRef.value)
            useSnapshot(operationRef.value, keyupRef)
            props.effects?.(form)
          },
        })
      })
    }, [nodeRef, () => nodeRef.value?.props, operationRef])

    provide(
      SettingsFormSymbol,
      computed(() => props)
    )

    return () => {
      const prefix = prefixRef.value
      const source = sourceRef.value
      const render = () => {
        if (!source?.isEmpty && formRef.value) {
          return (
            <div class={cls(prefix)} key={source.key}>
              <Form
                key={formRef.value.id}
                form={formRef.value}
              >
                <FormLayout
                  labelCol={9}
                  wrapperCol={24}
                  colon={false}
                  // labelWidth='110px'
                  labelAlign="left"
                  wrapperAlign="right"
                  feedbackLayout="none"
                  tooltipLayout="text">
                  <SchemaField
                    schema={source.schema}
                    components={props.components}
                    scope={props.scope}
                  />
                </FormLayout>
              </Form>
            </div>
          )
        }
        return (
          <div class={prefix + '-empty'}>
            <Empty />
          </div>
        )
      }

      return (
        <IconWidget.Provider props={{ tooltip: true }}>
          <div class={prefix + '-wrapper'} {...attrs}>
            {!source?.isEmpty && (
              <NodePathWidget workspaceId={currentWorkspaceId} />
            )}
            <div class={prefix + '-content'}>{render()}</div>
          </div>
        </IconWidget.Provider>
      )
    }
  },
})
