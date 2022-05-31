import React from 'react'
import {TouchableOpacity} from 'react-native'
import NotificationIcon from '../../assets/icons/notification_outlined.svg'

const ICON_SIZE = 24

const Notification = () => {
  return (
    <TouchableOpacity>
      <NotificationIcon width={ICON_SIZE} height={ICON_SIZE} fill="#000" />
    </TouchableOpacity>
  )
}

export default Notification
