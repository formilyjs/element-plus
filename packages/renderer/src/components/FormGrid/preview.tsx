import { FormGrid as FormilyGird } from '@formily/element-plus'
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
import type { VueComponent } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { FragmentComponent as Fragment, h as CreateElement } from '@formily/vue'

type formilyGrid = typeof FormilyGird

export const FormGrid: DnFC<VueComponent<formilyGrid>> & {
  GridColumn?: VueComponent<formilyGrid['GridColumn']>
} = composeExport(
  defineComponent({
    inheritAttrs: false,
    setup(props, { slots, attrs }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps()

      return () => {
        if (nodeRef.value.children.length === 0)
          return <DroppableWidget attrs={attrs} />
        const totalColumns = nodeRef.value.children.reduce(
          (buf, child) =>
            buf + (child.props?.['x-component-props']?.gridSpan ?? 1),
          0
        )
        return (
          <div class="dn-grid" attrs={nodeIdRef.value}>
            <FormilyGird attrs={attrs} key={totalColumns}>
              {slots.default?.()}
            </FormilyGird>
            <LoadTemplate
              actions={[
                {
                  title: nodeRef.value.getMessage('addGridColumn'),
                  icon: 'AddColumn',
                  onClick: () => {
                    const column = new TreeNode({
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'FormGrid.GridColumn',
                      },
                    })
                    nodeRef.value.append(column)
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
              attrs={attrs}
              data-span={props.gridSpan}
              style={{
                gridColumnStart: `span ${props.gridSpan || 1}`,
              }}
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
        selector: (node) => node.props['x-component'] === 'FormGrid',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props['x-component'] !== 'FormGrid',
          propsSchema: createFieldSchema(AllSchemas.FormGrid),
        },
        designerLocales: AllLocales.FormGrid,
      },
      {
        name: 'FormGrid.GridColumn',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormGrid.GridColumn',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props['x-component'] === 'FormGrid',
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
