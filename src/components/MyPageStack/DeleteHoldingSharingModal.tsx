import React, {useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native'
import {RoundButton} from '../utils'
import Modal from 'react-native-modal'
import {DownArrowIcon, RightArrowIcon, Tag, XIcon} from '../utils'
import * as theme from '../../theme'
import {useToggle} from '../../hooks'
import {gray300} from '../../theme'

const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 50) / 2

type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
}

export const DeleteHoldingSharingModal = ({isVisible, toggleIsVisible}: ModalProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleIsVisible} backdropColor={theme.gray800} backdropOpacity={0.6}>
      <View style={styles.shareModal}>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[theme.styles.bold16]}>삭제하기</Text>
          <XIcon onPress={toggleIsVisible} />
        </View>
        <View style={{width: '100%', height: 1, marginVertical: 16, backgroundColor: theme.gray200}} />
        <View style={{marginBottom: 16}}>
          <Text style={{fontSize: 16, marginBottom: 12, fontWeight: '500'}}>삭제사유</Text>
          <TextInput
            placeholder="기 신청자들에게 전달할 사유가 있을 경우 작성해주세요."
            style={[styles.modalTextInput, {textAlignVertical: 'top'}]}
            autoCorrect={false}
            multiline={true}></TextInput>
        </View>
        <View style={{...theme.styles.rowSpaceBetween, width: '100%', marginBottom: 10}}>
          <RoundButton label="취소" onPress={toggleIsVisible} style={{width: BUTTON_WIDTH}} />
          <RoundButton label="삭제" onPress={toggleIsVisible} style={{width: BUTTON_WIDTH}} enabled />
        </View>
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
    paddingTop: 14,
    borderWidth: 1,
    borderColor: theme.gray200,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 18,
    lineHeight: 20,
    height: 108,
  },
})
