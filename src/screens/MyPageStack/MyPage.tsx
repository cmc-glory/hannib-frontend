import React, {useState} from 'react'
import {View, ScrollView, Text, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import MyPageListItem from '../../components/MyPageListItem'
import {white, black, Button} from '../../theme'
import StackHeader from '../../components/utils/StackHeader'
import Notification from '../../components/utils/Notification'
import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login'

const imgSrc = '../../assets/images/image1.jpeg'
const onPrgrs = [
  {imageUri: require('../../assets/images/image2.jpeg'), state: 'D-7'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image4.jpeg'), state: 'D-1'},
  {imageUri: require('../../assets/images/image1.jpeg'), state: '우편시작'},
]
const participating = [
  {imageUri: require('../../assets/images/image4.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image1.jpeg'), state: 'D-2'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: '배송중'},
]

export const MyPage = () => {
  const [result, setResult] = useState<string>('')

  const signInWithKakao = async (): Promise<void> => {
    console.log('kakao login ~~ ')
    const token: KakaoOAuthToken = await login()
    const profile: KakaoProfile | KakaoProfileNoneAgreement = await getKakaoProfile()
    console.log('token : ', JSON.stringify(token))
    console.log('profile : ', JSON.stringify(profile))

    // login()
    //   .then(res => console.log('성공', res))
    //   .catch(error => console.log(error))

    setResult(JSON.stringify(token))
  }

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <StackHeader title="마이페이지">
          <Notification />
        </StackHeader>
        {result == '' ? (
          <TouchableOpacity style={[styles.button]} onPress={() => signInWithKakao()}>
            <Text style={{color: '#fff'}}>Sign in with Kakao</Text>
          </TouchableOpacity>
        ) : (
          <ScrollView style={styles.contentsContainer}>
            <View style={styles.profileContainer}>
              <Image source={require(imgSrc)} style={styles.profileImg} />
              <Text style={[styles.description, styles.margin]}>닉네임</Text>
            </View>
            <View style={styles.onProgressContainer}>
              <Text style={styles.description}>진행중</Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={onPrgrs}
                renderItem={({item}) => <MyPageListItem item={item}></MyPageListItem>}></FlatList>
              <Text style={styles.description}>참여중</Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={participating}
                renderItem={({item}) => <MyPageListItem item={item}></MyPageListItem>}></FlatList>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.description}>내정보</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.description}>설정</Text>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentsContainer: {
    backgroundColor: '#fff',
  },
  button: {
    width: '90%',
    borderColor: 'black',
    backgroundColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 50,
    marginVertical: 200,
    marginHorizontal: 20,
  },
  profileContainer: {
    alignContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 40,
    alignItems: 'center',
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  description: {
    fontSize: 14,
    color: black,
    fontWeight: '700',
  },
  margin: {
    marginVertical: 16,
  },
  onProgressContainer: {
    marginLeft: 21,
  },
  infoContainer: {
    marginVertical: 15,
    marginLeft: 21,
  },
})
