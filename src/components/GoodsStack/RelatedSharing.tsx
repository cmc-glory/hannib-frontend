import React, {useMemo} from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, Dimensions} from 'react-native'
import {black} from '../../theme'

const {width} = Dimensions.get('window')
const padding = 15 // 화면 좌 우 패딩
const margin = 15 // 각 이미지 사이 간격
const imageSize = (width - (padding * 2 + margin * 2)) / 3 // 세 개의 이미지가 들어가므로 3으로 나눔

const RelatedSharing = () => {
  return (
    <View style={[styles.relatedSharingContainer]}>
      <Text style={[styles.header]}>관련 인기 나눔</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.container}>
          <Image style={[styles.image]} source={require('../../assets/images/no-image.jpeg')}></Image>
          <Text style={[styles.title]}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Image style={[styles.image]} source={require('../../assets/images/no-image.jpeg')}></Image>
          <Text style={[styles.title]}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Image style={[styles.image]} source={require('../../assets/images/no-image.jpeg')}></Image>
          <Text style={[styles.title]}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Image style={[styles.image]} source={require('../../assets/images/no-image.jpeg')}></Image>
          <Text style={[styles.title]}>Title</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default RelatedSharing

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  title: {
    color: black,
    marginTop: 10,
    marginLeft: 5,
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
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: black,
  },
  relatedSharingContainer: {
    marginVertical: 10,
  },
})
