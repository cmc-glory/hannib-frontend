import React from 'react'
import {View, Text, FlatList, Pressable, StyleSheet, Dimensions, LayoutChangeEvent} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'
import {Tag, MenuWhite} from '../../components/utils'

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

const HoldingSharingItem = ({uri}: {uri: string}) => {
  return (
    <Pressable style={{marginBottom: theme.PADDING_SIZE}}>
      <View style={[styles.headerContainer, theme.styles.rowSpaceBetween]}>
        <Tag label="모집중" />
        <MenuWhite />
      </View>
      <FastImage source={{uri: uri}} style={styles.image}></FastImage>
    </Pressable>
  )
}

type HoldingSharingProps = {
  setTabViewHeight: React.Dispatch<React.SetStateAction<number>>
}

export const HoldingSharing = ({setTabViewHeight}: HoldingSharingProps) => {
  const onLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout
    setTabViewHeight(height + 100)
  }
  return (
    <View style={styles.container} onLayout={onLayout}>
      {/* {images.map((image, index) => (
        <HoldingSharingItem uri={image} key={image + String(index)} />
      ))} */}
      <FlatList data={images} renderItem={({item}) => <HoldingSharingItem uri={item} />} numColumns={2} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: 570,
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
