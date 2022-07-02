import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'
import moment from 'moment'
import * as theme from '../../theme'
import {IQnAList} from '../../types'
import {LockIcon, MenuIcon} from '../utils'
import {useToggle} from '../../hooks'

type QnAListCreatorItemProps = {
  item: IQnAList
}

type QuestionProps = {
  item: IQnAList
}

type Answerprops = {
  answer: string | undefined
  answeredDate: Date | undefined
}

type WriteAnswerProps = {
  writeAnswerPressed: boolean
  toggleWriteAnswerPressed: () => void
}

const QnASecret = () => {
  return (
    <View style={[theme.styles.rowFlexStart]}>
      <Text style={[styles.q, styles.secret]}>Q.</Text>
      <Text style={[styles.q, styles.secret]}>비밀글</Text>
    </View>
  )
}

const Question = ({item}: QuestionProps) => {
  const {isSecret, isAnswered, writer, content, date, answer, answeredDate} = item

  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 8}]}>
        <View style={[theme.styles.rowFlexStart]}>
          <Text style={[theme.styles.text12, {fontSize: 12, color: isAnswered ? theme.main : theme.gray500}]}>{isAnswered ? '답변완료' : '답변예정'}</Text>
          {isSecret && <LockIcon size={20} style={{marginLeft: 4}} />}
        </View>
        <MenuIcon size={20} />
      </View>
      <View style={[theme.styles.rowFlexStart, {marginBottom: 8}]}>
        <Text style={[styles.q, {alignSelf: 'flex-start'}]}>Q.</Text>
        <Text style={[styles.content, {flex: 1}]}>{content}</Text>
      </View>
      <View style={[theme.styles.rowSpaceBetween]}>
        <Text style={[styles.writer]}>{writer}</Text>
        <Text style={[styles.date]}>{moment(date).format('YYYY.MM.DD HH:mm')}</Text>
      </View>
    </View>
  )
}

const Answer = ({answer, answeredDate}: Answerprops) => {
  return (
    <View>
      <View style={[theme.styles.rowFlexStart, {marginTop: 16, marginBottom: 8}]}>
        <Text style={[styles.q, {alignSelf: 'flex-start', color: theme.main}]}>A.</Text>
        <Text style={[styles.content, {flex: 1}]}>{answer}</Text>
      </View>
      <View style={[theme.styles.rowSpaceBetween]}>
        <Text style={[styles.writer, {color: theme.main}]}>나눔진행자</Text>
        <Text style={[styles.date]}>{moment(answeredDate).format('YYYY.MM.DD HH:mm')}</Text>
      </View>
    </View>
  )
}

const WriteAnswer = ({writeAnswerPressed, toggleWriteAnswerPressed}: WriteAnswerProps) => {
  const [content, setContent] = useState<string>('')
  const onPressSubmitAnswer = useCallback(() => {
    // 문의글 id, 답변 내용 post.
    // 완료 후에는 문의 글 list invalide queries
  }, [])
  return (
    <View style={{marginTop: 16}}>
      {writeAnswerPressed ? (
        <View>
          <TextInput
            placeholder="답변 내용 입력"
            placeholderTextColor={theme.gray300}
            textAlignVertical="top"
            multiline
            style={[theme.styles.input, {paddingTop: 16, height: 100}]}
            value={content}
            onChangeText={setContent}></TextInput>
          <Pressable style={styles.submitAnswerButton} onPress={onPressSubmitAnswer}>
            <Text style={{fontSize: 16, color: theme.white}}>등록하기</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.writeAnswerButton} onPress={toggleWriteAnswerPressed}>
          <Text style={{fontSize: 16}}>답변하기</Text>
        </Pressable>
      )}
    </View>
  )
}

export const QnAListUserItem = ({item}: QnAListCreatorItemProps) => {
  const [writeAnswerPressed, toggleWriteAnswerPressed] = useToggle()
  return (
    <View style={[styles.qnaListItemContainer]}>
      {item.isSecret ? (
        <QnASecret />
      ) : (
        <>
          <Question item={item} />
          {item.isAnswered && <Answer answer={item.answer} answeredDate={item.answeredDate} />}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  qnaListItemContainer: {
    padding: 16,
    borderColor: theme.gray200,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
  },
  q: {
    marginRight: 8,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  content: {
    color: theme.gray700,
    fontSize: 16,
  },
  writer: {
    color: theme.gray500,
    fontSize: 12,
  },
  date: {
    color: theme.gray500,
    fontSize: 12,
  },
  secret: {
    color: theme.gray500,
  },
  submitAnswerButton: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.gray800,
    backgroundColor: theme.gray800,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  writeAnswerButton: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.gray800,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
