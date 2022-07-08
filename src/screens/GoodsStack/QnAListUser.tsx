import React, {useEffect, useCallback, useState, useMemo} from 'react'
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'

import {QnAListUserRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, SharingPreview} from '../../components/utils'
import {QnAListUserItem} from '../../components/GoodsStack'
import * as theme from '../../theme'
import {IQnAList} from '../../types'
import {useAppSelector} from '../../hooks'

export const QnAListUser = () => {
  // ******************** utils ********************
  const userAccountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const navigation = useNavigation()
  const route = useRoute<QnAListUserRouteProps>()
  const {nanumIdx} = useMemo(() => route.params, [])

  // ******************** states ********************
  const [qnas, setQnas] = useState<IQnAList[]>([]) // 문의 목록 state

  useEffect(() => {
    // qna list 받아오기
    fetch('http://localhost:8081/src/data/dummyQnA.json', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        setQnas(result)
      })
    // redux에서 사용자 id를 가져오고 writer인지를 체크.
    // setIsOwner(true)
  }, [])

  // 문의글 작성으로 이동
  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteQnA', {
      nanumIdx, // 해당 나눔 게시글의 id
      accountIdx: userAccountIdx, // 문의글을 남기는 사용자의 id,
      imageuri: 'http://localhost:8081/src/assets/images/detail_image_example.png', // 썸네일 uri
      category: 'bts', // 카테고리
      title: 'BTS 키링 나눔', // 나눔 제목
    })
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="문의" />
      <ScrollView bounces={false} style={[styles.container]} contentOffset={{x: 0, y: 200}}>
        <SharingPreview uri="http://localhost:8081/src/assets/images/detail_image_example.png" category="BTS" title="BTS 키링 나눔" />
        <Pressable style={[styles.writeButton]} onPress={onPressWrite}>
          <Text style={[theme.styles.bold16, {color: theme.white}]}>문의 작성하기</Text>
        </Pressable>
        {qnas.map(qna => (
          <QnAListUserItem item={qna} key={qna.id} accountIdx={userAccountIdx} />
        ))}
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
