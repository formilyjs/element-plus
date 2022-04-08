import { FormProvider, Fragment, h } from '@formily/vue'
import { toJS } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { createForm, Form, IFormProps } from '@formily/core'
import {
  isNum,
  isStr,
  isBool,
  isFn,
  IMiddleware,
  applyMiddleware,
} from '@formily/shared'
import { ElDrawer, ElButton } from 'element-plus'
import type {
  ElDrawer as ElDrawerProps,
  ElButton as ElButtonProps,
} from 'element-plus'

// import { t } from 'element-plus/lib/locale'
import { Component, VNode, defineComponent, Teleport, createApp } from 'vue'
import {
  isValidElement,
  resolveComponent,
  createPortalProvider,
  getPortalContext,
  loading,
  stylePrefix,
} from '../__builtins__'

type FormDrawerContentProps = { form: Form }

type FormDrawerContent = Component | ((props: FormDrawerContentProps) => VNode)

type DrawerTitle = string | number | Component | VNode | (() => VNode)

type IFormDrawerProps = Omit<typeof ElDrawerProps, 'title'> & {
  title?: DrawerTitle
  footer?: null | Component | VNode | (() => VNode)
  cancelText?: string | Component | VNode | (() => VNode)
  cancelButtonProps?: typeof ElButtonProps
  okText?: string | Component | VNode | (() => VNode)
  okButtonProps?: typeof ElButtonProps
  beforeClose?: (cb: Function) => void
  onOpen?: () => void
  onOpend?: () => void
  onClose?: () => void
  onClosed?: () => void
  onCancel?: () => void
  onOK?: () => void
  loadingText?: string
}

const PORTAL_TARGET_NAME = 'FormDrawerFooter'

const isDrawerTitle = (props: any): props is DrawerTitle => {
  return isNum(props) || isStr(props) || isBool(props) || isValidElement(props)
}

const getDrawerProps = (props: any): IFormDrawerProps => {
  if (isDrawerTitle(props)) {
    return {
      title: props,
    } as IFormDrawerProps
  } else {
    return props
  }
}

export interface IFormDrawer {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDrawer
  forConfirm(middleware: IMiddleware<IFormProps>): IFormDrawer
  forCancel(middleware: IMiddleware<IFormProps>): IFormDrawer
  open(props?: IFormProps): Promise<any>
  close(): void
}

export interface IFormDrawerComponentProps {
  content: FormDrawerContent
  resolve: () => any
  reject: () => any
}

export function FormDrawer(
  title: IFormDrawerProps | DrawerTitle,
  content: FormDrawerContent
): IFormDrawer

export function FormDrawer(
  title: IFormDrawerProps | DrawerTitle,
  id: string | symbol,
  content: FormDrawerContent
): IFormDrawer

export function FormDrawer(
  title: DrawerTitle,
  id: string,
  content: FormDrawerContent
): IFormDrawer

