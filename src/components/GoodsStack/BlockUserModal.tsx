import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation} from '@react-navigation/native'
import * as theme from '../../theme'

const STATUSBAR_HEIGHT = getStatusBarHeight()

type BlockUserModalProps = {
  blockUserModalVisible: boolean
  setBlockUserModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  userName: string
  userId: string
}

export const BlockUserModal = ({blockUserModalVisible, setBlockUserModalVisible, userId, userName}: BlockUserModalProps) => {
  // ******************** utils ********************
  const navigation = useNavigation()

  // ******************** callbacks ********************
  const onPressBlockUser = useCallback(() => {
    setBlockUserModalVisible(false)
    // 차단하는 api
    navigation.navigate('ReportIssueStackNavigator', {
      screen: 'ReportIssueStep3',
      params: {
        userName: userName,
      },
    })
  }, [])
  return (
    <Modal
      isVisible={blockUserModalVisible}
      onBackdropPress={() => {
        setBlockUserModalVisible(false)
      }}
      animationInTiming={150}
      animationOutTiming={150}
      backdropOpacity={0}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <Pressable style={styles.modalContainer} onPress={onPressBlockUser}>
        <View style={styles.modalButton}>
          <Text style={{color: theme.gray700}}>차단하기</Text>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.white,
    position: 'absolute',
    width: 144,
    right: 0,
    borderRadius: 4,
    top: STATUSBAR_HEIGHT + 28,
    borderColor: theme.gray200,
    borderWidth: 1,
  },
  modalButton: {
    height: 40,
    padding: 10,
    justifyContent: 'center',
    zIndex: 1,
  },
})
