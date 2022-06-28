import React, {useCallback, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, FloatingBottomButton, SharingPreview, GoodsListItem, MenuIcon, BottomSheet} from '../../components/utils'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {useNavigation} from '@react-navigation/native'
import {EditDeleteModal, HoldingSharingBottomSheetContent} from '../../components/MyPageStack'
import {HoldingListItem, HoldingDetailItem} from '../../components/MyPageTabStack'

const dataLists: Array<any> = [
  {id: 123, data: 'aaa'},
  {id: 4355435, data: 'bbb'},
  {id: 12313, data: 'ccc'},
  {id: 121241, data: 'ccc'},
  {id: 7546, data: 'ccc'},
  {id: 234324, data: 'ccc'},
  {id: 2342343, data: 'ccc'},
  {id: 7765754, data: 'ccc'},
]

// type ReceiverListItem = {
//   id: number
//   onPressViewDetail: () => void
//   index: number //db나오면 수정
//   checkedItems: Array<any>
//   bouncyCheckboxRef: any
//   checkboxState: boolean
//   setCheckboxState: (bool: boolean) => void
// }

// type HoldingListItem = {
//   dataLists: Array<any>
//   onPressViewDetail: () => void
//   index: number
//   showStateFilterBottomSheet: boolean
//   setShowStateFilterBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
//   locationFilter: 0 | 1 | 2
//   setLocationFilter: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
//   stateFilter: '전체보기' | '수령완료' | '미수령'
//   setStateFilter: React.Dispatch<React.SetStateAction<'전체보기' | '수령완료' | '미수령'>>
//   checkedItems: Array<any>
//   setCheckedItems: (list: Array<any>) => void
// }

// type HoldingDetailItem = {
//   isOnline: boolean
//   onPressLeftArrow: () => void
//   onPressRightArrow: () => void
//   cntList: number
//   setIsDetail: (bool: boolean) => void
// }

// //개별 리스트 아이템
// const ReceiverListItem = ({onPressViewDetail, index, checkedItems, id, bouncyCheckboxRef, checkboxState, setCheckboxState}: ReceiverListItem) => {
//   return (
//     <View style={[theme.styles.rowFlexStart, {paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.gray200}]}>
//       <View style={{maxWidth: 20, alignItems: 'center', marginRight: 12}}>
//         <Text style={{marginBottom: 2, fontSize: 12}}>{index}</Text>
//         <BouncyCheckbox
//           disableBuiltInState
//           size={20}
//           fillColor={theme.secondary}
//           style={{width: 20}}
//           isChecked={checkboxState}
//           ref={(ref: any) => (bouncyCheckboxRef = ref)}
//           onPress={(isChecked: boolean = false) => setCheckboxState(!checkboxState)}
//         />
//       </View>

//       <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flex: 1}}>
//         <View style={{flexDirection: 'row', marginBottom: 8}}>
//           <Text style={{fontSize: 12}}>수령자명</Text>
//           {index == 1 ? ( //임시
//             <View style={{flexDirection: 'row'}}>
//               <Text style={{fontSize: 12}}> | </Text>
//               <Text style={{fontSize: 12, color: theme.main}}>수령완료</Text>
//             </View>
//           ) : null}
//         </View>

//         <Text style={{color: theme.gray700, fontSize: 16}}>BTS 뷔 컨셉의 하트 키링</Text>
//       </View>
//       <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressViewDetail}>
//         <Text style={{color: theme.gray500}}>상세보기</Text>
//         <RightArrowIcon />
//       </Pressable>
//     </View>
//   )
// }

// const HoldingListItem = ({
//   onPressViewDetail,
//   index,
//   locationFilter,
//   setLocationFilter,
//   stateFilter,
//   setStateFilter,
//   showStateFilterBottomSheet,
//   setShowStateFilterBottomSheet,
//   checkedItems,
//   setCheckedItems,
// }: HoldingListItem) => {
//   let bouncyCheckboxRef: BouncyCheckbox | null = null
//   const [checkboxState, setCheckboxState] = useState<boolean>(false)
//   const [allChecked, setAllChecked] = useState<boolean>(false)
//   const handleSingleCheck = (checked: Boolean, id: Number) => {
//     if (checked) {
//       setCheckedItems([...checkedItems, id])
//     } else {
//       // 체크 해제
//       setCheckedItems(checkedItems.filter(el => el !== id))
//     }
//   }
//   // 체크박스 전체 선택
//   const handleAllCheck = (checked: Boolean) => {
//     if (checked) {
//       console.log('wow')
//       const idArray: Array<any> = []
//       // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
//       // 전체 체크 박스 체크
//       dataLists.forEach(el => idArray.push(el.id))
//       setCheckedItems(idArray)
//       console.log('checkedItems : ', checkedItems)
//       console.log('idArray : ', idArray)
//       bouncyCheckboxRef?.onPress()
//     }

