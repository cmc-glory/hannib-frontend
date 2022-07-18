import React, {useCallback, useEffect, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet, Alert, ActivityIndicator, Dimensions, RefreshControl} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import moment from 'moment'
import {Shadow} from 'react-native-shadow-2'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Modal from 'react-native-modal'
import NotExistsSvg from '../../assets/Icon/NotExists.svg'

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
import {
  INanumGoodsOrderDto,
  INanumDetailDto,
  IMyNanumDetailDto,
  IApplyDto,
  IParticipatingSharingList,
  INanumGoodsDto,
  INanumGoods,
  IRequestNanumDetail,
  INanum,
} from '../../types'
import {useAppSelector, useToggle} from '../../hooks'
import * as theme from '../../theme'
import {useNavigation, useRoute} from '@react-navigation/native'
import {HoldingSharingRouteProps} from '../../navigation/HoldingSharingStackNavigator'
import {queryKeys, getNanumByIndex, getReceiverList, endNanum, getReceiverDetail, getParticipatingNanumList, postRequestDetail} from '../../api'
import {AddressModal, CancelModal, CheckFinishedModal} from '../../components/MyPageStack'
import {NotTakenModal} from '../../components/MyPageStack/NotTakenModal'
import {DeleteModal} from '../../components/GoodsStack/DeleteModal'

const BUTTON_WIDTH = (Dimensions.get('window').width - 40 - 10) / 2
const STATUSBAR_HEIGHT = getStatusBarHeight()

