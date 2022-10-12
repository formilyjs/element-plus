import { connect, mapProps } from '@formily/vue'
import { ElInput } from 'element-plus'
import { Input } from '../input'

export type PasswordProps = typeof ElInput

export const Password = connect(
  Input,
  mapProps((props) => ({
    ...props,
    showPassword: true,
  }))
)

export default Password
