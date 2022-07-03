import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import uuid from 'react-native-uuid'
import {PlusIcon, CheckboxIcon, MinusIcon} from '../utils'
import {INanumAskInfo} from '../../types'
import * as theme from '../../theme'

type NanumAskItemProps = {
  item: INanumAskInfo
  onPressRemove: (id: string) => void
}

type NanumAsksProps = {
  questions: INanumAskInfo[]
  setQuestions: React.Dispatch<React.SetStateAction<INanumAskInfo[]>>
}

const NanumAskItem = ({item, onPressRemove}: NanumAskItemProps) => {
  const {essential, contents, id} = item
  return (
    <View style={styles.wrapper}>
      <View style={[{alignSelf: 'center', alignItems: 'center'}, styles.spacing]}>
        {essential ? <CheckboxIcon /> : <Pressable style={{width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: theme.gray300}} />}
        <Text style={{fontSize: 12, color: theme.gray700, marginTop: 2}}>필수</Text>
      </View>
      <TextInput
        style={[theme.styles.input, styles.spacing, {flex: 1}]}
        placeholder="질문 제목"
        placeholderTextColor={theme.gray300}
        value={contents}
        editable={false}
      />
      <Pressable style={[styles.button]} onPress={() => onPressRemove(id)}>
        <MinusIcon onPress={() => onPressRemove(id)} />
      </Pressable>
    </View>
  )
}

export const NanumAsks = ({questions, setQuestions}: NanumAsksProps) => {
  const [questionForm, setQuestionForm] = useState<INanumAskInfo>({
    essential: false,
    contents: '',
    id: '',
  })

  const onPressEssential = useCallback(() => {
    setQuestionForm(questionForm => {
      return {...questionForm, essential: !questionForm.essential}
    })
  }, [])

  const onPressAdd = useCallback(() => {
    const contents = questionForm.contents
    const essential = questionForm.essential

    // 질문 내용이 없을 때는 추가하지 않음.
    if (contents == '') {
      return
    }

    const id = String(uuid.v1())
    setQuestions([...questions, {contents, essential, id}])
    setQuestionForm({
      essential: false,
      contents: '',
      id: '',
    })
  }, [questionForm])

  const onPressRemove = useCallback(
    (id: string) => {
      setQuestions(questions.filter(question => question.id !== id))
    },
    [questions],
  )

  React.useEffect(() => {
    console.log(questionForm)
  }, [questionForm])

  return (
    <View style={{}}>
      <Text style={[theme.styles.label]}>추가 질문 사항</Text>
      <Text style={{color: theme.main, fontSize: 12}}>* 우편 나눔의 경우 주소 입력을 기본으로 받습니다.</Text>
      <View style={styles.wrapper}>
        <View style={[{alignSelf: 'center', alignItems: 'center'}, styles.spacing]}>
          {questionForm.essential ? (
            <CheckboxIcon onPress={onPressEssential} />
          ) : (
            <Pressable onPress={onPressEssential} style={{width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: theme.gray300}} />
          )}
          <Text style={{fontSize: 12, color: theme.gray700, marginTop: 2}}>필수</Text>
        </View>
        <TextInput
          style={[theme.styles.input, styles.spacing, {flex: 1}]}
          placeholder="질문 제목 (ex 트위터 아이디)"
          placeholderTextColor={theme.gray300}
          value={questionForm.contents}
          onChangeText={text => setQuestionForm({...questionForm, contents: text})}
          onSubmitEditing={onPressAdd}
        />
        <Pressable style={[styles.button]} onPress={onPressAdd}>
          <PlusIcon onPress={onPressAdd} />
        </Pressable>
      </View>
      {questions.map(item => (
        <NanumAskItem item={item} onPressRemove={onPressRemove} key={item.id} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: theme.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 7.5,
  },
  spacing: {
    marginRight: 8,
  },
})
