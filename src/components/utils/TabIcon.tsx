import React from 'react'

import HomeUnselectedSvg from '../../assets/Icon/unselected/HouseFilled.svg'
import CommunityUnselectedSvg from '../../assets/Icon/unselected/usersFilled.svg'
import ChattingUnselectedSvg from '../../assets/Icon/unselected/ChatFilled.svg'
import CalendarUnselectedSvg from '../../assets/Icon/unselected/CalenderFilled.svg'
import MyPageUnselectedSvg from '../../assets/Icon/unselected/accountFilled.svg'

import HomeSelectedSvg from '../../assets/Icon/selected/HouseFilled.svg'
import CommunitySelectedSvg from '../../assets/Icon/selected/usersFilled.svg'
import ChattingSelectedSvg from '../../assets/Icon/selected/ChatFilled.svg'
import CalendarSelectedSvg from '../../assets/Icon/selected/CalenderFilled.svg'
import MyPageSelectedSvg from '../../assets/Icon/selected/accountFilled.svg'

type IconPropss = {
  onPress?: () => void
  style?: any
  size?: number
}

import * as theme from '../../theme'

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
export const CalendarIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <CalendarUnselectedSvg width={size} height={size} />
}

export const CalendarIconFocused = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <CalendarSelectedSvg width={size} height={size} />
}

export const AccountIcon = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <MyPageUnselectedSvg width={size} height={size} />
}

export const AccountIconFocused = ({onPress, style, size = theme.ICON_SIZE}: IconPropss) => {
  return <MyPageSelectedSvg width={size} height={size} />
}
