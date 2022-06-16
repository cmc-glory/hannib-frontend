import React, {useCallback} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'

const NotificationItem = () => {
  const navigation = useNavigation()
  const onPress = useCallback(() => {
    navigation.navigate('NotificationContent')
  }, [])
  return (
    <Pressable style={[styles.NotificationItemContaienr]} onPress={onPress}>
      <View style={[styles.NotificationItemHeaderView]}>
        <Text style={[styles.NotificationItemHeaderText]}>춤추는 고양이</Text>
        <Text style={[styles.NotificationItemHeaderText]}>2022.06.15 18:00</Text>
      </View>
      <View>
        <Text style={[styles.NotificationItemContentText]}>우편 발송 공지사항</Text>
      </View>
    </Pressable>
  )
}

export const NotificationList = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="알림" goBack />
      <ScrollView>
        <View style={[styles.guideView, theme.styles.wrapper]}>
          <Text style={[styles.guideText]}>* 30일이 지난 알림은 자동으로 삭제됩니다</Text>
        </View>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {},
  guideText: {
    color: theme.secondary,
  },
  guideView: {
    height: 60,
    justifyContent: 'center',
  },
  NotificationItemContaienr: {
    backgroundColor: theme.main50,
    height: 84,
    padding: theme.PADDING_SIZE,
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
