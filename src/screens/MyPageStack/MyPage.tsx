import React, {useState, useMemo, useCallback} from 'react'
import {View, Text, ScrollView, StyleSheet, useWindowDimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import {Bell, Setting, StackHeader, TopTabBar} from '../../components/utils'
import {Profile, Follow} from '../../components/MyPageStack'
import {HoldingSharingTab, ParticipatingSharingTab} from './'
import * as theme from '../../theme'

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export const MyPage = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0) // tab view index

  // tab view configuration
  const [routes] = React.useState([
    {key: 'holdingSharing', title: '진행한 나눔'},
    {key: 'participatedSharing', title: '참여한 나눔'},
  ])

  const renderScene = useMemo(
    () =>
      ({route}: {route: any}) => {
        switch (route.key) {
          case 'holdingSharing':
            return <HoldingSharingTab />
          case 'participatedSharing':
            return <ParticipatingSharingTab />
          default:
            return null
        }
      },
    [],
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <SafeAreaView style={{height: '100%'}} edges={['top', 'left', 'right']}>
      <StackHeader title="마이페이지">
        <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
          <Bell />
          <Setting />
        </View>
      </StackHeader>

      <View style={[theme.styles.wrapper]}>
        <View style={{marginVertical: 15}}>
          <Profile />
        </View>
        <View style={{height: 12000}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={index => {
              setIndex(index)
            }}
            initialLayout={{width: layout.width}}
            renderTabBar={props => (
              <TabBar
                {...props}
                renderLabel={({route, focused, color}) => (
                  <Text style={{color, fontFamily: focused ? 'Pretendard-Bold' : 'Pretendard-Medium'}}>{route.title}</Text>
                )}
                style={{backgroundColor: theme.white, elevation: 0}}
                indicatorStyle={{
                  backgroundColor: theme.main,
                  height: 2,
                  position: 'absolute',
                }}
                activeColor={theme.gray800}
                inactiveColor={theme.gray500}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    //flex: 1,
  },
})
