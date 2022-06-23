import React, {useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet, Dimensions, TextInput} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, Button, RoundButton} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Modal from 'react-native-modal'
import {DownArrowIcon, RightArrowIcon, Tag, XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useToggle} from '../../hooks'

type CancelModal = {
  isVisible: boolean
  toggleIsVisible: () => void
}

type AddressModal = {
  isVisible: boolean
  toggleIsVisible: () => void
  sendMethod: string
  setSendMethod: (mthd: string) => void
}

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

const CancelModal = ({isVisible, toggleIsVisible}: CancelModal) => {
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
        <RoundButton label="확인" onPress={toggleIsVisible} enabled />
      </View>
    </Modal>
  )
}

const AddressModal = ({isVisible, toggleIsVisible, sendMethod, setSendMethod}: AddressModal) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleIsVisible} backdropColor={theme.gray800} backdropOpacity={0.6}>
      <View style={styles.shareModal}>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[theme.styles.bold16]}>운송장 등록</Text>
          <XIcon onPress={toggleIsVisible} />
        </View>
        <View style={{width: '100%', height: 1, marginVertical: 16, backgroundColor: theme.gray200}} />
        <View style={{marginBottom: 16}}>
          <Text style={{fontSize: 16, marginBottom: 12}}>전달 방식</Text>
          <View style={{...theme.styles.rowSpaceBetween, marginBottom: 16}}>
            <Button
              label="우편"
              selected={true}
              style={{width: MODAL_BUTTON_WIDTH}}
              onPress={() => {
                setSendMethod('post')
              }}
            />
            <Button
              label="등기"
              selected={false}
              style={{width: MODAL_BUTTON_WIDTH}}
              onPress={() => {
                setSendMethod('registeredMail')
              }}
            />
          </View>
          {sendMethod == 'post' ? (
            <View style={{...theme.styles.rowFlexStart}}>
              <BouncyCheckbox size={20} fillColor={theme.secondary} style={{width: 20}} />
              <Text style={{marginLeft: 8}}>나머지도 동일하게 우편전송으로 처리</Text>
            </View>
          ) : (
            <View>
              <TextInput placeholder="택배사" style={[styles.modalTextInput, {marginBottom: 10}]} autoCorrect={false}></TextInput>
              <TextInput placeholder="운송장 번호" style={styles.modalTextInput} autoCorrect={false}></TextInput>
            </View>
          )}
        </View>
        <RoundButton label="확인" onPress={toggleIsVisible} enabled />
      </View>
    </Modal>
  )
}

const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 10) / 2
const MODAL_BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 50) / 2

export const HoldingSharingDetail = () => {
  const [cancelModalVisible, toggleCancelModalVisible] = useToggle() // 취소 모달창 띄울지
  const [addressModalVisible, toggleAddressModalVisible] = useToggle() // 운송장 등록 모달창 띄울지
  const [sendMethod, setSendMethod] = useState<string>('post') //post : 우편, registeredMail : 등기

  return (
    <View style={{flex: 1, marginTop: 16}}>
      <ScrollView>
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
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} onPress={toggleCancelModalVisible} />
          <Button label="운송장 등록" selected={true} style={{width: BUTTON_WIDTH}} onPress={toggleAddressModalVisible} />
        </View>
        {/* db 나오면 타입 받고 타입에 따라 보여주기
        <Pressable style={{marginTop: 7}}>
          <Text style={{fontSize: 12, fontWeight: '400', color: theme.main}}>혹시 미수령인가요?</Text>
        </Pressable> */}
      </ScrollView>
      <CancelModal isVisible={cancelModalVisible} toggleIsVisible={toggleCancelModalVisible} />
      <AddressModal isVisible={addressModalVisible} toggleIsVisible={toggleAddressModalVisible} sendMethod={sendMethod} setSendMethod={setSendMethod} />
    </View>
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
