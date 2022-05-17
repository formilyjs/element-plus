import { createBehavior } from '@designable/core'
import { createFieldSchema, createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '@formily/element-plus/src/__builtins__'
import { ElButton, ElIcon } from 'element-plus'
import { ArrowUp, ArrowDown, Delete } from '@element-plus/icons-vue'
import { ArrayBase as FArrayBase } from '@formily/element-plus'
export const createArrayBehavior = (name: string) => {
  return createBehavior(
    {
      name,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === name,
      designerProps: {
        droppable: true,
        propsSchema: createFieldSchema(AllSchemas[name]),
      },
      designerLocales: AllLocales[name],
    },
    {
      name: `${name}.Addition`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.Addition`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(AllSchemas[name].Addition),
      },
      designerLocales: AllLocales.ArrayAddition,
    },
    {
      name: `${name}.Remove`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.Remove`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayRemove,
    },
    {
      name: `${name}.Index`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.Index`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayIndex,
    },
    {
      name: `${name}.MoveUp`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.MoveUp`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayMoveUp,
    },
    {
      name: `${name}.MoveDown`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.MoveDown`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === 'ArrayCards'
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayMoveDown,
    }
  )
}

export const ArrayBase =
  composeExport(FArrayBase, {
    Addition: FArrayBase.Addition,
    Index: (props, { attrs }) => (<span {...attrs} > #1. </span>),
    Item: FArrayBase.Item,
    MoveDown: (props, { attrs }) => (<ElButton size='small' {...attrs}><ElIcon><ArrowDown></ArrowDown></ElIcon></ElButton>),
    MoveUp: (props, { attrs }) => (<ElButton size='small' {...attrs}><ElIcon><ArrowUp></ArrowUp></ElIcon></ElButton>),
    Remove: (props, { attrs }) => (<ElButton size='small' {...attrs}><ElIcon><Delete></Delete></ElIcon></ElButton>),
    SortHandle: FArrayBase.SortHandle
  })