import React, {useEffect, useState, useMemo, useCallback} from 'react'
import {View, Text, Pressable, ScrollView, StyleSheet, Alert, RefreshControl, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useQueryClient, useQuery} from 'react-query'

import {QnAListCreatorRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, SharingPreview, EmptyIcon} from '../../components/utils'
import {QnAListCreatorItem} from '../../components/GoodsStack'
import * as theme from '../../theme'
import {queryKeys, getNanumByIndex, getInquiryByIndex} from '../../api'
import {IInquiryNanumDto} from '../../types'
import {useAppSelector} from '../../hooks'

export const QnAListCreator = () => {
  // ******************** utils ********************
  const auth = useAppSelector(state => state.auth)
  const userAccountIdx = auth.user.accountIdx

  const route = useRoute<QnAListCreatorRouteProps>()
  const queryClient = useQueryClient()

  const {nanumIdx} = useMemo(() => route.params, [])

  // ******************** states ********************
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [inquires, setInquires] = useState<IInquiryNanumDto[]>([])

  // ******************** reactQueries ********************
  const nanumInfo = useQuery([queryKeys.nanumDetail, nanumIdx], () => getNanumByIndex(nanumIdx))
  useQuery([queryKeys.inquiry, nanumIdx], () => getInquiryByIndex(nanumIdx), {
    onSuccess(data) {
      setInquires(data)
      setRefreshing(false)
    },
  })

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="문의" />
      <View style={styles.container}>
        <SharingPreview uri={nanumInfo.data?.thumbnail} category={nanumInfo.data?.category} title={nanumInfo.data?.title} />
      </View>

      {inquires?.length > 0 ? (
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true)
                queryClient.invalidateQueries([queryKeys.inquiry, nanumIdx])
              }}
            />
          }>
          <ScrollView contentContainerStyle={{flex: 1, paddingHorizontal: theme.PADDING_SIZE}}>
            {inquires.map((qna: IInquiryNanumDto) => (
              <QnAListCreatorItem item={qna} key={qna.inquiryIdx} inquiryIdx={qna.inquiryIdx} accountIdx={userAccountIdx} nanumIdx={nanumIdx} />
            ))}
          </ScrollView>
        </ScrollView>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <EmptyIcon style={{marginBottom: 32}} />
          <View>
            <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>문의글이 없습니다.</Text>
            <View>
              <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>새로운 문의글이 등록될 경우</Text>
              <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>푸시 알림을 통해 알려드리겠습니다.</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  writeButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.main,
    borderRadius: 4,
    marginTop: 16,
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
