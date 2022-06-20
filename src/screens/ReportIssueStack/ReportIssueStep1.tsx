import React, {useState, useCallback} from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {StackHeader, RoundButton} from '../../components/utils'
import * as theme from '../../theme'

type IIssue = {
  key: string
  value: string
}

type RadioButtons = {
  issues: IIssue[]
  selectedIssue: string
  setSelectedIssue: React.Dispatch<React.SetStateAction<string>>
}

const issues: IIssue[] = [
  {key: '관심없는 콘텐츠', value: '관심없는 콘텐츠'},
  {key: '스팸', value: '스팸'},
  {key: '가학적이고 유해한 콘텐츠', value: '가학적이고 유해한 콘텐츠'},
  {key: '성적인 내용', value: '성적인 내용'},
  {key: '지식재산권 침해', value: '지식재산권 침해'},
  {key: '불법 또는 규제상품', value: '불법 또는 규제상품'},
  {key: '거짓 정보', value: '거짓 정보'},
  {key: '기타문제', value: '기타문제'},
]

const RadioButtons = ({issues, selectedIssue, setSelectedIssue}: RadioButtons) => {
  return (
    <View>
      {issues.map(item => (
        <View key={item.key} style={[theme.styles.rowFlexStart, {marginBottom: 16}]}>
          <TouchableOpacity
            style={[styles.radioCircle, {borderColor: selectedIssue == item.key ? theme.secondary : theme.gray300}]}
            onPress={() => {
              setSelectedIssue(item.key)
            }}>
            {selectedIssue === item.key && <View style={styles.selectedRb} />}
          </TouchableOpacity>
          <Text style={styles.radioText}>{item.value}</Text>
        </View>
      ))}
    </View>
  )
}

export const ReportIssueStep1 = () => {
  const [selectedIssue, setSelectedIssue] = useState<string>('관심없는 콘텐츠')
  const [reasonEtc, setReasonEtc] = useState<string>('')

  const navigation = useNavigation()

  const onPressSelect = useCallback(() => {
    navigation.navigate('ReportIssueStep2', {
      issue: selectedIssue,
    })
  }, [])

  return (
    <SafeAreaView style={[styles.rootContainer]}>
      <StackHeader title="문제 신고하기" goBack />
      <View style={[styles.rootContainer, theme.styles.wrapper]}>
        <Text style={[theme.styles.bold20, {marginTop: 12, marginBottom: 24}]}>사유를 선택해 주세요</Text>
        <RadioButtons issues={issues} selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} />
        <TextInput
          style={[theme.styles.input]}
          placeholder="자세한 내용을 입력해 주세요."
          placeholderTextColor={theme.gray300}
          value={reasonEtc}
          onChangeText={setReasonEtc}
        />
        <RoundButton label="선택" enabled style={{marginTop: 24}} onPress={onPressSelect} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
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
