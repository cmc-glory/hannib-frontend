import React from 'react'
import styled from 'styled-components/native'
import {ImageStyle, View, Image} from 'react-native'
import FastImage from 'react-native-fast-image'

interface IPage {
  item: {source: any}
  style: any
}

const PageItem = styled.Image``

const PageNum = styled.Text``

export default function Page({item, style}: IPage) {
  return <FastImage source={item.source} style={style}></FastImage>
  //return <View />
}
