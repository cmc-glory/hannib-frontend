import React, {useState, useCallback, useEffect, useMemo} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Switch} from 'react-native-paper'
import {useMutation, useQueryClient} from 'react-query'

import {queryKeys, postInquiry} from '../../api'
import {StackHeader, SharingPreview, RoundButton} from '../../components/utils'
import {WriteQnARouteProps} from '../../navigation/GoodsStackNavigator'
import {useToggle, useAppSelector} from '../../hooks'
import * as theme from '../../theme'
import {IQuestionNanumDto} from '../../types'

const ProductItem = ({name, quantity, spacing}: {name: string; quantity: number; spacing?: boolean}) => {
  return (
    <View style={[theme.styles.rowSpaceBetween, spacing && {marginBottom: 16}]}>
      <Text style={{fontSize: 16, color: theme.gray700}}>{name}</Text>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={{color: theme.gray500, marginRight: 5}}>주문수량</Text>
        <Text style={{color: theme.secondary}}>{quantity}</Text>
      </View>
    </View>
  )
}

export const WriteQnA = () => {
  // ******************** utils ********************
  const navigation = useNavigation()
  const route = useRoute<WriteQnARouteProps>()
  const queryClient = useQueryClient()

  const {nanumIdx, accountIdx, imageuri, category, title} = useMemo(() => route.params, [])
  const creatorId = useAppSelector(state => state.auth.user.name)

  console.log('nanumIdx : ', nanumIdx, 'accountIdx : ', accountIdx)

  // ******************** react queries********************
  const postInquiryQuery = useMutation(queryKeys.inquiry, postInquiry, {
    onSuccess(data, variables, context) {
      console.log('success')
      console.log(data)
      queryClient.invalidateQueries(queryKeys.inquiry)
      navigation.goBack()
    },
    onError(error, variables, context) {
      console.log('error')
      console.log(error)
    },
  })

  // ******************** states********************
  const [comments, setComments] = useState<string>('')
  const [isSecret, toggleSecret] = useToggle()

  useEffect(() => {
    // 해당 사용자가 주문한 물건 받아오는 api
  }, [])

  // ******************** callbacks ********************
  const onPressSubmit = useCallback(() => {
    // 백으로 내용이랑 비밀 여부 post 하는 api
    const questionNanumDto: IQuestionNanumDto = {
      nanumIdx,
      accountIdx,
      creatorId,
      comments,
      secretYn: isSecret ? 'Y' : 'N',
    }

    postInquiryQuery.mutate(questionNanumDto)
    // 백으로 보낸 다음에 전으로 이동
  }, [comments, isSecret, nanumIdx, accountIdx])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="문의하기" goBack />
      <View style={styles.container}>
        <SharingPreview uri={imageuri} category={category} title={title} />
        <View style={{marginVertical: 20}}>
          <ProductItem name="BTS 뷔 컨셉의 하트 키링" quantity={1} spacing />
          <ProductItem name="BTS 지민 컨셉의 스페이드 키링" quantity={1} />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[theme.styles.label]}>문의 내용</Text>
          <TextInput
            placeholder="내용 입력"
            placeholderTextColor={theme.gray300}
            textAlignVertical="top"
            multiline
            style={[theme.styles.input, {paddingTop: 16, height: 250}]}
            value={comments}
            onChangeText={setComments}
          />
        </View>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={{fontSize: 16, fontFamily: 'Pretendard-Medium'}}>비밀글</Text>
          <Switch value={isSecret} onValueChange={toggleSecret} color={theme.secondary} />
        </View>
        <RoundButton label="등록" style={{marginTop: 24}} enabled={comments != ''} onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
    flex: 1,
  },
})
