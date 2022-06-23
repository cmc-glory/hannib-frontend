import React, {useCallback, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
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
  RoundButton,
} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Modal from 'react-native-modal'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {useNavigation} from '@react-navigation/native'
import {HoldingSharingDetail} from './HoldingSharingDetail'
import {TextInput} from 'react-native-gesture-handler'

type ReceiverListItem = {
  onPressViewDetail: () => void
  index: number //db나오면 수정
}

type HoldingListItem = {
  onPressViewDetail: () => void
  index: number
}

type HoldingDetailItem = {
  onPressLeftArrow: () => void
  onPressRightArrow: () => void
  cntList: number
  setIsDetail: (bool: boolean) => void
}

const ReceiverListItem = ({onPressViewDetail, index}: ReceiverListItem) => {
  return (
    <View style={[theme.styles.rowFlexStart, {paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.gray200}]}>
      <View style={{maxWidth: 20, alignItems: 'center', marginRight: 12}}>
        <Text style={{marginBottom: 2, fontSize: 12}}>{index}</Text>
        <BouncyCheckbox size={20} fillColor={theme.secondary} style={{width: 20}} />
      </View>

      <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flex: 1}}>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Text style={{fontSize: 12}}>수령자명</Text>
          {index == 1 ? ( //임시
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12}}> | </Text>
              <Text style={{fontSize: 12, color: theme.main}}>수령완료</Text>
            </View>
          ) : null}
        </View>

        <Text style={{color: theme.gray700, fontSize: 16}}>BTS 뷔 컨셉의 하트 키링</Text>
      </View>
      <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressViewDetail}>
        <Text style={{color: theme.gray500}}>상세보기</Text>
        <RightArrowIcon />
      </Pressable>
    </View>
  )
}

const HoldingListItem = ({onPressViewDetail, index}: HoldingListItem) => {
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween, {marginVertical: 16}]}>
        <Text>전체 선택 해제</Text>
        <View style={[theme.styles.rowFlexStart]}>
          <Text>전체 보기</Text>
          <DownArrowIcon />
        </View>
      </View>
      <View>
        {/* 리스트 api 필요 */}
        <ReceiverListItem onPressViewDetail={onPressViewDetail} index={1} />
        <ReceiverListItem onPressViewDetail={onPressViewDetail} index={2} />
      </View>
    </View>
  )
}

const HoldingDetailItem = ({onPressLeftArrow, onPressRightArrow, cntList, setIsDetail}: HoldingDetailItem) => {
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween, {marginTop: 16}]}>
        <View style={[theme.styles.rowSpaceBetween, {width: 85}]}>
          <LeftArrowIcon size={24} onPress={onPressLeftArrow} />
          <Text> {cntList} / 12 </Text>
          <RightArrowIcon size={24} onPress={onPressRightArrow} />
        </View>
        <XIcon size={20} onPress={() => setIsDetail(false)} />
      </View>
      <HoldingSharingDetail />
    </View>
  )
}

export const HoldingSharing = () => {
  const navigation = useNavigation()
  // const onPressViewDetail = useCallback(() => {
  //   navigation.navigate('HoldingSharingDetail')
  // }, [])
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
      <StackHeader goBack title="진행한 나눔"></StackHeader>
      <ScrollView contentContainerStyle={[theme.styles.wrapper]}>
        <SharingPreview uri="http://localhost:8081/src/assets/images/detail_image_example.png" category="BTS" title="BTS 키링 나눔" />

        <View style={{marginTop: 16}}>
          <GoodsListItem type="holding" />
          <GoodsListItem type="holding" />
          <GoodsListItem type="holding" />
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: theme.gray200, marginVertical: 10}} />
        {isDetail ? (
          <HoldingDetailItem onPressLeftArrow={onPressLeftArrow} onPressRightArrow={onPressRightArrow} cntList={cntList} setIsDetail={setIsDetail} />
        ) : (
          <HoldingListItem onPressViewDetail={onPressViewDetail} index={cntList} />
        )}
      </ScrollView>

      <FloatingBottomButton
        label="공지 보내기"
        enabled
        onPress={() => {
          navigation.navigate('SendNotice')
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