//     // 반대의 경우 전체 체크 박스 체크 삭제
//     else {
//       setCheckedItems([])
//     }
//     console.log('dataLists : ', dataLists)
//     console.log('checkedItems : ', checkedItems)
//   }
//   return (
//     <View>
//       <View style={[theme.styles.rowSpaceBetween]}>
//         <Pressable
//           onPress={() => {
//             //bouncyCheckboxRef?.onPress()
//             setCheckboxState(!checkboxState)
//           }}>
//           <Text>전체 선택</Text>
//         </Pressable>
//         <View style={[theme.styles.rowFlexStart]}>
//           <HoldingSharingFilterTab
//             locationFilter={locationFilter}
//             setLocationFilter={setLocationFilter}
//             stateFilter={stateFilter}
//             setStateFilter={setStateFilter}
//             showStateFilterBottomSheet={showStateFilterBottomSheet}
//             setShowStateFilterBottomSheet={setShowStateFilterBottomSheet}
//           />
//         </View>
//       </View>
//       <View>
//         {/* 리스트 api 필요 */}
//         {dataLists.map((list, idx) => (
//           <ReceiverListItem
//             bouncyCheckboxRef={bouncyCheckboxRef}
//             id={list.id}
//             onPressViewDetail={onPressViewDetail}
//             index={idx + 1}
//             key={list.id}
//             checkedItems={checkedItems}
//             checkboxState={checkboxState}
//             setCheckboxState={setCheckboxState}
//           />
//         ))}
//       </View>
//     </View>
//   )
// }
// const HoldingDetailItem = ({onPressLeftArrow, onPressRightArrow, cntList, setIsDetail}: HoldingDetailItem) => {
//   return (
//     <View>
//       <View style={[theme.styles.rowSpaceBetween, {marginTop: 16}]}>
//         <View style={[theme.styles.rowSpaceBetween, {width: 85}]}>
//           <LeftArrowIcon size={24} onPress={onPressLeftArrow} />
//           <Text> {cntList} / 12 </Text>
//           <RightArrowIcon size={24} onPress={onPressRightArrow} />
//         </View>
//         <XIcon size={20} onPress={() => setIsDetail(false)} />
//       </View>
//       <HoldingSharingDetail />
//     </View>
//   )
// }

export const HoldingSharing = () => {
  const [editDeleteModalVisible, toggleeditDeleteModalVisible] = useToggle() //수정, 삭제하기 모달 띄울지
  const [showStateFilterBottomSheet, setShowStateFilterBottomSheet] = useState<boolean>(false) // 전체보기, 수령완료, 미수령 필터링 탭 띄울지
  const [stateFilter, setStateFilter] = useState<'전체보기' | '수령완료' | '미수령'>('전체보기')
  const [locationFilter, setLocationFilter] = useState<0 | 1 | 2>(0) // 전체보기(0), 수령완료(1), 미수령(2)
  const [checkedItems, setCheckedItems] = useState<Array<any>>([])

  // 전체 체크 클릭 시 발생하는 함수
  // const onCheckedAll = useCallback(
  //   checked => {
  //     if (checked) {
  //       const checkedListArray: Array<any> = []

  //       dataLists.forEach(list => checkedListArray.push(list.id))

  //       setCheckedList(checkedListArray)
  //     } else {
  //       setCheckedList([])
  //     }
  //   },
  //   [dataLists],
  // )

  // // 개별 체크 클릭 시 발생하는 함수
  // const onCheckedElement = useCallback(
  //   (checked, list) => {
  //     if (checked) {
  //       setCheckedList([...checkedList, list])
  //     } else {
  //       setCheckedList(checkedList.filter(el => el !== list))
  //     }
  //   },
  //   [checkedList],
  // )
  // 체크박스 전체 단일 개체 선택

  const navigation = useNavigation()
  const onPressViewDetail = () => {
    setIsDetail(true)
  }

  const onPressLeftArrow = () => {
    if (cntList == 1) setCntList(12)
    else setCntList(cntList - 1)
  }
  const onPressRightArrow = () => {
    if (cntList == 12) setCntList(1)
    else setCntList(cntList + 1)
  }
  // 우선 숫자만 바뀌게 해둠. db 들어오면 바꿔야함.

  const [isDetail, setIsDetail] = useState<boolean>(false)
  const [cntList, setCntList] = useState<number>(1)
  return (
    <SafeAreaView style={{flex: 1}}>
      <StackHeader title="진행한 나눔" goBack>
        <MenuIcon onPress={toggleeditDeleteModalVisible}></MenuIcon>
      </StackHeader>
      <ScrollView contentContainerStyle={[theme.styles.wrapper]}>
        <SharingPreview uri="http://localhost:8081/src/assets/images/detail_image_example.png" category="BTS" title="BTS 키링 나눔" />

        <View style={{marginTop: 16}}>
          <GoodsListItem type="holding" />
          <GoodsListItem type="holding" />
          <GoodsListItem type="holding" />
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: theme.gray200, marginVertical: 10}} />
        {isDetail ? (
          <HoldingDetailItem
            isOnline={true}
            onPressLeftArrow={onPressLeftArrow}
            onPressRightArrow={onPressRightArrow}
            cntList={cntList}
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
            dataLists={dataLists}
          />
        )}
      </ScrollView>

      <FloatingBottomButton
        label="공지 보내기"
        enabled
        onPress={() => {
          navigation.navigate('SendNotice')
        }}
      />
      <EditDeleteModal isVisible={editDeleteModalVisible} toggleIsVisible={toggleeditDeleteModalVisible} />
      <BottomSheet modalVisible={showStateFilterBottomSheet} setModalVisible={setShowStateFilterBottomSheet}>
        <HoldingSharingBottomSheetContent stateFilter={stateFilter} setStateFilter={setStateFilter} />
      </BottomSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
