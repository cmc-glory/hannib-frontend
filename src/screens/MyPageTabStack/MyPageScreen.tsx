import React, {useState, useCallback} from 'react'
import {View, ScrollView, Pressable, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {LogoutModal} from '../../components/MainTab'
import {StackHeader, BellIcon, RightArrowIcon} from '../../components/utils'
import {useAppSelector} from '../../hooks'
import * as theme from '../../theme'

type MyPageItem = {
  label: string
  numSharing?: number
  onPress: () => void
}

const Separator = () => {
  return <View style={styles.separator} />
}
const SeparatorLight = () => {
  return <View style={styles.separatorLight} />
}

const MyPageItem = ({label, numSharing, onPress}: MyPageItem) => {
  return (
    <Pressable onPress={onPress} style={[theme.styles.rowSpaceBetween, styles.myPageItem]}>
      <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 16}}>{label}</Text>
      <View style={[theme.styles.rowFlexStart]}>
        {numSharing && <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 16}}>{numSharing}개</Text>}
        <RightArrowIcon onPress={onPress} />
      </View>
    </Pressable>
  )
}

export const MyPageScreen = () => {
  const navigation = useNavigation()
  const user = useAppSelector(state => state.auth.user)

  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false)

  const onPressEditProfile = useCallback(() => {
    navigation.navigate('MyPageStackNavigator', {
      screen: 'EditProfile',
    })
  }, [])

  const onPressBlockedUsers = useCallback(() => {
    navigation.navigate('MyPageStackNavigator', {
      screen: 'BlockedUsers',
    })
  }, [])

  const onPressResign = useCallback(() => {
    navigation.navigate('MyPageStackNavigator', {
      screen: 'Resign',
    })
  }, [])

  const onPressLogout = useCallback(() => {
    setLogoutModalVisible(true)
  }, [])

  const onPressHoldingSharing = useCallback(() => {
    navigation.navigate('HoldingSharingList')
  }, [])

  const onPressParticipatingSharing = useCallback(() => {
    navigation.navigate('ParticipatingSharingList')
  }, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="마이페이지" goBack={false}>
        <BellIcon />
      </StackHeader>
      <LogoutModal logoutModalVisible={logoutModalVisible} setLogoutModalVisible={setLogoutModalVisible} />
      <ScrollView>
        <View style={[theme.styles.rowFlexStart, styles.profileContainer]}>
          <FastImage
            style={styles.profileImage}
            source={{uri: user.profileImageUri == '' ? 'http://localhost:8081/src/assets/images/no-image.jpeg' : user.profileImageUri}}
          />
          <View style={{alignSelf: 'stretch', justifyContent: 'center'}}>
            <Text style={[theme.styles.bold20, {color: theme.gray700, marginBottom: 8}]}>{user.name}</Text>
            <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressEditProfile}>
              <Text style={{color: theme.gray500}}>프로필 수정</Text>
              <RightArrowIcon size={20} onPress={onPressEditProfile} />
            </Pressable>
          </View>
        </View>
        <Separator />
        <View style={styles.wrapper}>
          <Text style={[theme.styles.bold16, {marginBottom: 8, marginTop: 16}]}>나눔 관리</Text>
          <MyPageItem label="진행한 나눔" numSharing={16} onPress={onPressHoldingSharing} />
          <SeparatorLight />
          <MyPageItem label="참여한 나눔" numSharing={16} onPress={onPressParticipatingSharing} />
        </View>
        <Separator />
        <View style={styles.wrapper}>
          <Text style={[theme.styles.bold16, {marginBottom: 8, marginTop: 16}]}>설정 및 문의</Text>
          <MyPageItem label="카테고리 설정" onPress={() => {}} />
          <SeparatorLight />
          <MyPageItem label="차단계정 관리" onPress={onPressBlockedUsers} />
          <SeparatorLight />
          <MyPageItem label="고객센터 문의" onPress={() => {}} />
        </View>
        <Separator />
        <View style={[styles.wrapper]}>
          <Text style={[theme.styles.bold16, {marginBottom: 8, marginTop: 16}]}>계정 관리</Text>
          <MyPageItem label="로그아웃" onPress={onPressLogout} />
          <SeparatorLight />
          <MyPageItem label="회원 탈퇴" onPress={onPressResign} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  myPageItem: {
    paddingVertical: 18,
  },
  wrapper: {
    paddingHorizontal: theme.PADDING_SIZE,
    paddingVertical: 8,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: theme.PADDING_SIZE,
  },
  profileContainer: {
    paddingVertical: 24,
    paddingHorizontal: theme.PADDING_SIZE,
  },
  separator: {
    height: 8,
    backgroundColor: theme.gray50,
  },
  separatorLight: {
    height: 1,
    backgroundColor: theme.gray200,
  },
})