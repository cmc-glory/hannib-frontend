import React, {useCallback} from 'react'
import {View, Text, ScrollView, FlatList, Pressable, StyleSheet, Dimensions, LayoutChangeEvent} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import * as theme from '../../theme'
import {Tag, MenuWhiteIcon} from '../../components/utils'

const images: string[] = [
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
]

const IMAGE_SIZE = (Dimensions.get('window').width - theme.PADDING_SIZE * 3) / 2

const HoldingSharingItem = ({uri, onPress}: {uri: string; onPress: () => void}) => {
  return (
    <Pressable style={{marginBottom: theme.PADDING_SIZE}} onPress={onPress}>
      <View style={[styles.headerContainer, theme.styles.rowSpaceBetween]}>
        <Tag label="모집중" />
        <MenuWhiteIcon />
      </View>
      <FastImage source={{uri: uri}} style={styles.image}></FastImage>
    </Pressable>
  )
}

type HoldingSharingProps = {
  setTabViewHeight: React.Dispatch<React.SetStateAction<number>>
}

export const ParticipatingSharingTab = () => {
  const navigation = useNavigation()
  const onPress = useCallback((index: number) => {
    // 일단은 나눔 index가 짝수면 오프라인, 홀수면 온라인으로 이동하도록
    if (index % 2 == 0) {
      navigation.navigate('ParticipatingSharingStackNavigator', {screen: 'ParticipatingSharingOffline'})
    } else {
      navigation.navigate('ParticipatingSharingStackNavigator', {screen: 'ParticipatingSharingOnline'})
    }
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.map((image, index) => (
        <HoldingSharingItem uri={image} key={image + String(index)} onPress={() => onPress(index)} />
      ))}
      {/* <FlatList data={images} renderItem={({item}) => <HoldingSharingItem uri={item} />} numColumns={2} /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: 12000,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 1,
    padding: 10,
    width: IMAGE_SIZE,
  },
})
