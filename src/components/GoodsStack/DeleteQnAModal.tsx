import React, {useCallback} from 'react'
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage, Message} from 'react-native-flash-message'
import {XIcon} from '../utils'
import * as theme from '../../theme'
import {queryKeys, deleteInquiry} from '../../api'

type LogoutModalProps = {
  deleteQnAModalVisible: boolean
  setDeleteQnAModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  nanumIdx: number
  inquiryIdx: number
}

const MODAL_PADDING = 24
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - MODAL_PADDING * 2 - 8) / 2

export const DeleteQnAModal = ({deleteQnAModalVisible, setDeleteQnAModalVisible, nanumIdx, inquiryIdx}: LogoutModalProps) => {
  const queryClient = useQueryClient()

  const deleteInquiryQuery = useMutation([queryKeys.inquiry, nanumIdx], deleteInquiry, {
    onSuccess(data, variables, context) {
      showMessage({
        message: '삭제가 완료됐습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })

      queryClient.invalidateQueries([queryKeys.inquiry, nanumIdx])
      queryClient.invalidateQueries([queryKeys.nanumDetail, nanumIdx])
    },
    onError(error, variables, context) {
      showMessage({
        message: '삭제 중 오류가 발생했습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
  })
  const hideModal = useCallback(() => setDeleteQnAModalVisible(false), [])
  const onPressDelete = useCallback(() => {
    // deletion code goes here...
    setDeleteQnAModalVisible(false)
    deleteInquiryQuery.mutate({
      inquiryIdx,
    })
  }, [inquiryIdx])

  return (
    <Modal isVisible={deleteQnAModalVisible == true} backdropColor={theme.gray800} backdropOpacity={0.6} onBackdropPress={hideModal}>
      <View style={styles.logoutModalContainer}>
        <View style={{marginBottom: 8}}>
          <XIcon style={{alignSelf: 'flex-end'}} onPress={hideModal} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={[theme.styles.bold20, {marginBottom: 8, lineHeight: 24}]}>삭제하기</Text>
          <Text style={{fontSize: 16, color: theme.gray500, lineHeight: 24}}>선택하신 글을 삭제하시겠습니까?</Text>
          <View style={[theme.styles.rowSpaceBetween, {marginTop: 16, width: '100%'}]}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={hideModal}>
              <Text style={[theme.styles.bold16, styles.cancelText, {lineHeight: 24}]}>취소</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.logoutButton]} onPress={onPressDelete}>
              <Text style={[theme.styles.bold16, styles.logoutText, {lineHeight: 24}]}>삭제</Text>
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
