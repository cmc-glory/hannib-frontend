import React, {useCallback, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import {black, white, gray} from '../../theme'
import {InputContainer, Input, Label, Button} from '../../theme'

const FindPassword = () => {
  const navigation = useNavigation()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [userCode, setUserCode] = useState<string>('')

  const onPressSend = useCallback(() => {
    // do something
  }, [])
  const onPressVerify = useCallback(() => {
    // dp something
  }, [])
  const onPressLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [])

  return (
    <Container>
      <InputContainer>
        <Label>이름</Label>
        <Input placeholder="이름을 입력해주세요" placeholderTextColor={gray} onChangeText={setName} value={name} />
      </InputContainer>
      <InputButtonWraper>
        <View style={{width: '78%'}}>
          <InputContainer>
            <Label>이름</Label>
            <Input placeholder="이메일을 입력해주세요" placeholderTextColor={gray} onChangeText={setEmail} value={email} />
          </InputContainer>
        </View>
        <Button style={[styles.buttonSmall]} onPress={onPressSend}>
          <ButtonText>전송</ButtonText>
        </Button>
      </InputButtonWraper>
      <InputButtonWraper>
        <View style={{width: '78%'}}>
          <InputContainer>
            <Label>이메일 인증번호</Label>
            <Input placeholder="인증번호를 입력해주세요" placeholderTextColor={gray} onChangeText={setUserCode} value={userCode} />
          </InputContainer>
        </View>
        <Button style={[styles.buttonSmall]} onPress={onPressVerify}>
          <ButtonText>인증</ButtonText>
        </Button>
      </InputButtonWraper>
      <Button style={[styles.buttonBig]} onPress={onPressLogin}>
        <Text style={{color: white}}>로그인</Text>
      </Button>
    </Container>
  )
}
export default FindPassword

const styles = StyleSheet.create({
  buttonSmall: {
    backgroundColor: black,
    marginBottom: 10,
    width: '20%',
    height: 40,
  },
  buttonBig: {
    backgroundColor: black,
    height: 50,
    width: '100%',
    marginTop: 10,
  },
})

const Container = styled.View`
  flex: 1;
  background-color: ${white};
  padding-horizontal: 15px;
  justify-content: center;
`
const InputButtonWraper = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
`

const ButtonText = styled.Text`
  color: ${white};
`
