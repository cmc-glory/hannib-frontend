import React, {useState, useMemo} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Switch} from 'react-native-paper'
import {useMutation, useQueryClient, useQuery} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {queryKeys, postInquiry, getAppliedNanumInfo} from '../../api'
import {StackHeader, SharingPreview, RoundButton} from '../../components/utils'
import {WriteQnARouteProps} from '../../navigation/GoodsStackNavigator'
import {useToggle, useAppSelector} from '../../hooks'
import * as theme from '../../theme'
import {IInquiryNanumDto, IApplyingGoodsDto} from '../../types'

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
  const creatorId = useAppSelector(state => state.auth.user.creatorId)

  // ******************** states ********************

  const [appliedGoodsList, setAppliedGoodsList] = useState<IApplyingGoodsDto[]>([])

  // ******************** react queries ********************
  useQuery(
    [queryKeys.appliedNanum, nanumIdx],
    () =>
      getAppliedNanumInfo({
        accountIdx: accountIdx,
        nanumIdx,
      }),
    {
      onSuccess(data) {
        setAppliedGoodsList(data.applyingGoodsDto)
      },
    },
  )

  const postInquiryQuery = useMutation(queryKeys.inquiry, postInquiry, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.inquiry, nanumIdx])

      showMessage({
        message: '문의글 작성이 완료되었습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
      navigation.goBack()
    },
    onError(error, variables, context) {
      console.log('error')
    },
  })

  // ******************** states********************
  const [comments, setComments] = useState<string>('')
  const [isSecret, toggleSecret] = useToggle()

  // ******************** callbacks ********************
  const onPressSubmit = () => {
    if (postInquiryQuery.isLoading) {
      return
    }
    // 백으로 내용이랑 비밀 여부 post 하는 api
    const questionNanumDto: IInquiryNanumDto = {
      inquiryIdx: 0,
      nanumIdx,
      accountIdx,
      creatorId,
      comments,
      createdDate: '',
      answerDate: '',
      secretYn: isSecret ? 'Y' : 'N',
      answerComments: '',
    }

    console.log(JSON.stringify(questionNanumDto))

    postInquiryQuery.mutate(questionNanumDto)
    // 백으로 보낸 다음에 전으로 이동
  }

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="문의하기" goBack />
      <ScrollView contentContainerStyle={styles.container}>
        <SharingPreview uri={imageuri} category={category} title={title} />
        <View style={{marginVertical: 20}}>
          {appliedGoodsList.map((goods, index) => (
            <ProductItem name={goods.goodsName} key={goods.goodsName + index} quantity={1} spacing={index != appliedGoodsList.length - 1} />
          ))}
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={[theme.styles.label]}>문의 내용</Text>
          <TextInput
            placeholderTextColor={theme.gray300}
            textAlignVertical="top"
            multiline
            placeholder="최대 150자 작성 가능합니다."
            maxLength={150}
            style={[theme.styles.input, {paddingTop: 16, height: 250}]}
            value={comments}
            onChangeText={setComments}
          />
        </View>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={{fontSize: 16, fontFamily: 'Pretendard-Medium'}}>비밀글</Text>
          <Switch value={isSecret} onValueChange={toggleSecret} color={theme.secondary} />
        </View>
        <View style={styles.buttonView}>
          <RoundButton label="등록" enabled={comments != ''} onPress={onPressSubmit} loading={postInquiryQuery.isLoading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 24,
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
