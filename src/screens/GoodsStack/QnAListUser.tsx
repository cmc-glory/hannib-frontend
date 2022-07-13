import React, {useCallback, useState, useMemo} from 'react'
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useQuery} from 'react-query'

import {QnAListUserRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, SharingPreview} from '../../components/utils'
import {QnAListUserItem} from '../../components/GoodsStack'
import * as theme from '../../theme'
import {IInquiryNanumDto} from '../../types'
import {useAppSelector} from '../../hooks'
import {EmptyIcon} from '../../components/utils'
import {queryKeys, getNanumByIndex, getInquiryByIndex} from '../../api'

export const QnAListUser = () => {
  // ******************** utils ********************
  const userAccountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const navigation = useNavigation()
  const route = useRoute<QnAListUserRouteProps>()
  const {nanumIdx} = useMemo(() => route.params, [])

  console.log('nanumIdx : ', nanumIdx)

  // ******************** reactQueries ********************
  const nanumInfo = useQuery([queryKeys.nanumDetail, nanumIdx], () => getNanumByIndex(nanumIdx))
  const inquiries = useQuery([queryKeys.inquiry, nanumIdx], () => getInquiryByIndex(nanumIdx))

  // 문의글 작성으로 이동
  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteQnA', {
      nanumIdx, // 해당 나눔 게시글의 id
      accountIdx: userAccountIdx, // 문의글을 남기는 사용자의 id,
      imageuri: nanumInfo.data.thumbnail, // 썸네일 uri
      category: nanumInfo.data.category, // 카테고리
      title: nanumInfo.data.title, // 나눔 제목
    })
  }, [nanumInfo])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="문의" />
      <ScrollView bounces={false} style={[styles.container]} contentOffset={{x: 0, y: 200}} contentContainerStyle={{flex: 1}}>
        <SharingPreview uri={nanumInfo.data?.thumbnail} category={nanumInfo.data?.category} title={nanumInfo.data?.title} />
        <Pressable style={[styles.writeButton]} onPress={onPressWrite}>
          <Text style={[theme.styles.bold16, {color: theme.white}]}>문의 작성하기</Text>
        </Pressable>
        {inquiries.data.length > 0 ? (
          inquiries.data.map((qna: IInquiryNanumDto) => <QnAListUserItem item={qna} key={qna.comments + qna.accountIdx} accountIdx={userAccountIdx} />)
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <EmptyIcon style={{marginBottom: 32}} />
            <View>
              <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>문의글이 없습니다.</Text>
              <View>
                <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>문의하실 사항이 있으시다면</Text>
                <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>
                  상단의 문의 작성하기를 통해 문의글을 남겨주세요.
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
