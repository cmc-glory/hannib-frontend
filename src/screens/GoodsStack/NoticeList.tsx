import React, {useCallback} from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery} from 'react-query'
import moment from 'moment'

import {NoticeListRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'
import {queryKeys, getNotices} from '../../api'
import {INoticeDto} from '../../types'

type NoticeListItemProps = {
  item: INoticeDto
}

const NoticeListItem = ({item}: NoticeListItemProps) => {
  return (
    <Pressable style={[styles.NotificationItemContaienr]}>
      <View style={[styles.NotificationItemHeaderView]}>
        <Text style={[styles.NotificationItemHeaderText]}>{item.accountIdx}</Text>
        <Text style={[styles.NotificationItemHeaderText]}>{moment().format('YYYY.MM.DD HH:mm')}</Text>
      </View>
      <View style={{marginBottom: 12}}>
        <Text style={[theme.styles.bold16, {color: theme.gray800, lineHeight: 24}]}>{item.title}</Text>
      </View>
      <View>
        <Text style={styles.contentText}>{item.comments}</Text>
      </View>
    </Pressable>
  )
}

export const NoticeList = () => {
  const navigation = useNavigation()
  const route = useRoute<NoticeListRouteProps>()
  const nanumIdx = route.params.nanumIdx

  const {data} = useQuery(queryKeys.notice, () => getNotices(nanumIdx), {
    onSuccess(data) {
      console.log(data)
    },
  })

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="공지사항" goBack />
      {data != undefined && data.map((item: INoticeDto, index: number) => <NoticeListItem item={item} key={nanumIdx + index} />)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.gray700,
  },
  NotificationItemContaienr: {
    paddingTop: 12,
    paddingHorizontal: theme.PADDING_SIZE,
    backgroundColor: theme.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.gray200,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  NotificationItemHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  NotificationItemHeaderText: {
    color: theme.gray500,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Pretendard-Regular',
  },
  NotificationItemContentText: {
    color: theme.gray700,
  },
})
