import React, {useState, useMemo, useCallback} from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
  Dimensions,
  Animated,
  RefreshControl,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import MyPageListItem from '../../components/MyPageListItem'
import {white, black, main, gray50, gray700, gray500} from '../../theme'
import StackHeader from '../../components/utils/StackHeader'
import Icon from 'react-native-vector-icons/Ionicons'
import Notification from '../../components/utils/Notification'
import styled from 'styled-components/native'
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

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

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
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const [result, setResult] = useState<string>('')
  CONTAINER_SIZE = useMemo(() => {
    return width - padding - margin
  }, [])
  ONPRGRS_CONTAINER_HEIGHT = useMemo(() => {
    return 200 * Math.ceil(onPrgrs.length / 2) + 50
  }, [])
  PRTCPT_CONTAINER_HEIGHT = useMemo(() => {
    return 200 * Math.ceil(participating.length / 2) + 50
  }, [])
  MAX_HEIGHT = Math.max(ONPRGRS_CONTAINER_HEIGHT, PRTCPT_CONTAINER_HEIGHT)

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

  const FirstRoute = ({isActiveTab}: any) => {
    if (!isActiveTab) {
      return <View />
    }
    return (
      <View style={[styles.tabViewContainer]}>
        {onPrgrs.map((item, idx) => (
          <MyPageListItem item={item} key={idx}></MyPageListItem>
        ))}
      </View>
    )
  }

  const SecondRoute = ({isActiveTab}: any) => {
    if (!isActiveTab) {
      return <View />
    }
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
  const [routes] = useState<Array<any>>([
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
          <ScrollView style={styles.contentsContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.profileContainer}>
              <Image source={require(imgSrc)} style={styles.profileImg} />
              <Text style={[styles.description]}>춤추는 고양이</Text>
              <Pressable style={[styles.myInfoBtn]}>
                <Text style={[styles.myInfoBtnTxt]}>내 정보</Text>
              </Pressable>
            </View>
            <View style={[styles.shareInfoContainer, {width: CONTAINER_SIZE, height: MAX_HEIGHT}]}>
              <TabView
                navigationState={{index, routes}}
                renderScene={({route}) => {
                  switch (route.key) {
                    case 'first':
                      return FirstRoute({isActiveTab: index === 0})
                    case 'second':
                      return SecondRoute({isActiveTab: index === 1})
                    default:
                      return null
                  }
                }}
                onIndexChange={setIndex}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    indicatorStyle={{
                      backgroundColor: 'rgb(240, 80, 20)',
                    }}
                    style={{
                      backgroundColor: 'white',
                      shadowOffset: {height: 0, width: 0},
                      shadowColor: 'transparent',
                    }}
                    pressColor={'transparent'}
                    renderLabel={({route, focused}) => <TabLabel focused={focused}>{route.title}</TabLabel>}
                  />
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

const TabLabel = styled.Text`
  color: ${props => (props.focused ? black : gray500)};
  font-size: 16px;
  font-weight: 700;
`

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
