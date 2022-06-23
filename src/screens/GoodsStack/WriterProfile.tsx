import React, {useEffect, useMemo, useState, useCallback} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import ImageView from 'react-native-image-viewing'
import uuid from 'react-native-uuid'
import type {ImageSource} from 'react-native-image-viewing/dist/@types'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {WriterProfileRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, MenuIcon, Tag} from '../../components/utils'
import {IReview} from '../../types'

import * as theme from '../../theme'

/*
 'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
*/

const Separator = () => {
  return <View style={styles.separator} />
}

type HoldingProjectItemProps = {
  uri: string
  tagLabel: string
  title: string
}

type ReviewItemProps = {
  item: IReview
  opened: boolean
  index: number
  onPressReview: (index: number) => void
}

const HoldingProjectItem = ({uri, tagLabel, title}: HoldingProjectItemProps) => {
  return (
    <View style={{marginRight: 16}}>
      <View style={[styles.tag]}>
        <Tag label={tagLabel}></Tag>
      </View>

      <FastImage source={{uri: uri}} style={[styles.projectPreview]} />
      <Text numberOfLines={2} style={[theme.styles.bold16, styles.projectTitle]}>
        {title}
      </Text>
    </View>
  )
}

const ReviewItem = ({item, opened, index, onPressReview}: ReviewItemProps) => {
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

export const WriterProfile = () => {
  const navigation = useNavigation()
  const route = useRoute<WriterProfileRouteProps>()
  const [reviews, setReviews] = useState<IReview[]>([])
  const [isOpened, setIsOpened] = useState<boolean[]>([]) // index번째의 후기가 열렸는지 판단하는 state

  const onPressReview = useCallback((index: number) => {
    setIsOpened(isOpened => [...isOpened.slice(0, index), !isOpened[index], ...isOpened.slice(index + 1)])
  }, [])

  useEffect(() => {
    // 해당 작가의 진행 프로젝트, 진행 프로젝트에 대한 모든 후기를 불러옴
    // 진행 프로젝트에서 불러올 것 : 프로젝트 id(클릭하면 상세 페이지로 이동할 수 있게), 썸네일 이미지 uri, 모집중, 마감 등의 상태
    // 후기에서 불러올 것 : 작성자, 작성 날짜, 구매 목록, 내용, 이미지
    // qna list 받아오기
    fetch('http://localhost:8081/src/data/dummyReviews.json', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        setIsOpened(new Array(result.length).fill(false))
        setReviews(result)
      })

    // redux에서 사용자 id를 가져오고 writer인지를 체크.
    // setIsOwner(true)
  }, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="작가 프로필" goBack>
        <MenuIcon />
      </StackHeader>
      <ScrollView>
        <View style={[theme.styles.rowFlexStart, styles.writerProfileContainer, theme.styles.wrapper]}>
          <FastImage source={{uri: 'http://localhost:8081/src/assets/images/iu.jpeg'}} style={[styles.profileImage]} />
          <Text style={[theme.styles.bold20, {color: theme.gray700}]}>춤추는 고양이</Text>
        </View>
        <Separator />
        <Text style={[theme.styles.bold16, {marginTop: 24}, theme.styles.wrapper]}>진행 프로젝트</Text>
        <ScrollView horizontal contentContainerStyle={[styles.holdingProjects, theme.styles.wrapper]}>
          <HoldingProjectItem
            title="방탄소년단 기념일 컵홀더 나눔 - 카페 몰리몰리"
            tagLabel="모집중"
            uri="http://localhost:8081/src/assets/images/detail_image_example.png"
          />
          <HoldingProjectItem title="BTS 컨셉의 키링세트" tagLabel="모집중" uri="http://localhost:8081/src/assets/images/detail_image_example2.jpeg" />

          <HoldingProjectItem
            title="BTS 컨셉의 키링세트 BTS 컨셉의 키링세트 BTS 컨셉의 키링세트 BTS 컨셉의 키링세트 BTS 컨셉의 키링세트"
            tagLabel="모집중"
            uri="http://localhost:8081/src/assets/images/detail_image_example.png"
          />
          <HoldingProjectItem title="BTS 컨셉의 키링세트" tagLabel="모집중" uri="http://localhost:8081/src/assets/images/detail_image_example2.jpeg" />

          <HoldingProjectItem title="BTS 컨셉의 키링세트" tagLabel="모집중" uri="http://localhost:8081/src/assets/images/detail_image_example.png" />
        </ScrollView>
        <Separator />
        {/* 후기 */}
        <View>
          <View style={[theme.styles.rowSpaceBetween, theme.styles.wrapper, {paddingVertical: 20}]}>
            <Text style={[theme.styles.bold16]}>후기</Text>
            <Text style={{fontSize: 12, color: theme.gray700}}>전체후기 {reviews.length}개</Text>
          </View>
          {reviews.map((review, index) => (
            <ReviewItem item={review} index={index} opened={isOpened[index]} onPressReview={onPressReview} key={review.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  buyedListText: {
    color: theme.gray500,
  },
  separator: {
    height: 8,
    backgroundColor: theme.gray50,
  },
  projectTitle: {
    width: 144,
    //height: 38,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  tag: {
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 1,
  },
  projectPreview: {
    width: 144,
    height: 144,
    borderRadius: 8,
  },
  holdingProjects: {
    paddingVertical: 24,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 20,
  },
  writerProfileContainer: {
    paddingVertical: 24,
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
