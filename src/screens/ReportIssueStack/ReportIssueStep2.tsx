import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {StackHeader, RoundButton} from '../../components/utils'
import {ReportIssueStep2RouteProp} from '../../navigation/ReportIssueStackNavigator'
import * as theme from '../../theme'
import {IBlockDto} from '../../types'
import {queryKeys, blockUser} from '../../api'
import {useAppSelector} from '../../hooks'

export const ReportIssueStep2 = () => {
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const navigation = useNavigation()
  const route = useRoute<ReportIssueStep2RouteProp>()
  const {writerName, writerAccountIdx, nanumIdx, accountImg} = route.params
  const queryClient = useQueryClient()

  const blockUserQuery = useMutation(queryKeys.block, blockUser, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.nanumList])

      navigation.navigate('ReportIssueStep3', {
        writerName,
        writerAccountIdx,
        nanumIdx,
      })
    },
    onError(error, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '차단하기 중 에러가 발생했습니다.',
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

  const onPressComplete = useCallback(() => {
    navigation.navigate('MainTabNavigator')
  }, [])

  const onPressBlockUser = useCallback(() => {
    if (blockUserQuery.isLoading) {
      return
    }

    const blockDto: IBlockDto = {
      accountIdxBlock: accountIdx,
      accountIdxBlocked: writerAccountIdx,
      accountImg,
      creatorId: writerName,
    }
    console.log(JSON.stringify(blockDto))

    blockUserQuery.mutate([blockDto])
  }, [accountIdx, writerAccountIdx, blockUserQuery])

  return (
    <SafeAreaView style={[styles.rootContainer]}>
      <StackHeader title="문제 신고하기" goBack x />
      <View style={[styles.container, theme.styles.wrapper]}>
        <Text style={[theme.styles.bold20, {marginTop: 12, marginBottom: 12}]}>신고가 완료되었습니다.</Text>
        <Pressable style={[styles.blockButton]} onPress={onPressBlockUser}>
          <Text style={{fontSize: 16, color: theme.red}}>{writerName}님 차단하기</Text>
        </Pressable>
        <Text style={styles.guideText}>해당 계정의 게시글을 볼 수 없게 됩니다. 마이페이지의 차단 계정 관리에서 차단 해제를 할 수 있습니다.</Text>
        <RoundButton label="메인 화면으로 이동" enabled style={{marginTop: 32}} onPress={onPressComplete} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  guideText: {
    fontSize: 16,
    color: theme.gray700,
    marginTop: 16,
    lineHeight: 24,
  },

  blockButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: theme.red,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
  },
})
