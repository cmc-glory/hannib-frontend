import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native'
import {Button, RoundButton} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Modal from 'react-native-modal'
import {XIcon} from '../../components/utils'
import * as theme from '../../theme'

type AddressModal = {
  isVisible: boolean
  toggleIsVisible: () => void
  sendMethod: string
  setSendMethod: (mthd: string) => void
}

const MODAL_BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 50) / 2

export const AddressModal = ({isVisible, toggleIsVisible, sendMethod, setSendMethod}: AddressModal) => {
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
