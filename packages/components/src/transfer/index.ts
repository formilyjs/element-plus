import { connect, mapProps } from '@formily/vue'

import { ElTransfer } from 'element-plus'

export type TransferProps = typeof ElTransfer

export const Transfer = connect(
  ElTransfer,
  mapProps({ dataSource: 'data', value: 'modelValue' })
)

export default Transfer
