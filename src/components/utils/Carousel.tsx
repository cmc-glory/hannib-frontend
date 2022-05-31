import React, {useMemo, useState} from 'react'
import {Dimensions, View} from 'react-native'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import CarouselPage from './/CarouselPage'

const screenWidth = Dimensions.get('window').width

type CarouselType = {
  images: any
  padding: number
}

const _Carousel = ({images, padding}: CarouselType) => {
  const pageSize = useMemo(() => {
    const width = screenWidth - padding * 2
    return {width: width, height: (width * 3) / 4}
  }, [])

  const [page, setPage] = useState<number>(0)

  return (
    <View style={{marginVertical: 15, height: pageSize.height}}>
      <Carousel
        contentContainerStyle={{height: pageSize.height}}
        removeClippedSubviews={false}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        data={images}
        renderItem={({item}: any) => <CarouselPage style={{width: pageSize.width, marginHorizontal: 0, height: pageSize.height}} item={item} />}
        sliderWidth={360}
        itemWidth={360}
        onSnapToItem={index => setPage(index)}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={page}
        containerStyle={{marginTop: -45, width: '100%', position: 'absolute', bottom: -20}}
        dotContainerStyle={{marginHorizontal: 4}}
        dotStyle={{
          marginHorizontal: 0,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}></Pagination>
    </View>
  )
}

export default _Carousel
