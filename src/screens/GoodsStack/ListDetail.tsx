import React, {useMemo, useState} from 'react'
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import ListDetailTabNavigator from '../../navigation/ListDetailTabNavigator'
import ListDetailDescription from './ListDetailTab/ListDetailDescription'
import StackHeader from '../../components/utils/StackHeader'
import Tag from '../../components/utils/Tag'
import Carousel from '../../components/utils/Carousel'
import RelatedSharing from '../../components/RelatedSharing'
import ListDetailFooter from '../../components/ListDetailFooter'
import {black, white} from '../../theme'

const images = [
  {source: require('../../assets/images/image1.jpeg')},
  {source: require('../../assets/images/image2.jpeg')},
  {source: require('../../assets/images/image3.jpeg')},
  {source: require('../../assets/images/image4.jpeg')},
]

const padding = 15
const screenHeight = Dimensions.get('window').height

export const ListDetail = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StackHeader goBack={false} title="상세 페이지" />

      <ScrollView style={[styles.container]}>
        <View style={[styles.tagContainer]}>
          <Tag label="나눔" />
          <Tag label="블루스퀘어" />
        </View>
        <Carousel images={images} padding={15} />
        <Text style={[styles.description, styles.margin]}>Lorem ipsum dolor sit amet, consectetur </Text>
        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}, styles.margin]}>
          <Text style={{color: black}}>나눔 진행자</Text>
          <Text style={{color: black}}>나눔 오픈일</Text>
        </View>
        <ListDetailDescription></ListDetailDescription>
        {/* <ListDetailTabNavigator></ListDetailTabNavigator> */}
        <View style={[styles.writerContainer]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={[styles.noUserImage]} source={require('../../assets/images/no_user.jpeg')}></Image>
            <Text style={[styles.writerText]}>작가 이름</Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.followButton]}>
              <Text style={{color: black}}>팔로우</Text>
            </TouchableOpacity>
          </View>
        </View>
        <RelatedSharing />
      </ScrollView>
      <ListDetailFooter />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  writerText: {
    color: black,
    marginLeft: 20,
    fontSize: Platform.OS == 'ios' ? 16 : 15,
    fontWeight: '500',
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: black,
    borderWidth: Platform.OS == 'ios' ? 0.5 : 0.75,
  },
  noUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  writerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  margin: {
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: black,
    fontWeight: '600',
  },
  container: {
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
