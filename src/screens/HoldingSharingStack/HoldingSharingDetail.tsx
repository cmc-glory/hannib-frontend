import React from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, Button} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {DownArrowIcon, RightArrowIcon, Tag} from '../../components/utils'
import * as theme from '../../theme'

const GoodsListItem = () => {
  return (
    <View style={[theme.styles.rowFlexStart, {marginBottom: 16}]}>
      <Text style={{flex: 1, color: theme.gray700, fontSize: 16}}>BTS 뷔 컨셉의 하트 키링</Text>
      <View style={theme.styles.rowFlexStart}>
        <Text style={{color: theme.gray500, marginRight: 5}}>잔여 수량</Text>
        <Text style={{color: theme.secondary}}>30</Text>
      </View>
    </View>
  )
}

const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 10) / 2

export const HoldingSharingDetail = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StackHeader goBack title="진행한 나눔"></StackHeader>
      <ScrollView contentContainerStyle={[theme.styles.wrapper, {flex: 1}]}>
        <FastImage source={{uri: 'http://localhost:8081/src/assets/images/detail_image_example.png'}} style={styles.thumbnailImage}>
          <View style={styles.thumbnailImageOverlay} />
          <View style={{padding: theme.PADDING_SIZE, alignSelf: 'stretch', justifyContent: 'space-between', zIndex: 1}}>
            <Text style={{color: theme.white, marginBottom: 5}}>BTS</Text>
            <Text style={[theme.styles.bold16, {color: theme.white}]}>BTS 키링 나눔</Text>
          </View>
        </FastImage>

        <View style={{marginTop: 16}}>
          <GoodsListItem />
          <GoodsListItem />
          <GoodsListItem />
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: theme.gray200, marginVertical: 10}} />
        <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginVertical: 16}]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text>전체 보기</Text>
            <DownArrowIcon />
          </View>
        </View>
        <View style={styles.receiverInfoContainer}>
          <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
            <Text style={{color: theme.gray500}}>2022.06.30 22:01:52</Text>
            <Tag label="미수령 3회"></Tag>
          </View>
          <View style={[theme.styles.rowSpaceBetween, styles.receiverInfoWrapper]}>
            <Text style={styles.receiverInfoLabel}>수령자명</Text>
            <Text style={styles.receiverInfoText}>수령자명</Text>
          </View>
          <View style={[theme.styles.rowSpaceBetween, styles.receiverInfoWrapper]}>
            <Text style={styles.receiverInfoLabel}>주문 목록</Text>
            <View>
              <Text style={styles.receiverInfoText}>BTS 뷔 컨셉의 하트 키링</Text>
              <Text style={styles.receiverInfoText}>BTS 지민 컨셉의 스페이드 키링</Text>
            </View>
          </View>
          <View style={[theme.styles.rowSpaceBetween, styles.receiverInfoWrapper]}>
            <Text style={styles.receiverInfoLabel}>주소</Text>
            <Text style={styles.receiverInfoText}>서울 마포구 양재대로 1234길 12호</Text>
          </View>
          <View style={[theme.styles.rowSpaceBetween, styles.receiverInfoWrapper]}>
            <Text style={styles.receiverInfoLabel}>연락처</Text>
            <Text style={styles.receiverInfoText}>010-2229-7345</Text>
          </View>
        </View>
        <View style={{...theme.styles.rowSpaceBetween, width: '100%', position: 'absolute', bottom: 10}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} />
          <Button label="운송장 등록" selected={true} style={{width: BUTTON_WIDTH}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  receiverInfoContainer: {
    flex: 1,
  },
  receiverInfoWrapper: {
    marginBottom: 20,
  },
  receiverInfoLabel: {
    fontSize: 16,
    color: theme.gray500,
    alignSelf: 'flex-start',
  },
  receiverInfoText: {
    fontSize: 16,
    color: theme.gray700,
    alignSelf: 'flex-end',
  },
  thumbnailImage: {
    leftQuantity: {
      color: theme.gray700,
    },
    height: 84,
    width: '100%',
    borderRadius: 10,
  },
  thumbnailImageOverlay: {
    backgroundColor: 'rgba(32,32,33,0.4)',
    //backgroundColor: 'red',
    width: '100%',
    height: 84,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
  },
})
