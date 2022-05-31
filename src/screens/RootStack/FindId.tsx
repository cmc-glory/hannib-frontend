import React, {useCallback, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import {black, white, gray} from '../../theme'
import {InputContainer, Input, Label, Button} from '../../theme'

const FindId = () => {
  const navigation = useNavigation()

  const [phoneNumber, setPhoneNumber] = useState<string>('')
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
      <InputButtonWraper>
        <View style={{width: '78%'}}>
          <InputContainer>
            <Label>전화번호</Label>
            <Input placeholder="전화번호를 입력해주세요" placeholderTextColor={gray} onChangeText={setPhoneNumber} value={phoneNumber} />
          </InputContainer>
        </View>
        <Button style={[styles.buttonSmall]} onPress={onPressSend}>
          <ButtonText>전송</ButtonText>
        </Button>
      </InputButtonWraper>
      <InputButtonWraper>
        <View style={{width: '78%'}}>
          <InputContainer>
            <Label>휴대폰 인증번호</Label>
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
export default FindId

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
