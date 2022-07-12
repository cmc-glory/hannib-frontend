import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {showMessage} from 'react-native-flash-message'

import {deleteAccount} from '../../api'
import {useAppSelector, useAppDispatch, useToggle, removeString} from '../../hooks'
import {logout} from '../../redux/slices'
import {ResignModal} from '../../components/MyPageStack'
import {StackHeader, CheckboxIcon, EmptyCheckboxIcon, RoundButton} from '../../components/utils'
import * as theme from '../../theme'

type IResignReason = {
  key: string
  value: string
}

const reasons: IResignReason[] = [
  {key: '사용 빈도가 낮아서', value: '사용 빈도가 낮아서'},
  {key: '이용이 불편해서', value: '이용이 불편해서'},
  {key: '원하는 상품이 없어서', value: '원하는 상품이 없어서'},
  {key: '기타 문제', value: '기타 문제'},
]

type RadioButtons = {
  reasons: IResignReason[]
  selectedReason: string
  setSelectedReason: React.Dispatch<React.SetStateAction<string>>
}

const RadioButtons = ({reasons, selectedReason, setSelectedReason}: RadioButtons) => {
  return (
    <View style={{marginTop: 24}}>
      {reasons.map(item => (
        <View key={item.key} style={[theme.styles.rowFlexStart, {marginBottom: 16}]}>
          <TouchableOpacity
            style={[styles.radioCircle, {borderColor: selectedReason == item.key ? theme.secondary : theme.gray300}]}
            onPress={() => {
              setSelectedReason(item.key)
            }}>
            {selectedReason === item.key && <View style={styles.selectedRb} />}
          </TouchableOpacity>
          <Text style={styles.radioText}>{item.value}</Text>
        </View>
      ))}
    </View>
  )
}

export const Resign = () => {
  const [selectedReason, setSelectedReason] = useState<string>('사용 빈도가 낮아서') // 탈퇴 사유
  const [reasonEtc, setReasonEtc] = useState<string>('') // 기타 문제
  const [agreed, toggleAgreed] = useToggle() // 유의사항 확인 및 동의
  const [resignModalVisible, setResignModalVisible] = useState<boolean>(false) // 탈퇴하기 확인 모달 띄울지
  const [resign, setResign] = useState<boolean>(false) // 마지막 탈퇴 모달에 동의
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.auth.user)
  console.log('user : ', user)

  const checkButtonEnabled = useCallback(() => {
    return agreed
  }, [agreed])
  const onPressResign = useCallback(() => {
    setResignModalVisible(true)

    // 사유, 기타 내용, userid 백에 전송
  }, [selectedReason, reasonEtc])

  useEffect(() => {
    // 마지막 탈퇴 동의까지 하면
    if (resign) {
      // 회원 탈퇴 폼 생성
      const deleteForm: {
        accountIdx: number
        reason: string
      } = {
        accountIdx: user.accountIdx,
        reason: '',
      }

      deleteForm.reason += selectedReason
      deleteForm.reason += '\n'
      deleteForm.reason += '자세한 내용 : '
      deleteForm.reason += reasonEtc

      // 회원 탈퇴 api 날리고
      deleteAccount(deleteForm)
        .then(res => {
          dispatch(logout()) // 로그아웃 시키고
          removeString('accountIdx') // async storage에서 accountIdx 제거
          removeString('email') // async storage에서 email 제거
          navigation.navigate('MainTabNavigator')
        })
        .catch(err => {
          showMessage({
            // 에러 안내 메세지
            message: '회원 탈퇴 중 에러가 발생했습니다',
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
          console.log(err)
        })
      // 백에 탈퇴 api 전송
    }
  }, [resign, selectedReason, reasonEtc])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader x title="회원 탈퇴" goBack />
      <ResignModal resignModalVisbile={resignModalVisible} setResignModalVisible={setResignModalVisible} resign={resign} setResign={setResign} />
      <View style={styles.container}>
        <Text style={[theme.styles.bold20]}>사유를 선택해 주세요</Text>
        <RadioButtons reasons={reasons} selectedReason={selectedReason} setSelectedReason={setSelectedReason} />
        <TextInput
          style={[theme.styles.input]}
          placeholder="자세한 내용을 입력해 주세요."
          placeholderTextColor={theme.gray300}
          value={reasonEtc}
          onChangeText={setReasonEtc}
        />
        <View style={{marginVertical: 24}}>
          <Text style={styles.agreetment}>탈퇴 시, 회원님의 모든 게시글과 활동내역이 삭제됩니다.</Text>
          <Text style={styles.agreetment}>삭제된 정보는 복구할 수 없습니다. </Text>
          <Text style={styles.agreetment}>계정 삭제 후, 7일간 재가입을 할 수 없습니다.</Text>

          <View style={[theme.styles.rowFlexStart, {marginTop: 12}]}>
            {agreed ? (
              <CheckboxIcon style={{marginRight: 10}} onPress={toggleAgreed} />
            ) : (
              <EmptyCheckboxIcon style={{marginRight: 10}} onPress={toggleAgreed} />
            )}
            <Text style={{color: theme.gray500}}>유의사항을 모두 확인하였으며, 이에 동의합니다.</Text>
          </View>
        </View>
        <RoundButton label="탈퇴하기" enabled={checkButtonEnabled()} onPress={onPressResign} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  agreetment: {
    fontSize: 12,
    color: theme.gray500,
  },
  container: {
    padding: theme.PADDING_SIZE,
  },
  radioButtonWrapper: {
    marginBottom: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    fontSize: 16,
    color: theme.gray700,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 24,
    backgroundColor: theme.secondary,
  },
})
