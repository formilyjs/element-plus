import { IconWidget } from '@formily/element-plus-prototypes'
import { defineComponent } from 'vue-demi'
import { BoxStyleSetter } from '../BoxStyleSetter'
export interface IBorderRadiusStyleSetterProps {
  value?: string
  onChange?: (value: string) => void
}

export const BorderRadiusStyleSetter =
  defineComponent({
    props: { value: String },
    setup(props, { emit }) {
      return () => {
        return (
          <BoxStyleSetter
            value={props.value}
            onChange={(value: any) => emit('change', value)}
            labels={[
              <IconWidget infer="TopLeft" size={16} key="1" />,
              <IconWidget infer="TopRight" size={16} key="2" />,
              <IconWidget infer="BottomRight" size={16} key="3" />,
              <IconWidget infer="BottomLeft" size={16} key="4" />,
            ]}
          />
        )
      }
    },
  })
