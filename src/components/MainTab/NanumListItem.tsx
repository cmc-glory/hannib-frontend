import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, Pressable, TextInput, StyleSheet, Alert, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import Modal from 'react-native-modal'
import {useMutation} from 'react-query'
import moment from 'moment'
import {showMessage} from 'react-native-flash-message'
import * as theme from '../../theme'
import type {ISharingInfo, INanumListItem} from '../../types'
import {Tag, XIcon, StarUnfilledIcon, StarFilledIcon} from '../utils'
import {addFavorite, removeFavorite} from '../../api'
import {useAppSelector} from '../../hooks'

const {width} = Dimensions.get('window')

var IMAGE_SIZE = (width - theme.PADDING_SIZE * 3) / 2

type SecretModalProps = {
  secretModalVisible: boolean
  setSecretModalVisible: React.Dispatch<React.SetStateAction<boolean>>

  secretPwd: string | undefined | number
  nanumIdx: number
}

const SecretModal = ({secretModalVisible, setSecretModalVisible, secretPwd, nanumIdx}: SecretModalProps) => {
  const [secretSuccess, setSecretSuccess] = useState<boolean | null>()
  const [secretInput, setSecretInput] = useState<string>('')
  const navigation = useNavigation()
  const onPressCheck = () => {
    if (secretInput == secretPwd) {
      setSecretInput('')
      navigation.navigate('GoodsStackNavigator', {
        screen: 'NanumDetail',
        params: {
          nanumIdx: nanumIdx,
        },
      })
      setSecretSuccess(true)
      setSecretModalVisible(false)
    } else {
      setSecretSuccess(false)
    }
  }

  return (
    <Modal isVisible={secretModalVisible} backdropColor={theme.gray800} backdropOpacity={0.6} onBackdropPress={() => setSecretModalVisible(false)}>
      <View style={styles.secretModalContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <XIcon onPress={() => setSecretModalVisible(false)} />
        </View>
        <View style={{marginTop: theme.PADDING_SIZE, alignItems: 'center'}}>
          <Text style={[{fontFamily: 'Pretendard-Bold', fontSize: 18, marginBottom: 8}]}>비밀번호가 걸려있습니다.</Text>
          <Text style={{color: theme.gray500, fontSize: 14}}>공유받은 비밀번호를 입력해주세요.</Text>
        </View>
        <View style={{marginVertical: 16, height: 68, justifyContent: 'space-between'}}>
          <TextInput
            style={[theme.styles.input, {color: theme.gray800}, secretSuccess == false && {borderColor: theme.red}]}
            placeholder="시크릿 코드를 입력해 주세요"
            placeholderTextColor={theme.gray300}
            value={secretInput}
            onChangeText={text => {
              setSecretInput(text)
              setSecretSuccess(null)
            }}
          />
          {secretSuccess == false && <Text style={{color: theme.red, fontSize: 12}}>비밀번호가 맞지 않습니다.</Text>}
        </View>

        <Pressable
          style={[secretInput == '' ? theme.styles.disabledButton : theme.styles.button, {justifyContent: 'center', alignItems: 'center', paddingVertical: 14}]}
          onPress={onPressCheck}>
          <Text style={[theme.styles.bold16, {color: theme.white}]}>확인</Text>
        </Pressable>
      </View>
    </Modal>
  )
}

export const NanumListItem = ({item}: {item: INanumListItem}) => {
  // 나눔 게시글 아이템 구조분해 할당
  const {nanumIdx, nanumMethod, title, creatorId, thumbnail, secretForm, secretPwd, favoritesYn, firstDate} = item
  const writerAccountIdx = item.accountIdx

  const openDate = new Date(firstDate)

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const imageUri = thumbnail ? thumbnail : 'http://localhost:8081/src/assets/images/no-image.jpeg'
  const navigation = useNavigation()

  const [isBefore, setIsBefore] = useState(false)

  const [secretModalVisible, setSecretModalVisible] = useState(false)

  // ------------- react queries -------------
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const addFavoriteQuery = useMutation(addFavorite, {
    onSuccess: () => {
      showMessage({
        // 에러 안내 메세지
        message: '찜 목록에 추가되었습니다.',
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
  // 찜 해제
  const removeFavoriteQuery = useMutation(removeFavorite, {
    onSuccess: () => {
      showMessage({
        // 에러 안내 메세지
        message: '찜 목록에서 삭제되었습니다.',
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

  const onPressAddFavorite = useCallback(() => {
    if (addFavoriteQuery.isLoading || removeFavoriteQuery.isLoading) {
      return
    }
    // 즐겨찾기 버튼 클릭했을 때
    item.favoritesYn = 'Y' // 프론트 단에서만 즐겨찾기 여부 수정.
    item.favorites += 1
    addFavoriteQuery.mutate({
      accountIdx: accountIdx,
      nanumIdx: item.nanumIdx,
    }) // 인자에는 query params 넣기
  }, [item, accountIdx, addFavoriteQuery, removeFavoriteQuery])

  const onPressRemoveFavorite = useCallback(() => {
    if (addFavoriteQuery.isLoading || removeFavoriteQuery.isLoading || item.favorites == 0) {
      return
    }
    // 즐겨찾기 버튼 클릭했을 때
    item.favoritesYn = 'N' //  프론트 단에서만 즐겨찾기 여부 수정. (invalidate query로 새로 가져오기 X)
    item.favorites -= 1
    removeFavoriteQuery.mutate({
      accountIdx: accountIdx,
      nanumIdx: item.nanumIdx,
    }) // 인자에는 query params 넣기
  }, [item, accountIdx, addFavoriteQuery, removeFavoriteQuery])

  useEffect(() => {
    setIsBefore(new Date() < openDate ? true : false)
  }, [item])

  // 상세 페이지로 이동
  const onPressItem = useCallback(() => {
    const now = new Date()

    console.log(secretForm)
    console.log(now < openDate)
    console.log(writerAccountIdx, accountIdx)

    // 오픈 시간 전이고, 작성자가 아니라면 나눔 게시글에 들어가지 못함
    if (now < openDate && writerAccountIdx != accountIdx) {
      setIsBefore(true)
      return // 오픈 전인 경우엔 이동 X
    }
    // 시크릿 폼이고 작성자가 아니라면
    if (secretForm == 'Y' && writerAccountIdx != accountIdx) {
      // 나눔글 작성자는 그냥 통과 시킴
      setSecretModalVisible(true)
    } else {
      navigation.navigate('GoodsStackNavigator', {
        screen: 'NanumDetail',
        params: {
          nanumIdx: nanumIdx,
        },
      })
    }
  }, [nanumIdx, secretForm])

  return (
    <>
      <SecretModal secretModalVisible={secretModalVisible} setSecretModalVisible={setSecretModalVisible} secretPwd={secretPwd} nanumIdx={nanumIdx} />
      <Pressable onPress={onPressItem} style={[styles.container]}>
        {isBefore && (
          <View style={{...styles.overlay}}>
            <View style={[styles.imageHeader, {width: IMAGE_SIZE}]}>
              {favoritesYn == 'Y' ? <StarFilledIcon onPress={onPressRemoveFavorite} size={24} /> : <StarUnfilledIcon onPress={onPressAddFavorite} size={24} />}
            </View>
            <Text style={[styles.overlayText, {marginBottom: 2.5}]}>{moment(openDate).format('YY/MM/DD HH:mm')}</Text>
            <Text style={styles.overlayText}>오픈 예정</Text>
          </View>
        )}
        <View style={{width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 8}}>
          {!isBefore && (
            <View style={[styles.imageHeader, {width: IMAGE_SIZE}]}>
              {favoritesYn == 'Y' ? <StarFilledIcon onPress={onPressRemoveFavorite} size={24} /> : <StarUnfilledIcon onPress={onPressAddFavorite} size={24} />}
            </View>
          )}
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={[styles.image, {width: IMAGE_SIZE, height: IMAGE_SIZE}]}
            source={{uri: imageUri}}></FastImage>
        </View>
        <View style={{marginTop: 10}}>
          <Tag label={nanumMethod == 'M' ? '우편' : '오프라인'} />
          <Text style={[styles.title, {width: IMAGE_SIZE}]}>{title}</Text>
          <Text style={[styles.writerName]}>{creatorId}</Text>
        </View>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  secretModalContainer: {
    padding: 24,
    backgroundColor: theme.white,
    borderRadius: 8,
  },
  overlayText: {
    color: theme.white,
    fontFamily: 'Pretendard-SemiBold',
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: 'rgba(32,32,33,0.66)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  writerName: {
    color: theme.gray500,
    fontFamily: 'Pretendard-Medium',
    marginTop: 2.5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    width: IMAGE_SIZE,
    borderRadius: 8,
  },
  image: {
    borderRadius: 8,
    aspectRatio: 1 / 1,
  },
  imageHeader: {
    position: 'absolute',
    top: 5,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginTop: 5,
    color: theme.gray800,
  },
})
