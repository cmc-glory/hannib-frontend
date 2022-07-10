import React, {useEffect, useCallback, useState, useMemo} from 'react'
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'

import {QnAListCreatorRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, SharingPreview} from '../../components/utils'
import {QnAListCreatorItem} from '../../components/GoodsStack'
import * as theme from '../../theme'
import {IQnAList} from '../../types'
import {useAppSelector} from '../../hooks'

export const QnAListCreator = () => {
  // ******************** utils ********************
  const userId = useAppSelector(state => state.auth.user.email)
  const route = useRoute<QnAListCreatorRouteProps>()
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

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="문의" />
      <ScrollView bounces={false} style={[styles.container]} contentOffset={{x: 0, y: 200}}>
        <SharingPreview uri="http://localhost:8081/src/assets/images/detail_image_example.png" category="BTS" title="BTS 키링 나눔" />

        {qnas.map(qna => (
          <QnAListCreatorItem item={qna} key={qna.id} />
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
    marginBottom: 24,
    flex: 1,
  },
})
