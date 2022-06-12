import React from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'
import {IStar} from '../../types'

const Check = () => {
  return (
    <View style={[styles.checkView]}>
      <FastImage style={styles.checkImage} source={require('../../assets/Icon/Check.png')} />
    </View>
  )
}

export const CategoryItem = ({category, onPress}: {category: IStar; onPress: (category: IStar) => void}) => {
  const {name, uri, selected} = category

  return (
    <Pressable style={[styles.container]} onPress={() => onPress(category)}>
      {selected && <Check />}
      <FastImage style={[styles.image, selected && styles.selectedImage]} source={{uri: uri}}></FastImage>
      <Text style={[styles.artistname]}>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
    zIndex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  },
})
