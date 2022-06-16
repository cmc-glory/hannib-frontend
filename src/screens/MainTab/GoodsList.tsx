import React, {useState, useCallback, useEffect} from 'react'
import {RefreshControl, View, Text, FlatList, Pressable, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import IconIcons from 'react-native-vector-icons/Ionicons'

import * as theme from '../../theme'
import {FloatingButton, StackHeader, Icon, Bell, Magnifier} from '../../components/utils'
import {createListItem} from '../../data/createListItem'
import {GoodsListItem, GoodsFilterTab, GoodsListItemVer2} from '../../components/MainTab'
import {ISharingInfo} from '../../types'

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const listItems = new Array(50).fill(null).map(createListItem)

const GoodsLists = () => {
  const navigation = useNavigation()

  // states
  const [sharings, setSharins] = useState<ISharingInfo[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const [locationFilter, setLocationFilter] = useState<0 | 1 | 2>(0) // 전체(0), 우편(1), 오프라인(2)

  // callbacks
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharins(result)
        setRefreshing(false)
      })
  }, [])

  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteGoodsStackNavigator')
  }, [])

  const onPressMagnifier = useCallback(() => {
    navigation.navigate('SearchStackNavigator')
  }, [])

  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharins(result)
      })
  }, [])

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>
      <StackHeader dropdown title="카테고리">
        <View style={{flexDirection: 'row', alignItems: 'center', width: 64, justifyContent: 'space-between'}}>
          {/* <Pressable>
            <Icon uri="http://localhost:8081/src/assets/Icon/Magnifier.png" />
          </Pressable> */}
          <Magnifier onPress={onPressMagnifier} />
          {/* <Pressable>
            <Icon uri="http://localhost:8081/src/assets/Icon/Bell.png" />
          </Pressable> */}
          <Bell onPress={() => {}} />
        </View>
      </StackHeader>
      <View style={{flex: 1}}>
        <GoodsFilterTab locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
        <FlatList
          contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE}}
          data={sharings}
          renderItem={({item}) => <GoodsListItemVer2 item={item}></GoodsListItemVer2>}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
          onRefresh={onRefresh}
        />
      </View>
      <FloatingButton onPress={onPressWrite}>
        <IconIcons name="add-outline" color={theme.white} size={32} />
      </FloatingButton>
    </SafeAreaView>
  )
}

export default GoodsLists

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    flex: 1,
  },
})
