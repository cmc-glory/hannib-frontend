import React, {useState, useMemo} from 'react'
import {View, ScrollView, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable, useWindowDimensions, Dimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TabView, SceneMap} from 'react-native-tab-view'
import MyPageListItem from '../../components/MyPageListItem'
import {white, black, Button, mainLight, main} from '../../theme'
import StackHeader from '../../components/utils/StackHeader'
import Icon from 'react-native-vector-icons/Ionicons'
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

const {width} = Dimensions.get('window')
const padding = 15
const margin = 10
var CONTAINER_SIZE
const imgSrc = '../../assets/images/image1.jpeg'
const onPrgrs = [
  {imageUri: require('../../assets/images/image2.jpeg'), state: 'D-7'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image4.jpeg'), state: 'D-1'},
  {imageUri: require('../../assets/images/image1.jpeg'), state: '우편시작'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image2.jpeg'), state: 'D-1'},
]
const participating = [
  {imageUri: require('../../assets/images/image4.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image1.jpeg'), state: 'D-2'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: '배송중'},
]

export const MyPage = () => {
  const layout = useWindowDimensions()
  const [result, setResult] = useState<string>('')
  CONTAINER_SIZE = useMemo(() => {
    return width - padding - margin
  }, [])

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

  const FirstRoute = () => (
    <FlatList
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      data={onPrgrs}
      renderItem={({item}) => <MyPageListItem item={item}></MyPageListItem>}></FlatList>
  )

  const SecondRoute = () => (
    <FlatList
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      data={participating}
      renderItem={({item}) => <MyPageListItem item={item}></MyPageListItem>}></FlatList>
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })
  const [index, setIndex] = useState<number>(0)
  const [routes] = useState<Array<object>>([
    {key: 'first', title: '진행중인 나눔'},
    {key: 'second', title: '참여중인 나눔'},
  ])

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <StackHeader title="마이페이지">
          <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
            <Notification />
            <TouchableOpacity>
              <Icon name="settings-outline" size={24} color={black} />
            </TouchableOpacity>
          </View>
        </StackHeader>
        {result == '' ? (
          <TouchableOpacity style={[styles.button]} onPress={() => signInWithKakao()}>
            <Text style={{color: '#fff'}}>Sign in with Kakao</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.contentsContainer}>
            <View style={styles.profileContainer}>
              <Image source={require(imgSrc)} style={styles.profileImg} />
              <Text style={[styles.description]}>춤추는 고양이</Text>
              <Pressable style={[styles.myInfoBtn]}>
                <Text style={[styles.myInfoBtnTxt]}>내 정보</Text>
              </Pressable>
            </View>
            <View style={[styles.shareInfoContainer, {width: CONTAINER_SIZE}]}>
              <Text style={styles.description}>진행중인 나눔</Text>
              <TabView
                renderTabBar={() => null}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: CONTAINER_SIZE}}
              />
              {/* <FlatList
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={onPrgrs}
                renderItem={({item}) => <MyPageListItem item={item}></MyPageListItem>}></FlatList>
              <Text style={styles.description}>참여중</Text> */}
              {/* <FlatList
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={participating}
                renderItem={({item}) => <MyPageListItem item={item}></MyPageListItem>}></FlatList> */}
            </View>
          </View>
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
    backgroundColor: mainLight,
    alignContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  profileImg: {
    height: 80,
    width: 80,
    marginTop: 25,
    marginBottom: 9,
    borderRadius: 40,
  },
  description: {
    fontSize: 14,
    color: black,
    fontWeight: '700',
    marginBottom: 13,
  },
  myInfoBtn: {
    backgroundColor: main,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  myInfoBtnTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: white,
  },
  shareInfoContainer: {
    width: 400,
    height: 300,
    marginHorizontal: 16,
  },
  onProgressContainer: {
    marginLeft: 21,
  },
  infoContainer: {
    marginVertical: 15,
    marginLeft: 21,
  },
})
