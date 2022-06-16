import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'

const NotificationItem = () => {
  return (
    <View style={[styles.NotificationItemContaienr]}>
      <View>
        <Text style={[theme.styles.bold16, {color: theme.gray700}]}>우편 발송 공지사항</Text>
      </View>
      <View style={[styles.NotificationItemHeaderView]}>
        <Text style={[styles.NotificationItemHeaderText]}>춤추는 고양이</Text>
        <Text style={[styles.NotificationItemHeaderText]}>2022.06.15 18:00</Text>
      </View>
    </View>
  )
}

export const NotificationContent = () => {
  return (
    <SafeAreaView>
      <StackHeader title="알림" goBack />
      <View style={[theme.styles.wrapper]}>
        <NotificationItem />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  NotificationItemContaienr: {
    backgroundColor: theme.white,
    height: 84,
    paddingVertical: theme.PADDING_SIZE,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.gray200,
    justifyContent: 'space-between',
  },
  NotificationItemHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NotificationItemHeaderText: {
    color: theme.gray500,
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
  },
  NotificationItemContentText: {
    color: theme.gray700,
  },
})
