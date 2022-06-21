import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import uuid from 'react-native-uuid'
import {PlusIcon, CheckboxIcon, MinusIcon} from '../utils'
import * as theme from '../../theme'

const ICON_SIZE = 16

type IAdditionalQuestion = {
  neccesary: boolean
  content: string
  id: string
}

type AdditionalQuestionItemProps = {
  item: IAdditionalQuestion
  onPressRemove: (id: string) => void
}

const AdditionalQuestionItem = ({item, onPressRemove}: AdditionalQuestionItemProps) => {
  const {neccesary, content, id} = item
  return (
    <View style={styles.wrapper}>
      <View style={[{alignSelf: 'center', alignItems: 'center'}, styles.spacing]}>
        {neccesary ? <CheckboxIcon /> : <Pressable style={{width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: theme.gray300}} />}
        <Text style={{fontSize: 12, color: theme.gray700, marginTop: 2}}>필수</Text>
      </View>
      <TextInput
        style={[theme.styles.input, styles.spacing, {flex: 1}]}
        placeholder="질문 제목"
        placeholderTextColor={theme.gray300}
        value={content}
        editable={false}
      />
      <Pressable style={[styles.button]} onPress={() => onPressRemove(id)}>
        <MinusIcon onPress={() => onPressRemove(id)} />
      </Pressable>
    </View>
  )
}

export const AdditionalQuestions = () => {
  const [questions, setQuestions] = useState<IAdditionalQuestion[]>([])
  const [questionForm, setQuestionForm] = useState<IAdditionalQuestion>({
    neccesary: false,
    content: '',
    id: '',
  })

  const onPressNeccesary = useCallback(() => {
    setQuestionForm(questionForm => {
      return {...questionForm, neccesary: !questionForm.neccesary}
    })
  }, [])

  const onPressAdd = useCallback(() => {
    const content = questionForm.content
    const neccesary = questionForm.neccesary
    const id = String(uuid.v1())
    setQuestions([...questions, {content, neccesary, id}])
    setQuestionForm({
      neccesary: false,
      content: '',
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
          {questionForm.neccesary ? (
            <CheckboxIcon onPress={onPressNeccesary} />
          ) : (
            <Pressable onPress={onPressNeccesary} style={{width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: theme.gray300}} />
          )}
          <Text style={{fontSize: 12, color: theme.gray700, marginTop: 2}}>필수</Text>
        </View>
        <TextInput
          style={[theme.styles.input, styles.spacing, {flex: 1}]}
          placeholder="질문 제목"
          placeholderTextColor={theme.gray300}
          value={questionForm.content}
          onChangeText={text => setQuestionForm({...questionForm, content: text})}
        />
        <Pressable style={[styles.button]} onPress={onPressAdd}>
          <PlusIcon onPress={onPressAdd} />
        </Pressable>
      </View>
      {questions.map(item => (
        <AdditionalQuestionItem item={item} onPressRemove={onPressRemove} />
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
