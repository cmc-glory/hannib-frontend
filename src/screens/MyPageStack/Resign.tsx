import React, {useCallback, useState} from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useToggle} from '../../hooks'
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
  {key: '기타문제', value: '기타문제'},
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
  const [selectedReason, setSelectedReason] = useState<string>('사용 빈도가 낮아서')
  const [reasonEtc, setReasonEtc] = useState<string>('')
  const [agreed, toggleAgreed] = useToggle()

  const checkButtonEnabled = useCallback(() => {
    return agreed
  }, [agreed])
  const onPressResign = useCallback(() => {
    // 사유, 기타 내용, userid 백에 전송
  }, [selectedReason, reasonEtc])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader x title="회원 탈퇴" goBack />
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
