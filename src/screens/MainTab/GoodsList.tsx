import React, {useState, useCallback, useEffect} from 'react'
import {RefreshControl, View, Text, FlatList, Pressable, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import IconIcons from 'react-native-vector-icons/Ionicons'

import * as theme from '../../theme'
import {FloatingButton, StackHeader, Icon, BellIcon, Magnifier, BottomSheet} from '../../components/utils'
import {createListItem} from '../../data/createListItem'
import {GoodsListItem, GoodsFilterTab, GoodsListItemVer2, GoodsListBottomSheetContent, Banner} from '../../components/MainTab'
import {ISharingInfo} from '../../types'
import {useAppSelector} from '../../hooks'

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const listItems = new Array(50).fill(null).map(createListItem)

const GoodsLists = () => {
  const navigation = useNavigation()
  const user = useAppSelector(state => state.auth.user)

  // states
  const [sharings, setSharings] = useState<ISharingInfo[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const [locationFilter, setLocationFilter] = useState<0 | 1 | 2>(0) // 전체(0), 우편(1), 오프라인(2)
  const [itemFilter, setItemFilter] = useState<'최신순' | '인기순' | '추천순'>('최신순')
  const [showItemFilterBottomShet, setShowItemFilterBottomSheet] = useState<boolean>(false)
  const [bannerInfo, setBannerInfo] = useState({
    imageUri: 'http://localhost:8081/src/assets/images/aespa.jpeg',
    title: 'SEVENTEEN [BE THE SUN] - SEOUL',
    sharingid: '123445',
  })

  React.useEffect(() => {
    //console.log(showItemFilterBottomShet)
  }, [showItemFilterBottomShet])

  // callbacks
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharings(result)
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
        setSharings(result)
      })
  }, [])

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>
      <StackHeader dropdown title="카테고리">
        <View style={{flexDirection: 'row', alignItems: 'center', width: 64, justifyContent: 'space-between'}}>
          <Magnifier onPress={onPressMagnifier} />
          <BellIcon onPress={() => {}} />
        </View>
      </StackHeader>
      <View style={{flex: 1}}>
        <Banner imageUri={bannerInfo.imageUri} title={bannerInfo.title} sharingid={bannerInfo.sharingid} />
        <GoodsFilterTab
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          itemFilter={itemFilter}
          setItemFilter={setItemFilter}
          showItemFilterBottomSheet={showItemFilterBottomShet}
          setShowItemFilterBottomSheet={setShowItemFilterBottomSheet}
        />
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
      <BottomSheet modalVisible={showItemFilterBottomShet} setModalVisible={setShowItemFilterBottomSheet}>
        <GoodsListBottomSheetContent itemFilter={itemFilter} setItemFilter={setItemFilter} />
      </BottomSheet>
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
