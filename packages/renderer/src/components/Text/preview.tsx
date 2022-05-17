import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import type { CSSProperties } from '@vue/runtime-dom'
import { DnFC } from '@formily/element-plus-prototypes'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import cls from 'classnames'
import './styles.less'
import { defineComponent } from 'vue-demi'

export interface IDesignableTextProps {
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
  style?: CSSProperties
  className?: string
}

export const Text: DnFC<IDesignableTextProps> = composeExport(
  defineComponent({
    props: ['mode', 'content'],
    setup(props, { attrs }) {
      const TagName =
        props.mode === 'normal' || !props.mode ? 'div' : props.mode
      return () => {
        return (
          <TagName
            class={cls('dn-text')}
            {...{
              ...attrs,
              ...props,
              'data-content-editable': 'x-component-props.content',
            }}
          >
            {props.content}
          </TagName>
        )
      }
    },
  }),
  {
    Behavior: createBehavior({
      name: 'Text',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Text',
      designerProps: {
        propsSchema: createVoidFieldSchema(AllSchemas.Text),
      },
      designerLocales: AllLocales.Text,
    }),

    Resource: createResource({
      icon: 'TextSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Text',
          },
        },
      ],
    }),
  }
)
