import React, {useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet, Dimensions, TextInput} from 'react-native'
import {StackHeader, Button, RoundButton} from '../utils'
import {NotTakenModal} from '../MyPageStack/NotTakenModal'
import {AddressModal} from '../MyPageStack/AddressModal'
import {CheckFinishedModal} from '../MyPageStack/CheckFinishedModal'
import {CancelModal} from '../MyPageStack/CancelModal'

import {DownArrowIcon, RightArrowIcon, Tag, XIcon} from '../utils'
import * as theme from '../../theme'
import {useToggle} from '../../hooks'

type ButtonsProp = {
  toggleCancelModalVisible: () => void
  toggleAddressModalVisible: () => void
  toggleCheckFinishedModalVisible: () => void
  toggleNotTakenModalVisible: () => void
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

let holdingSharingState = 'offlineNotFinished' //'onlineNotSent', 'onlineSent', 'offlineFinished', 'offlineNotFinished'
const Buttons = ({toggleAddressModalVisible, toggleCancelModalVisible, toggleCheckFinishedModalVisible, toggleNotTakenModalVisible}: ButtonsProp) => {
  switch (holdingSharingState) {
    case 'onlineNotSent':
      return (
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} onPress={toggleCancelModalVisible} />
          <Button label="운송장 등록" selected={true} style={{width: BUTTON_WIDTH}} onPress={toggleAddressModalVisible} />
        </View>
      )
    case 'onlineSent':
      return (
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} onPress={toggleCancelModalVisible} />
          <Button label="운송장 등록 완료" selected={false} style={{width: BUTTON_WIDTH}} />
        </View>
      )
    case 'offlineFinished':
      return <Button label="미수령" selected={false} style={{width: '100%'}}></Button>
    case 'offlineNotFinished':
      return (
        <View style={{width: '100%'}}>
          <View style={{...theme.styles.rowSpaceBetween, width: '100%', marginBottom: 10}}>
            <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} onPress={toggleCancelModalVisible} />
            <Button label="수령 체크" selected={true} style={{width: BUTTON_WIDTH}} onPress={toggleCheckFinishedModalVisible} />
          </View>
          <Pressable style={{marginTop: 7}} onPress={toggleNotTakenModalVisible}>
            <Text style={{fontSize: 12, fontWeight: '400', color: theme.main}}>혹시 미수령인가요?</Text>
          </Pressable>
        </View>
      )
    default:
      return <View></View>
  }
}

const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 10) / 2
const MODAL_BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 50) / 2

export const HoldingSharingDetail = () => {
  const [cancelModalVisible, toggleCancelModalVisible] = useToggle() // 취소 모달창 띄울지
  const [addressModalVisible, toggleAddressModalVisible] = useToggle() // 운송장 등록 모달창 띄울지
  const [checkFinishedModalVisible, toggleCheckFinishedModalVisible] = useToggle() // 수령 체크 모달창 띄울지
  const [notTakenModalVisible, toggleNotTakenModalVisible] = useToggle()
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
          <Buttons
            toggleAddressModalVisible={toggleAddressModalVisible}
            toggleCancelModalVisible={toggleCancelModalVisible}
            toggleCheckFinishedModalVisible={toggleCheckFinishedModalVisible}
            toggleNotTakenModalVisible={toggleNotTakenModalVisible}
          />
        </View>
        {/* db 나오면 타입 받고 타입에 따라 보여주기
        <Pressable style={{marginTop: 7}}>
          <Text style={{fontSize: 12, fontWeight: '400', color: theme.main}}>혹시 미수령인가요?</Text>
        </Pressable> */}
      </ScrollView>
      <CancelModal isVisible={cancelModalVisible} toggleIsVisible={toggleCancelModalVisible} />
      <AddressModal isVisible={addressModalVisible} toggleIsVisible={toggleAddressModalVisible} sendMethod={sendMethod} setSendMethod={setSendMethod} />
      <CheckFinishedModal isVisible={checkFinishedModalVisible} toggleIsVisible={toggleCheckFinishedModalVisible} />
      <NotTakenModal isVisible={notTakenModalVisible} toggleIsVisible={toggleNotTakenModalVisible} />
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
