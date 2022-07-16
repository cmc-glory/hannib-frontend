import React, {useCallback, useEffect, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import Modal from 'react-native-modal'
import {Shadow} from 'react-native-shadow-2'
import {getStatusBarHeight} from 'react-native-status-bar-height'

import {
  StackHeader,
  FloatingBottomButton,
  SharingPreview,
  GoodsListItem,
  MenuIcon,
  BottomSheet,
  RoundButton,
  DownArrowIcon,
  RightArrowIcon,
  CheckboxIcon,
  EmptyCheckboxIcon,
} from '../../components/utils'
import {IReceiverDto, ISharingDetail, INanumGoodsOrderDto, INanumDetailDto, IMyNanumDetailDto} from '../../types'
import {useAppSelector, useToggle} from '../../hooks'
import * as theme from '../../theme'
import {useNavigation, useRoute} from '@react-navigation/native'
import {HoldingSharingRouteProps} from '../../navigation/HoldingSharingStackNavigator'
import {EditDeleteModal, HoldingSharingBottomSheetContent, DeleteHoldingSharingModal} from '../../components/MyPageStack'
import {HoldingListItem, HoldingDetailItem} from '../../components/MyPageTabStack'
import {main, white} from '../../theme'
import {queryKeys, getNanumByIndex, getReceiverList, endNanum} from '../../api'

const STATUSBAR_HEIGHT = getStatusBarHeight()

export const HoldingSharing = () => {
  // ************************** utils **************************
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const route = useRoute<HoldingSharingRouteProps>()
  const navigation = useNavigation()

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
  const nanumIdx = route.params.nanumIdx

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
  const endNanumQuery = useMutation([queryKeys.endNanum], endNanum, {
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

  const onPressViewDetail = () => {
    setIsDetail(true)
  }

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <StackHeader title="진행한 나눔" goBack>
        <MenuIcon onPress={() => setMoreVisible(moreVisible => !moreVisible)}></MenuIcon>
      </StackHeader>
      <ScrollView contentContainerStyle={[theme.styles.wrapper, {paddingBottom: 100, flex: 1}]}>
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
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={{marginRight: 4}}>전체 보기</Text>
            <DownArrowIcon />
          </View>
        </View>
        <View style={{flex: 1}}>
          {receiverListQuery.isLoading ? (
            <ActivityIndicator />
          ) : receiverInfoList.length == 0 ? (
            <View></View>
          ) : (
            receiverInfoList.map((item, index) => (
              <View style={[theme.styles.rowFlexStart, {paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.gray200}]}>
                <View style={{alignItems: 'center', marginRight: 9}}>
                  <Text style={[theme.styles.text14, {marginBottom: 2, color: theme.gray700}]}>{index + 1}</Text>
                  {item.selected ? <CheckboxIcon onPress={() => onPressCheckbox(index)} /> : <EmptyCheckboxIcon onPress={() => onPressCheckbox(index)} />}
                </View>
                <View style={{justifyContent: 'space-between', flex: 1}}>
                  <View style={[theme.styles.rowFlexStart, {marginBottom: 6}]}>
                    <Text style={{fontSize: 12, lineHeight: 16}}>{item.realName == null ? item.creatorId : item.realName}</Text>
                    {item.realName != null && (
                      <View style={[theme.styles.rowFlexStart]}>
                        <Text style={[{color: theme.gray500}, {fontSize: 10, lineHeight: 16, marginHorizontal: 4, fontFamily: 'Pretendard-Bold'}]}>|</Text>
                        <Text style={[{color: theme.main}, {fontSize: 12, lineHeight: 16}]}>수령완료</Text>
                      </View>
                    )}
                  </View>
                  <View style={[theme.styles.rowFlexStart]}>
                    <Text style={[{fontFamily: 'Pretendard-Medium', fontSize: 16, color: theme.gray700}]}>{item.goodsFirst}</Text>
                  </View>
                </View>
                <Pressable style={[theme.styles.rowFlexStart]}>
                  <Text>상세 보기</Text>
                  <RightArrowIcon size={20} />
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <FloatingBottomButton label="공지 보내기" enabled={true} onPress={onPressSendNotice} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: white,
    borderRadius: 24,
    borderColor: main,
    borderWidth: 1,
    marginTop: 20,
  },
  endSharingBtnText: {
    color: theme.main,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
})
