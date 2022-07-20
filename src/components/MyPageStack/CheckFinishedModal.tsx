import React, {useCallback} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {RoundButton} from '../../components/utils'
import Modal from 'react-native-modal'
import {XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useToggle} from '../../hooks'
import {postGoodsSent, queryKeys} from '../../api'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
  accountIdx: number
  nanumIdx: number
  onRefresh: () => void
}

export const CheckFinishedModal = ({isVisible, toggleIsVisible, accountIdx, nanumIdx, onRefresh}: ModalProps) => {
  //console.log('accountIdx : ', accountIdx)
  const queryClient = useQueryClient()
  // ************************** react quries **************************
  const postGoodsSentQuery = useMutation([queryKeys.endNanum, nanumIdx], postGoodsSent, {
    onSuccess(data, variables, context) {
      onRefresh()
      queryClient.invalidateQueries([queryKeys.holdingNanumList])
      queryClient.invalidateQueries([queryKeys.receiverList, nanumIdx])
      showMessage({
        // 에러 안내 메세지
        message: '전달 완료 처리되었습니다.',
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

  const onPressOkBtn = useCallback(() => {
    postGoodsSentQuery.mutate({
      accountIdx: accountIdx,
      nanumDeleteReason: '',
      nanumIdx: nanumIdx,
    })
    toggleIsVisible()
  }, [accountIdx, nanumIdx])

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
        <RoundButton label="확인" onPress={onPressOkBtn} enabled />
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
