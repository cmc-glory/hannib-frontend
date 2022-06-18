import {useMemo} from 'react'

export const useAnimatedStyle = (style: object, deps: any[] = []) => {
  return useMemo(() => style, deps)
}
