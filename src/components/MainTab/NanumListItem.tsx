import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, Pressable, TextInput, StyleSheet, Dimensions, Platform, Alert} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import Modal from 'react-native-modal'
import {useMutation} from 'react-query'
import moment, {Moment} from 'moment'
import {showMessage} from 'react-native-flash-message'
import * as theme from '../../theme'
import type {INanumListItem} from '../../types'
import {Tag, XIcon, StarUnfilledIcon, StarFilledIcon} from '../utils'
import {addFavorite, removeFavorite, queryKeys} from '../../api'
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
  // ********************* utils *********************
  // 나눔 게시글 아이템 구조분해 할당
  const {nanumIdx, nanumMethod, title, creatorId, thumbnail, secretForm, secretPwd, favoritesYn, firstDate, endYn, categoryIdx, category} = item
  const writerAccountIdx = item.accountIdx

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const navigation = useNavigation()

  // ********************* states *********************
  const [isBefore, setIsBefore] = useState(false) // 나눔 시작 예약 여부
  const [secretModalVisible, setSecretModalVisible] = useState<boolean>(false) // 시크릿폼 모달 띄울지
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const [openDate, setOpenDate] = useState<Moment>(moment())

  // ********************* react queries *********************
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const addFavoriteQuery = useMutation([queryKeys.favorites, nanumIdx], addFavorite, {
    onSuccess: () => {
      item.favoritesYn = 'Y' // 프론트 단에서만 즐겨찾기 여부 수정.
      item.favorites += 1
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
  const removeFavoriteQuery = useMutation([queryKeys.favorites, nanumIdx], removeFavorite, {
    onSuccess: () => {
      item.favoritesYn = 'N' // 프론트 단에서만 즐겨찾기 여부 수정.
      item.favorites -= 1
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

  // ********************* callbacks *********************
  const onPressAddFavorite = useCallback(() => {
    // 즐겨찾기 추가, 삭제 api가 실행되고 있을 때는 새로 요청 X

    if (isLoggedIn == false) {
      if (Platform.OS == 'ios') {
        Alert.alert('로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?', '', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
        ])
      } else {
        Alert.alert('로그인 후 이용할 수 있습니다', '로그인 페이지로 이동하시겠습니까?', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
        ])
      }
    } else {
      if (addFavoriteQuery.isLoading || removeFavoriteQuery.isLoading) {
        return
      }
      // 즐겨찾기 버튼 클릭했을 때

      addFavoriteQuery.mutate({
        accountIdx: accountIdx,
        nanumIdx: nanumIdx,
        categoryIdx: categoryIdx,
        category: category,
      }) // 인자에는 query params 넣기
    }
  }, [item, accountIdx, nanumIdx, categoryIdx, category, isLoggedIn])

  const onPressRemoveFavorite = useCallback(() => {
    if (isLoggedIn == false) {
      if (Platform.OS == 'ios') {
        Alert.alert('로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?', '', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
        ])
      } else {
        Alert.alert('로그인 후 이용할 수 있습니다', '로그인 페이지로 이동하시겠습니까?', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
        ])
      }
    } else {
      // 즐겨찾기 추가, 삭제 api가 실행되고 있을 때는 새로 요청 X
      if (addFavoriteQuery.isLoading || removeFavoriteQuery.isLoading || item.favorites == 0) {
        return
      }
      // 즐겨찾기 버튼 클릭했을 때
      item.favoritesYn = 'N' //  프론트 단에서만 즐겨찾기 여부 수정. (invalidate query로 새로 가져오기 X)
      item.favorites -= 1
      removeFavoriteQuery.mutate({
        accountIdx: accountIdx,
        nanumIdx: nanumIdx,
        categoryIdx: categoryIdx,
        category: category,
        //category: '에스파',
      }) // 인자에는 query params 넣기
    }
  }, [item, accountIdx, nanumIdx, categoryIdx, category, isLoggedIn])

  useEffect(() => {
    const [day, time] = firstDate.split(' ')
    const days = day.split('.')

    let tempDate = moment(`${days[0]}-${days[1]}-${days[2]} ${time}`)
    setOpenDate(tempDate)

    setIsBefore(moment() < tempDate ? true : false)
    setIsClosed(endYn == 'Y' ? true : false)
  }, [item])

  // 상세 페이지로 이동
  const onPressItem = useCallback(() => {
    const now = moment()

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
        {!isClosed && isBefore && (
          <View style={{...styles.overlay}}>
            <View style={[styles.imageHeader, {width: IMAGE_SIZE}]}>
              {favoritesYn == 'Y' ? <StarFilledIcon onPress={onPressRemoveFavorite} size={24} /> : <StarUnfilledIcon onPress={onPressAddFavorite} size={24} />}
            </View>
            <Text style={[styles.overlayText, {marginBottom: 2.5}]}>{moment(openDate).format('YY/MM/DD HH:mm')}</Text>
            <Text style={styles.overlayText}>오픈 예정</Text>
          </View>
        )}
        {isClosed && (
          <View style={{...styles.overlay}}>
            <View style={[styles.imageHeader, {width: IMAGE_SIZE}]}>
              {favoritesYn == 'Y' ? <StarFilledIcon onPress={onPressRemoveFavorite} size={24} /> : <StarUnfilledIcon onPress={onPressAddFavorite} size={24} />}
            </View>
            <Text style={[styles.overlayText, {marginBottom: 2.5}]}>마감</Text>
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
            source={{uri: thumbnail}}></FastImage>
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
    backgroundColor: theme.gray50,
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
