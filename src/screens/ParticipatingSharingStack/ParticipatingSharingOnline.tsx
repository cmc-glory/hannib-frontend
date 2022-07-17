import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {View, Text, ScrollView, StyleSheet, Dimensions, RefreshControl, TextInput, Alert, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {CancelModal} from '../../components/MyPageStack'
import {useNavigation, useRoute} from '@react-navigation/native'
import {showMessage} from 'react-native-flash-message'

import {IAppliedNanumDetailDto, IApplyingGoodsDto} from '../../types'
import {ParticipatingSharingOnlineRouteProps} from '../../navigation/ParticipatingSharingStackNavigator'
import {StackHeader, SharingPreview, GoodsListItem, Button, Tag, RoundButton, XIcon} from '../../components/utils'

import {queryKeys, getNanumByIndex, getAppliedNanumInfo, cancelNanum} from '../../api'
import * as theme from '../../theme'
import {useToggle, useAppSelector} from '../../hooks'

type ButtonsProps = {
  onPressWriteQnA: () => void
  toggleCancelModalVisible: () => void
  state: string
}

const BUTTON_WIDTH = (Dimensions.get('window').width - 40 - 10) / 2

export const ParticipatingSharingOnline = () => {
  // ******************** utils ********************
  const [cancelModalVisible, toggleCancelModalVisible] = useToggle() // 취소 모달창 띄울지
  const route = useRoute<ParticipatingSharingOnlineRouteProps>()
  const queryClient = useQueryClient()
  const {nanumIdx} = route.params
  const navigation = useNavigation()
  const user = useAppSelector(state => state.auth.user)

  // ******************** states ********************
  const [participateState, setParticipateState] = useState<string>()
  const [detail, setDetail] = useState<IAppliedNanumDetailDto>()
  const [appliedGoodsList, setAppliedGoodsList] = useState<IApplyingGoodsDto[]>([])
  const [nanumState, setNanumState] = useState<'배송 준비중' | '배송 시작'>('배송 준비중')
  const [refreshing, setRefreshing] = useState<boolean>(false)

  // ******************** react quries ********************

  const nanumInfo = useQuery([queryKeys.nanumDetail, nanumIdx], () => getNanumByIndex({nanumIdx: nanumIdx, accountIdx: user.accountIdx, favoritesYn: 'N'}))

  useQuery(
    [queryKeys.appliedNanum, nanumIdx],
    () =>
      getAppliedNanumInfo({
        accountIdx: user.accountIdx,
        nanumIdx,
      }),
    {
      onSuccess(data) {
        console.log('reloaded2')
        setRefreshing(false)
        setDetail(data)
        setNanumState(data.applyDto.unsongYn == 'Y' ? '배송 시작' : '배송 준비중')
        setAppliedGoodsList(data.applyingGoodsDto)
      },
    },
  )

  const cancelNanumQuery = useMutation([queryKeys.cancelNanum], cancelNanum, {
    onSuccess(data, variables, context) {
      navigation.goBack()
      showMessage({
        // 에러 안내 메세지
        message: '나눔 신청 취소가 완료되었습니다.',
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

  const onPressWriteQnA = useCallback(() => {
    navigation.navigate('WriteQnA', {
      nanumIdx: nanumIdx,
      accountIdx: user.accountIdx,
      imageuri: nanumInfo.data.thumbnail,
      category: nanumInfo.data.category,
      title: nanumInfo.data.title,
    })
  }, [nanumInfo])

  const onPressCancel = useCallback(() => {
    if (nanumState == '배송 시작') {
      Alert.alert('배송 시작 상태에선 취소할 수 없습니다.', '', [{text: '확인'}])
      return
    }
    Alert.alert('나눔 신청을 취소하시겠습니까?', '', [
      {
        text: '취소',
      },
      {
        text: '확인',
        onPress: () =>
          cancelNanumQuery.mutate({
            accountIdx: user.accountIdx,
            nanumIdx: nanumIdx,
            nanumDeleteReason: '',
          }),
      },
    ])
  }, [])

  const onPressWriteReview = useCallback(() => {
    navigation.navigate('WriteReview', {
      nanumIdx,
      accountIdx: user.accountIdx,
      imageuri: nanumInfo?.data.thumbnail,
      category: nanumInfo?.data.category,
      title: nanumInfo?.data.title,
    })
  }, [nanumInfo])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.appliedNanum, nanumIdx])
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="참여한 나눔" goBack />
      <ScrollView contentContainerStyle={[theme.styles.wrapper, {flex: 1}]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <SharingPreview uri={nanumInfo.data?.thumbnail} category={nanumInfo.data?.category} title={nanumInfo.data?.title} />
        <View style={{marginVertical: 20}}>
          {appliedGoodsList.map((item, index) => (
            <View style={[theme.styles.rowSpaceBetween, index != appliedGoodsList.length - 1 && {marginBottom: 16}]}>
              <Text style={{fontFamily: 'Pretendard-Medium', color: theme.gray700, fontSize: 16}}>{item.goodsName}</Text>
              <View style={[theme.styles.rowFlexStart]}>
                <Text style={{color: theme.gray500, marginRight: 8}}>주문 수량</Text>
                <Text style={{color: theme.secondary}}>1</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: theme.gray200, marginBottom: 20}} />
        <View>
          <Text style={[theme.styles.bold16, {marginBottom: 16}]}>신청 내역</Text>
          <View>
            <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
              <Text style={{color: theme.gray500}}>2022.06.30 22:01:52</Text>
              {/* {participateState !== 'proceeding' ? <Tag label="수령 완료"></Tag> : null} */}
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령자명</Text>
              <Text style={styles.requestInfoText}>{detail?.applyDto.realName}</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>주문 목록</Text>
              <View>
                {appliedGoodsList.map((item, index) => (
                  <Text key={item.goodsName + index} style={{...styles.requestInfoText, marginBottom: 8}}>
                    {item.goodsName}(1개)
                  </Text>
                ))}
              </View>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>주소</Text>
              <Text style={styles.requestInfoText}>
                {detail?.applyDto.address1} {detail?.applyDto.address2}
              </Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>연락처</Text>
              <Text style={styles.requestInfoText}>{detail?.applyDto.phoneNumber}</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령 현황</Text>
              <Text style={styles.requestInfoText}>{nanumState}</Text>
            </View>
            {detail?.applyDto.trackingNumber != '' && detail?.applyDto.trackingNumber != undefined && (
              <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
                <Text style={styles.requestInfoLabel}>운송장 번호</Text>
                <Text style={styles.requestInfoText}>{detail?.applyDto.trackingNumber}</Text>
              </View>
            )}
          </View>
        </View>
        <View>
          {nanumState == '배송 준비중' ? (
            <View style={[theme.styles.rowSpaceBetween, {marginBottom: 24}]}>
              <Pressable style={[styles.buttonMedium, styles.cancelButton]} onPress={onPressCancel}>
                <Text style={styles.cancelText}>취소하기</Text>
              </Pressable>
              <Pressable style={[styles.buttonMedium, styles.trackingButton]} onPress={onPressWriteQnA}>
                <Text style={styles.trackingText}>문의하기</Text>
              </Pressable>
            </View>
          ) : detail?.applyDto.reviewYn == 'Y' ? (
            <View style={[styles.reviewButton, styles.unselectedReviewButton]}>
              <Text style={{color: theme.gray700}}>후기 작성 완료</Text>
            </View>
          ) : (
            <Pressable style={[styles.reviewButton, styles.selectedReviewButton]} onPress={onPressWriteReview}>
              <Text style={{color: theme.main}}>후기 작성</Text>
            </Pressable>
          )}
        </View>

        <CancelModal isVisible={cancelModalVisible} toggleIsVisible={toggleCancelModalVisible} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  unselectedReviewButton: {
    backgroundColor: theme.white,
    borderColor: theme.gray500,
  },
  selectedReviewButton: {
    backgroundColor: theme.main50,
    borderColor: theme.main,
  },
  reviewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
  },
  trackingText: {
    fontFamily: 'Pretendard-Bold',
    color: theme.main,
  },
  cancelText: {
    color: theme.gray700,
  },
  trackingButton: {
    backgroundColor: theme.main50,
    borderColor: theme.main,
  },

  cancelButton: {
    borderColor: theme.gray500,
  },
  buttonMedium: {
    width: BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 4,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
  },
  requestInfoContainer: {
    flex: 1,
  },
  requestInfoWrapper: {
    marginBottom: 20,
  },
  requestInfoLabel: {
    fontSize: 16,
    color: theme.gray500,
    alignSelf: 'flex-start',
    lineHeight: 24,
  },
  requestInfoText: {
    fontSize: 16,
    color: theme.gray700,
    alignSelf: 'flex-end',
  },
  shareModal: {
    backgroundColor: theme.white,
    borderRadius: 8,
    padding: theme.PADDING_SIZE,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: theme.gray200,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
})
