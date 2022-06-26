import React, {useCallback, useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native'
import {useQuery, useMutation, useQueryClient, UseMutateFunction} from 'react-query'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'
import {StackHeader} from '../../components/utils'
import {queryKeys, getNotificationsAll, setNotificationRead} from '../../api'
import * as theme from '../../theme'
import {INotification, INotificationType} from '../../types'

type NotificationItemProps = {
  item: INotification
  mutate: UseMutateFunction<any, unknown, string, unknown>
}

const getNotificationContent = (type: INotificationType, relatedSharingTitle: string) => {
  let content = ''
  switch (type) {
    case '게시글 수정': {
      content = "'" + relatedSharingTitle + "'" + '게시글이 수정되었습니다. 게시글을 확인해 주세요!'
      break
    }
    case '공지사항 등록': {
      content = "'" + relatedSharingTitle + "'" + '에 새로운 공지사항이 등록됐습니다.'
      break
    }
    case '나눔 신청 취소': {
      content = "'" + relatedSharingTitle + "'" + '나눔 신청이 아래와 같은 사유로 취소됐습니다.'
      break
    }
    case '나눔 취소': {
      content = "'" + relatedSharingTitle + "'" + '나눔이 아래와 같은 사유로 취소됐습니다.'
      break
    }
    case '문의글 답변': {
      content = "'" + relatedSharingTitle + "'" + '문의글에 답변이 등록되었습니다.'
      break
    }
    case '문의글 등록': {
      content = "'" + relatedSharingTitle + "'" + '나눔에 새 문의글이 작성되었습니다.'
      break
    }
    case '미수령 알림': {
      content = "'" + relatedSharingTitle + "'" + '미수령 알림'
      break
    }
    case '신고하기로 인한 삭제': {
      content = "'" + relatedSharingTitle + "'" + '게시글이 신고하기를 이유로 삭제되었습니다.'
      break
    }

    case '운송장 등록': {
      content = "'" + relatedSharingTitle + "'" + '이 배송이 시작됐습니다! 운송장을 확인해보세요.'
      break
    }
    default: {
      break
    }
  }
  return content
}

const getNotificationRedirection = (type: INotificationType, relatedSharingid: string) => {
  let instance = undefined
  switch (type) {
    case '게시글 수정': {
      instance = [
        'GoodsStackNavigator',
        {
          screen: 'GoodsDetail',
          params: {
            id: relatedSharingid,
          },
        },
      ]
      break
    }
    case '공지사항 등록': {
      instance = [
        'NotificationContent',
        {
          id: relatedSharingid,
        },
      ]
      break
    }
    case '나눔 신청 취소': {
      break
    }
    case '나눔 취소': {
      break
    }
    case '문의글 답변': {
      instance = [
        'QnAList',
        {
          id: relatedSharingid,
        },
      ]

      break
    }
    case '문의글 등록': {
      instance = [
        'QnAList',
        {
          id: relatedSharingid,
        },
      ]
      break
    }
    case '미수령 알림': {
      break
    }
    case '신고하기로 인한 삭제': {
      break
    }

    case '운송장 등록': {
      instance = [
        'QnAList',
        {
          id: relatedSharingid,
        },
      ]

      break
    }
    default: {
      break
    }
  }
  return instance
}

const NotificationItem = ({item, mutate}: NotificationItemProps) => {
  const navigation = useNavigation()

  const {id, writer, date, type, isRead, relatedSharingTitle, relatedSharingid, cancelReason} = item

  const onPressNotification = useCallback((id: string) => {
    mutate(id)
    const redirectionInstance = getNotificationRedirection(type, relatedSharingid)
    if (redirectionInstance !== undefined) {
      navigation.navigate(redirectionInstance[0], redirectionInstance[1])
    }
  }, [])

  return (
    <Pressable style={[styles.NotificationItemContaienr, !isRead && {backgroundColor: theme.main50}]} onPress={() => onPressNotification(id)}>
      <View>
        <Text style={{fontFamily: 'Pretendard-Bold', color: theme.gray800}}>{type}</Text>
        <Text style={[styles.NotificationItemContentText]}>{getNotificationContent(type, relatedSharingTitle)}</Text>
        {cancelReason !== undefined && <Text style={styles.cancelReason}>{cancelReason}</Text>}
      </View>
      <View style={[styles.NotificationItemHeaderView]}>
        <Text style={[styles.NotificationItemHeaderText]}>{writer}</Text>

        <Text style={[styles.NotificationItemHeaderText]}>{moment(date).format('YYYY.MM.DD HH:mm')}</Text>
      </View>
    </Pressable>
  )
}

export const NotificationList = () => {
  const queryClient = useQueryClient()
  const {data, isLoading, error} = useQuery(queryKeys.notifications, getNotificationsAll)

  const {mutate} = useMutation(setNotificationRead, {
    onSuccess: () => {
      queryClient.invalidateQueries('notifications')
    },
  })

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="알림" goBack />
      <ScrollView>
        <View style={[styles.guideView, theme.styles.wrapper]}>
          <Text style={[styles.guideText]}>* 30일이 지난 알림은 자동으로 삭제됩니다</Text>
        </View>
        {data?.map((item: INotification) => (
          <NotificationItem item={item} key={item.id} mutate={mutate} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  cancelReason: {
    color: theme.gray700,
    marginTop: 8,
    marginBottom: 16,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {},
  guideText: {
    color: theme.secondary,
    fontSize: 12,
  },
  guideView: {
    height: 60,
    justifyContent: 'center',
  },
  NotificationItemContaienr: {
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
    fontFamily: 'Pretendard-Medium',
    marginVertical: 8,
    fontSize: 16,
  },
})
