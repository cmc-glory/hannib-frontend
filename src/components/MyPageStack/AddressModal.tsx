import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable} from 'react-native'
import {RoundButton} from '../../components/utils'
import Modal from 'react-native-modal'
import {CheckboxIcon, EmptyCheckboxIcon, XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useMutation, useQueryClient} from 'react-query'
import {IUnsongDto} from '../../types'
import Postcode from '@actbase/react-daum-postcode'
import {noop} from 'react-query/types/core/utils'
import {showMessage} from 'react-native-flash-message'
import {postDeliveryInfo, queryKeys, postMailAll} from '../../api'

const MODAL_BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 50) / 2

type AddressModal = {
  isVisible: boolean
  toggleIsVisible: () => void
  accountIdxList: number[] // 나머지도 동일하게 우편 전송으로 처리 눌렀을 때 사용할 accountIdx 리스트
  selectedAccountIdx: number // 현재 선택된 accountIdx
  setUnsongYn: React.Dispatch<React.SetStateAction<boolean>>
  // sendMethod: string
  // setSendMethod: (mthd: string) => void
  accountIdx: number
  nanumIdx: number
  setRefresh: (bool: boolean) => void
}

type ButtonProps = {
  label: string
  onPress: () => void
}

const Selected = ({label, onPress}: ButtonProps) => {
  return (
    <Pressable style={[styles.button, styles.selectedButton]} onPress={onPress}>
      <Text style={[styles.buttonText, styles.selectedText]}>{label}</Text>
    </Pressable>
  )
}

const Unselected = ({label, onPress}: ButtonProps) => {
  return (
    <Pressable style={[styles.button, styles.unselectedButton]} onPress={onPress}>
      <Text style={[styles.buttonText, styles.unselectedText]}>{label}</Text>
    </Pressable>
  )
}

