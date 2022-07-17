import React, {useEffect, useState, useCallback} from 'react'
import {View, ScrollView, Text, StyleSheet, Alert} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useQuery, useQueryClient} from 'react-query'

import {WriterProfileRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, MenuIcon, SeparatorBold} from '../../components/utils'
import {HoldingProjectItem, ReviewItem, BlockUserModal} from '../../components/GoodsStack'
import {queryKeys, getAccountInfoByIdx, getHoldingNanumList} from '../../api'
import {IHoldingSharingList} from '../../types'
import * as theme from '../../theme'
import NoUserSvg from '../../assets/Icon/noUser.svg'

export const WriterProfile = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const route = useRoute<WriterProfileRouteProps>()
  const {writerAccountIdx} = route.params

  // ******************** states  ********************
  const [isOpened, setIsOpened] = useState<boolean[]>([]) // index번째의 후기가 열렸는지 판단하는 state
  const [writerProfileImg, setwriterProfileImg] = useState<string | null | undefined>('')

  // ******************** callbacks  ********************
  const onPressReview = useCallback((index: number) => {
    setIsOpened(isOpened => [...isOpened.slice(0, index), !isOpened[index], ...isOpened.slice(index + 1)])
  }, [])
  const onPressNanum = useCallback((nanumIdx: number) => {
    console.log(nanumIdx)
    navigation.navigate('NanumDetailThroughWriterProfile', {
      nanumIdx: nanumIdx,
    })
  }, [])

  // ******************** react queries  ********************
  const writerInfo = useQuery([queryKeys.accountInfo, writerAccountIdx], () => getAccountInfoByIdx(writerAccountIdx), {
    onSuccess(data) {
      setwriterProfileImg(data.accountImg)
    },
    onError(err) {
      Alert.alert('탈퇴한 회원입니다.', '', [
        {
          text: '확인',
        },
      ])
      navigation.goBack()
    },
  })

  const holdingList = useQuery([queryKeys.holdingNanumList], () => getHoldingNanumList(writerAccountIdx))

  // useEffect(() => {
  //   // 해당 작가의 진행 프로젝트, 진행 프로젝트에 대한 모든 후기를 불러옴
  //   // 진행 프로젝트에서 불러올 것 : 프로젝트 id(클릭하면 상세 페이지로 이동할 수 있게), 썸네일 이미지 uri, 모집중, 마감 등의 상태
  //   // 후기에서 불러올 것 : 작성자, 작성 날짜, 구매 목록, 내용, 이미지
  //   // qna list 받아오기
  //   fetch('http://localhost:8081/src/data/dummyReviews.json', {
  //     method: 'get',
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       setIsOpened(new Array(result.length).fill(false))
  //       setReviews(result)
  //     })

  //   // redux에서 사용자 id를 가져오고 writer인지를 체크.
  //   // setIsOwner(true)
  // }, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="작가 프로필" goBack></StackHeader>
      <ScrollView>
        <View style={[theme.styles.rowFlexStart, styles.writerProfileContainer, theme.styles.wrapper]}>
          {writerProfileImg == null || writerProfileImg == undefined || writerProfileImg == '' ? (
            <View style={[styles.profileImage, {justifyContent: 'center', alignItems: 'center', backgroundColor: theme.gray50}]}>
              <NoUserSvg width={28} height={28} />
            </View>
          ) : (
            <FastImage source={{uri: writerProfileImg}} style={[styles.profileImage]} />
          )}

          <Text style={[theme.styles.bold20, {color: theme.gray700}]}>{writerInfo.data?.creatorId}</Text>
        </View>
        <SeparatorBold />
        <Text style={[theme.styles.bold16, {marginTop: 24}, theme.styles.wrapper]}>진행 프로젝트</Text>
        <ScrollView horizontal contentContainerStyle={[styles.holdingProjects, theme.styles.wrapper]}>
          {holdingList.data?.map((item: IHoldingSharingList, index: number) => (
            <HoldingProjectItem
              title={item.title}
              tagLabel={item.endYn == 'Y' ? '마감' : '모집중'}
              uri={item.thumbnail}
              onPressNanum={() => onPressNanum(item.nanumIdx)}></HoldingProjectItem>
          ))}
        </ScrollView>
        <SeparatorBold />
        {/* 후기 */}
        <View style={{marginBottom: 32}}>
          <View style={[theme.styles.rowSpaceBetween, theme.styles.wrapper, {paddingVertical: 20}]}>
            <Text style={[theme.styles.bold16]}>후기</Text>
            <Text style={{fontSize: 12, color: theme.gray700}}>전체후기 0개</Text>
          </View>
          {/* {reviews.map((review, index) => (
            <ReviewItem item={review} index={index} opened={isOpened[index]} onPressReview={onPressReview} key={review.id} />
          ))} */}
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
    paddingRight: 24,
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
