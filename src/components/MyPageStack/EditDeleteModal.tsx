import React, {useCallback} from 'react'
import {View, Text, StyleSheet, TextInput, Pressable, Platform} from 'react-native'
import {RoundButton} from '../../components/utils'
import Modal from 'react-native-modal'
import {DownArrowIcon, RightArrowIcon, Tag, XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation} from '@react-navigation/native'

const STATUSBAR_HEIGHT = getStatusBarHeight()

type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
  deleteSharingModalVisible: boolean
  toggleDeleteSharingModalVisible: () => void
}

export const EditDeleteModal = ({isVisible, toggleIsVisible, deleteSharingModalVisible, toggleDeleteSharingModalVisible}: ModalProps) => {
  const navigation = useNavigation()

  const onPressEdit = useCallback(() => {
    toggleIsVisible()
    navigation.navigate('HoldingSharingStackNavigator', {
      screen: 'EditGoodsDefault',
    })
  }, [])

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
      <View style={styles.menuModal}>
        {/* <Pressable
          onPress={() => {
            onPressEdit()
          }}>
          <Text style={{color: theme.gray800}}>수정하기</Text>
        </Pressable> */}
        <Pressable
          onPress={() => {
            toggleIsVisible()
            setTimeout(() => toggleDeleteSharingModalVisible(), Platform.OS === 'ios' ? 300 : 0)
          }}>
          <Text style={{color: theme.gray800}}>삭제하기</Text>
        </Pressable>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  menuModal: {
    backgroundColor: theme.gray100,
    position: 'absolute',
    width: 144,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    zIndex: 1,
    right: 10,
    borderRadius: 4,
    top: STATUSBAR_HEIGHT + 20,
  },
})
