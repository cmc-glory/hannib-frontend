import React, {useEffect, useCallback, useState} from 'react'
import {View, Text, ScrollView, TextInput, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import {StackHeader, SharingPreview} from '../../components/utils'
import * as theme from '../../theme'
import {IQnAList} from '../../types'
import {useToggle} from '../../hooks'

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

const Question = ({isAnswered, content, writer, date}: QuestionProps) => {
  return (
    <View>
      <Text style={[{fontSize: 12, marginBottom: 8, color: isAnswered ? theme.main : theme.gray500}]}>{isAnswered ? '답변완료' : '답변예정'}</Text>
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

const WriteAnswer = () => {
  const [content, setContent] = useState<string>('')
  const onPressSubmitAnswer = useCallback(() => {
    // 문의글 id, 답변 내용 post.
  }, [])
  const [writeAnswerPressed, toggleWriteAnswerPressed] = useToggle()
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

const QnAListItem = ({item, isOwner}: QnAListItemProps) => {
  const {isSecret, isAnswered, writer, content, date, answer, answeredDate} = item

  // 나눔글 작성자한테 보이는 화면
  if (isOwner) {
    if (isAnswered) {
      return (
        <View style={[styles.qnaListItemContainer]}>
          <Question isAnswered={isAnswered} content={content} writer={writer} date={date} />
          <Answer answer={answer} answeredDate={answeredDate} />
        </View>
      )
    } else {
      return (
        <View style={[styles.qnaListItemContainer]}>
          <Question isAnswered={isAnswered} content={content} writer={writer} date={date} />
          <WriteAnswer />
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
          <Question isAnswered={isAnswered} content={content} writer={writer} date={date} />

          {isAnswered && <Answer answer={answer} answeredDate={answeredDate} />}
        </View>
      )
    }
  }
}

export const QnAList = () => {
  const navigation = useNavigation()
  const [qnas, setQnas] = useState<IQnAList[]>([]) // 문의 목록 state
  const [isOwner, setIsOwner] = useState<boolean>(false)
  useEffect(() => {
    // qna list 받아오기
    fetch('http://localhost:8081/src/data/dummyQnA.json', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        setQnas(result)
      })

    // redux에서 사용자 id를 가져오고 writer인지를 체크.
    // setIsOwner(true)
  }, [])

  // 문의글 작성으로 이동
  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteQnA', {
      postid: '1', // 해당 나눔 게시글의 id
      userid: '1', // 문의글을 남기는 사용자의 id,
      imageuri: 'http://localhost:8081/src/assets/images/detail_image_example.png', // 썸네일 uri
      category: 'bts', // 카테고리
      title: 'BTS 키링 나눔', // 나눔 제목
    })
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="문의" />
      <ScrollView style={[styles.container]} contentOffset={{x: 0, y: 200}}>
        <SharingPreview uri="http://localhost:8081/src/assets/images/detail_image_example.png" category="BTS" title="BTS 키링 나눔" />
        {!isOwner && (
          <Pressable style={[styles.writeButton]} onPress={onPressWrite}>
            <Text style={[theme.styles.bold16, {color: theme.white}]}>문의 작성하기</Text>
          </Pressable>
        )}
        {qnas.map(qna => (
          <QnAListItem item={qna} key={qna.id} isOwner={isOwner} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  writer: {
    color: theme.gray500,
    fontSize: 12,
  },
  date: {
    color: theme.gray500,
    fontSize: 12,
  },
  content: {
    color: theme.gray700,
    fontSize: 16,
  },
  secret: {
    color: theme.gray500,
  },
  q: {
    marginRight: 8,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  qnaListItemContainer: {
    padding: 16,
    borderColor: theme.gray200,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
  },
  writeButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.main,
    borderRadius: 4,
    marginTop: 16,
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
