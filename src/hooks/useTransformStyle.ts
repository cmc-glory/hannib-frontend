import {useAnimatedStyle} from './useAnimatedStyle'

export const useTransformStyle = (transform: Record<string, any>, deps: any[] = []) => {
  return useAnimatedStyle(
    {
      transform: Object.keys(transform).map(key => ({[key]: transform[key]})),
    },
    deps,
  )
}
