import React, {useCallback, useEffect, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import {IHoldingReceiverInfo} from '../../types'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {ReceiverListItem} from './ReceiverListItem'
import {HoldingSharingFilterTab} from '../MyPageStack'

type HoldingListItem = {
  dataLists?: Array<IHoldingReceiverInfo>
  onPressViewDetail: () => void
  index: number
  showStateFilterBottomSheet: boolean
  setShowStateFilterBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  locationFilter: 0 | 1 | 2
  setLocationFilter: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
  stateFilter: '전체보기' | '수령완료' | '미수령'
  setStateFilter: React.Dispatch<React.SetStateAction<'전체보기' | '수령완료' | '미수령'>>
  checkedItems: Array<any>
  setCheckedItems: (list: Array<any>) => void
}

export const HoldingListItem = ({
  dataLists,
  onPressViewDetail,
  index,
  locationFilter,
  setLocationFilter,
  stateFilter,
  setStateFilter,
  showStateFilterBottomSheet,
  setShowStateFilterBottomSheet,
  checkedItems,
  setCheckedItems,
}: HoldingListItem) => {
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const handleSingleCheck = (id: number) => {
    if (checkedItems.includes(id)) {
      //체크 해제
      setCheckedItems(checkedItems.filter(checkedId => checkedId !== id))
    } else {
      //체크
      setCheckedItems([...checkedItems, id])
    }
  }

  // 체크박스 전체 선택
  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray: Array<any> = []
      dataLists?.forEach(el => idArray.push(el.id))
      setCheckedItems(idArray)
      setAllChecked(true)
    }
    // 전체 체크 박스 체크 삭제
    else {
      setCheckedItems([])
      setAllChecked(false)
    }
  }
  useEffect(() => {
    if (checkedItems.length == dataLists?.length) setAllChecked(true)
    else setAllChecked(false)
  }, [allChecked, checkedItems])

  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween]}>
        <Pressable
          onPress={() => {
            handleAllCheck(!allChecked)
          }}>
          {allChecked ? <Text>전체 선택 해제</Text> : <Text>전체 선택</Text>}
        </Pressable>
        <View style={[theme.styles.rowFlexStart]}>
          <HoldingSharingFilterTab
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
            showStateFilterBottomSheet={showStateFilterBottomSheet}
            setShowStateFilterBottomSheet={setShowStateFilterBottomSheet}
          />
        </View>
      </View>
      <View>
        {/* 리스트 api 필요 */}
        {dataLists?.map((list, idx) => (
          <ReceiverListItem
            id={Number(list.id)}
            onPressViewDetail={onPressViewDetail}
            index={idx + 1}
            key={list.id}
            checkedItems={checkedItems}
            handleSingleCheck={handleSingleCheck}
            receiveState={list.receiveState}
            products={list.products}
            receiverName={list.receiverName}
          />
        ))}
      </View>
    </View>
  )
}
