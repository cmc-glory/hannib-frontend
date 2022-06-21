import React from 'react'
import {StyleProp, ImageStyle, TouchableOpacity, Pressable} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import BellIcon from '../../assets/Icon/Bell.svg'
import ClockIcon from '../../assets/Icon/Time.svg'
import LocationSvg from '../../assets/Icon/Location.svg'
import MagnifierIcon from '../../assets/Icon/Magnifier.svg'
import SettingIcon from '../../assets/Icon/Setting.svg'
import CheckIcon from '../../assets/Icon/check.svg'
import MenuWhiteIcon from '../../assets/Icon/Menu_white.svg'
import DownArrowSvg from '../../assets/Icon/Bottom arrow.svg'
import RightArrowSvg from '../../assets/Icon/Right arrow.svg'
import LeftArrowSvg from '../../assets/Icon/Left arrow.svg'
import ShareSvg from '../../assets/Icon/Share.svg'
import MenuSvg from '../../assets/Icon/Menu.svg'
import HomeUnselectedSvg from '../../assets/Icon/unselected/HouseFilled.svg'
import CommunityUnselectedSvg from '../../assets/Icon/unselected/usersFilled.svg'
import ChattingUnselectedSvg from '../../assets/Icon/unselected/ChatFilled.svg'
import CalendarUnselectedSvg from '../../assets/Icon/unselected/CalenderFilled.svg'
import MyPageUnselectedSvg from '../../assets/Icon/unselected/accountFilled.svg'
import StarUnfilledSvg from '../../assets/Icon/starUnfilled.svg'
import StarFilledSvg from '../../assets/Icon/starFilled.svg'
import CommunicationSvg from '../../assets/Icon/Communication.svg'
import CommunicationWhiteSvg from '../../assets/Icon/CommunicationWhite.svg'
import CheckboxSvg from '../../assets/Icon/Checkbox.svg'
import PlusSvg from '../../assets/Icon/Plus.svg'
import CalendarSvg from '../../assets/Icon/Calender.svg'
import MinusSvg from '../../assets/Icon/Remove.svg'
import HomeSelectedSvg from '../../assets/Icon/selected/HouseFilled.svg'
import CommunitySelectedSvg from '../../assets/Icon/selected/usersFilled.svg'
import ChattingSelectedSvg from '../../assets/Icon/selected/ChatFilled.svg'
import CalendarSelectedSvg from '../../assets/Icon/selected/CalenderFilled.svg'
import MyPageSelectedSvg from '../../assets/Icon/selected/accountFilled.svg'
import XSvg from '../../assets/Icon/Close.svg'
import UpArrowSvg from '../../assets/Icon/UpArrow.svg'
import EmptyCheckboxSvg from '../../assets/Icon/UnCheckbox.svg'

import * as theme from '../../theme'

type IconProps = {
  uri: string
  style?: any
  size?: number
}

type IconPropss = {
  onPress?: () => void
  style?: any
  size?: number
}

export const EmptyCheckboxIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <EmptyCheckboxSvg width={size} height={size} />
    </Pressable>
  )
}

export const UpArrowIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <UpArrowSvg width={size} height={size} />
    </Pressable>
  )
}

export const MinusIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <MinusSvg width={size} height={size} />
    </Pressable>
  )
}

export const CalendarIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <CalendarSvg width={size} height={size} />
    </Pressable>
  )
}

export const PlusIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <PlusSvg width={size} height={size} />
    </Pressable>
  )
}

export const CheckboxIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <CheckboxSvg width={size} height={size} />
    </TouchableOpacity>
  )
}

export const CommunicationIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <CommunicationSvg width={size} height={size} />
    </Pressable>
  )
}

export const CommunicationWhiteIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <CommunicationWhiteSvg width={size} height={size} />
    </Pressable>
  )
}

export const StarFilledIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <StarFilledSvg width={size} height={size} />
    </Pressable>
  )
}

export const StarUnfilledIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <StarUnfilledSvg width={size} height={size} />
    </Pressable>
  )
}

export const Icon = ({uri, style, size = 24}: IconProps) => {
  return <FastImage source={{uri: uri}} style={[style, {width: size, height: size}]} />
}
export const XIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <XSvg width={size} height={size} />
    </Pressable>
  )
}

export const Bell = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate('NotificationStackNavigator')} style={style}>
      <BellIcon width={size} height={size} />
    </Pressable>
  )
}

export const Clock = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <ClockIcon width={size} height={size} />
    </Pressable>
  )
}

export const LocationIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <LocationSvg width={size} height={size} />
    </Pressable>
  )
}

export const Magnifier = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <MagnifierIcon width={size} height={size} />
    </Pressable>
  )
}

export const Setting = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <SettingIcon width={size} height={size} />
    </Pressable>
  )
}

export const CheckCategory = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <CheckIcon width={9} height={9} fill={'#fff'} />
    </Pressable>
  )
}

export const MenuWhite = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <MenuWhiteIcon width={size} height={size} />
    </Pressable>
  )
}

export const DownArrowIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <DownArrowSvg width={size} height={size} />
    </Pressable>
  )
}

export const LeftArrowIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <LeftArrowSvg width={size} height={size} />
    </Pressable>
  )
}

export const RightArrowIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <RightArrowSvg width={size} height={size} />
    </Pressable>
  )
}

export const ShareIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <ShareSvg width={size} height={size} />
    </Pressable>
  )
}

export const MenuIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <MenuSvg width={size} height={size} />
    </Pressable>
  )
}

export const HomeIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <HomeUnselectedSvg width={size} height={size} />
}

export const HomeIconFocused = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <HomeSelectedSvg width={size} height={size} />
}
export const CommunityIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <CommunityUnselectedSvg width={size} height={size} />
}
export const CommunityIconFocused = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <CommunitySelectedSvg width={size} height={size} />
}
export const ChattingIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <ChattingUnselectedSvg width={size} height={size} />
}
export const ChattingIconFocused = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <ChattingSelectedSvg width={size} height={size} />
}
export const CalendarTabIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <CalendarUnselectedSvg width={size} height={size} />
}

export const CalendarTabIconFocused = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <CalendarSelectedSvg width={size} height={size} />
}

export const AccountIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <MyPageUnselectedSvg width={size} height={size} />
}

export const AccountIconFocused = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <MyPageSelectedSvg width={size} height={size} />
}
