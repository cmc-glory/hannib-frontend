import React, {useCallback, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, FloatingBottomButton, DownArrowIcon, LeftArrowIcon, RightArrowIcon, SharingPreview, GoodsListItem, XIcon} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import * as theme from '../../theme'
import {useNavigation} from '@react-navigation/native'
import {HoldingSharingDetail} from './HoldingSharingDetail'

type ReceiverListItem = {
  onPressViewDetail: () => void
  index: number //db나오면 수정
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
        ) : (
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

const styles = StyleSheet.create({})
