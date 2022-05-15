import { ElButton as Button, ElButtonGroup as ButtonGroup } from 'element-plus'
import { observer } from '@formily/reactive-vue'
import { WorkbenchTypes } from '@designable/core'
import { IconWidget } from '../IconWidget'
import { usePrefix, useWorkbench } from '../../hooks'
import { defineComponent } from 'vue-demi'
import { CSSProperties } from '@vue/runtime-dom'
import cls from 'classnames'

export interface IViewToolsWidget {
  use?: WorkbenchTypes[]
  style?: CSSProperties
  className?: string
}

const VireToolsWidgetComponent = defineComponent({
  props: {
    use: { type: Array, default: () => ['DESIGNABLE', 'JSONTREE', 'PREVIEW'] },
  },
  setup(props) {
    const workbenchRef = useWorkbench()
    const prefixRef = usePrefix('view-tools')

    return () => (
      <ButtonGroup class={cls(prefixRef.value)}>
        {props.use.includes('DESIGNABLE') && (
          <Button
            disabled={workbenchRef.value?.type === 'DESIGNABLE'}
            onClick={() => {
              workbenchRef.value.type = 'DESIGNABLE'
            }}
            size="small"
          >
            <IconWidget infer="Design" />
          </Button>
        )}
        {props.use.includes('JSONTREE') && (
          <Button
            disabled={workbenchRef.value?.type === 'JSONTREE'}
            onClick={() => {
              workbenchRef.value.type = 'JSONTREE'
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
          </Button>
        )}
        {props.use.includes('MARKUP') && (
          <Button
            disabled={workbenchRef.value?.type === 'MARKUP'}
            onClick={() => {
              workbenchRef.value.type = 'MARKUP'
            }}
            size="small"
          >
            <IconWidget infer="Code" />
          </Button>
        )}
        {props.use.includes('PREVIEW') && (
          <Button
            disabled={workbenchRef.value?.type === 'PREVIEW'}
            onClick={() => {
              workbenchRef.value.type = 'PREVIEW'
            }}
            size="small"
          >
            <IconWidget infer="Play" />
          </Button>
        )}
      </ButtonGroup>
    )
  },
})

export const ViewToolsWidget = observer(
  VireToolsWidgetComponent
)
