import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, ButtonProps, TextInput} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Modal from 'react-native-modal'

import {StackHeader, SharingPreview, GoodsListItem, Button, Tag, RoundButton, XIcon} from '../../components/utils'

import * as theme from '../../theme'
import {ToggleButton} from 'react-native-paper'
import {useToggle} from '../../hooks'
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 10) / 2

type ButtonsProps = {
  toggleCancelModalVisible: () => void
}
type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
}

const participateState: string = 'proceeding'
const Buttons = ({toggleCancelModalVisible}: ButtonsProps) => {
  switch (participateState) {
    case 'proceeding':
      return (
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} onPress={toggleCancelModalVisible} />
          <Button label="문의하기" selected={true} style={{width: BUTTON_WIDTH}} />
        </View>
      )
    case 'completed':
      return <Button label="후기 작성" selected={true} style={{width: '100%'}} />
  }
}

const CancelModal = ({isVisible, toggleIsVisible}: ModalProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleIsVisible} backdropColor={theme.gray800} backdropOpacity={0.6}>
      <View style={styles.shareModal}>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[theme.styles.bold16]}>취소하기</Text>
          <XIcon onPress={toggleIsVisible} />
        </View>
        <View style={{width: '100%', height: 1, marginVertical: 16, backgroundColor: theme.gray200}} />
        <View style={{marginBottom: 16}}>
          <Text style={{fontSize: 16, marginBottom: 12}}>취소사유</Text>
          <TextInput placeholder="취소사유를 입력해주세요." style={styles.modalTextInput} autoCorrect={false}></TextInput>
        </View>
        <RoundButton label="확인" enabled />
      </View>
    </Modal>
  )
}

export const ParticipatingSharingOnline = () => {
  const [cancelModalVisible, toggleCancelModalVisible] = useToggle() // 취소 모달창 띄울지
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
            <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
              <Text style={{color: theme.gray500}}>2022.06.30 22:01:52</Text>
              <Tag label="수령 완료"></Tag>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령자명</Text>
              <Text style={styles.requestInfoText}>수령자명</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>주문 목록</Text>
              <View>
                <Text style={{...styles.requestInfoText, marginBottom: 8}}>BTS 뷔 컨셉의 하트 키링(2개)</Text>
                <Text style={{...styles.requestInfoText, marginBottom: 8}}>BTS 지민 컨셉의 클로버 키링(2개)</Text>
                <Text style={{...styles.requestInfoText}}>BTS 정국 컨셉의 스페이드 키링(2개)</Text>
              </View>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>주소</Text>
              <Text style={styles.requestInfoText}>서울 마포구 양재대로 1234길 12호</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>연락처</Text>
              <Text style={styles.requestInfoText}>010-1234-5678</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령 현황</Text>
              <Text style={styles.requestInfoText}>배송 준비중</Text>
            </View>
          </View>
        </View>
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Buttons toggleCancelModalVisible={toggleCancelModalVisible} />
        </View>

        <CancelModal isVisible={cancelModalVisible} toggleIsVisible={toggleCancelModalVisible} />
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
