import React, {useState, useCallback, useEffect, useMemo} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {useToggle} from '../../hooks'
import {DeleteQnAModal} from './DeleteQnAModal'
import * as theme from '../../theme'
import {IInquiryNanumDto, IInquiryAnswerDto} from '../../types'
import {LockIcon} from '../utils'
import {queryKeys, answerInquiry} from '../../api'
import {gray500} from '../../theme'

type QnAListCreatorItemProps = {
  item: IInquiryNanumDto
  accountIdx: number
  nanumIdx: number
  inquiryIdx: number
}

export const QnAListCreatorItem = ({item, accountIdx, nanumIdx, inquiryIdx}: QnAListCreatorItemProps) => {
  const [writeAnswerPressed, toggleWriteAnswerPressed] = useToggle()
  const [inquiryItem, setInquiryItem] = useState<IInquiryNanumDto>(item)
  //const {secretYn, answerComments, creatorId, comments, createdDate, answerDate} = item

  // ******************** states ********************
  const [editPressed, setEditPressed] = useState<boolean>(false) // 수정하기 버튼 눌리면 에디터 띄움
  const [deleteQnAModalVisible, setDeleteQnAModalVisible] = useState<boolean>(false) // 삭제하기 모달
  const [editedContent, setEditedContent] = useState<string>('')
  const isAnswered = inquiryItem.answerComments != ''
  const isSecret = inquiryItem.secretYn == 'Y' ? true : false
  const [content, setContent] = useState<string>('')
  const queryClient = useQueryClient()

  useEffect(() => {
    if (inquiryItem.answerComments != '' && inquiryItem.answerComments != undefined && inquiryItem.answerComments != null) {
      setEditedContent(inquiryItem.answerComments)
    }
  }, [inquiryItem])

  useEffect(() => {
    setInquiryItem(item)
  }, [item])

  // ********************* react qureires *********************
  const answerInquiryQuery = useMutation([queryKeys.inquiry, nanumIdx], answerInquiry, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.inquiry, nanumIdx])
      toggleWriteAnswerPressed()
      showMessage({
        // 에러 안내 메세지
        message: '답변이 등록됐습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
    onError(error, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '문의글 업데이트 중 에러가 발생했습니다',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
  })

  const editAnswerInquiryQuery = useMutation([queryKeys.inquiry, nanumIdx], answerInquiry, {
    onSuccess(data, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '답변 수정이 완료됐습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
      setEditPressed(false)
      queryClient.invalidateQueries([queryKeys.inquiry, nanumIdx])
    },
    onError(error, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '문의글 업데이트 중 에러가 발생했습니다',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
  })

  const deleteAnswerInquiryQuery = useMutation([queryKeys.inquiry, nanumIdx], answerInquiry, {
    onSuccess(data, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '답변 삭제가 완료됐습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
      setEditPressed(false)
      setContent('')
      queryClient.invalidateQueries([queryKeys.inquiry, nanumIdx])
    },
    onError(error, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '문의글 업데이트 중 에러가 발생했습니다',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
  })

  // ******************** callbacks ********************
  const onPressEdit = useCallback(() => {
    setEditPressed(true)
  }, [])
  const onPressDelete = useCallback(() => {
    // setDeleteQnAModalVisible(true)
    if (deleteAnswerInquiryQuery.isLoading) {
      return
    }

    Alert.alert('답변을 삭제하시겠습니까?', '', [
      {
        text: '확인',
        onPress: () => {
          const inquiryAnswerDto: IInquiryAnswerDto = {
            inquiryIdx,
            secretYn: inquiryItem.secretYn,
            answerComments: '',
          }
          deleteAnswerInquiryQuery.mutate(inquiryAnswerDto)
        },
      },
      {text: '취소'},
    ])
    // 문의글 id, 답변 내용 post.
    // 완료 후에는 문의 글 list invalide queries
  }, [inquiryItem])

  const onPressSubmitAnswer = useCallback(() => {
    // 중복 post 방지
    if (answerInquiryQuery.isLoading) {
      return
    }
    // 문의글 id, 답변 내용 post.
    // 완료 후에는 문의 글 list invalide queries
    const inquiryAnswerDto: IInquiryAnswerDto = {
      inquiryIdx,
      secretYn: inquiryItem.secretYn,
      answerComments: content,
    }
    answerInquiryQuery.mutate(inquiryAnswerDto)
  }, [content])

  const onPressEditComplete = useCallback(() => {
    // 중복 post 방지
    if (editAnswerInquiryQuery.isLoading) {
      return
    }
    // 문의글 id, 답변 내용 post.
    // 완료 후에는 문의 글 list invalide queries
    const inquiryAnswerDto: IInquiryAnswerDto = {
      inquiryIdx,
      secretYn: inquiryItem.secretYn,
      answerComments: editedContent,
    }
    editAnswerInquiryQuery.mutate(inquiryAnswerDto)
  }, [editedContent])

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
          <Text style={[styles.content, {flex: 1}]}>{inquiryItem.comments}</Text>
        </View>
        <View style={[theme.styles.rowSpaceBetween]}>
          <Text style={[styles.writer]}>{inquiryItem.creatorId}</Text>
          <Text style={[styles.date]}>{inquiryItem.createdDate.slice(0, 16)}</Text>
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
            <Text style={[styles.date]}>{inquiryItem.answerDate.slice(0, 16)}</Text>
          </View>
        </View>
      ) : (
        <View style={{marginTop: 16}}>
          {writeAnswerPressed ? (
            <View>
              <TextInput
                placeholder={`부적절한 답변 등록 시 비 노출 또는 무통보 삭제될 수 있습니다.\n- 비방/욕설/명예회손에 해당되는 게시물\n- 개인정보를 포함한 오프라인 만남 유도 내용`}
                placeholderTextColor={theme.gray300}
                textAlignVertical="top"
                multiline
                style={[theme.styles.input, {paddingTop: 16, height: 100}]}
                value={content}
                onChangeText={setContent}></TextInput>
              <View style={{marginTop: 20}}>
                <Text style={styles.termsText}>부적절한 답변 등록 시 비 노출 또는 무통보 삭제될 수 있습니다.</Text>
                <Text style={styles.termsText}>-비방/욕설/명예회손에 해당되는 게시물</Text>
                <Text style={styles.termsText}>- 개인정보를 포함한 오프라인 만남 유도 내용</Text>
              </View>

              <Pressable style={styles.submitAnswerButton} onPress={onPressSubmitAnswer}>
                <Text style={{fontSize: 16, color: theme.white}}>등록하기</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable style={styles.writeAnswerButton} onPress={toggleWriteAnswerPressed}>
              {answerInquiryQuery.isLoading ? <ActivityIndicator /> : <Text style={{fontSize: 16}}>답변하기</Text>}
            </Pressable>
          )}
        </View>
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
  termsText: {
    fontSize: 12,
    fontFamily: 'Pretendard',
    color: gray500,
    lineHeight: 16,
  },
})
