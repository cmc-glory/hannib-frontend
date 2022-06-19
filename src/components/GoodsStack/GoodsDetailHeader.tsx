import React, {useCallback, useState} from 'react'
import {View, Text, Pressable, TouchableOpacity, Animated, Alert, Modal as RNModal, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {useNavigation} from '@react-navigation/native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Clipboard from '@react-native-clipboard/clipboard'

import * as theme from '../../theme'
import {useToggle} from '../../hooks'
import {LeftArrowIcon, ShareIcon, XIcon, MenuIcon} from '../utils'

const STATUSBAR_HEIGHT = getStatusBarHeight()

type MenuModalProps = {
  moreVisible: boolean
  toggleMoreVisible: () => void
}

type ShareModalProps = {
  shareVisible: boolean
  toggleShareVisible: () => void
}

const ShareModal = ({shareVisible, toggleShareVisible}: ShareModalProps) => {
  const link = '링크 자동 생성'
  const copyToClipboard = () => {
    Clipboard.setString(link)
    Alert.alert('복사가 완료되었습니다', '', [{text : '확인'}])
  }
  return (
    <Modal isVisible={shareVisible} onBackdropPress={toggleShareVisible} backdropColor={theme.gray800} backdropOpacity={0.6}>
      <View style={styles.shareModal}>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[theme.styles.bold16]}>공유하기</Text>
          <XIcon onPress={toggleShareVisible} />
        </View>
        <View style={{width: '100%', height: 1, marginVertical: 16, backgroundColor: theme.gray200}} />
        <View>
          <Text style={{fontSize: 16, marginBottom: 12}}>복사할 링크</Text>
          <View style={[theme.styles.rowFlexStart]}>
            <View style={[theme.styles.input, {flex: 1, justifyContent: 'center'}]}>
              <Text style={{color: theme.gray700}}>{link}</Text>
            </View>
            <Pressable onPress={copyToClipboard} style={styles.copyButton}>
              <Text style={{fontSize: 16, color: theme.white}}>복사</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const MenuModal = ({moreVisible, toggleMoreVisible}: MenuModalProps) => {
  return (
    <RNModal transparent={true} visible={moreVisible}>
      <Pressable style={{flex: 1, justifyContent: 'center'}} onPress={toggleMoreVisible} />
      <View style={styles.menuModal}>
        <Text style={{color: theme.gray700}}>신고하기</Text>
      </View>
    </RNModal>
  )
}

export const GoodsDetailHeader = () => {
  const navigation = useNavigation()
  const [shareVisible, toggleShareVisible] = useToggle() // 공유 모달창 띄울지
  const [moreVisible, toggleMoreVisible] = useToggle() // 메뉴 모달창 띄울지

  const onPressGoback = useCallback(() => {
    navigation.goBack()
  }, [])

  return (
    <View style={[styles.container]}>
      <LeftArrowIcon onPress={onPressGoback} style={{marginRight: 10}} />
      <ShareModal shareVisible={shareVisible} toggleShareVisible={toggleShareVisible} />
      <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
        <MenuModal moreVisible={moreVisible} toggleMoreVisible={toggleMoreVisible} />

        <ShareIcon onPress={toggleShareVisible} />
        <MenuIcon onPress={toggleMoreVisible} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  copyButton: {
    width: 60,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.secondary,
    borderRadius: 4,
    marginLeft: 8,
  },
  shareModal: {
    backgroundColor: theme.white,
    borderRadius: 4,
    padding: theme.PADDING_SIZE,
  },
  menuModal: {
    backgroundColor: theme.white,
    position: 'absolute',
    width: 144,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    zIndex: 1,
    right: 20,
    borderRadius: 4,
    top: STATUSBAR_HEIGHT + 48,
    shadowColor: theme.gray500,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.32,
    shadowRadius: 32,
    elevation: 1,
  },
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    marginTop: STATUSBAR_HEIGHT,
  },
})
