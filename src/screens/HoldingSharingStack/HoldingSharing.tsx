import React, {useCallback} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, FloatingBottomButton, DownArrowIcon, RightArrowIcon, SharingPreview, GoodsListItem} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
//import {DownArrowIcon, RightArrowIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useNavigation} from '@react-navigation/native'

type ReceiverListItem = {
  onPressViewDetail: () => void
}

const ReceiverListItem = ({onPressViewDetail}: ReceiverListItem) => {
  return (
    <View style={[theme.styles.rowFlexStart, {paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.gray200}]}>
      <BouncyCheckbox size={20} fillColor={theme.secondary} />
      <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flex: 1}}>
        <Text style={{fontSize: 12, marginBottom: 8}}>수령자명</Text>
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
  const onPressViewDetail = useCallback(() => {
    navigation.navigate('HoldingSharingDetail')
  }, [])
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
        <View style={[theme.styles.rowSpaceBetween, {marginVertical: 16}]}>
          <Text>전체 선택 해제</Text>
          <View style={[theme.styles.rowFlexStart]}>
            <Text>전체 보기</Text>
            <DownArrowIcon />
          </View>
        </View>
        <View>
          <ReceiverListItem onPressViewDetail={onPressViewDetail} />
          <ReceiverListItem onPressViewDetail={onPressViewDetail} />
        </View>
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
