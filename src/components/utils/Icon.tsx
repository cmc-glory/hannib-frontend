import React from 'react'
import {StyleProp, ImageStyle} from 'react-native'
import FastImage from 'react-native-fast-image'

type IconProps = {
  uri: string
  style?: any
  size?: number
}

export const Icon = ({uri, style, size = 24}: IconProps) => {
  return <FastImage source={{uri: uri}} style={[style, {width: size, height: size}]} />
}
