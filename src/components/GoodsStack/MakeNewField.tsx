import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {NeccesaryField} from '../utils'
import * as theme from '../../theme'

type makeNewFieldProps = {
  key: string
  label: string
  necessary: boolean
  index: number
  answers: string[]
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>
}

const setInputValue = (
  index: number,
  value: string,
  setTextValue: React.Dispatch<React.SetStateAction<string>>,
  answers: string[],
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const tempAnswer = [...answers.slice(0, index), value, ...answers.slice(index + 1)]
  setAnswers(tempAnswer)
  setTextValue(value)
}

export const MakeNewField = ({label, necessary, index, answers, setAnswers}: makeNewFieldProps) => {
  const [textValue, setTextValue] = useState<string>('')

  return (
    <View style={styles.spacing}>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={[theme.styles.label]}>{label} (추가질문사항)</Text>
        {necessary && <NeccesaryField />}
      </View>
      <TextInput
        style={[theme.styles.input]}
        value={answers[index]}
        placeholder="추가 질문사항을 입력해 주세요."
        placeholderTextColor={theme.gray300}
        onChangeText={value => setInputValue(index, value, setTextValue, answers, setAnswers)}></TextInput>
    </View>
  )
}
const styles = StyleSheet.create({
  spacing: {
    marginTop: 24,
  },
})
