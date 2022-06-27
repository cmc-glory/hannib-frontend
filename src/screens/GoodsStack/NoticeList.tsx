import React, {useCallback} from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import moment from 'moment'
import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'

type NoticeListItemProps = {
  onPressItem: () => void
}

const NoticeListItem = ({onPressItem}: NoticeListItemProps) => {
  return (
    <Pressable style={[styles.NotificationItemContaienr, {backgroundColor: theme.main50}]} onPress={onPressItem}>
      <View style={[styles.NotificationItemHeaderView]}>
        <Text style={[styles.NotificationItemHeaderText]}>춤추는 고양이</Text>
        <Text style={[styles.NotificationItemHeaderText]}>{moment().format('YYYY.MM.DD HH:mm')}</Text>
      </View>
      <View>
        <Text style={[theme.styles.bold16, {color: theme.gray700}]}>우편 발송 공지사항</Text>
      </View>
    </Pressable>
  )
}

export const NoticeList = () => {
  const navigation = useNavigation()
  const onPressItem = useCallback(() => {
    navigation.navigate('NotificationStackNavigator', {
      screen: 'NotificationContent',
      params: {
        postid: '11111',
      },
    })
  }, [])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="공지사항" goBack />
      <NoticeListItem onPressItem={onPressItem} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  NotificationItemContaienr: {
    paddingHorizontal: theme.PADDING_SIZE,
    backgroundColor: theme.white,
    paddingVertical: theme.PADDING_SIZE,
    borderBottomWidth: 1,
    height: 84,
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
