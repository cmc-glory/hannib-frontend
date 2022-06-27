import React, {useCallback, useState} from 'react'
import {View, Text, Pressable, TouchableOpacity, Animated, Alert, Modal as RNModal, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {useNavigation} from '@react-navigation/native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Clipboard from '@react-native-clipboard/clipboard'

import {DeleteModal} from './DeleteModal'
import * as theme from '../../theme'
import {useToggle, useAsyncState} from '../../hooks'
import {LeftArrowIcon, ShareIcon, XIcon, MenuIcon, LeftArrowWhiteIcon, ShareWhiteIcon, MenuWhiteIcon} from '../utils'

const STATUSBAR_HEIGHT = getStatusBarHeight()

type MenuModalProps = {
  moreVisible: boolean
  setMoreVisible: (x: any) => Promise<any>
  onPressReportIssue: () => void
  isWriter: boolean
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type ShareModalProps = {
  shareVisible: boolean
  toggleShareVisible: () => void
}

type GoodsDetailHeaderProps = {
  inverted?: boolean
  userid: string
  writerid: string
}

const ShareModal = ({shareVisible, toggleShareVisible}: ShareModalProps) => {
  const link = '링크 자동 생성'
  const copyToClipboard = () => {
    Clipboard.setString(link)
    Alert.alert('복사가 완료되었습니다', '', [{text: '확인'}])
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

const MenuModal = ({moreVisible, setMoreVisible, onPressReportIssue, isWriter, setDeleteModalVisible}: MenuModalProps) => {
  const [deletePressed, setDeletePressed] = useState<boolean>(false)
  const onPressEdit = useCallback(() => {
    setMoreVisible(false)

    Alert.alert('수정하기 클릭')
  }, [])

  const onPressDelete = useCallback(() => {
    setDeletePressed(true)
    setMoreVisible(false)

    //Alert.alert('삭제하기 클릭')
  }, [])
  return (
    <Modal
      isVisible={moreVisible}
      onBackdropPress={() => setMoreVisible(false)}
      animationInTiming={150}
      animationOutTiming={150}
      backdropOpacity={0}
      onModalHide={() => {
        if (deletePressed) {
          setDeleteModalVisible(true)
          setDeletePressed(false)
        }
      }}
      animationIn={'fadeIn'}
      animationOut="fadeOut">
      {isWriter ? (
        <View style={styles.menuModalWrapper}>
          <Pressable style={styles.menuModalButton} onPress={onPressEdit}>
            <Text>수정하기</Text>
          </Pressable>
          <Pressable style={styles.menuModalButton} onPress={onPressDelete}>
            <Text>삭제하기</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.menuModalWrapper}>
          <Pressable style={styles.menuModalButton} onPress={onPressReportIssue}>
            <Text style={{color: theme.gray800}}>신고하기</Text>
          </Pressable>
        </View>
      )}
    </Modal>
  )
}

export const GoodsDetailHeader = ({inverted, userid, writerid}: GoodsDetailHeaderProps) => {
  const navigation = useNavigation()
  const [shareVisible, toggleShareVisible] = useToggle() // 공유 모달창 띄울지
  //const [moreVisible, toggleMoreVisible] = useToggle() // 메뉴 모달창 띄울지
  const [moreVisible, setMoreVisible] = useAsyncState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  const isWriter = userid == writerid

  const onPressGoback = useCallback(() => {
    navigation.goBack()
  }, [])

  const onPressReportIssue = useCallback(async () => {
    await setMoreVisible(false)
    navigation.navigate('ReportIssueStackNavigator')
  }, [])

  return (
    <View style={[styles.container]}>
      <DeleteModal deleteModalVisible={deleteModalVisible} setDeleteModalVisible={setDeleteModalVisible} />
      {inverted ? (
        <LeftArrowIcon onPress={onPressGoback} style={{marginRight: 10}} />
      ) : (
        <LeftArrowWhiteIcon onPress={onPressGoback} style={{marginRight: 10}} />
      )}

      <ShareModal shareVisible={shareVisible} toggleShareVisible={toggleShareVisible} />
      <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
        <MenuModal
          moreVisible={moreVisible}
          setMoreVisible={setMoreVisible}
          onPressReportIssue={onPressReportIssue}
          isWriter={isWriter}
          setDeleteModalVisible={setDeleteModalVisible}
        />
        {inverted ? (
          <>
            <ShareIcon onPress={toggleShareVisible} />
            <MenuIcon onPress={() => setMoreVisible(true)} />
          </>
        ) : (
          <>
            <ShareWhiteIcon onPress={toggleShareVisible} />
            <MenuWhiteIcon onPress={() => setMoreVisible(true)} />
          </>
        )}
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
  menuModalButton: {
    height: 40,
    padding: 10,
    justifyContent: 'center',
    zIndex: 1,
  },
  menuModalWrapper: {
    backgroundColor: theme.white,
    position: 'absolute',
    width: 144,
    right: 0,
    borderRadius: 4,
    top: STATUSBAR_HEIGHT + 28,
    borderColor: theme.gray200,
    borderWidth: 1,
  },
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 99,
    position: 'absolute',
    marginTop: STATUSBAR_HEIGHT,
  },
})
