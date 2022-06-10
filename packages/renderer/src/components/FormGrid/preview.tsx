import { FormGrid as FormilyGird } from '@formily/element-plus/src'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from '@formily/element-plus-prototypes'
import { observer } from '@formily/reactive-vue'
import { LoadTemplate } from '../../common/LoadTemplate'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

import { composeExport } from '@formily/element-plus/src/__builtins__'
import type { DefineComponent, VueComponent } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { FragmentComponent as Fragment, h as CreateElement } from '@formily/vue'
import { VNode } from 'vue'

type formilyGrid = typeof FormilyGird

export const FormGrid = composeExport(
  defineComponent({
    inheritAttrs: false,
    setup(props, { slots, attrs }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps()

      return () => {
        const node = nodeRef.value
        if (!node) return
        if (node.children.length === 0)
          return <DroppableWidget {...attrs} />
        // const totalColumns = node.children.reduce(
        //   (buf, child) =>
        //     buf + (child.props?.['x-component-props']?.gridSpan ?? 1),
        //   0
        // )
        return (
          <div class="dn-grid" {...nodeIdRef.value}>
            <FormilyGird {...attrs}>
              {slots.default?.()}
            </FormilyGird>
            <LoadTemplate
              actions={[
                {
                  title: node.getMessage('addGridColumn'),
                  icon: 'AddColumn',
                  onClick: () => {
                    const column = new TreeNode({
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'FormGrid.GridColumn',
                      },
                    })
                    node.append(column)
                  },
                },
              ]}
            />
          </div>
        )
      }
    },
  }),
  {
    GridColumn: defineComponent({
      props: { gridSpan: { default: 1 } },
      setup(props, { attrs, slots }) {
        return () => {
          return (
            <DroppableWidget
              {...attrs}
              data-grid-span={props.gridSpan}
            >
              {slots.default?.()}
            </DroppableWidget>
          )
        }
      },
    }),
    Behavior: createBehavior(
      {
        name: 'FormGrid',
        extends: ['Field'],
        selector: (node) => node.props?.['x-component'] === 'FormGrid',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props?.['x-component'] !== 'FormGrid',
          propsSchema: createFieldSchema(AllSchemas.FormGrid),
        },
        designerLocales: AllLocales.FormGrid,
      },
      {
        name: 'FormGrid.GridColumn',
        extends: ['Field'],
        selector: (node) => node.props?.['x-component'] === 'FormGrid.GridColumn',
        designerProps: {
          droppable: true,
          resizable: {
            width(node) {
              const span = Number(node.props?.['x-component-props']?.gridSpan ?? 1)
              return {
                plus: () => {
                  if (span + 1 > 12) return
                  node.props['x-component-props'] =
                    node.props?.['x-component-props'] || {}
                  node.props['x-component-props'].gridSpan = span + 1
                },
                minus: () => {
                  if (span - 1 < 1) return
                  node.props['x-component-props'] =
                    node.props['x-component-props'] || {}
                  node.props['x-component-props'].gridSpan = span - 1
                },
              }
            },
          },
          resizeXPath: 'x-component-props.gridSpan',
          resizeStep: 1,
          resizeMin: 1,
          resizeMax: 12,
          allowDrop: (node) => node.props?.['x-component'] === 'FormGrid',
          propsSchema: createFieldSchema(AllSchemas.FormGrid.GridColumn),
        },
        designerLocales: AllLocales.FormGridColumn,
      }
    ),
    Resource: createResource({
      icon: 'GridSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid',
          },
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
          ],
        },
      ],
    }),
  }
)
