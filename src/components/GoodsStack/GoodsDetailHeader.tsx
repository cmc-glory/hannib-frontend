import React, {useCallback} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Icon from 'react-native-vector-icons/Ionicons'
import {main, black} from '../../theme'
import {LeftArrowIcon, ShareIcon, MenuIcon} from '../utils'

type StackHeaderParams = {}

const ICON_SIZE = 12

export const GoodsDetailHeader = ({}: StackHeaderParams) => {
  const navigation = useNavigation()
  const onPressGoback = useCallback(() => {
    navigation.goBack()
  }, [])
  return (
    <View style={[styles.container]}>
      <LeftArrowIcon onPress={onPressGoback} style={{marginRight: 10}} />
      <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
        <ShareIcon />
        <MenuIcon />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    marginTop: getStatusBarHeight(),
  },
})
