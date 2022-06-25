import React from 'react'
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native'
import {RoundButton} from '../../components/utils'
import Modal from 'react-native-modal'
import {DownArrowIcon, RightArrowIcon, Tag, XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {getStatusBarHeight} from 'react-native-status-bar-height'

const STATUSBAR_HEIGHT = getStatusBarHeight()

type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
}

export const EditDeleteModal = ({isVisible, toggleIsVisible}: ModalProps) => {
  return (
    <Modal
      animationInTiming={150}
      animationOutTiming={150}
      backdropOpacity={0}
      animationIn={'fadeIn'}
      animationOut="fadeOut"
      isVisible={isVisible}
      onBackdropPress={toggleIsVisible}
      backdropColor={theme.gray800}>
      <Pressable style={styles.menuModal}>
        <Text style={{color: theme.gray800, height: 40}}>수정하기</Text>
        <Text style={{color: theme.gray800}}>신고하기</Text>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  menuModal: {
    backgroundColor: theme.white,
    position: 'absolute',
    width: 144,
    //height: 40,
    padding: 10,
    justifyContent: 'center',
    zIndex: 1,
    right: 0,
    borderRadius: 4,
    top: STATUSBAR_HEIGHT + 28,
  },
})
