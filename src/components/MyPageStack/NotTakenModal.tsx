import React, {useCallback} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {RoundButton} from '../../components/utils'
import Modal from 'react-native-modal'
import {XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useMutation} from 'react-query'
import {checkNotTaken, queryKeys} from '../../api'
import {showMessage} from 'react-native-flash-message'

type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
  accountIdx: number
  nanumIdx: number
  onRefresh: () => void
}

export const NotTakenModal = ({isVisible, toggleIsVisible, accountIdx, nanumIdx, onRefresh}: ModalProps) => {
  //console.log('participantAccountIdx : ', accountIdx)

  // ************************** react quries **************************
  const checkNotTakenQuery = useMutation([queryKeys.endNanum, nanumIdx], checkNotTaken, {
    onSuccess(data, variables, context) {
      onRefresh()
      showMessage({
        // 에러 안내 메세지
        message: '미수령 처리가 완료되었습니다.',
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
    checkNotTakenQuery.mutate({
      accountIdx: accountIdx,
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
          <Text style={[theme.styles.bold20, {marginBottom: 8}]}>미수령 처리 하시겠습니까?</Text>
          <Text style={{marginHorizontal: 24, fontSize: 16, lineHeight: 24, textAlign: 'center'}}>
            미수령 처리 진행시, 해당 수령자는 미수령처리로 경고가 들어갑니다. 정말로 미수령처리 하시겠습니까?
          </Text>
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
