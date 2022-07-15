import React, {useCallback, useEffect, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery} from 'react-query'
import {StackHeader, FloatingBottomButton, SharingPreview, GoodsListItem, MenuIcon, BottomSheet, RoundButton} from '../../components/utils'
import {IHoldingReceiverInfo, ISharingDetail} from '../../types'
import {useAppSelector, useToggle} from '../../hooks'
import * as theme from '../../theme'
import {useNavigation, useRoute} from '@react-navigation/native'
import {HoldingSharingRouteProps} from '../../navigation/HoldingSharingStackNavigator'
import {EditDeleteModal, HoldingSharingBottomSheetContent, DeleteHoldingSharingModal} from '../../components/MyPageStack'
import {HoldingListItem, HoldingDetailItem} from '../../components/MyPageTabStack'
import {main, white} from '../../theme'
import {queryKeys, getNanumByIndex} from '../../api'

export const HoldingSharing = () => {
  const [list, setList] = useState<Array<IHoldingReceiverInfo>>()
  const [sharingDetail, setSharingDetail] = useState<ISharingDetail>()
  const [editDeleteModalVisible, toggleEditDeleteModalVisible] = useToggle() //수정, 삭제하기 모달 띄울지
  const [deleteHoldingModalVisible, toggleDeleteHoldingModalVisible] = useToggle()
  const [showStateFilterBottomSheet, setShowStateFilterBottomSheet] = useState<boolean>(false) // 전체보기, 수령완료, 미수령 필터링 탭 띄울지
  const [stateFilter, setStateFilter] = useState<'전체보기' | '수령완료' | '미수령'>('전체보기')
  const [locationFilter, setLocationFilter] = useState<0 | 1 | 2>(0) // 전체보기(0), 수령완료(1), 미수령(2)
  const [checkedItems, setCheckedItems] = useState<Array<any>>([])
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const route = useRoute<HoldingSharingRouteProps>()

  const nanumInfo = useQuery([queryKeys.nanumDetail, route.params.nanumIdx], () =>
    getNanumByIndex({nanumIdx: route.params.nanumIdx, accountIdx: accountIdx, favoritesYn: 'N'}),
  )

  const navigation = useNavigation()
  const onPressViewDetail = () => {
    setIsDetail(true)
  }

  useEffect(() => {
    // console.log('list : ', list)
    // console.log('sharingDetail : ', sharingDetail)
  }, [list, sharingDetail])

  const onPressLeftArrow = () => {
    if (cntList == 1) setCntList(list?.length ? list.length : 1)
    else setCntList(cntList - 1)
  }
  const onPressRightArrow = () => {
    if (cntList == list?.length) setCntList(1)
    else setCntList(cntList + 1)
  }
  // 우선 숫자만 바뀌게 해둠. db 들어오면 바꿔야함.

  const [isDetail, setIsDetail] = useState<boolean>(false)
  const [cntList, setCntList] = useState<number>(1)
  return (
    <SafeAreaView style={{flex: 1}}>
      <StackHeader title="진행한 나눔" goBack>
        <MenuIcon onPress={toggleEditDeleteModalVisible}></MenuIcon>
      </StackHeader>
      <ScrollView contentContainerStyle={[theme.styles.wrapper, {paddingBottom: 100}]}>
        <SharingPreview uri={nanumInfo.data?.thumbnail} category={nanumInfo.data?.category} title={nanumInfo.data?.title} />

        <View style={{marginTop: 16}}>
          {sharingDetail?.products.map(product => (
            <GoodsListItem key={product.id} type="holding" title={product.name} quantity={product.quantity} />
          ))}
          <Pressable style={[styles.endSharingBtn]}>
            <Text style={styles.endSharingBtnText}>나눔 마감</Text>
          </Pressable>
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: theme.gray200, marginVertical: 10}} />
        {isDetail ? (
          <HoldingDetailItem
            products={list}
            isOnline={true}
            onPressLeftArrow={onPressLeftArrow}
            onPressRightArrow={onPressRightArrow}
            cntList={1}
            setIsDetail={setIsDetail}
          />
        ) : (
          <HoldingListItem
            onPressViewDetail={onPressViewDetail}
            index={cntList}
            showStateFilterBottomSheet={showStateFilterBottomSheet}
            setShowStateFilterBottomSheet={setShowStateFilterBottomSheet}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
            setCheckedItems={setCheckedItems}
            checkedItems={checkedItems}
            dataLists={list}
          />
        )}
      </ScrollView>
      {isDetail ? null : (
        <FloatingBottomButton
          label="공지 보내기"
          enabled
          onPress={() => {
            navigation.navigate('SendNotice')
          }}
        />
      )}

      <EditDeleteModal
        isVisible={editDeleteModalVisible}
        toggleIsVisible={toggleEditDeleteModalVisible}
        deleteSharingModalVisible={deleteHoldingModalVisible}
        toggleDeleteSharingModalVisible={toggleDeleteHoldingModalVisible}
      />
      <DeleteHoldingSharingModal isVisible={deleteHoldingModalVisible} toggleIsVisible={toggleDeleteHoldingModalVisible} />
      <BottomSheet modalVisible={showStateFilterBottomSheet} setModalVisible={setShowStateFilterBottomSheet}>
        <HoldingSharingBottomSheetContent stateFilter={stateFilter} setStateFilter={setStateFilter} />
      </BottomSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  endSharingBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: white,
    borderRadius: 24,
    borderColor: main,
    borderWidth: 1,
  },
  endSharingBtnText: {
    color: theme.main,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
})
