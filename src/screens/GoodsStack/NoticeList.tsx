import React, {useState, useCallback} from 'react'
import {View, Pressable, Text, StyleSheet, ScrollView, FlatList, RefreshControl} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useQueryClient} from 'react-query'
import moment from 'moment'

import {NoticeListRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'
import {queryKeys, getNotices} from '../../api'
import NotExistsSvg from '../../assets/Icon/NotExists.svg'
import {INoticeDto} from '../../types'

type NoticeListItemProps = {
  item: INoticeDto
}

const NoticeListItem = ({item}: NoticeListItemProps) => {
  return (
    <Pressable style={[styles.NotificationItemContaienr]}>
      <View style={[styles.NotificationItemHeaderView]}>
        <Text style={[styles.NotificationItemHeaderText]}>{item.creatorId}</Text>
        <Text style={[styles.NotificationItemHeaderText]}>{item.createdDate.slice(0, 16)}</Text>
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
  // ******************** utils ********************
  const navigation = useNavigation()
  const route = useRoute<NoticeListRouteProps>()
  const queryClient = useQueryClient()
  const {nanumIdx, writerAccountIdx} = route.params

  // ******************** states ********************
  const [refreshing, setRefreshing] = useState<boolean>(false)

  // ******************** react queries ********************
  const {data} = useQuery([queryKeys.notice, nanumIdx], () => getNotices(nanumIdx), {
    onSuccess(data) {
      setRefreshing(false)
      console.log(data)
    },
  })

  // ******************** callbacks ********************
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.notice, nanumIdx])
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="공지사항" goBack />
      {data == undefined || data.length == 0 ? (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <NotExistsSvg />
          <View style={styles.emptyResultView}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>등록된 공지가 없습니다.</Text>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          renderItem={({item, index}) => <NoticeListItem item={item} key={nanumIdx + index} />}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  emptyResultView: {
    marginTop: 32,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
