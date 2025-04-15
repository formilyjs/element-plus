import { defineComponent, getCurrentInstance, onBeforeUnmount } from 'vue'
import { h, Fragment } from '@formily/vue'
export interface IPortalProps {
  id?: string | symbol
}

const PortalMap = new Map<string | symbol, any>()

export const createPortalProvider = (id: string | symbol) => {
  const Portal = defineComponent({
    name: 'PortalProvider',
    props: {
      id: {
        type: [String, Symbol],
        default: id,
      },
    },

    setup(props, { slots }) {
      const { appContext } = getCurrentInstance()

      if (props.id && !PortalMap.has(props.id)) {
        PortalMap.set(props.id, appContext)
      }

      onBeforeUnmount(() => {
        const { id } = props
        if (id && PortalMap.has(id)) {
          PortalMap.delete(id)
        }
      })

      return () => h(Fragment, {}, slots)
    },
  })

  return Portal
}

export function getPortalContext(id: string | symbol) {
  return PortalMap.get(id)
}
