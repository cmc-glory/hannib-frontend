import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useMutation} from 'react-query'
import {useNavigation, useRoute} from '@react-navigation/native'
import {showMessage} from 'react-native-flash-message'

import {INoticeDto} from '../../types'
import {queryKeys, sendNotice} from '../../api'
import {SendNoticeRouteProps} from '../../navigation/HoldingSharingStackNavigator'
import {StackHeader, FloatingBottomButton} from '../../components/utils'
import * as theme from '../../theme'

export const SendNotice = () => {
  // ******************** utils ********************
  const navigation = useNavigation()
  const route = useRoute<SendNoticeRouteProps>()
  const nanumIdx = route.params.nanumIdx
  const accountIdxList = route.params.accountIdxList

  // ******************** utils ********************
  const [title, setTitle] = useState<string>('')
  const [comments, setComments] = useState<string>('')

  const sendNoticeQuery = useMutation(queryKeys.sendNotice, sendNotice, {
    onSuccess(data, variables, context) {
      navigation.goBack()
      showMessage({
        // 에러 안내 메세지
        message: '공지사항이 전송되었습니다.',
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

  console.log(route.params)

  const onPressSendNotice = useCallback(() => {
    let noticeDto: INoticeDto[] = accountIdxList.map(tempAccountIdx => {
      return {
        nanumIdx,
        accountIdx: tempAccountIdx,
        title,
        comments,
      }
    })
    for (var i = 0; i < accountIdxList.length; i++) {
      sendNoticeQuery.mutate(noticeDto)
    }
  }, [title, comments])

  const checkButtonEnabled = useCallback(() => {
    // 둘다 빈 문자열이 아닐 때만 공지 보낼 수 있음
    return title != '' && comments != ''
  }, [title, comments])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="공지 보내기" goBack></StackHeader>
      <View style={styles.container}>
        <View style={{marginBottom: 24}}>
          <Text style={{...theme.styles.bold16, marginBottom: 10}}>제목</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[theme.styles.input, styles.textinput]}
            placeholder="제목 입력"
            placeholderTextColor={theme.gray200}
          />
        </View>
        <View>
          <Text style={{...theme.styles.bold16, marginBottom: 10}}>내용</Text>
          <TextInput
            value={comments}
            onChangeText={setComments}
            style={[theme.styles.input, styles.textinput, {height: 330, textAlignVertical: 'top', paddingTop: 20}]}
            placeholder="내용 입력"
            placeholderTextColor={theme.gray200}
            multiline
          />
        </View>
      </View>
      <FloatingBottomButton label="등록" enabled={checkButtonEnabled()} onPress={onPressSendNotice} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textinput: {
    color: theme.gray800,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
    padding: theme.PADDING_SIZE,
  },
})
