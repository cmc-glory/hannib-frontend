import React, {useEffect, useState, useCallback} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {WriterProfileRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, MenuIcon, SeparatorBold} from '../../components/utils'
import {HoldingProjectItem, ReviewItem, BlockUserModal} from '../../components/GoodsStack'
import {IReview} from '../../types'
import * as theme from '../../theme'

export const WriterProfile = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const route = useRoute<WriterProfileRouteProps>()

  // ******************** states  ********************
  const [reviews, setReviews] = useState<IReview[]>([])
  const [isOpened, setIsOpened] = useState<boolean[]>([]) // index번째의 후기가 열렸는지 판단하는 state
  const [blockUserModalVisible, setBlockUserModalVisible] = useState<boolean>(false)

  // ******************** callbacks  ********************
  const onPressReview = useCallback((index: number) => {
    setIsOpened(isOpened => [...isOpened.slice(0, index), !isOpened[index], ...isOpened.slice(index + 1)])
  }, [])

  useEffect(() => {
    // 해당 작가의 진행 프로젝트, 진행 프로젝트에 대한 모든 후기를 불러옴
    // 진행 프로젝트에서 불러올 것 : 프로젝트 id(클릭하면 상세 페이지로 이동할 수 있게), 썸네일 이미지 uri, 모집중, 마감 등의 상태
    // 후기에서 불러올 것 : 작성자, 작성 날짜, 구매 목록, 내용, 이미지
    // qna list 받아오기
    fetch('http://localhost:8081/src/data/dummyReviews.json', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        setIsOpened(new Array(result.length).fill(false))
        setReviews(result)
      })

    // redux에서 사용자 id를 가져오고 writer인지를 체크.
    // setIsOwner(true)
  }, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="작가 프로필" goBack></StackHeader>
      <BlockUserModal
        blockUserModalVisible={blockUserModalVisible}
        setBlockUserModalVisible={setBlockUserModalVisible}
        userName="춤추는 고양이"
        userId="userid"
      />
      <ScrollView>
        <View style={[theme.styles.rowFlexStart, styles.writerProfileContainer, theme.styles.wrapper]}>
          <FastImage source={{uri: 'http://localhost:8081/src/assets/images/iu.jpeg'}} style={[styles.profileImage]} />
          <Text style={[theme.styles.bold20, {color: theme.gray700}]}>춤추는 고양이</Text>
        </View>
        <SeparatorBold />
        <Text style={[theme.styles.bold16, {marginTop: 24}, theme.styles.wrapper]}>진행 프로젝트</Text>
        <ScrollView horizontal contentContainerStyle={[styles.holdingProjects, theme.styles.wrapper]}>
          <HoldingProjectItem
            title="방탄소년단 기념일 컵홀더 나눔 - 카페 몰리몰리"
            tagLabel="모집중"
            uri="http://localhost:8081/src/assets/images/detail_image_example.png"
          />
          <HoldingProjectItem title="BTS 컨셉의 키링세트" tagLabel="모집중" uri="http://localhost:8081/src/assets/images/detail_image_example2.jpeg" />

          <HoldingProjectItem
            title="BTS 컨셉의 키링세트 BTS 컨셉의 키링세트 BTS 컨셉의 키링세트 BTS 컨셉의 키링세트 BTS 컨셉의 키링세트"
            tagLabel="모집중"
            uri="http://localhost:8081/src/assets/images/detail_image_example.png"
          />
          <HoldingProjectItem title="BTS 컨셉의 키링세트" tagLabel="모집중" uri="http://localhost:8081/src/assets/images/detail_image_example2.jpeg" />

          <HoldingProjectItem title="BTS 컨셉의 키링세트" tagLabel="모집중" uri="http://localhost:8081/src/assets/images/detail_image_example.png" />
        </ScrollView>
        <SeparatorBold />
        {/* 후기 */}
        <View style={{marginBottom: 32}}>
          <View style={[theme.styles.rowSpaceBetween, theme.styles.wrapper, {paddingVertical: 20}]}>
            <Text style={[theme.styles.bold16]}>후기</Text>
            <Text style={{fontSize: 12, color: theme.gray700}}>전체후기 {reviews.length}개</Text>
          </View>
          {reviews.map((review, index) => (
            <ReviewItem item={review} index={index} opened={isOpened[index]} onPressReview={onPressReview} key={review.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 8,
    backgroundColor: theme.gray50,
  },

  holdingProjects: {
    paddingVertical: 24,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 20,
  },
  writerProfileContainer: {
    paddingVertical: 24,
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
