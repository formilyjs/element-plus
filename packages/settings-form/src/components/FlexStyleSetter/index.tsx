import { Field, useField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Radio } from './radio'
import { usePrefix, IconWidget } from '@formily/element-plus-prototypes'
import { InputItems } from '../InputItems'
import cls from 'classnames'
import './styles.less'
import { defineComponent, unref } from 'vue-demi'

export const FlexStyleSetter = observer(
  defineComponent({
    props: [],
    setup() {
      const fieldRef = useField()
      const prefixRef = usePrefix('flex-style-setter')
      return () => {
        const field = unref(fieldRef)
        const prefix = unref(prefixRef)
        return (
          <div class={cls(prefix)}>
            <InputItems vertical>
              <Field
                name="flexDirection"
                basePath={field.address.parent()}
                dataSource={[
                  {
                    label: <IconWidget infer="FlexDirectionRow" />,
                    value: 'row',
                  },
                  {
                    label: <IconWidget infer="FlexDirectionColumn" />,
                    value: 'column',
                  },
                ]}
                reactions={(field) => {
                  field.decorator[1].title = `Flex Direction : ${field.value || ''
                    }`
                }}
                decorator={[InputItems.Item]}
                component={[
                  Radio.Group,
                  { optionType: 'button' },
                ]}
              />
              <Field
                name="flexWrap"
                basePath={field.address.parent()}
                dataSource={[
                  {
                    label: <IconWidget infer="FlexNoWrap" />,
                    value: 'nowrap',
                  },
                  {
                    label: <IconWidget infer="FlexWrap" />,
                    value: 'wrap',
                  },
                ]}
                reactions={(field) => {
                  field.decorator[1].title = `Flex Wrap : ${field.value || ''}`
                }}
                decorator={[InputItems.Item]}
                component={[
                  Radio.Group,
                  { optionType: 'button' },
                ]}
              />
              <Field
                name="alignContent"
                basePath={field.address.parent()}
                dataSource={[
                  {
                    label: <IconWidget infer="FlexAlignContentCenter" />,
                    value: 'center',
                  },
                  {
                    label: <IconWidget infer="FlexAlignContentStart" />,
                    value: 'flex-start',
                  },
                  {
                    label: <IconWidget infer="FlexAlignContentEnd" />,
                    value: 'flex-end',
                  },
                  {
                    label: <IconWidget infer="FlexAlignContentSpaceAround" />,
                    value: 'space-around',
                  },
                  {
                    label: <IconWidget infer="FlexAlignContentSpaceBetween" />,
                    value: 'space-between',
                  },
                  {
                    label: <IconWidget infer="FlexAlignContentStretch" />,
                    value: 'stretch',
                  },
                ]}
                reactions={(field) => {
                  field.decorator[1].title = `Align Content : ${field.value || ''
                    }`
                }}
                decorator={[InputItems.Item]}
                component={[
                  Radio.Group,
                  { optionType: 'button' },
                ]}
              />
              <Field
                name="justifyContent"
                basePath={field.address.parent()}
                dataSource={[
                  {
                    label: <IconWidget infer="FlexJustifyCenter" />,
                    value: 'center',
                  },
                  {
                    label: <IconWidget infer="FlexJustifyStart" />,
                    value: 'flex-start',
                  },
                  {
                    label: <IconWidget infer="FlexJustifyEnd" />,
                    value: 'flex-end',
                  },
                  {
                    label: <IconWidget infer="FlexJustifySpaceAround" />,
                    value: 'space-around',
                  },
                  {
                    label: <IconWidget infer="FlexJustifySpaceBetween" />,
                    value: 'space-between',
                  },
                  {
                    label: <IconWidget infer="FlexJustifySpaceEvenly" />,
                    value: 'space-evenly',
                  },
                ]}
                reactions={(field) => {
                  field.decorator[1].title = `Justify Content : ${field.value || ''
                    }`
                }}
                decorator={[InputItems.Item]}
                component={[
                  Radio.Group,
                  { optionType: 'button' },
                ]}
              />
              <Field
                name="alignItems"
                basePath={field.address.parent()}
                dataSource={[
                  {
                    label: <IconWidget infer="FlexAlignItemsCenter" />,
                    value: 'center',
                  },
                  {
                    label: <IconWidget infer="FlexAlignItemsStart" />,
                    value: 'flex-start',
                  },
                  {
                    label: <IconWidget infer="FlexAlignItemsEnd" />,
                    value: 'flex-end',
                  },
                  {
                    label: <IconWidget infer="FlexAlignItemsStretch" />,
                    value: 'stretch',
                  },
                  {
                    label: <IconWidget infer="FlexAlignItemsBaseline" />,
                    value: 'baseline',
                  },
                ]}
                reactions={(field) => {
                  field.decorator[1].title = `Align Items : ${field.value || ''
                    }`
                }}
                decorator={[InputItems.Item]}
                component={[
                  Radio.Group,
                  { optionType: 'button' },
                ]}
              />
            </InputItems>
          </div>
        )
      }
    },
  })
)
