import React, {useState, useMemo} from 'react'
import {View, ScrollView, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable, useWindowDimensions, Dimensions, Animated} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TabView, SceneMap} from 'react-native-tab-view'
import MyPageListItem from '../../components/MyPageListItem'
import {white, black, main, gray50, gray700} from '../../theme'
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
var ONPRGRS_CONTAINER_HEIGHT: number
var PRTCPT_CONTAINER_HEIGHT: number
var MAX_HEIGHT: number
const imgSrc = '../../assets/images/image1.jpeg'
const onPrgrs = [
  {imageUri: require('../../assets/images/image2.jpeg'), state: 'D-7'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image4.jpeg'), state: 'D-1'},
  {imageUri: require('../../assets/images/image1.jpeg'), state: '우편시작'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image2.jpeg'), state: 'D-1'},
  {imageUri: require('../../assets/images/image2.jpeg'), state: 'D-7'},
  {imageUri: require('../../assets/images/image3.jpeg'), state: 'D-3'},
  {imageUri: require('../../assets/images/image4.jpeg'), state: 'D-1'},
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
  ONPRGRS_CONTAINER_HEIGHT = useMemo(() => {
    return 200 * Math.ceil(onPrgrs.length / 2)
  }, [])
  PRTCPT_CONTAINER_HEIGHT = useMemo(() => {
    return 200 * Math.ceil(participating.length / 2)
  }, [])
  MAX_HEIGHT = Math.max(ONPRGRS_CONTAINER_HEIGHT, PRTCPT_CONTAINER_HEIGHT) + 50

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

  const FirstRoute = () => {
    return (
      <View style={[styles.tabViewContainer]}>
        {onPrgrs.map((item, idx) => (
          <MyPageListItem item={item} key={idx}></MyPageListItem>
        ))}
      </View>
    )
  }

  const SecondRoute = () => {
    return (
      <View style={[styles.tabViewContainer]}>
        {participating.map((item, idx) => (
          <MyPageListItem item={item} key={idx}></MyPageListItem>
        ))}
      </View>
    )
  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })
  const [index, setIndex] = useState<any>(0)
  const [routes] = useState<Array<object>>([
    {key: 'first', title: '진행중인 나눔'},
    {key: 'second', title: '참여중인 나눔'},
  ])

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i)

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, i: any) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? 1 : 0.5)),
          })

          return (
            <TouchableOpacity style={styles.tabItem} onPress={() => setIndex(i)}>
              <Animated.Text style={[{opacity, fontSize: 16, fontWeight: '700'}]}>{route.title}</Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

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
          <ScrollView style={styles.contentsContainer}>
            <View style={styles.profileContainer}>
              <Image source={require(imgSrc)} style={styles.profileImg} />
              <Text style={[styles.description]}>춤추는 고양이</Text>
              <Pressable style={[styles.myInfoBtn]}>
                <Text style={[styles.myInfoBtnTxt]}>내 정보</Text>
              </Pressable>
            </View>
            <View style={[styles.shareInfoContainer, {width: CONTAINER_SIZE, height: MAX_HEIGHT}]}>
              <TabView navigationState={{index, routes}} renderScene={renderScene} onIndexChange={setIndex} renderTabBar={renderTabBar} />
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
    backgroundColor: gray50,
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
    backgroundColor: gray700,
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
    marginHorizontal: 16,
    marginBottom: 100,
  },
  tabViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoContainer: {
    marginVertical: 15,
    marginLeft: 21,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
})
