import React, {useCallback, useState} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {RoundButton} from '../../components/utils'
import Modal from 'react-native-modal'
import {DownArrowIcon, RightArrowIcon, Tag, XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useToggle} from '../../hooks'

type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
}

export const CancelModal = ({isVisible, toggleIsVisible}: ModalProps) => {
  const [reason, setReason] = useState<string>('')
  const [noText, setNoText] = useState<boolean>(false)

  const checkButtonEnabled = useCallback((text: string) => {
    return text == '' ? false : true
  }, [])

  const checkIsWritten = useCallback((text: string) => {
    //입력칸이 비어있으면 에러 표시
    if (text == '') {
      setNoText(true)
      return
    }
    //텍스트가 있으면 모달 닫음
    closeModal()
  }, [])

  const closeModal = () => {
    setReason('')
    setNoText(false)
    toggleIsVisible()
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={closeModal} backdropColor={theme.gray800} backdropOpacity={0.6}>
      <View style={styles.shareModal}>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[theme.styles.bold16]}>취소하기</Text>
          <XIcon onPress={closeModal} />
        </View>
        <View style={{width: '100%', height: 1, marginVertical: 16, backgroundColor: theme.gray200}} />
        <View style={{marginBottom: 16}}>
          <Text style={{fontSize: 16, marginBottom: 12}}>취소사유</Text>
          <TextInput
            placeholder="취소사유를 입력해주세요."
            style={[styles.modalTextInput, noText && {borderColor: theme.red}]}
            autoCorrect={false}
            value={reason}
            onChangeText={text => {
              setNoText(false)
              setReason(text)
            }}></TextInput>
          {noText && <Text style={[{color: theme.red, fontSize: 12, marginTop: 4}, theme.styles.text12]}>취소 사유를 입력해주세요.</Text>}
        </View>
        <RoundButton
          label="확인"
          onPress={() => {
            checkIsWritten(reason)
          }}
          enabled={checkButtonEnabled(reason)}
        />
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
