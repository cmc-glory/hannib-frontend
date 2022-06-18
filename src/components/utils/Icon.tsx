import React from 'react'
import {StyleProp, ImageStyle, Pressable} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import BellIcon from '../../assets/Icon/Bell.svg'
import ClockIcon from '../../assets/Icon/watch.svg'
import LocationIcon from '../../assets/Icon/Location.svg'
import MagnifierIcon from '../../assets/Icon/Magnifier.svg'
import SettingIcon from '../../assets/Icon/Setting.svg'
import MenuWhiteIcon from '../../assets/Icon/Menu_white.svg'

import * as theme from '../../theme'

type IconProps = {
  uri: string
  style?: any
  size?: number
}

export const Icon = ({uri, style, size = 24}: IconProps) => {
  return <FastImage source={{uri: uri}} style={[style, {width: size, height: size}]} />
}

export const Bell = ({onPress}: {onPress?: () => void}) => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate('NotificationStackNavigator')}>
      <BellIcon width={theme.ICON_SIZE} height={theme.ICON_SIZE} />
    </Pressable>
  )
}

export const Clock = ({onPress, fill = theme.gray800}: {fill?: string; onPress?: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <ClockIcon width={theme.ICON_SIZE} height={theme.ICON_SIZE} />
    </Pressable>
  )
}

export const Location = ({onPress}: {onPress?: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <LocationIcon width={theme.ICON_SIZE} height={theme.ICON_SIZE} />
    </Pressable>
  )
}

export const Magnifier = ({onPress}: {onPress?: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <MagnifierIcon width={theme.ICON_SIZE} height={theme.ICON_SIZE} />
    </Pressable>
  )
}

export const Setting = ({onPress}: {onPress?: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <SettingIcon width={theme.ICON_SIZE} height={theme.ICON_SIZE} />
    </Pressable>
  )
}

export const MenuWhite = ({onPress}: {onPress?: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <MenuWhiteIcon width={theme.ICON_SIZE} height={theme.ICON_SIZE} />
    </Pressable>
  )
}
