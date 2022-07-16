import React, {useCallback, useEffect, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet, Alert, ActivityIndicator, Dimensions, ActivityIndicatorBase} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import moment from 'moment'

import {
  StackHeader,
  FloatingBottomButton,
  SharingPreview,
  MenuIcon,
  BottomSheet,
  DownArrowIcon,
  LeftArrowIcon,
  XIcon,
  RightArrowBoldIcon,
  CheckboxIcon,
  EmptyCheckboxIcon,
  Tag,
} from '../../components/utils'
import {HoldingSharingBottomSheetContent} from '../../components/HoldingSharingStack'
import {INanumGoodsOrderDto, INanumDetailDto, IMyNanumDetailDto, IApplyDto} from '../../types'
import {useAppSelector} from '../../hooks'
import * as theme from '../../theme'
import {useNavigation, useRoute} from '@react-navigation/native'
import {HoldingSharingRouteProps} from '../../navigation/HoldingSharingStackNavigator'
import {queryKeys, getNanumByIndex, getReceiverList, endNanum, getReceiverDetail} from '../../api'

const BUTTON_WIDTH = (Dimensions.get('window').width - 40 - 10) / 2

export const HoldingSharing = () => {
  // ************************** utils **************************
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const route = useRoute<HoldingSharingRouteProps>()
  const navigation = useNavigation()
  const nanumIdx = route.params.nanumIdx

  // ************************** states **************************
  const [moreVisible, setMoreVisible] = useState<boolean>(false) //삭제하기 모달 띄울지
  const [isDetail, setIsDetail] = useState<boolean>(false) // 상세보기가 눌렸는지
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false)
  const [receiverInfoList, setReceiverInfoList] = useState<
    {
      acceptedYn: 'Y' | 'N'
      realName: string // 실제 이름. 만약에 null이거나 빈 문자열이면 creatorId 사용
      creatorId: string
      accountIdx: number // 신청자의 accountIdx
      goodsNum: number // 신청한 굿즈의 개수
      goodsFirst: string // 첫번째 상품 이름
      selected: boolean // 체크박스 선택됐는지
    }[]
  >([
    {
      acceptedYn: 'N',
      realName: '강진실',
      creatorId: '진실진실',
      accountIdx: 60,
      goodsNum: 1,
      goodsFirst: 'test1',
      selected: false,
    },
  ])
  const [goodsInfoList, setGoodsInfoList] = useState<INanumGoodsOrderDto[]>([]) // 상품 정보
  const [bottomSheetModalVisible, setBottomSheetModalVisible] = useState<boolean>(false) // 수령완료, 미수령 필터 bottom sheet 띄울 지
  const [itemFilter, setItemFilter] = useState<'전체보기' | '수령완료' | '미수령'>('전체보기')
  const [index, SetIndex] = useState<number>(0) // 현재 상세보기를 하는 receiver index
  const [receiverDetail, setReceiverDetail] = useState<IMyNanumDetailDto>({
    applyDto: {
      applyAskAnswerLists: [
        {
          accountIdx: 10,
          nanumIdx: 10,
          askList: '추가질문사항 ?',
          answerList: '없어요',
        },
      ],
      nanumGoodsDtoList: [
        {
          goodsIdx: 10,
          accountIdx: 10,
          nanumIdx: 10,
          goodsName: '방탄 키링',
          creatorId: '총총총',
          goodsNumber: 25,
          realName: '김도도',
        },
      ],
      accountIdx: 10,
      nanumIdx: 10,
      acceptDate: '1995-03-21 12:43:15',
      realName: '김또도',
      acceptedYn: 'N',
      address1: 13053,
      address2: '서울특별시 장충단로',
      cancelYn: 'N',
      creatorId: '사과나무',
      misacceptedYn: 'Y',
      phoneNumber: '010-2345-1234',
      reviewYn: 'N',
      unsongYn: 'N',
      nanumMethod: 'O',
    },
    nanumGoodsDto: [
      {
        goodsIdx: 10,
        accountIdx: 10,
        nanumIdx: 10,
        goodsName: '방탄 키링',
        creatorId: '총총총',
        goodsNumber: 25,
        realName: '김도도',
      },
    ],
  })

  // ************************** react quries **************************
  const nanumInfo = useQuery([queryKeys.nanumDetail, nanumIdx], () => getNanumByIndex({nanumIdx: nanumIdx, accountIdx: accountIdx, favoritesYn: 'N'}))
  const receiverListQuery = useQuery([queryKeys.receiverList, nanumIdx], () => getReceiverList(nanumIdx), {
    onSuccess(data) {
      setGoodsInfoList(data.nanumGoodsDto)

      // 신청한 사람 리스트가 없는 경우에는 리턴
      if (data.nanumDetailDto.length == 0) {
        return
      }

      const tempReceiverList: {
        acceptedYn: 'Y' | 'N'
        realName: string // 실제 이름. 만약에 null이거나 빈 문자열이면 creatorId 사용
        creatorId: string
        accountIdx: number // 신청자의 accountIdx
        goodsNum: number // 신청한 굿즈의 개수
        goodsFirst: string // 첫번째 상품 이름
        selected: boolean // 체크박스 선택됐는지
      }[] = []

      // 수령자 정보를 accountIdx 순서로 정렬
      const nanumDetail: INanumDetailDto[] = data.nanumDetailDto.sort((a: INanumDetailDto, b: INanumDetailDto) => {
        if (a.accountIdx < b.accountIdx) {
          return -1
        }
        if (a.accountIdx > b.accountIdx) {
          return 1
        }
        return 0
      })

      tempReceiverList.push({
        acceptedYn: nanumDetail[0].acceptedYn,
        realName: nanumDetail[0].realName,
        creatorId: nanumDetail[0].creatorId,
        accountIdx: nanumDetail[0].accountIdx,
        goodsNum: 1,
        goodsFirst: nanumDetail[0].goodsName,
        selected: false,
      })

      for (var i = 1; i < nanumDetail.length; i++) {
        const prev = nanumDetail[i - 1]
        const cur = nanumDetail[i]

        // 이전 신청자와 현재 신청자가 다르다면
        if (prev.accountIdx != cur.accountIdx) {
          tempReceiverList.push({
            acceptedYn: cur.acceptedYn,
            realName: cur.realName,
            creatorId: cur.creatorId,
            accountIdx: cur.accountIdx,
            goodsNum: 1,
            goodsFirst: cur.goodsName,
            selected: false,
          })
        }
        //
        else {
          tempReceiverList[tempReceiverList.length - 1].goodsNum += 1
        }
      }
      setReceiverInfoList(tempReceiverList)
    },
  })
  const endNanumQuery = useMutation([queryKeys.endNanum, nanumIdx], endNanum, {
    onSuccess(data, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '마감 처리가 완료되었습니다.',
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
  const myNanumDetailQuery = useMutation([queryKeys.myNanumDetail], getReceiverDetail, {
    onSuccess(data, variables, context) {
      setReceiverDetail(data)
    },
  })
  // ************************** callbacks **************************
  const onPressCheckbox = useCallback(
    (index: number) => {
      const temp = receiverInfoList.map((item, curIndex) => {
        return curIndex == index ? {...item, selected: !item.selected} : item
      })
      setReceiverInfoList(temp)
    },
    [receiverInfoList],
  )

  const onPressSendNotice = useCallback(() => {
    navigation.navigate('SendNotice', {
      nanumIdx,
      accountIdxList: receiverInfoList.filter(item => item.selected == true).map(item => item.accountIdx),
    })
  }, [receiverInfoList])

  const sendNoticeButtonEnabled = useCallback(() => {
    return receiverInfoList.filter(item => item.selected == true).map(item => item.accountIdx).length > 0 ? true : false
  }, [receiverInfoList])

  const onPressViewDetail = useCallback(
    (index: number) => {
      setIsDetail(true)
      // myNanumDetailQuery.mutate({
      //   nanumIdx,
      //   accountIdx: receiverInfoList[index].accountIdx,
      // })
      SetIndex(index)
    },
    [receiverInfoList],
  )

  const onPressCloseDetail = useCallback(() => {
    setIsDetail(false)
  }, [])

  const onPressSelectAll = useCallback(() => {
    const temp = isAllSelected
    setIsAllSelected(!temp)
    if (temp) {
      const tempList = receiverInfoList.map(item => {
        return {...item, selected: false}
      })
      setReceiverInfoList(tempList)
    } else {
      const tempList = receiverInfoList.map(item => {
        return {...item, selected: true}
      })
      setReceiverInfoList(tempList)
    }
  }, [isAllSelected, receiverInfoList])

  const onPressItemFilter = useCallback(() => {
    setBottomSheetModalVisible(true)
  }, [])

  const onPressLeftArrow = useCallback(() => {
    const length = receiverInfoList.length
    const newIdx = index == 0 ? length - 1 : index - 1
    // myNanumDetailQuery.mutate({
    //   nanumIdx,
    //   accountIdx: receiverInfoList[newIdx].accountIdx,
    // })
    SetIndex(newIdx)
  }, [index])

  const onPressRightArrow = useCallback(() => {
    const length = receiverInfoList.length
    const newIdx = (index + 1) % length
    // myNanumDetailQuery.mutate({
    //   nanumIdx,
    //   accountIdx: receiverInfoList[newIdx].accountIdx,
    // })
    SetIndex(newIdx)
  }, [index])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="진행한 나눔" goBack>
        <MenuIcon onPress={() => setMoreVisible(moreVisible => !moreVisible)}></MenuIcon>
      </StackHeader>
      <ScrollView>
        <ScrollView contentContainerStyle={[theme.styles.wrapper, {flex: 1}]}>
          <SharingPreview uri={nanumInfo.data?.thumbnail} category={nanumInfo.data?.category} title={nanumInfo.data?.title} />
          <View style={{marginVertical: 20}}>
            {goodsInfoList.map((item, index) => (
              <View style={[theme.styles.rowSpaceBetween, index != goodsInfoList.length - 1 && {marginBottom: 16}]}>
                <Text style={{fontFamily: 'Pretendard-Medium', color: theme.gray700, fontSize: 16}}>{item.goodsName}</Text>
                <View style={[theme.styles.rowFlexStart]}>
                  <Text style={{color: theme.gray500, marginRight: 8}}>잔여 수량</Text>
                  <Text style={{color: theme.secondary}}>{item.goodsNumber}</Text>
                </View>
              </View>
            ))}
            <Pressable
              style={[styles.endSharingBtn]}
              onPress={() => Alert.alert('마감 처리 하시겠습니까?', '', [{text: '확인', onPress: () => endNanumQuery.mutate(nanumIdx)}])}>
              <Text style={styles.endSharingBtnText}>나눔 마감</Text>
            </Pressable>
          </View>
          <View style={{height: 1, backgroundColor: theme.gray300, marginBottom: 20}}></View>
          <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
            {isAllSelected ? (
              <Pressable onPress={onPressSelectAll}>
                <Text style={{color: theme.secondary}}>전체 선택 해제</Text>
              </Pressable>
            ) : (
              <Pressable onPress={onPressSelectAll}>
                <Text style={{color: theme.secondary}}>전체 선택</Text>
              </Pressable>
            )}
            <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressItemFilter}>
              <Text style={{marginRight: 4}}>{itemFilter}</Text>
              <DownArrowIcon onPress={onPressItemFilter} />
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            {receiverListQuery.isLoading ? (
              <ActivityIndicator />
            ) : receiverInfoList.length == 0 ? (
              <View></View>
            ) : isDetail == true ? (
              <View>
                <View style={[theme.styles.rowSpaceBetween, {marginBottom: 16}]}>
                  <View style={[theme.styles.rowFlexStart]}>
                    <LeftArrowIcon onPress={onPressLeftArrow} />
                    <Text style={{fontSize: 16, color: theme.gray700, lineHeight: 24}}>{index + 1}</Text>
                    <Text style={{fontSize: 16, color: theme.gray700, lineHeight: 24}}> / </Text>
                    <Text style={{fontSize: 16, color: theme.gray700, lineHeight: 24}}>{receiverInfoList.length}</Text>
                    <RightArrowBoldIcon onPress={onPressRightArrow} />
                  </View>
                  <XIcon onPress={onPressCloseDetail} />
                </View>
                <View style={{flex: 1}}>
                  {myNanumDetailQuery.isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <>
                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
                        <Text style={[theme.styles.text14, styles.receiverDetailDate]}>{moment().format('YYYY.MM.DD HH:mm:ss')}</Text>
                        {receiverDetail.applyDto.misacceptedYn == 'Y' && <Tag label="미수령 경고" />}
                      </View>
                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
                        <Text style={styles.detailLabel}>수령자명</Text>
                        <Text style={styles.detailText}>
                          {receiverDetail.applyDto.realName == null ? receiverDetail.applyDto.creatorId : receiverDetail.applyDto.realName}
                        </Text>
                      </View>
                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
                        <Text style={[styles.detailLabel, {alignSelf: 'flex-start'}]}>주문 목록</Text>
                        <View>
                          {receiverDetail.applyDto.nanumGoodsDtoList.map(item => (
                            <Text style={[styles.detailText, {marginBottom: 8}]}>{item.goodsName}</Text>
                          ))}
                        </View>
                      </View>
                      {receiverDetail.applyDto.nanumMethod == 'M' ? (
                        <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
                          <Text style={[styles.detailLabel, {alignSelf: 'flex-start'}]}>주소</Text>
                          <View>
                            <Text style={[styles.detailText, styles.postcodeText]}>우) {receiverDetail.applyDto.address1}</Text>
                            <Text style={styles.detailText}>{receiverDetail.applyDto.address2}</Text>
                          </View>
                        </View>
                      ) : (
                        <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
                          <Text style={[styles.detailLabel, {alignSelf: 'flex-start'}]}>수령일</Text>
                          <View>
                            <Text style={[styles.detailText, styles.postcodeText]}>{receiverDetail.applyDto.acceptDate.slice(0, 16)}</Text>
                          </View>
                        </View>
                      )}

                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
                        <Text style={styles.detailLabel}>연락처</Text>
                        <Text style={styles.detailText}>{receiverDetail.applyDto.phoneNumber}</Text>
                      </View>
                      {receiverDetail.applyDto.nanumMethod == 'M' ? (
                        receiverDetail.applyDto.unsongYn == 'Y' ? (
                          <View style={styles.unsongButton}>
                            <Text style={{color: theme.gray700}}>운송장 등록 완료</Text>
                          </View>
                        ) : (
                          <View style={[theme.styles.rowSpaceBetween, {marginBottom: 24}]}>
                            <Pressable style={[styles.buttonMedium, styles.cancelButton]}>
                              <Text style={styles.cancelText}>취소하기</Text>
                            </Pressable>
                            <Pressable style={[styles.buttonMedium, styles.trackingButton]}>
                              <Text style={styles.trackingText}>운송장 등록</Text>
                            </Pressable>
                          </View>
                        )
                      ) : (
                        <View style={{marginBottom: 20}}>
                          <View style={[theme.styles.rowSpaceBetween, {marginBottom: 24}]}>
                            <Pressable style={[styles.buttonMedium, styles.cancelButton]}>
                              <Text style={styles.cancelText}>취소하기</Text>
                            </Pressable>
                            <Pressable style={[styles.buttonMedium, styles.trackingButton]}>
                              <Text style={styles.trackingText}>수령 체크</Text>
                            </Pressable>
                          </View>
                          <Pressable>
                            <Text style={{color: theme.main}}>혹시 미수령인가요? </Text>
                          </Pressable>
                        </View>
                      )}
                    </>
                  )}
                </View>
              </View>
            ) : (
              receiverInfoList.map(
                (item, index) =>
                  (itemFilter == '전체보기' || (itemFilter == '수령완료' && item.acceptedYn == 'Y') || (itemFilter == '미수령' && item.acceptedYn == 'N')) && (
                    <View style={[theme.styles.rowFlexStart, {paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.gray200}]}>
                      <View style={{alignItems: 'center', marginRight: 9}}>
                        <Text style={[theme.styles.text14, {marginBottom: 2, color: theme.gray700}]}>{index + 1}</Text>
                        {item.selected ? <CheckboxIcon onPress={() => onPressCheckbox(index)} /> : <EmptyCheckboxIcon onPress={() => onPressCheckbox(index)} />}
                      </View>
                      <View style={{justifyContent: 'space-between', flex: 1}}>
                        <View style={[theme.styles.rowFlexStart, {marginBottom: 6}]}>
                          <Text style={{fontSize: 12, lineHeight: 16}}>{item.realName == null ? item.creatorId : item.realName}</Text>
                          {item.acceptedYn == 'Y' && (
                            <View style={[theme.styles.rowFlexStart]}>
                              <Text style={[{color: theme.gray500}, {fontSize: 10, lineHeight: 16, marginHorizontal: 4, fontFamily: 'Pretendard-Bold'}]}>
                                |
                              </Text>
                              <Text style={[{color: theme.main}, {fontSize: 12, lineHeight: 16}]}>수령완료</Text>
                            </View>
                          )}
                        </View>
                        <View style={[theme.styles.rowFlexStart]}>
                          <Text style={[{fontFamily: 'Pretendard-Medium', fontSize: 16, color: theme.gray700}]}>{item.goodsFirst}</Text>
                        </View>
                      </View>
                      <Pressable style={[theme.styles.rowFlexStart]} onPress={() => onPressViewDetail(index)}>
                        <Text>상세 보기</Text>
                        <RightArrowBoldIcon size={20} onPress={() => onPressViewDetail(index)} />
                      </Pressable>
                    </View>
                  ),
              )
            )}
          </View>
        </ScrollView>
      </ScrollView>

      <FloatingBottomButton label="공지 보내기" enabled={sendNoticeButtonEnabled()} onPress={onPressSendNotice} />
      <BottomSheet modalVisible={bottomSheetModalVisible} setModalVisible={setBottomSheetModalVisible}>
        <HoldingSharingBottomSheetContent itemFilter={itemFilter} setItemFilter={setItemFilter} />
      </BottomSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  unsongButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderColor: theme.gray500,
    borderWidth: 1,
    borderRadius: 4,
  },
  postcodeText: {
    marginBottom: 8,
    textAlign: 'right',
  },
  detailLabel: {
    fontSize: 16,
    color: theme.gray500,
  },
  detailText: {
    fontSize: 16,
    color: theme.gray700,
  },
  receiverDetailDate: {
    color: theme.gray500,
  },
  menuModalButton: {
    height: 40,
    padding: 10,
    justifyContent: 'center',
    zIndex: 1,
  },
  endSharingBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: theme.white,
    borderRadius: 24,
    borderColor: theme.main,
    borderWidth: 1,
    marginTop: 20,
  },
  endSharingBtnText: {
    color: theme.main,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
})
