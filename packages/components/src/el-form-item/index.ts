import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'

import type { ElFormItem as _ElFormItemProps } from 'element-plus'
import { ElFormItem as ElFormItemComponent } from 'element-plus'

export type ElFormItemProps = typeof _ElFormItemProps & { title: string }

export const ElFormItem = connect(
  ElFormItemComponent,
  mapProps({ title: 'label', required: true }, (props, field) => ({
    error: !isVoidField(field) ? field.selfErrors[0] ?? undefined : undefined,
  }))
)

export default ElFormItem
