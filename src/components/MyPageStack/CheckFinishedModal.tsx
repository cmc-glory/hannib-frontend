import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {RoundButton} from '../../components/utils'
import Modal from 'react-native-modal'
import {XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useToggle} from '../../hooks'

type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
}

export const CheckFinishedModal = ({isVisible, toggleIsVisible}: ModalProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleIsVisible} backdropColor={theme.gray800} backdropOpacity={0.6}>
      <View style={styles.shareModal}>
        <View style={[{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16}]}>
          <XIcon onPress={toggleIsVisible} />
        </View>

        <View style={{marginBottom: 16, alignItems: 'center'}}>
          <Text style={[theme.styles.bold20, {marginBottom: 8}]}>전달 완료 하셨나요?</Text>
          <Text style={{marginHorizontal: 24, fontSize: 16, lineHeight: 24, textAlign: 'center'}}>전달완료 처리 진행하시겠습니까?</Text>
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
})
