import React, {useCallback} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {StackHeader, RoundButton} from '../../components/utils'
import * as theme from '../../theme'

export const AskAddStarComplete = () => {
  const navigation = useNavigation()
  const onPressNext = useCallback(() => {
    navigation.navigate('SelectCategory', {
      email: '',
      name: '',
    })
  }, [])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="문의하기" goBack />
      <View style={{flex: 1, padding: theme.PADDING_SIZE, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <FastImage source={{uri: 'http://localhost:8081/src/assets/images/Complete.png'}} style={{width: 53, height: 53, alignSelf: 'center'}} />
          <View style={{marginVertical: 32, alignItems: 'center'}}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>문의하기 등록 완료</Text>
            <Text style={{fontSize: 16, color: theme.gray700, textAlign: 'center'}}>
              기존 카테고리 내에 중복확인 후, 결과를 이메일로 전달드리겠습니다. 감사합니다.
            </Text>
          </View>
          <RoundButton label="카테고리로 이동" enabled onPress={onPressNext} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
