import React, {useCallback} from 'react'
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {XIcon} from '../utils'
import * as theme from '../../theme'
import {useDispatch} from 'react-redux'
import {logout} from '../../redux/slices/auth'

type LogoutModalProps = {
  resignModalVisbile: boolean

  setResignModalVisible: React.Dispatch<React.SetStateAction<boolean>>

  resign: boolean
  setResign: React.Dispatch<React.SetStateAction<boolean>>
}

const MODAL_PADDING = 24
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - MODAL_PADDING * 2 - 8) / 2

export const ResignModal = ({resignModalVisbile, setResignModalVisible, resign, setResign}: LogoutModalProps) => {
  const dispatch = useDispatch()
  const hideModal = useCallback(() => setResignModalVisible(false), [])

  // 마지막 탈퇴하기 모달 클릭 시
  const onPressResign = useCallback(() => {
    setResign(true)
    hideModal()
  }, [])

  return (
    <Modal isVisible={resignModalVisbile} backdropColor={theme.gray800} backdropOpacity={0.6} onBackdropPress={hideModal}>
      <View style={styles.logoutModalContainer}>
        <View style={{marginBottom: 8}}>
          <XIcon style={{alignSelf: 'flex-end'}} onPress={hideModal} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={[theme.styles.bold20, {marginBottom: 8}]}>회원탈퇴</Text>
          <View style={{marginVertical: 8, alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: theme.gray500, marginBottom: 4}}>정말로 탈퇴하시겠습니까?</Text>
            <Text style={{fontSize: 16, color: theme.gray500, textAlign: 'center'}}>
              탈퇴 시, 회원님의 모든 게시글과 활동내역이 삭제되며 삭제된 정보는 복구할 수 없습니다.
            </Text>
          </View>

          <View style={[theme.styles.rowSpaceBetween, {marginTop: 16, width: '100%'}]}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={hideModal}>
              <Text style={[theme.styles.bold16, styles.cancelText]}>취소</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.logoutButton]} onPress={onPressResign}>
              <Text style={[theme.styles.bold16, styles.logoutText]}>탈퇴</Text>
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
