import React, {useState, useCallback} from 'react'
import {View, Pressable, Text, StyleSheet, Animated} from 'react-native'
import Modal from 'react-native-modal'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation} from '@react-navigation/native'
import * as theme from '../../theme'

const STATUS_BAR_HEIGHT = getStatusBarHeight()

type SettingsModalProps = {
  settingsModalVisible: boolean
  setSettingsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsModal = ({settingsModalVisible, setSettingsModalVisible}: SettingsModalProps) => {
  const navigation = useNavigation()

  const onPressBlockedUsers = useCallback(() => {
    setSettingsModalVisible(false)
    navigation.navigate('MyPageStackNavigator', {screen: 'BlockedUsers'})
  }, [])

  return (
    <Modal
      isVisible={settingsModalVisible}
      backdropOpacity={0}
      onBackdropPress={() => setSettingsModalVisible(false)}
      animationInTiming={150}
      animationOutTiming={150}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={[styles.container]}>
        <Pressable onPress={onPressBlockedUsers}>
          <Text style={styles.text}>차단 계정 관리</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.text}>고객센터 문의</Text>
        </Pressable>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  modal: {
    //position: 'absolute',
    //top: STATUS_BAR_HEIGHT + 48,
    //right: 20,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    position: 'absolute',
    width: 144,
    zIndex: 100,
    height: 80,
    top: STATUS_BAR_HEIGHT + 24,
    right: 0,
    justifyContent: 'center',
    //zIndex: 1,

    borderRadius: 4,

    shadowColor: theme.gray500,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 1,
    flex: 1,
    //backgroundColor: 'red',
  },
})
