import React, {useCallback, useState} from 'react'
import {View, Text, ScrollView, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {black, white, gray} from '../../theme'
import {InputContainer, Input, Label, Button} from '../../theme'

type AccountType = {
  email: string
  password: string
  passwordCheck: string
  name: string
  nickname: string
  phoneNumber: string
  birthdate: {
    year: string
    month: string
    date: string
  }
  sex: string
}

const CreateAccount = () => {
  const navigation = useNavigation()
  const [account, setAccount] = useState<AccountType>({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    nickname: '',
    phoneNumber: '',
    birthdate: {
      year: '',
      month: '',
      date: '',
    },
    sex: '',
  })

  // 사용자가 입력한 인증번호
  const [userCode, setUserCode] = useState<string>('')
  // 서버 쪽에서 보낸 인증번호
  const [serverCode, setServerCode] = useState<string>('')

  const onChangeInfo = (key: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setAccount({...account, [key]: e.nativeEvent.text})
  }

  // 아이디 중복 확인
  const onPressDuplicated = useCallback(() => {
    // do something
  }, [])

  // 인증 번호 전송
  const onPressSend = useCallback(() => {
    // do something
  }, [])

  // 인증 번호 확인
  const onPressVerify = useCallback(() => {
    // dp something
  }, [])

  const onPressLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [])

  return (
    <ScrollView contentContainerStyle={{paddingVertical: 30}}>
      <Container>
        <InputButtonWraper>
          <View style={{width: '78%'}}>
            <InputContainer>
              <Label>이메일</Label>
              <Input placeholder="이메일을 입력해주세요" placeholderTextColor={gray} onChange={e => onChangeInfo('email', e)} value={account.email} />
            </InputContainer>
          </View>
          <Button style={[styles.buttonSmall]} onPress={onPressDuplicated}>
            <ButtonText>중복 확인</ButtonText>
          </Button>
        </InputButtonWraper>
        <InputContainer>
          <Label>비밀번호</Label>
          <Input placeholder="비밀번호를 입력해주세요" placeholderTextColor={gray} onChange={e => onChangeInfo('password', e)} value={account.password} />
        </InputContainer>

        <InputContainer>
          <Label>비밀번호 확인</Label>
          <Input
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor={gray}
            onChange={e => onChangeInfo('passwordCheck', e)}
            value={account.passwordCheck}
          />
        </InputContainer>

        <InputContainer>
          <Label>이름</Label>
          <Input value={account.name} onChange={e => onChangeInfo('name', e)} />
        </InputContainer>

        <InputContainer>
          <Label>닉네임</Label>
          <Input value={account.nickname} onChange={e => onChangeInfo('nickname', e)} />
        </InputContainer>

        <InputButtonWraper>
          <View style={{width: '78%'}}>
            <InputContainer>
              <Label>전화번호</Label>
              <Input value={account.phoneNumber} onChange={e => onChangeInfo('phoneNumber', e)} />
            </InputContainer>
          </View>
          <Button style={[styles.buttonSmall]} onPress={onPressSend}>
            <ButtonText>인증</ButtonText>
          </Button>
        </InputButtonWraper>

        <InputButtonWraper>
          <View style={{width: '78%'}}>
            <InputContainer>
              <Label>인증번호</Label>
              <Input value={userCode} onChangeText={setUserCode} />
            </InputContainer>
          </View>
          <Button style={[styles.buttonSmall]} onPress={onPressVerify}>
            <ButtonText>인증</ButtonText>
          </Button>
        </InputButtonWraper>

        <InputContainer>
          <Label>생년월일</Label>

          <BirthDateContainer>
            <BirthDateWrapper>
              <Input style={[styles.birthdateInput]} value={account.birthdate.year} />
              <BirthDateTextWrapper>
                <BirthDateText>년</BirthDateText>
              </BirthDateTextWrapper>
            </BirthDateWrapper>

            <BirthDateWrapper>
              <Input style={[styles.birthdateInput]} value={account.birthdate.month} />
              <BirthDateTextWrapper>
                <BirthDateText>월</BirthDateText>
              </BirthDateTextWrapper>
            </BirthDateWrapper>

            <BirthDateWrapper>
              <Input style={[styles.birthdateInput]} value={account.birthdate.date} />
              <BirthDateTextWrapper>
                <BirthDateText>일</BirthDateText>
              </BirthDateTextWrapper>
            </BirthDateWrapper>
          </BirthDateContainer>
        </InputContainer>

        <InputContainer>
          <Label>성별</Label>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button style={[styles.buttonSex]}>
              <Text style={{color: black}}>여자</Text>
            </Button>
            <Button style={[styles.buttonSex]}>
              <Text style={{color: black}}>남자</Text>
            </Button>
          </View>
        </InputContainer>

        <InputContainer>
          <Label>이용 약관 동의</Label>
          <View style={[styles.agreetmentContainer]}>
            <View style={[styles.agreetmentWrapper]}>
              <BouncyCheckbox
                size={18}
                fillColor={black}
                unfillColor={white}
                iconStyle={[styles.iconStyle]}
                text="약관명"
                textStyle={{textDecorationLine: 'none', fontSize: 13}}
                textContainerStyle={{marginLeft: 10}}
                onPress={(isChecked: boolean) => {}}
              />
            </View>
            <View style={[styles.agreetmentWrapper]}>
              <BouncyCheckbox
                size={18}
                fillColor={black}
                unfillColor={white}
                iconStyle={[styles.iconStyle]}
                text="약관명"
                textStyle={{textDecorationLine: 'none', fontSize: 13}}
                textContainerStyle={{marginLeft: 10}}
                onPress={(isChecked: boolean) => {}}
              />
            </View>
          </View>
        </InputContainer>

        <Button style={[styles.buttonBig]}>
          <ButtonText style={{color: white}}>다음</ButtonText>
        </Button>
      </Container>
    </ScrollView>
  )
}
export default CreateAccount

const styles = StyleSheet.create({
  agreetmentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconStyle: {
    borderRadius: 4,
    borderColor: black,
  },
  agreetmentContainer: {
    marginBottom: 30,
  },
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
  birthdateInput: {
    flex: 1,
  },
  buttonSex: {
    borderColor: black,
    height: 36,
    width: '49%',
    borderWidth: 0.5,
  },
})

const BirthDateTextWrapper = styled.View`
  justify-content: center;
`

const BirthDateWrapper = styled.View`
  flex-direction: row;
  width: 30%;
`

const BirthDateText = styled.Text`
  justify-content: flex-end;
  margin-left: 5px;
`

const BirthDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

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
