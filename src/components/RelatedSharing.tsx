import React, {useMemo} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Platform, Dimensions} from 'react-native'
import {black} from '../theme'

const {width} = Dimensions.get('window')
const padding = 15 // 화면 좌 우 패딩
const margin = 15 // 각 이미지 사이 간격
const imageSize = (width - (padding * 2 + margin * 2)) / 3 // 세 개의 이미지가 들어가므로 3으로 나눔

const RelatedSharing = () => {
  return (
    <View style={[styles.relatedSharingContainer]}>
      <Text style={[styles.header]}>관련 인기 나눔</Text>
      <View style={styles.content}>
        <TouchableOpacity>
          <Image style={[styles.image]} source={require('../assets/images/no-image.png')}></Image>
          <Text style={[styles.title]}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={[styles.image]} source={require('../assets/images/no-image.png')}></Image>
          <Text style={[styles.title]}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={[styles.image]} source={require('../assets/images/no-image.png')}></Image>
          <Text style={[styles.title]}>Title</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RelatedSharing

const styles = StyleSheet.create({
  title: {
    color: black,
    marginTop: 10,
  },
  image: {
    height: imageSize,
    width: imageSize,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    marginVertical: 20,
    fontWeight: '600',
    fontSize: Platform.OS == 'ios' ? 18 : 16,
    color: black,
  },
  relatedSharingContainer: {
    marginVertical: 10,
  },
})