export const HoldingSharing = () => {
  // ************************** utils **************************
  const user = useAppSelector(state => state.auth.user)
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const route = useRoute<HoldingSharingRouteProps>()
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const nanumIdx = route.params.nanumIdx

  // ************************** states **************************
  const [nanumDetailInfo, setNanumDetailInfo] = useState<INanum>()
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
  >([])
  const [goodsInfoList, setGoodsInfoList] = useState<INanumGoodsDto[]>([]) // 상품 정보
  const [bottomSheetModalVisible, setBottomSheetModalVisible] = useState<boolean>(false) // 수령완료, 미수령 필터 bottom sheet 띄울 지
  const [itemFilter, setItemFilter] = useState<'전체보기' | '수령완료' | '미수령'>('전체보기')
  const [index, SetIndex] = useState<number>(0) // 현재 상세보기를 하는 receiver index
  const [participantAccountIdx, setParticipantAccountIdx] = useState<number>()
  const [receiverDetail, setReceiverDetail] = useState<IRequestNanumDetail>()
  const [accountIdxList, setAccountIdxList] = useState<number[]>([]) // 운송장 모달에 전달할 accountIdxList
  const [currentAccountIdx, setCurrentAccountIdx] = useState<number>() // 운송장 모달에 전달할 현재 선택된 accountIdx
  const [unsongYn, setUnsongYn] = useState<boolean>(false)

  // <CancelModal
  // <AddressModal
  // <NotTakenModal
  // <CheckFinishedModal
  // ******* modal states *******
  const [cancelModalShow, toggleCancelModalShow] = useToggle(false)
  const [addressModalShow, toggleAddressModalShow] = useToggle(false)
  //const [isUnsong, setIsUnsong] = useState<'Y'|'N'>('Y');
  const [notTakenModalShow, toggleNotTakenModalShow] = useToggle(false)
  const [checkFinishedModalShow, toggleCheckFinishedModalShow] = useToggle(false)
  const [deletePressed, setDeletePressed] = useState<boolean>(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  // ************************** react quries **************************
  const nanumInfo = useQuery([queryKeys.nanumDetail, nanumIdx], () => getNanumByIndex({nanumIdx: nanumIdx, accountIdx: accountIdx, favoritesYn: 'N'}), {
    onSuccess(data) {
      setNanumDetailInfo(data)
      console.log('nanumDetailInfo : ', data)
      setGoodsInfoList(data.nanumGoodslist)
    },
  })
  const receiverListQuery = useQuery([queryKeys.receiverList, nanumIdx], () => getReceiverList(nanumIdx), {
    onSuccess(data) {
      console.log('data :', data)

      // 신청한 사람 리스트가 없는 경우에는 리턴
      if (data.nanumDetailDto.length == 0) {
        setRefreshing(false)
        return
      }

      setAccountIdxList(data.nanumDetailDto.map((item: INanumDetailDto) => item.accountIdx))

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
      console.log(tempReceiverList)
      setReceiverInfoList(tempReceiverList)
      setRefreshing(false) // 데이터 가공이 끝난 후 refreshing을 false로 변경
      //setReceiverInfoList(nanumDetail)
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
  const myNanumDetailQuery = useMutation([queryKeys.requestedNanumDetail], getReceiverDetail, {
    onSuccess(data, variables, context) {
      setUnsongYn(data.applyDto.unsongYn == 'Y' ? true : false)
      setReceiverDetail(data)
      console.log('receiverDetail : ', data)
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

  const onPressDelete = useCallback(() => {
    setDeletePressed(true)
    setMoreVisible(false)
  }, [])

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
    (idx: number) => {
      setIsDetail(true)
      setCurrentAccountIdx(receiverInfoList[idx].accountIdx)

      myNanumDetailQuery.mutate({
        nanumIdx: nanumIdx,
        accountIdx: receiverInfoList[idx].accountIdx,
      })
      SetIndex(idx)
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
    myNanumDetailQuery.mutate({
      nanumIdx,
      accountIdx: receiverInfoList[newIdx].accountIdx,
    })
    SetIndex(newIdx)
  }, [index, receiverInfoList])

  const onPressRightArrow = useCallback(() => {
    const length = receiverInfoList.length
    const newIdx = (index + 1) % length
    myNanumDetailQuery.mutate({
      nanumIdx,
      accountIdx: receiverInfoList[newIdx].accountIdx,
    })
    SetIndex(newIdx)
  }, [index, receiverInfoList])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.receiverList, nanumIdx])
    //queryClient.invalidateQueries([queryKeys.requestedNanumDetail])
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="진행한 나눔" goBack>
        <MenuIcon onPress={() => setMoreVisible(moreVisible => !moreVisible)}></MenuIcon>
        <Modal
          isVisible={moreVisible}
          onBackdropPress={() => setMoreVisible(false)}
          animationInTiming={150}
          animationOutTiming={150}
          backdropOpacity={0}
          onModalHide={() => {
            if (deletePressed) {
              setDeleteModalVisible(true)
              setDeletePressed(false)
            }
          }}
          animationIn={'fadeIn'}
          animationOut="fadeOut">
          <Shadow
            containerViewStyle={{position: 'absolute', width: 144, right: 0, borderRadius: 4, top: STATUSBAR_HEIGHT + 28}}
            distance={48}
            startColor="rgba(0,0,0,0.08)">
            <View style={{borderRadius: 4}}>
              <Pressable onPress={onPressDelete} style={[styles.menuModalButton, {backgroundColor: 'rgba(250,250,250,0.96)', width: 144, borderRadius: 4}]}>
                <Text>삭제하기</Text>
              </Pressable>
            </View>
          </Shadow>
        </Modal>
      </StackHeader>
      <DeleteModal deleteModalVisible={deleteModalVisible} setDeleteModalVisible={setDeleteModalVisible} nanumIdx={nanumIdx} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{flex: 1}}>
        <ScrollView contentContainerStyle={[theme.styles.wrapper, {flex: 1}]}>
          <SharingPreview uri={nanumInfo.data?.thumbnail} category={nanumInfo.data?.category} title={nanumInfo.data?.title} />
          {/* 굿즈 정보 리스트 & 나눔 마감 버튼 */}
          <View style={{marginVertical: 20}}>
            {goodsInfoList.map((item, index) => (
              <View key={index} style={[theme.styles.rowSpaceBetween, index != goodsInfoList.length - 1 && {marginBottom: 16}]}>
                <Text style={{fontFamily: 'Pretendard-Medium', color: theme.gray700, fontSize: 16}}>{item.goodsName}</Text>
                <View style={[theme.styles.rowFlexStart]}>
                  <Text style={{color: theme.gray500, marginRight: 8}}>잔여 수량</Text>
                  <Text style={{color: theme.secondary}}>{item.goodsNumber}</Text>
                </View>
              </View>
            ))}
            <Pressable
              style={[styles.endSharingBtn]}
              onPress={() => Alert.alert('마감 처리 하시겠습니까?', '', [{text: '취소'}, {text: '확인', onPress: () => endNanumQuery.mutate(nanumIdx)}])}>
              <Text style={styles.endSharingBtnText}>나눔 마감</Text>
            </Pressable>
          </View>
          <View style={{height: 1, backgroundColor: theme.gray300, marginBottom: 20}}></View>
          {/* 전체 선택 & 전체 보기 버튼 */}
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

          <View style={{flex: 1, marginBottom: 80}}>
            {receiverListQuery.isLoading ? (
              <ActivityIndicator />
            ) : receiverInfoList.length == 0 ? (
              <View style={[styles.emptyResultView]}>
                <NotExistsSvg style={{marginTop: -48}} />
                <View style={{marginTop: 32}}>
                  <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>아직 신청자가 없어요</Text>
                  <Text style={{color: theme.gray700, fontSize: 16, lineHeight: 24}}>신청자가 생기면 바로 리스트로 보여드릴게요!</Text>
                </View>
              </View>
            ) : isDetail == true ? (
              // 참여자 정보 상세보기 DOC
              <View>
                {/* 화살표 이동, x 버튼 */}
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
                    <View>
                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
                        <Text style={[theme.styles.text14, styles.receiverDetailDate]}>{receiverDetail?.applyDto.applyDate}</Text>
                        {receiverDetail?.applyDto?.misacceptedYn == 'Y' && <Tag label="미수령 경고" />}
                      </View>
                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
                        <Text style={styles.detailLabel}>수령자명</Text>
                        <Text style={styles.detailText}>
                          {receiverDetail?.applyDto?.realName == null ? receiverDetail?.applyDto?.creatorId : receiverDetail?.applyDto?.realName}
                        </Text>
                      </View>
                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
                        <Text style={[styles.detailLabel, {alignSelf: 'flex-start'}]}>주문 목록</Text>
                        <View>
                          {receiverDetail?.applyingGoodsDto?.map((item, index) => (
                            <Text key={index} style={[styles.detailText, {marginBottom: 8}]}>
                              {item.goodsName} (1개)
                            </Text>
                          ))}
                        </View>
                      </View>
                      {nanumDetailInfo?.nanumMethod == 'M' ? (
                        <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
                          <Text style={[styles.detailLabel, {alignSelf: 'flex-start'}]}>주소</Text>
                          <View>
                            <Text style={[styles.detailText, styles.postcodeText]}>우) {receiverDetail?.applyDto?.address1}</Text>
                            <Text style={styles.detailText}>{receiverDetail?.applyDto?.address2}</Text>
                          </View>
                        </View>
                      ) : (
                        <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
                          <Text style={[styles.detailLabel, {alignSelf: 'flex-start'}]}>수령 예정일</Text>
                          <View>
                            <Text style={[styles.detailText, styles.postcodeText]}>{receiverDetail?.applyDto?.acceptDate?.slice(0, 16)}</Text>
                          </View>
                        </View>
                      )}
                      {receiverDetail?.applyDto?.acceptedYn == 'Y' ? (
                        <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
                          <Text style={[styles.detailLabel, {alignSelf: 'flex-start'}]}>최종 수령일</Text>
                          <Text style={[styles.detailText, styles.postcodeText]}>{receiverDetail?.applyDto?.acceptDate?.slice(0, 16)}</Text>
                        </View>
                      ) : null}

                      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
                        <Text style={styles.detailLabel}>연락처</Text>
                        <Text style={styles.detailText}>{receiverDetail?.applyDto?.phoneNumber}</Text>
                      </View>

                      {/* 취소하기, 운송장 등록, 수령 체크 버튼 부분 */}
                      {nanumDetailInfo?.nanumMethod == 'M' ? (
                        unsongYn == true ? (
                          //온라인 && 운송장 등록 완료
                          <View style={styles.unsongButton}>
                            <Text style={{color: theme.gray700}}>운송장 등록 완료</Text>
                          </View>
                        ) : (
                          //온라인 && 운송장 등록 전
                          <View style={[theme.styles.rowSpaceBetween, {marginBottom: 24}]}>
                            <Pressable
                              style={[styles.buttonMedium, styles.cancelButton]}
                              onPress={() => {
                                setParticipantAccountIdx(receiverDetail?.applyDto.accountIdx)
                                toggleCancelModalShow()
                              }}>
                              <Text style={styles.cancelText}>취소하기</Text>
                            </Pressable>
                            <Pressable
                              style={[styles.buttonMedium, styles.trackingButton]}
                              onPress={() => {
                                setParticipantAccountIdx(receiverDetail?.applyDto.accountIdx)
                                toggleAddressModalShow()
                              }}>
                              <Text style={styles.trackingText}>운송장 등록</Text>
                            </Pressable>
                          </View>
                        )
                      ) : receiverDetail?.applyDto?.acceptedYn == 'Y' ? (
                        //오프라인 && 수령 완료
                        <View style={styles.unsongButton}>
                          <Text style={{color: theme.gray700}}>수령 완료</Text>
                        </View>
                      ) : (
                        // 오프라인 && 수령 전
                        <View style={{marginBottom: 20}}>
                          <View style={[theme.styles.rowSpaceBetween, {marginBottom: 24}]}>
                            <Pressable
                              style={[styles.buttonMedium, styles.cancelButton]}
                              onPress={() => setParticipantAccountIdx(receiverDetail?.applyDto.accountIdx)}>
                              <Text style={styles.cancelText}>취소하기</Text>
                            </Pressable>
                            <Pressable
                              style={[styles.buttonMedium, styles.trackingButton]}
                              onPress={() => {
                                setParticipantAccountIdx(receiverDetail?.applyDto.accountIdx)
                                toggleCheckFinishedModalShow()
                              }}>
                              <Text style={styles.trackingText}>수령 체크</Text>
                            </Pressable>
                          </View>
                          <Pressable onPress={toggleNotTakenModalShow}>
                            <Text style={{color: theme.main}}>혹시 미수령인가요? </Text>
                          </Pressable>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
            ) : (
              receiverInfoList?.map(
                (item, index) =>
                  (itemFilter == '전체보기' || (itemFilter == '수령완료' && item.acceptedYn == 'Y') || (itemFilter == '미수령' && item.acceptedYn == 'N')) && (
                    <View
                      key={item.accountIdx}
                      style={[theme.styles.rowFlexStart, {paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.gray200}]}>
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
                              <Text style={[styles.acceptedYnText]}>수령완료</Text>
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

      {/* 모달 */}
      <CancelModal nanumIdx={nanumIdx} accountIdx={participantAccountIdx!} isVisible={cancelModalShow} toggleIsVisible={toggleCancelModalShow}></CancelModal>
      <AddressModal
        nanumIdx={nanumIdx}
        accountIdx={participantAccountIdx!}
        isVisible={addressModalShow}
        toggleIsVisible={toggleAddressModalShow}
        accountIdxList={accountIdxList}
        selectedAccountIdx={currentAccountIdx!}
        setUnsongYn={setUnsongYn}
      />
      <NotTakenModal nanumIdx={nanumIdx} accountIdx={participantAccountIdx!} isVisible={notTakenModalShow} toggleIsVisible={toggleNotTakenModalShow} />
      <CheckFinishedModal
        nanumIdx={nanumIdx}
        accountIdx={participantAccountIdx!}
        isVisible={checkFinishedModalShow}
        toggleIsVisible={toggleCheckFinishedModalShow}></CheckFinishedModal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  emptyResultView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptedYnText: {
    color: theme.main,
    fontSize: 12,
    lineHeight: 16,
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
