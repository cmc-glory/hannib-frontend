import React, {useCallback, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {
  StackHeader,
  FloatingBottomButton,
  DownArrowIcon,
  LeftArrowIcon,
  RightArrowIcon,
  SharingPreview,
  GoodsListItem,
  XIcon,
  MenuIcon,
  BottomSheet,
} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {ReceiverListItem} from './ReceiverListItem'
import {HoldingSharingFilterTab} from '../MyPageStack'

type HoldingListItem = {
  dataLists: Array<any>
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
  let bouncyCheckboxRef: BouncyCheckbox | null = null
  const [checkboxState, setCheckboxState] = useState<boolean>(false)
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const handleSingleCheck = (checked: Boolean, id: Number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id])
    } else {
      // 체크 해제
      setCheckedItems(checkedItems.filter(el => el !== id))
    }
  }
  // 체크박스 전체 선택
  const handleAllCheck = (checked: Boolean) => {
    if (checked) {
      console.log('wow')
      const idArray: Array<any> = []
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      dataLists.forEach(el => idArray.push(el.id))
      setCheckedItems(idArray)
      console.log('checkedItems : ', checkedItems)
      console.log('idArray : ', idArray)
      bouncyCheckboxRef?.onPress()
    }

    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckedItems([])
    }
    console.log('dataLists : ', dataLists)
    console.log('checkedItems : ', checkedItems)
  }
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween]}>
        <Pressable
          onPress={() => {
            //bouncyCheckboxRef?.onPress()
            setCheckboxState(!checkboxState)
          }}>
          <Text>전체 선택</Text>
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
        {dataLists.map((list, idx) => (
          <ReceiverListItem
            bouncyCheckboxRef={bouncyCheckboxRef}
            id={list.id}
            onPressViewDetail={onPressViewDetail}
            index={idx + 1}
            key={list.id}
            checkedItems={checkedItems}
            checkboxState={checkboxState}
            setCheckboxState={setCheckboxState}
          />
        ))}
      </View>
    </View>
  )
}
