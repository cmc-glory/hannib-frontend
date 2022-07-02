import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, RoundButton} from '../../components/utils'
import {ReportIssueStep2RouteProp} from '../../navigation/ReportIssueStackNavigator'
import * as theme from '../../theme'

export const ReportIssueStep2 = () => {
  const navigation = useNavigation()
  const route = useRoute<ReportIssueStep2RouteProp>()
  const {userName} = route.params

  const onPressBlockUser = useCallback(() => {
    navigation.navigate('ReportIssueStep3', {
      userName: userName,
    })
  }, [])

  const onPressComplete = useCallback(() => {
    navigation.navigate('MainTabNavigator')
  }, [])

  return (
    <SafeAreaView style={[styles.rootContainer]}>
      <StackHeader title="문제 신고하기" goBack x />
      <View style={[styles.container, theme.styles.wrapper]}>
        <Text style={[theme.styles.bold20, {marginTop: 12, marginBottom: 24}]}>신고가 완료되었습니다.</Text>
        <Pressable style={[styles.blockButton]} onPress={onPressBlockUser}>
          <Text style={{fontSize: 16, color: theme.red}}>{userName}님 차단하기</Text>
        </Pressable>
        <Text style={{fontSize: 16, color: theme.gray700, marginTop: 16}}>
          해당 계정의 게시글을 볼 수 없으며 알림도 받지 않습니다. 쪽지 및 연락을 보낼 수 없도록 차단합니다.
        </Text>
        <RoundButton label="완료" enabled style={{marginTop: 24}} onPress={onPressComplete} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
