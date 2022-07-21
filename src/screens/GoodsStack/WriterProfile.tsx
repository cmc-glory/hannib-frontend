import React, {useState, useCallback} from 'react'
import {View, ScrollView, Text, StyleSheet, Pressable, Alert, RefreshControl, ActionSheetIOS, Platform} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import Modal from 'react-native-modal'

import {WriterProfileRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, SeparatorBold} from '../../components/utils'
import {HoldingProjectItem} from '../../components/GoodsStack'
import {queryKeys, getAccountInfoByIdx, getHoldingNanumList, deleteReview, getReviews, getNanumByIndex} from '../../api'
import {IHoldingSharingList, IReviewDto} from '../../types'
import * as theme from '../../theme'
import NoUserSvg from '../../assets/Icon/noUser.svg'
import {useAppSelector} from '../../hooks'
import {ReviewItem} from '../../components/GoodsStack'
import {MenuIcon} from '../../components/utils'

export const WriterProfile = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const route = useRoute<WriterProfileRouteProps>()
  const {writerAccountIdx, nanumIdx} = route.params
  const {accountIdx, creatorId} = useAppSelector(state => state.auth.user)

  // ******************** states  ********************
  const [isOpened, setIsOpened] = useState<boolean[]>([]) // index번째의 후기가 열렸는지 판단하는 state
  const [writerProfileImg, setwriterProfileImg] = useState<string | null | undefined>('')
  const [reviews, setReviews] = useState<any>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

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

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.review, writerAccountIdx])
  }, [])

  const onPressMenuIcon = useCallback(() => {
    if (Platform.OS == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['취소', '이 사용자 차단하기'],
          cancelButtonIndex: 0,
          userInterfaceStyle: 'light',
          title: '차단하기',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
          }
        },
      )
    } else {
      setModalVisible(true)
    }
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

  useQuery(
    [queryKeys.review, writerAccountIdx],
    () =>
      getReviews({
        accountIdx: writerAccountIdx,
        nanumIdx: nanumIdx,
        reviewImgDtoList: [
          {
            accountIdx: writerAccountIdx,
            nanumIdx: nanumIdx,
            imgUrl: '',
          },
        ],
        createdDatetime: '',
        comments: '',
        creatorId: creatorId,
      }),
    {
      onSuccess(data) {
        setIsOpened(new Array(data.reviewDtoList.length).fill(false))
        if (data.reviewDtoList == 0) {
          setReviews([])
        } else {
          const tempList = []

          for (var i = 0; i < data.reviewDtoList.length; i++) {
            const temp = data.reviewDtoList[i]
            const curNanumIdx = data.reviewDtoList[i].nanumIdx
            for (var j = 0; j < data.reviewImgDtoList.length; j++) {
              if (data.reviewImgDtoList[j].nanumIdx == curNanumIdx) {
                if (temp.images == undefined) {
                  temp.images = [data.reviewImgDtoList[j].imgUrl]
                } else {
                  temp.images.push(data.reviewImgDtoList[j].imgUrl)
                }
              }
            }
            tempList.push(temp)
          }
          setReviews(tempList)
        }
        setRefreshing(false)
      },
    },
  )

  const deleteReviewQuery = useMutation([queryKeys.review], deleteReview, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.review])
    },
  })

  const onPressDelete = useCallback(() => {
    const reviewDto: IReviewDto = {
      reviewImgDtoList: [
        {
          accountIdx: writerAccountIdx,
          nanumIdx: nanumIdx,
          imgUrl: '',
        },
      ],
      accountIdx: accountIdx,
      nanumIdx: nanumIdx,
      comments: '',
      createdDatetime: '',
      creatorId: creatorId,
    }

    deleteReviewQuery.mutate(reviewDto)
  }, [accountIdx])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="작가 프로필" goBack>
        {writerAccountIdx != accountIdx && <MenuIcon onPress={onPressMenuIcon} />}
      </StackHeader>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
              key={item.nanumIdx}
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
            <Text style={{fontSize: 12, color: theme.gray700}}>전체후기 {reviews.length}개</Text>
          </View>
          {reviews.map((review: any, index: number) => (
            <ReviewItem item={review} index={index} opened={isOpened[index]} onPressReview={onPressReview} key={review.id} />
          ))}
        </View>
      </ScrollView>
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} backdropOpacity={0.1} style={{margin: '15%'}}>
        <View style={styles.modalView}>
          <Pressable style={[styles.modalButton, {marginBottom: 20}]}>
            <Text style={[styles.modalTitle]}>차단하기</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, {marginBottom: 20}]}
            onPress={() => {
              setModalVisible(false)
            }}>
            <Text style={[styles.modalText]}>이 사용자 차단하기</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, {marginBottom: 20}]}
            onPress={() => {
              setModalVisible(false)
            }}>
            <Text style={[styles.modalText]}>취소</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalTitle: {
    color: theme.gray700,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  modalText: {
    color: theme.gray700,
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalView: {
    backgroundColor: theme.white,
    borderRadius: 8,
    padding: 20,
  },
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
