import React, {useCallback} from 'react'
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {XIcon} from '../utils'
import * as theme from '../../theme'
import {useDispatch} from 'react-redux'
import {logout} from '../../redux/slices/auth'

type LogoutModalProps = {
  logoutModalVisible: boolean

  setLogoutModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const MODAL_PADDING = 24
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - MODAL_PADDING * 2 - 8) / 2

export const LogoutModal = ({logoutModalVisible, setLogoutModalVisible}: LogoutModalProps) => {
  const dispatch = useDispatch()
  const hideModal = useCallback(() => setLogoutModalVisible(false), [])
  const onPressLogout = useCallback(() => {
    dispatch(logout())
    hideModal()
  }, [])

  return (
    <Modal isVisible={logoutModalVisible == true} backdropColor={theme.gray800} backdropOpacity={0.6} onBackdropPress={hideModal}>
      <View style={styles.logoutModalContainer}>
        <View style={{marginBottom: 8}}>
          <XIcon style={{alignSelf: 'flex-end'}} onPress={hideModal} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={[theme.styles.bold20, {marginBottom: 8}]}>로그아웃</Text>
          <Text style={{fontSize: 16, color: theme.gray500}}>로그아웃 하시겠습니까?</Text>
          <View style={[theme.styles.rowSpaceBetween, {marginTop: 16, width: '100%'}]}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={hideModal}>
              <Text style={[theme.styles.bold16, styles.cancelText]}>취소</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.logoutButton]} onPress={onPressLogout}>
              <Text style={[theme.styles.bold16, styles.logoutText]}>로그아웃</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: theme.gray50,
    borderColor: theme.gray300,
  },
  logoutButton: {
    backgroundColor: theme.main,
    borderColor: theme.main,
  },
  cancelText: {
    color: theme.gray500,
  },
  logoutText: {
    color: theme.white,
  },

  button: {
    height: 48,
    borderRadius: 24,
    width: BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  logoutModalContainer: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: theme.white,
  },
})
