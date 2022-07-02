import React, {useState, useCallback} from 'react'
import {View, Pressable, TextInput, Text, StyleSheet} from 'react-native'
import moment from 'moment'

import {LockIcon, MenuIcon} from '../utils'
import {useToggle} from '../../hooks'
import {IQnAList} from '../../types'
import * as theme from '../../theme'

type QnAListItemProps = {
  item: IQnAList
  isOwner: boolean
}

type Answerprops = {
  answer: string | undefined
  answeredDate: Date | undefined
}

type QuestionProps = {
  isAnswered: boolean
  content: string
  writer: string
  date: Date | undefined
  isSecret: boolean
  isCreator: boolean
}

type WriteAnswerProps = {
  writeAnswerPressed: boolean
  toggleWriteAnswerPressed: () => void
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

const Question = ({isAnswered, content, writer, date, isSecret, isCreator}: QuestionProps) => {
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

const QnASecret = () => {
  return (
    <View style={[theme.styles.rowFlexStart]}>
      <Text style={[styles.q, styles.secret]}>Q.</Text>
      <Text style={[styles.q, styles.secret]}>비밀글</Text>
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

export const QnAListItem = ({item, isOwner}: QnAListItemProps) => {
  const {isSecret, isAnswered, writer, content, date, answer, answeredDate} = item
  const [writeAnswerPressed, toggleWriteAnswerPressed] = useToggle()

  // 나눔글 작성자한테 보이는 화면
  if (isOwner) {
    if (isAnswered) {
      return (
        <View style={[styles.qnaListItemContainer]}>
          <Question isAnswered={isAnswered} content={content} writer={writer} date={date} isSecret={isSecret} isCreator={true} />
          <Answer answer={answer} answeredDate={answeredDate} />
        </View>
      )
    } else {
      return (
        <View style={[styles.qnaListItemContainer]}>
          <Question isAnswered={isAnswered} content={content} writer={writer} date={date} isSecret={isSecret} isCreator={true} />
          <WriteAnswer writeAnswerPressed={writeAnswerPressed} toggleWriteAnswerPressed={toggleWriteAnswerPressed} />
        </View>
      )
    }
  }

  // 일반 사용자에게 보이는 화면
  else {
    if (isSecret) {
      return (
        <View style={[styles.qnaListItemContainer]}>
          <QnASecret />
        </View>
      )
    } else {
      return (
        <View style={[styles.qnaListItemContainer]}>
          <Question isAnswered={isAnswered} content={content} writer={writer} date={date} isSecret={isSecret} isCreator={false} />

          {isAnswered && <Answer answer={answer} answeredDate={answeredDate} />}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
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

  qnaListItemContainer: {
    padding: 16,
    borderColor: theme.gray200,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
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
