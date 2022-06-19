import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, SharingPreview, GoodsListItem, Button} from '../../components/utils'
import * as theme from '../../theme'
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 10) / 2

export const ParticipatingSharingOffline = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="참여한 나눔" goBack />
      <View style={[styles.container, theme.styles.wrapper]}>
        <SharingPreview uri="http://localhost:8081/src/assets/images/detail_image_example.png" category="BTS" title="BTS 키링 나눔" />
        <View style={{marginTop: 16}}>
          <GoodsListItem type="participating" />
          <GoodsListItem type="participating" />
          <GoodsListItem type="participating" />
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: theme.gray200, marginVertical: 10}} />
        <View style={{marginVertical: 16}}>
          <Text style={[theme.styles.bold16, {marginBottom: 16}]}>신청 내역</Text>

          <View>
            <Text style={{color: theme.gray500}}>2022.06.30 22:01:52</Text>
            <View style={{paddingVertical: 16, alignSelf: 'center'}}>
              <View style={{backgroundColor: theme.main50, width: 104, height: 104}} />
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령자명</Text>
              <Text style={styles.requestInfoText}>수령자명</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령일</Text>
              <Text style={styles.requestInfoText}>2022.06.11 14:00</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>장소</Text>
              <Text style={styles.requestInfoText}>블루스퀘어</Text>
            </View>
          </View>
        </View>

        <View style={{...theme.styles.rowSpaceBetween, width: '100%', position: 'absolute', bottom: 10}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} />
          <Button label="문의하기" selected={true} style={{width: BUTTON_WIDTH}} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
  },
  requestInfoContainer: {
    flex: 1,
  },
  requestInfoWrapper: {
    marginBottom: 20,
  },
  requestInfoLabel: {
    fontSize: 16,
    color: theme.gray500,
    alignSelf: 'flex-start',
  },
  requestInfoText: {
    fontSize: 16,
    color: theme.gray700,
    alignSelf: 'flex-end',
  },
})
