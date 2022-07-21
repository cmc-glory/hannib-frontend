import React, {useCallback} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, RoundButton} from '../../components/utils'
import {ReportIssueStep3RouteProp} from '../../navigation/ReportIssueStackNavigator'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as theme from '../../theme'

export const ReportIssueStep3 = () => {
  const navigation = useNavigation()
  const route = useRoute<ReportIssueStep3RouteProp>()
  const {writerName} = route.params

  const onPressComplete = useCallback(() => {
    navigation.navigate('MainTabNavigator')
  }, [])

  return (
    <SafeAreaView style={[styles.rootContainer]}>
      <StackHeader title="문제 신고하기" goBack x />
      <View style={[theme.styles.wrapper, styles.container]}>
        <Text style={[theme.styles.bold20, {marginTop: 12, marginBottom: 24}]}>{writerName}님을 차단했습니다</Text>
        <Text style={{fontSize: 16, lineHeight: 24, color: theme.gray700}}>신고해주셔서 감사합니다. </Text>
        <Text style={{fontSize: 16, lineHeight: 24, color: theme.gray700}}>차단된 계정은 마이페이지에서 관리가 가능합니다.</Text>
        <RoundButton label="완료" enabled style={{marginTop: 24}} onPress={onPressComplete} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
  },
})
