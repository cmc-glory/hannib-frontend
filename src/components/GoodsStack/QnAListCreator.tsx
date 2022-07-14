import React, {useState, useCallback, useEffect, useMemo} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'
import moment from 'moment'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {useToggle} from '../../hooks'
import {DeleteQnAModal} from './DeleteQnAModal'
import * as theme from '../../theme'
import {IInquiryNanumDto, IInquiryEditDto} from '../../types'
import {LockIcon} from '../utils'
import {queryKeys, updateInquiry} from '../../api'

type QnAListCreatorItemProps = {
  item: IInquiryNanumDto
  accountIdx: number
  nanumIdx: number
  inquiryIdx: number
}

type WriteAnswerProps = {
  writeAnswerPressed: boolean
  toggleWriteAnswerPressed: () => void
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

export const QnAListCreatorItem = ({item, accountIdx, nanumIdx, inquiryIdx}: QnAListCreatorItemProps) => {
  const [writeAnswerPressed, toggleWriteAnswerPressed] = useToggle()
  const {secretYn, answerComments, creatorId, comments, createdDate, answerDate} = item
  console.log(createdDate, answerDate)

  // ******************** states ********************
  const [editPressed, setEditPressed] = useState<boolean>(false) // 수정하기 버튼 눌리면 에디터 띄움
  const [deleteQnAModalVisible, setDeleteQnAModalVisible] = useState<boolean>(false) // 삭제하기 모달
  const [editedContent, setEditedContent] = useState<string>()
  const isAnswered = answerComments != ''
  const isSecret = secretYn == 'Y' ? true : false

  useEffect(() => {
    if (answerComments != '' && answerComments && undefined && answerComments != null) {
      setEditedContent(answerComments)
    }
  }, [])

  // ******************** callbacks ********************
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
    <View style={[styles.qnaListItemContainer]}>
      <DeleteQnAModal
        deleteQnAModalVisible={deleteQnAModalVisible}
        setDeleteQnAModalVisible={setDeleteQnAModalVisible}
        nanumIdx={nanumIdx}
        inquiryIdx={inquiryIdx}
      />

      <View>
        <View style={[theme.styles.rowSpaceBetween, {marginBottom: 8}]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.text12, {fontSize: 12, color: isAnswered ? theme.main : theme.gray500}]}>{isAnswered ? '답변완료' : '답변예정'}</Text>
            {isSecret && <LockIcon size={20} style={{marginLeft: 4}} />}
          </View>
          {isAnswered == true && (
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
          <Text style={[styles.content, {flex: 1}]}>{comments}</Text>
        </View>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[styles.writer]}>{creatorId}</Text>
          <Text style={[styles.date]}>{moment(new Date(createdDate)).format('YYYY.MM.DD HH:mm')}</Text>
        </View>
      </View>

      {isAnswered ? (
        <View>
          <View style={[theme.styles.rowFlexStart, {marginTop: 16, marginBottom: 8}]}>
            <Text style={[styles.q, {alignSelf: 'flex-start', color: theme.main}]}>A.</Text>
            {editPressed ? (
              <View style={{flex: 1}}>
                <TextInput
                  textAlignVertical="top"
                  multiline
                  value={editedContent}
                  onChangeText={setEditedContent}
                  style={[theme.styles.input, {height: 150, paddingTop: 16}]}></TextInput>
                <Pressable style={styles.editButton} onPress={onPressEditComplete}>
                  <Text style={{color: theme.white}}>수정하기</Text>
                </Pressable>
              </View>
            ) : (
              <Text style={[styles.content, {flex: 1}]}>{editedContent}</Text>
            )}
          </View>
          <View style={[theme.styles.rowSpaceBetween]}>
            <Text style={[styles.writer, {color: theme.main}]}>나눔진행자</Text>
            <Text style={[styles.date]}>{moment(new Date(answerDate)).format('YYYY.MM.DD HH:mm')}</Text>
          </View>
        </View>
      ) : (
        <WriteAnswer writeAnswerPressed={writeAnswerPressed} toggleWriteAnswerPressed={toggleWriteAnswerPressed} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  editButton: {
    alignSelf: 'stretch',
    height: 48,
    backgroundColor: theme.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 16,
  },
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
