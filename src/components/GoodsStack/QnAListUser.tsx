import React, {useState, useCallback, useMemo} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'
import moment from 'moment'
import {DeleteQnAModal} from './DeleteQnAModal'
import * as theme from '../../theme'
import {IQnAList} from '../../types'
import {LockIcon} from '../utils'

type QnAListUserItemProps = {
  item: IQnAList
  userId: string
}

type QuestionProps = {
  item: IQnAList
  userId: string
}

type Answerprops = {
  answer: string | undefined
  answeredDate: Date | undefined
}

const QnASecret = () => {
  return (
    <View style={[theme.styles.rowFlexStart]}>
      <Text style={[styles.q, styles.secret]}>Q.</Text>
      <Text style={[styles.q, styles.secret]}>비밀글</Text>
    </View>
  )
}

const Question = ({item, userId}: QuestionProps) => {
  // ******************** utils ********************
  const {isSecret, isAnswered, writer, content, date, writerId} = item

  // ******************** states ********************
  const [editPressed, setEditPressed] = useState<boolean>(false) // 수정하기 버튼 눌리면 에디터 띄움
  const [deleteQnAModalVisible, setDeleteQnAModalVisible] = useState<boolean>(false) // 삭제하기 모달
  const [editedContent, setEditedContent] = useState<string>(content)

  const showMenuIcon = useMemo(() => {
    return userId == writerId && isAnswered == false // 작성자가 본인이고, 답변이 달리지 않았을 때만 수정 및 삭제 가능
  }, [])

  const onPressEdit = useCallback(() => {
    setEditPressed(true)
  }, [])
  const onPressDelete = useCallback(() => {
    setDeleteQnAModalVisible(true)
  }, [])

  const onPressEditComplete = useCallback(() => {
    setEditPressed(false)
  }, [])

  return (
    <View>
      <DeleteQnAModal deleteQnAModalVisible={deleteQnAModalVisible} setDeleteQnAModalVisible={setDeleteQnAModalVisible} />
      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 8}]}>
        <View style={[theme.styles.rowFlexStart]}>
          <Text style={[theme.styles.text12, {fontSize: 12, color: isAnswered ? theme.main : theme.gray500}]}>{isAnswered ? '답변완료' : '답변예정'}</Text>
          {isSecret && <LockIcon size={20} style={{marginLeft: 4}} />}
        </View>
        {showMenuIcon && (
          <View style={[theme.styles.rowFlexStart]}>
            <Pressable style={{marginRight: 8}} onPress={onPressEdit}>
              <Text style={styles.editText}>수정</Text>
            </Pressable>
            <Pressable onPress={onPressDelete}>
              <Text style={styles.editText}>삭제</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={[theme.styles.rowFlexStart, {marginBottom: 8}]}>
        <Text style={[styles.q, {alignSelf: 'flex-start'}]}>Q.</Text>
        {editPressed ? (
          <View style={{flex: 1}}>
            <TextInput
              textAlignVertical="top"
              multiline
              value={editedContent}
              onChangeText={setEditedContent}
              style={[theme.styles.input, {height: 150, paddingTop: 16}]}></TextInput>
            <Pressable
              style={{
                alignSelf: 'stretch',
                height: 48,
                backgroundColor: theme.black,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                marginTop: 8,
                marginBottom: 16,
              }}
              onPress={onPressEditComplete}>
              <Text style={{color: theme.white}}>수정하기</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={[styles.content, {flex: 1}]}>{editedContent}</Text>
        )}
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

export const QnAListUserItem = ({item, userId}: QnAListUserItemProps) => {
  return (
    <View style={[styles.qnaListItemContainer]}>
      {item.isSecret ? (
        <QnASecret />
      ) : (
        <>
          <Question item={item} userId={userId} />
          {item.isAnswered && <Answer answer={item.answer} answeredDate={item.answeredDate} />}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  editText: {
    fontSize: 12,
    lineHeight: 16,
  },
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
    lineHeight: 24,
  },
  content: {
    color: theme.gray700,
    fontSize: 16,
    lineHeight: 24,
  },
  writer: {
    color: theme.gray500,
    fontSize: 12,
    lineHeight: 16,
  },
  date: {
    color: theme.gray500,
    fontSize: 12,
    lineHeight: 16,
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
