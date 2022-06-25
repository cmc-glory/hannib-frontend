import React from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'
import {IStar} from '../../types'
import {CheckboxMainIcon} from './Icon'

const Check = () => {
  return (
    <View style={[styles.checkView]}>
      <CheckboxMainIcon />
    </View>
  )
}

export const CategoryItem = ({
  category,
  onPress,
  selectedStars,
  imageSize,
  imageBorder,
  circleSize,
  circleBorder,
  index,
}: {
  category: IStar
  onPress: (category: IStar) => void
  selectedStars: IStar[]
  imageSize: number
  imageBorder: number
  circleSize: number
  circleBorder: number
  index: number
}) => {
  const {name, uri, id} = category
  const selected: boolean = selectedStars.map(item => item.id).includes(id)

  return (
    <Pressable style={[styles.container, index % 3 != 2 && {marginRight: 16}]} onPress={() => onPress(category)}>
      {selected && <Check />}
      <View style={[styles.selectedCircle, {width: circleSize, height: circleSize, borderRadius: circleBorder}, selected && {backgroundColor: theme.main}]}>
        <FastImage style={[styles.image, {width: imageSize, height: imageSize, borderRadius: imageBorder}]} source={{uri: uri}}></FastImage>
      </View>

      <Text style={[styles.artistname]}>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  selectedCircle: {
    //borderRadius: 53,
    //width: 106,
    //height: 106,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  checkImage: {
    width: 8,
    height: 8,
  },
  checkView: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.main,
    position: 'absolute',
    right: 4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,
  },
  image: {
    //width: 100,
    //height: 100,
    //borderRadius: 50,
    overflow: 'hidden',
    zIndex: 5,
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
  },
  artistname: {
    marginTop: 10,
    color: theme.gray700,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: theme.main,
    width: 100,
    height: 100,
  },
})
