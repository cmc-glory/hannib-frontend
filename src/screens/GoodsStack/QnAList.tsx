import React, {useEffect, useCallback, useState} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import {StackHeader, SharingPreview} from '../../components/utils'
import * as theme from '../../theme'
import {IQnAList} from '../../types'

type QnAListItemProps = {
  item: IQnAList
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

const QnAListItem = ({item}: QnAListItemProps) => {
  console.log(item)
  const {isSecret, isAnswered, writer, content, date, answer, answeredDate} = item

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

export const QnAList = () => {
  const navigation = useNavigation()
  const [qnas, setQnas] = useState<IQnAList[]>([]) // 문의 목록 state
  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummyQnA.json', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        setQnas(result)
      })
  }, [])

  // 문의글 작성으로 이동
  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteQnA', {
      postid: '1', // 해당 나눔 게시글의 id
      userid: '1', // 문의글을 남기는 사용자의 id
    })
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="문의" />
      <View style={[styles.container]}>
        <SharingPreview uri="http://localhost:8081/src/assets/images/detail_image_example.png" category="BTS" title="BTS 키링 나눔" />
        <Pressable style={[styles.writeButton]} onPress={onPressWrite}>
          <Text style={[theme.styles.bold16, {color: theme.white}]}>문의 작성하기</Text>
        </Pressable>
        {qnas.map(qna => (
          <QnAListItem item={qna} key={qna.id} />
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    marginBottom: 16,
  },
  writeButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.main,
    borderRadius: 4,
    marginVertical: 16,
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
