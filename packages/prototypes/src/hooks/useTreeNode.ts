import { TreeNodeSymbol, useContext } from '../context'

export const useTreeNode = () => {
  return useContext(TreeNodeSymbol)
}
