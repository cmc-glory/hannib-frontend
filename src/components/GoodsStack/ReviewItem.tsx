import React, {useState, useCallback, useMemo} from 'react'
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native'
import ImageView from 'react-native-image-viewing'
import moment from 'moment'
import FastImage from 'react-native-fast-image'

import type {ImageSource} from 'react-native-image-viewing/dist/@types'

import * as theme from '../../theme'
import {IReview} from '../../types'

type ReviewItemProps = {
  item: IReview
  opened: boolean
  index: number
  onPressReview: (index: number) => void
}
export const ReviewItem = ({item, opened, index, onPressReview}: ReviewItemProps) => {
  const [showImageView, setShowImageView] = useState<boolean>(false) // image view를 띄울지

  const [imageIndex, setImageIndex] = useState<number>(0) // imageView 에서 띄울 이미지의 index
  const {writer, date, product, content, images} = item

  const onPressImage = useCallback((index: number) => {
    setImageIndex(index)
    setShowImageView(true)
  }, [])

  const imageViewAssets = useMemo(() => {
    if (images) {
      return images?.map(url => {
        return {uri: url}
      })
    } else {
      return []
    }
  }, [])

  const BuyedList = useMemo(() => {
    if (product.length == 1) {
      return () => <Text style={[styles.buyedListText, {marginBottom: 6}]}>{product[0].name} 구매</Text>
    } else {
      if (opened) {
        return () => <View></View>
      } else {
        return () => (
          <Text style={[styles.buyedListText, {marginBottom: 6}]}>
            {product[0].name} 외 {product.length - 1}개 구매
          </Text>
        )
      }
    }
  }, [])
  return (
    <>
      {imageViewAssets.length > 0 && (
        <ImageView
          images={imageViewAssets}
          imageIndex={imageIndex}
          visible={showImageView}
          keyExtractor={(imageSrc: ImageSource, index: number) => String(imageSrc) + index.toString() + index.toString()}
          onRequestClose={() => setShowImageView(false)}
          swipeToCloseEnabled
        />
      )}

      <View style={[{paddingVertical: 10}, opened && {backgroundColor: theme.gray50}]}>
        <Pressable onPress={() => onPressReview(index)} style={[theme.styles.wrapper]}>
          <View style={[theme.styles.rowSpaceBetween, {marginVertical: 6}]}>
            <Text style={{fontSize: 12}}>{writer}</Text>
            <Text style={{fontSize: 12, color: theme.gray700}}>{moment(date).format('YYYY.MM.DD')}</Text>
          </View>
          <View style={[theme.styles.rowSpaceBetween]}>
            <View style={{flex: 1, alignSelf: 'flex-start'}}>
              <BuyedList />
              {!opened && (
                <Text numberOfLines={1} style={{flexWrap: 'wrap'}}>
                  {content}
                </Text>
              )}
            </View>
            {!opened && <View>{images && <FastImage source={{uri: images[0]}} style={[styles.imagePreview]} />}</View>}
          </View>
        </Pressable>
        {opened && (
          <Pressable style={[theme.styles.wrapper]} onPress={() => onPressReview(index)}>
            <Text style={{marginBottom: 8}}>{content}</Text>
            {images && (
              <ScrollView horizontal contentContainerStyle={{paddingVertical: 6}} scrollEnabled={images.length >= 3} showsHorizontalScrollIndicator={false}>
                {images.map((image, index) => (
                  <Pressable key={image + index.toString()} onPress={() => onPressImage(index)}>
                    <FastImage source={{uri: image}} style={[styles.reviewImage]}></FastImage>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </Pressable>
        )}
      </View>
      <View style={[styles.reviewSeparator, theme.styles.wrapper]} />
    </>
  )
}

const styles = StyleSheet.create({
  buyedListText: {
    color: theme.gray500,
  },
  reviewImage: {
    width: 116,
    height: 116,
    borderRadius: 4,
    marginRight: 12,
  },
  imagePreview: {
    width: 46,
    height: 46,
    borderRadius: 4,
  },
  reviewSeparator: {
    height: 1,
    backgroundColor: theme.gray200,
  },
})
