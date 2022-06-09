import React, {useState} from 'react'
import {View, ScrollView, Text, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import MyPageListItem from '../../components/MyPageListItem'
import {white, black, Button} from '../../theme'
import {Notification, StackHeader} from '../../components/utils'
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

    setResult(JSON.stringify(token))
  }

  const SignInWithGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    console.log(googleCredential)
    return auth().signInWithCredential(googleCredential)
  }

  https: return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <StackHeader title="마이페이지">
          <Notification />
        </StackHeader>
        {result == '' ? (
          <View style={{alignSelf: 'center', width: '100%'}}>
            <TouchableOpacity style={[styles.button]} onPress={() => signInWithKakao()}>
              <Text style={{color: '#fff'}}>Sign in with Kakao</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={() => SignInWithGoogle()}>
              <Text style={{color: '#fff'}}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
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
    marginVertical: 50,
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
