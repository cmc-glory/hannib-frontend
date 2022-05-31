import React from 'react'
import styled from 'styled-components/native'
import {ImageStyle, View, Image} from 'react-native'

interface IPage {
  item: {source: any}
  style: ImageStyle
}

const PageItem = styled.Image``

const PageNum = styled.Text``

export default function Page({item, style}: IPage) {
  return <Image source={item.source} style={style}></Image>
  //return <View />
}
