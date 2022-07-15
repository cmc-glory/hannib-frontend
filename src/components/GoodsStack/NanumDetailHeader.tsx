import React, {useCallback, useState} from 'react'
import {View, Text, Pressable, Alert, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {useNavigation} from '@react-navigation/native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Clipboard from '@react-native-clipboard/clipboard'
import {Shadow} from 'react-native-shadow-2'

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
  writerAccountIdx: number
  nanumIdx: number
}

type ShareModalProps = {
  shareVisible: boolean
  toggleShareVisible: () => void
  shareUrl: string
}

type NanumDetailHeaderProps = {
  inverted?: boolean
  userAccountIdx: number
  writerAccountIdx: number
  nanumIdx: number
}

const ShareModal = ({shareVisible, toggleShareVisible, shareUrl}: ShareModalProps) => {
  //const link = '링크 자동 생성'
  const copyToClipboard = () => {
    Clipboard.setString(shareUrl)
    Alert.alert('복사가 완료되었습니다', '', [{text: '확인', onPress: () => toggleShareVisible()}])
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
              <Text style={{color: theme.gray700}}>{shareUrl}</Text>
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

const MenuModal = ({moreVisible, setMoreVisible, onPressReportIssue, isWriter, setDeleteModalVisible, writerAccountIdx}: MenuModalProps) => {
  const [deletePressed, setDeletePressed] = useState<boolean>(false)

  const onPressDelete = useCallback(() => {
    setDeletePressed(true)
    setMoreVisible(false)
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
        <Shadow
          containerViewStyle={{position: 'absolute', width: 144, right: 0, borderRadius: 4, top: STATUSBAR_HEIGHT + 28}}
          distance={28}
          startColor="rgba(0,0,0,0.04)">
          <View style={{borderRadius: 4}}>
            <Pressable onPress={onPressDelete} style={[styles.menuModalButton, {backgroundColor: 'rgba(250,250,250,0.96)', width: 144, borderRadius: 4}]}>
              <Text>삭제하기</Text>
            </Pressable>
          </View>
        </Shadow>
      ) : (
        <Shadow
          containerViewStyle={{position: 'absolute', width: 144, right: 0, borderRadius: 4, top: STATUSBAR_HEIGHT + 28}}
          distance={28}
          offset={[0, 0]}
          startColor="rgba(0,0,0,0.04)">
          <View style={{borderRadius: 4}}>
            <Pressable onPress={onPressReportIssue} style={[styles.menuModalButton, {backgroundColor: 'rgba(250,250,250,0.96)', width: 144, borderRadius: 4}]}>
              <Text>신고하기</Text>
            </Pressable>
          </View>
        </Shadow>
      )}
    </Modal>
  )
}

export const NanumDetailHeader = ({inverted, userAccountIdx, writerAccountIdx, nanumIdx}: NanumDetailHeaderProps) => {
  // ********************
  const navigation = useNavigation()
  const [shareVisible, toggleShareVisible] = useToggle() // 공유 모달창 띄울지
  //const [moreVisible, toggleMoreVisible] = useToggle() // 메뉴 모달창 띄울지
  const [moreVisible, setMoreVisible] = useAsyncState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  //const isWriter = userid == writerid
  const isWriter = userAccountIdx == writerAccountIdx
  const shareUrl = `hannip://hannip/goods&idx=${nanumIdx}`

  const onPressGoback = useCallback(() => {
    navigation.goBack()
  }, [])

  const onPressReportIssue = useCallback(async () => {
    await setMoreVisible(false)
    navigation.navigate('ReportIssueStackNavigator', {
      screen: 'ReportIssueStep1',
      params: {
        nanumIdx: nanumIdx,
      },
    })
  }, [nanumIdx])

  return (
    <View style={[styles.container]}>
      <DeleteModal deleteModalVisible={deleteModalVisible} setDeleteModalVisible={setDeleteModalVisible} nanumIdx={nanumIdx} />
      {inverted ? (
        <LeftArrowIcon onPress={onPressGoback} style={{marginRight: 10}} />
      ) : (
        <LeftArrowWhiteIcon onPress={onPressGoback} style={{marginRight: 10}} />
      )}

      <ShareModal shareVisible={shareVisible} toggleShareVisible={toggleShareVisible} shareUrl={shareUrl} />
      <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
        <MenuModal
          moreVisible={moreVisible}
          setMoreVisible={setMoreVisible}
          onPressReportIssue={onPressReportIssue}
          isWriter={isWriter}
          setDeleteModalVisible={setDeleteModalVisible}
          writerAccountIdx={writerAccountIdx}
          nanumIdx={nanumIdx}
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
    //backgroundColor: theme.white,
    //backgroundColor: 'rgba(255,255,255,0.1)',
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
