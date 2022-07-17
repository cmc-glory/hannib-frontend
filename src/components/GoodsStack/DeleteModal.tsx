import React, {useState, useCallback, useRef, useEffect} from 'react'
import {View, Text, Pressable, TextInput, StyleSheet, Dimensions} from 'react-native'
import Modal from 'react-native-modal'
import {XIcon} from '../utils'
import * as theme from '../../theme'
import {useQueryClient, useMutation} from 'react-query'
import {useNavigation} from '@react-navigation/native'
import {queryKeys, deleteNanumForm} from '../../api'

type DeleteModalProps = {
  deleteModalVisible: boolean
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  nanumIdx: number
}
const MODAL_PADDING = 24
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - MODAL_PADDING * 2 - 8) / 2

const Separator = () => {
  return <View style={{height: 1, width: '100%', backgroundColor: theme.gray200, marginVertical: 16}}></View>
}

export const DeleteModal = ({deleteModalVisible, setDeleteModalVisible, nanumIdx}: DeleteModalProps) => {
  // ******************** utils ********************
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const textinputRef = useRef<TextInput>(null)

  // ******************** states ********************
  const [deleteReason, setDeleteReason] = useState<string>('')

  // ******************** react queries ********************
  const deleteQuery = useMutation(queryKeys.nanumForm, deleteNanumForm, {
    onSuccess(data, variables, context) {
      console.log('success')
      console.log(data)
      queryClient.invalidateQueries([queryKeys.nanumList])
      navigation.navigate('MainTabNavigator')
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })

  useEffect(() => {
    textinputRef.current?.focus()
  }, [textinputRef])

  // ******************** callbacks ********************

  const hideModal = useCallback(() => setDeleteModalVisible(false), [])
  const onPressDelete = useCallback(() => {
    deleteQuery.mutate({
      nanumIdx: nanumIdx,
      deletedReason: deleteReason,
    })
    hideModal()
  }, [nanumIdx, deleteReason])
  return (
    <Modal isVisible={deleteModalVisible} onBackdropPress={hideModal} backdropOpacity={0.2} animationInTiming={200} animationOutTiming={200}>
      <View style={styles.deleteModalContainer}>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[theme.styles.bold20]}>삭제하기</Text>
          <XIcon style={{alignSelf: 'flex-end'}} onPress={hideModal} />
        </View>
        <Separator />
        <View>
          <Text style={[theme.styles.label]}>삭제 사유</Text>
          <TextInput
            ref={textinputRef}
            style={[theme.styles.input, {height: 108, paddingTop: 16}]}
            placeholder="기존 신청자들에게 전달할 사유가 있을 경우 작성해주세요."
            placeholderTextColor={theme.gray300}
            textAlignVertical="top"
            multiline
            value={deleteReason}
            onChangeText={setDeleteReason}
          />
        </View>
        <View style={[theme.styles.rowSpaceBetween, {marginTop: 16}]}>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={hideModal}>
            <Text style={[theme.styles.bold16, styles.cancelText]}>취소</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.logoutButton]} onPress={onPressDelete}>
            <Text style={[theme.styles.bold16, styles.logoutText]}>삭제</Text>
          </Pressable>
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
  deleteModalContainer: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: theme.white,
  },
})
