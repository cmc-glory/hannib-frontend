import React, {useState, useCallback, useMemo} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {queryKeys, writeReview} from '../../api'
import {StackHeader, SharingPreview, RoundButton} from '../../components/utils'
import {WriteReviewPropsRouteProps} from '../../navigation/ParticipatingSharingStackNavigator'
import * as theme from '../../theme'
import {ImagePicker} from '../../components/WriteGoodsStack'
import {IReviewDto} from '../../types'
import {useAppSelector} from '../../hooks'

const ProductItem = ({name, quantity, spacing}: {name: string; quantity: number; spacing?: boolean}) => {
  return (
    <View style={[theme.styles.rowSpaceBetween, spacing && {marginBottom: 16}]}>
      <Text style={{fontSize: 16, color: theme.gray700}}>{name}</Text>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={{color: theme.gray500, marginRight: 5}}>주문 수량</Text>
        <Text style={{color: theme.secondary}}>{quantity}</Text>
      </View>
    </View>
  )
}

export const WriteReview = () => {
  // ******************** utils ********************
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const route = useRoute<WriteReviewPropsRouteProps>()
  const {nanumIdx, accountIdx, imageuri, category, title, writerAccountIdx} = useMemo(() => route.params, [])
  const creatorId = useAppSelector(state => state.auth.user.creatorId)

  // ******************** states ********************
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<string[]>([]) // 대표 이미지
  const [refreshing, setRefreshing] = useState<boolean>(false)

  // ******************** react query ********************
  const writeReviewQuery = useMutation([queryKeys.writeReview], writeReview, {
    onSuccess(data, variables, context) {
      setRefreshing(false)
      queryClient.invalidateQueries([queryKeys.appliedNanum, nanumIdx])

      // 나중에 작가 프로필 완성되면 작가 프로필로 네비게이트
      navigation.goBack()

      showMessage({
        // 에러 안내 메세지
        message: '후기가 등록됐습니다.',
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
    },
  })

  const onPressSubmit = useCallback(() => {
    const reviewForm: IReviewDto = {
      reviewImgDtoList:
        images.length == 0
          ? [
              {
                accountIdx,
                nanumIdx,
                imgUrl: '',
              },
            ]
          : images.map(imgUrl => {
              return {
                accountIdx: accountIdx,
                nanumIdx: nanumIdx,
                imgUrl: imgUrl,
              }
            }),
      accountIdx: writerAccountIdx, // accountIdx는 해당 나눔 진행자의 accountIdx
      nanumIdx,
      comments: content,
      creatorId: creatorId, // creatorId는 후기를 작성하는 사람의 creatorId
      createdDatetime: '',
    }

    console.log(JSON.stringify(reviewForm))

    writeReviewQuery.mutate(reviewForm)
  }, [content, images, writerAccountIdx])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.writeReview])
  }, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="후기 작성" goBack />
      <View style={styles.container}>
        <SharingPreview uri={imageuri} category={category} title={title} />
        {/* <View style={{marginVertical: 20}}>
          <ProductItem name="BTS 뷔 컨셉의 하트 키링" quantity={1} spacing />
          <ProductItem name="BTS 지민 컨셉의 스페이드 키링" quantity={1} />
        </View> */}
        <View style={{marginVertical: 10}} />
        <ImagePicker images={images} setImages={setImages} necessary={false} />
        <View style={{marginBottom: 20}}>
          <Text style={[theme.styles.label]}>내용</Text>
          <TextInput
            autoCorrect={false}
            placeholder="내용 입력"
            placeholderTextColor={theme.gray300}
            textAlignVertical="top"
            multiline
            style={[theme.styles.input, {paddingTop: 16, height: 263}]}
            value={content}
            onChangeText={setContent}
          />
          <View style={{marginTop: 24}}>
            <Text style={[styles.termsText]}>부적절한 게시물 등록 시 비 노출 또는 무통보 삭제될 수 있습니다.</Text>
            <Text style={[styles.termsText]}>- 비방/욕설/명예훼손에 해당되는 게시물</Text>
            <Text style={[styles.termsText]}>- 저작권에 위배된 작품</Text>
            <Text style={[styles.termsText]}>- 개인정보를 포함한 오프라인 만남 유도 내용</Text>
          </View>
        </View>
        <RoundButton label="작성완료" style={{marginTop: 24}} enabled={content != ''} onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
    flex: 1,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Pretendard',
    color: theme.gray500,
    lineHeight: 16,
  },
})
