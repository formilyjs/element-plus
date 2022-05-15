import { defineComponent, computed } from 'vue-demi'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import _ from 'lodash'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export default defineComponent({
  name: 'SchemaEditorWidget',
  props: ['tree'],
  setup(props, { emit }) {
    const code = computed(() => {
      return JSON.stringify(transformToSchema(props.tree), null, 2)
    })

    const handleEmitChanges = _.debounce((value) => {
      emit('change', transformToTreeNode(JSON.parse(value)))
    }, 2000)

    return () => {
      return (
        <Codemirror
          modelValue={code.value}
          extensions={[javascript()]}
          onChange={handleEmitChanges}
          style={{ height: '100%', width: '100%', background: 'var(--dn-composite-panel-tabs-content-bg-color)' }}
          {...{
            tabSize: 4,
            lineNumbers: true,
            line: true,
            mode: 'text/javascript',
          }}
        />
      )
    }
  },
})
