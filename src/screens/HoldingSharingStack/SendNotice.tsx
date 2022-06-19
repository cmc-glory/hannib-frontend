import React from 'react'
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, FloatingBottomButton} from '../../components/utils'
import * as theme from '../../theme'

export const SendNotice = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="공지 보내기" goBack></StackHeader>
      <View style={styles.container}>
        <View style={{marginBottom: 24}}>
          <Text style={{...theme.styles.bold16, marginBottom: 10}}>제목</Text>
          <TextInput style={[theme.styles.input, styles.textinput]} placeholder="제목 입력" placeholderTextColor={theme.gray200} />
        </View>
        <View>
          <Text style={{...theme.styles.bold16, marginBottom: 10}}>내용</Text>
          <TextInput
            style={[theme.styles.input, styles.textinput, {height: 330, textAlignVertical: 'top', paddingTop: 20}]}
            placeholder="내용 입력"
            placeholderTextColor={theme.gray200}
            multiline
          />
        </View>
      </View>
      <FloatingBottomButton
        label="등록"
        enabled
        onPress={() => {
          Alert.alert('공지 등록 버튼 클릭')
        }}
      />
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
