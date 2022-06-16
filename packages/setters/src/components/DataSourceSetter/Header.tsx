import { observer } from '@formily/reactive-vue'
import { usePrefix } from '@formily/element-plus-prototypes'
import './styles.less'
import { defineComponent, VNode } from 'vue'

export interface IHeaderProps {
    extra: VNode | null
    title: VNode | string
}

export const Header = observer(defineComponent({
    inheritAttrs: false,
    props: ['title', 'extra'],
    setup(props) {
        const prefixRef = usePrefix('data-source-setter')
        return () => {
            const prefix = prefixRef.value
            return (
                <div class={`${prefix + '-layout-item-header'}`}>
                    <div class={`${prefix + '-layout-item-title'}`}>{props.title}</div>
                    {props.extra}
                </div>
            )
        }
    }
}))