export function FormDrawer(
  title: IFormDrawerProps | DrawerTitle,
  id: string | symbol | FormDrawerContent,
  content?: FormDrawerContent
): {
  forOpen: (middleware: IMiddleware<IFormProps>) => {
    forOpen: (middleware: IMiddleware<IFormProps>) => any
    forConfirm: (middleware: IMiddleware<Form>) => any
    close: () => void
    open: (props: IFormProps) => never
    forCancel: (middleware: IMiddleware<Form>) => any
  }
  forConfirm: (middleware: IMiddleware<Form>) => {
    forOpen: (middleware: IMiddleware<IFormProps>) => any
    forConfirm: (middleware: IMiddleware<Form>) => any
    close: () => void
    open: (props: IFormProps) => never
    forCancel: (middleware: IMiddleware<Form>) => any
  }
  close: () => void
  open: (props: IFormProps) => never
  forCancel: (middleware: IMiddleware<Form>) => {
    forOpen: (middleware: IMiddleware<IFormProps>) => any
    forConfirm: (middleware: IMiddleware<Form>) => any
    close: () => void
    open: (props: IFormProps) => never
    forCancel: (middleware: IMiddleware<Form>) => any
  }
} {
  if (isFn(id) || isValidElement(id)) {
    content = id as FormDrawerContent
    id = 'form-drawer'
  }

  const prefixCls = `${stylePrefix}-form-drawer`
  const env = {
    root: document.createElement('div'),
    form: null,
    promise: null,
    app: null,
    instance: null,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  }

  document.body.appendChild(env.root)

  const props = getDrawerProps(title)
  const drawerProps = {
    ...props,
    onClosed: () => {
      props.onClosed?.()
      env.app.unmount()
      env.app = null
      env.instance = null
      env.root?.parentNode?.removeChild(env.root)
      env.root = undefined
    },
  }

  const component = observer(
    defineComponent({
      setup() {
        return () =>
          h(
            Fragment,
            {},
            {
              default: () =>
                resolveComponent(content, {
                  form: env.form,
                }),
            }
          )
      },
    })
  )

  const render = (visible = true, resolve?: () => any, reject?: () => any) => {
    if (!env.instance) {
      const ComponentConstructor = defineComponent({
        props: ['drawerProps'],
        data() {
          return {
            visible: false,
          }
        },
        render() {
          const {
            onClose,
            onClosed,
            onOpen,
            onOpend,
            onOK,
            onCancel,
            title,
            footer,
            okText,
            cancelText,
            okButtonProps,
            cancelButtonProps,
            ...drawerProps
          } = this.drawerProps
          return h(
            FormProvider,
            {
              form: env.form,
            },
            {
              default: () =>
                h(
                  ElDrawer,
                  {
                    class: `${prefixCls}`,
                    ...drawerProps,
                    modelValue: this.visible,
                    'onUpdate:modelValue': (val) => {
                      this.visible = val
                    },
                    onClose: () => {
                      onClose?.()
                    },
                    onClosed: () => {
                      onClosed?.()
                    },
                    onOpen: () => {
                      onOpen?.()
                    },
                    onOpened: () => {
                      onOpend?.()
                    },
                  },
                  {
                    default: () => [
                      h(
                        'div',
                        {
                          class: [`${prefixCls}-body`],
                        },
                        [h(component, {}, {})] as any
                      ),
                      h(
                        'div',
                        {
                          class: [`${prefixCls}-footer`],
                        },
                        {
                          default: () => {
                            const FooterPortalTarget = h(
                              'span',
                              {
                                id: PORTAL_TARGET_NAME,
                              },
                              {}
                            )

                            if (footer === null) {
                              return [null, FooterPortalTarget]
                            } else if (footer) {
                              return [
                                resolveComponent(footer),
                                FooterPortalTarget,
                              ]
                            }

                            return [
                              h(
                                ElButton,
                                {
                                  ...cancelButtonProps,
                                  onClick: (e: MouseEvent) => {
                                    onCancel?.(e)
                                    reject()
                                  },
                                },
                                {
                                  default: () =>
                                    resolveComponent(
                                      cancelText || '取消'
                                      // t('el.popconfirm.cancelButtonText')
                                    ),
                                }
                              ),
                              h(
                                ElButton,
                                {
                                  type: 'primary',
                                  ...okButtonProps,
                                  onClick: (e: MouseEvent) => {
                                    onOK?.(e)
                                    resolve()
                                  },
                                },
                                {
                                  default: () =>
                                    resolveComponent(
                                      okText || '确定'
                                      // t('el.popconfirm.confirmButtonText')
                                    ),
                                }
                              ),
                              FooterPortalTarget,
                            ]
                          },
                        }
                      ),
                    ],
                    title: () =>
                      h('div', {}, { default: () => resolveComponent(title) }),
                  }
                ),
            }
          )
        },
      })
      env.app = createApp(ComponentConstructor, {
        drawerProps,
        parent: getPortalContext(id as string | symbol),
      })
      env.instance = env.app.mount(env.root)
    }
    env.instance.visible = visible
  }

  const formDrawer = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forConfirm: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forCancel: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware)
      }
      return formDrawer
    },
    open: (props: IFormProps) => {
      if (env.promise) return env.promise

      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(drawerProps.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares)
          )
          env.form = env.form || createForm(props)
        } catch (e) {
          reject(e)
        }

        render(
          true,
          () => {
            env.form
              .submit(async () => {
                await applyMiddleware(env.form, env.confirmMiddlewares)
                resolve(toJS(env.form.values))
                if (drawerProps.beforeClose) {
                  setTimeout(() => {
                    drawerProps.beforeClose(() => {
                      formDrawer.close()
                    })
                  })
                } else {
                  formDrawer.close()
                }
              })
              .catch(reject)
          },
          async () => {
            await loading(drawerProps.loadingText, () =>
              applyMiddleware(env.form, env.cancelMiddlewares)
            )

            if (drawerProps.beforeClose) {
              drawerProps.beforeClose(() => {
                formDrawer.close()
              })
            } else {
              formDrawer.close()
            }
          }
        )
      })
      return env.promise
    },
    close: () => {
      if (!env.root) return
      render(false)
    },
  }

  return formDrawer as never
}

const FormDrawerFooter = defineComponent({
  name: 'FFormDrawerFooter',
  setup(props, { slots }) {
    return () => {
      // 临时解决方案
      if (document.querySelector(`#${PORTAL_TARGET_NAME}`)) {
        return h(
          Teleport,
          {
            to: `#${PORTAL_TARGET_NAME}`,
          },
          slots
        )
      } else {
        return null
      }
    }
  },
})

FormDrawer.Footer = FormDrawerFooter
FormDrawer.Portal = createPortalProvider('form-drawer')

export default FormDrawer