export const AddressModal = ({isVisible, toggleIsVisible, accountIdxList, selectedAccountIdx, nanumIdx, setUnsongYn, setRefresh}: AddressModal) => {
  const queryClient = useQueryClient()
  // ********************* states  *********************
  const [postComp, setPostComp] = useState<string>('')
  const [postNum, setPostNum] = useState<string>('')
  const [noPostComp, setNoPostComp] = useState<boolean>(false)
  const [noPostNum, setNoPostNum] = useState<boolean>(false)
  const [mailMethod, setMailMethod] = useState<'우편' | '등기'>('우편')
  const [isAllSame, setIsAllSame] = useState<boolean>(false) // 나머지도 동일하게 우편 전송으로 처리

  // ********************* react queries *********************
  const postTrackingNumberQuery = useMutation([queryKeys.deliveryInfo, selectedAccountIdx], postDeliveryInfo, {
    onSuccess(data, variables, context) {
      setUnsongYn(true)
      showMessage({
        message: '배송 정보 등록이 완료되었습니다',
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
      toggleIsVisible()
      setRefresh(true)
    },
  })

  const postMailAllQuery = useMutation([queryKeys.deliveryInfo], postMailAll, {
    onSuccess(data, variables, context) {
      setUnsongYn(true)
      showMessage({
        message: '배송 정보 등록이 완료되었습니다',
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
      toggleIsVisible()
    },
  })

  // ********************* callbacks *********************
  const checkButtonEnabled = useCallback((postComp: string, mailNum: string) => {
    return postComp == '' || mailNum == '' ? false : true
  }, [])

  const checkTextInput = useCallback(() => {
    //console.log('CHECK TEXT INPUT')
    if (postComp == '') setNoPostComp(true)
    else setNoPostComp(false)
    if (postNum == '') setNoPostNum(true)
    else setNoPostNum(false)
  }, [])

  const onPressPost = useCallback(() => {
    setNoPostComp(false)
    setNoPostNum(false)
    setPostComp('')
    setPostNum('')
    setMailMethod('우편')
  }, [])

  const onPressRegisterdMail = useCallback(() => {
    setMailMethod('등기')
  }, [])

  const closeModal = () => {
    setPostComp('')
    setPostNum('')
    setNoPostComp(false)
    setNoPostNum(false)
    setIsAllSame(false)
    toggleIsVisible()

    setMailMethod('우편')
  }

  const onPressIsAllSame = useCallback(() => {
    setIsAllSame(isAllSame => !isAllSame)
  }, [])

  const onPressSubmit = useCallback(() => {
    // 모든 accountIdx에 대해 우편으로 처리
    if (isAllSame == true) {
      const unsongDto: IUnsongDto[] = accountIdxList.map(item => {
        return {
          accountIdx: item,
          company: '',
          nanumIdx: nanumIdx,
          unsongMethod: '우편',
          unsongNumber: 0,
        }
      })
      postMailAllQuery.mutate(unsongDto)
    }

    // 하나씩 배송 정보 등록
    else {
      if (mailMethod == '우편') {
        const unsongDto: IUnsongDto = {
          accountIdx: selectedAccountIdx,
          company: '',
          nanumIdx: nanumIdx,
          unsongMethod: '우편',
          unsongNumber: 0,
        }
        postTrackingNumberQuery.mutate(unsongDto)
      } else {
        const unsongDto: IUnsongDto = {
          accountIdx: selectedAccountIdx,
          company: postComp,
          nanumIdx: nanumIdx,
          unsongMethod: '등기',
          unsongNumber: parseInt(postNum),
        }
        postTrackingNumberQuery.mutate(unsongDto)
      }
    }
  }, [selectedAccountIdx, isAllSame, accountIdxList, nanumIdx, postComp, postNum])

  useEffect(() => {
    //console.log('sendMethod : ', sendMethod)
  }, [mailMethod, noPostComp, noPostNum, postComp, postNum, selectedAccountIdx, accountIdxList])

  return (
    <Modal isVisible={isVisible} onBackdropPress={closeModal} backdropColor={theme.gray800} backdropOpacity={0.6}>
      <View style={styles.shareModal}>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[theme.styles.bold16]}>운송장 등록</Text>
          <XIcon onPress={closeModal} />
        </View>
        <View style={{width: '100%', height: 1, marginVertical: 16, backgroundColor: theme.gray200}} />
        <View style={{marginBottom: 16}}>
          <Text style={{fontSize: 16, marginBottom: 12}}>전달 방식</Text>
          {mailMethod == '우편' ? (
            <View style={{...theme.styles.rowSpaceBetween, marginBottom: 16}}>
              <Selected label="우편" onPress={onPressPost} />
              <Unselected label="등기" onPress={onPressRegisterdMail} />
            </View>
          ) : (
            <View style={{...theme.styles.rowSpaceBetween, marginBottom: 16}}>
              <Unselected label="우편" onPress={onPressPost} />
              <Selected label="등기" onPress={onPressRegisterdMail} />
            </View>
          )}
          {mailMethod == '우편' ? (
            <View style={{...theme.styles.rowFlexStart}}></View>
          ) : (
            <View>
              <TextInput
                placeholder="택배사"
                value={postComp}
                onChangeText={text => {
                  setPostComp(text)
                  setNoPostComp(false)
                }}
                style={[styles.modalTextInput, {marginBottom: 10}, noPostComp && {borderColor: theme.red}]}
                autoCorrect={false}></TextInput>
              {noPostComp && <Text style={styles.noInputErrorText}>택배사를 입력해주세요.</Text>}
              <TextInput
                keyboardType="numeric"
                placeholder="운송장 번호"
                value={postNum}
                onChangeText={text => {
                  setPostNum(text)
                  setNoPostNum(false)
                }}
                style={[styles.modalTextInput, noPostNum && {borderColor: theme.red}]}
                autoCorrect={false}></TextInput>
              {noPostNum && <Text style={[styles.noInputErrorText, {marginTop: 10}]}>운송장번호를 입력해주세요.</Text>}
            </View>
          )}
        </View>
        <RoundButton
          label="확인"
          onPress={() => {
            //checkTextInput()
            onPressSubmit()
          }}
          enabled={mailMethod == '등기' ? checkButtonEnabled(postComp, postNum) : true}
        />
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
  modalTextInput: {
    borderWidth: 1,
    borderColor: theme.gray200,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  selectedButton: {
    backgroundColor: theme.main50,
    borderColor: theme.main,
  },
  unselectedButton: {
    backgroundColor: theme.white,
    borderColor: theme.gray200,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  selectedText: {
    color: theme.main,
  },
  unselectedText: {
    color: theme.gray300,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: MODAL_BUTTON_WIDTH,
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInputErrorText: {
    color: theme.red,
    fontSize: 12,
    marginBottom: 10,
  },
})
