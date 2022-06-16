import moment from 'moment'
import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {black, white} from '../theme'

type ItemType = {
  name: string
  quantity: number
  startDate: Date
  endDate: Date
  place: string
}

const items: ItemType[] = [
  {name: '제품 1', quantity: 30, startDate: new Date('2022-05-29T14:00:00'), endDate: new Date('2022-05-29T16:00:00'), place: '고척돔 1층 로비'},
  {name: '제품 2', quantity: 30, startDate: new Date('2022-05-30T14:00:00'), endDate: new Date('2022-05-30T16:00:00'), place: '고척돔 1층 로비'},
  {name: '제품 3', quantity: 30, startDate: new Date('2022-05-31T14:00:00'), endDate: new Date('2022-05-31T16:00:00'), place: '고척돔 1층 로비'},
]

// 제품 이름, 개수 렌더링
const RenderItem = ({item}: {item: ItemType}) => {
  return (
    <View style={[styles.itemContainer]}>
      <Text style={[styles.itemText]}>•</Text>
      <Text style={[styles.itemText]}>{item.name}</Text>
      <Text style={[styles.itemText]}>|</Text>
      <Text style={[styles.itemText]}>{item.quantity}개</Text>
    </View>
  )
}

// 나눔 장소, 시간 렌더링
const RenderSchedule = ({item}: {item: ItemType}) => {
  const startDate = moment(item.startDate, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm')
  var endDate = moment(item.endDate, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm')

  // 시작 날짜와 끝 날짜가 같은 경우에는 시간만 나오도록
  if (startDate.slice(0, 10) == endDate.slice(0, 10)) {
    endDate = endDate.slice(11, 16)
  }
  return (
    <View style={[styles.itemContainer, {justifyContent: 'space-between'}]}>
      <Text style={[styles.itemText]}>
        {startDate} ~ {endDate}
      </Text>
      <Text style={[styles.itemText]}>{item.place}</Text>
    </View>
  )
}

const GoodsDetailDescription = () => {
  return (
    <View style={[styles.container]}>
      {items.map(item => (
        <RenderItem item={item} key={item.name} />
      ))}
      <View style={{marginVertical: 10}}></View>
      {items.map(item => (
        <RenderSchedule item={item} key={item.startDate + item.place} />
      ))}
      <Text style={[styles.descriptionText]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur dolor velit id pretium risus porttitor purus pellentesque volutpat. Sit{' '}
      </Text>
    </View>
  )
}
export default GoodsDetailDescription

const styles = StyleSheet.create({
  descriptionText: {
    color: black,
    marginVertical: 10,
  },
  itemText: {
    color: black,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  container: {
    width: '100%',
    backgroundColor: white,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
})
