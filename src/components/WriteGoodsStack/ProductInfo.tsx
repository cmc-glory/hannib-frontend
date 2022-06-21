import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet, Dimensions, Touchable} from 'react-native'
import uuid from 'react-native-uuid' // uuid
import {PlusIcon, MinusIcon} from '../utils'
import Icons from 'react-native-vector-icons/Ionicons'
import {IProductInfo} from '../../types'
import * as theme from '../../theme'

const STOCK_WIDTH = Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 8 * 2 - 200 - 48

type ProductInfoProps = {
  productInfos: IProductInfo[]
  setProductInfos: React.Dispatch<React.SetStateAction<IProductInfo[]>>
}

type ProductInfoItemProps = {
  onPress: (id: string) => void
  productInfo: IProductInfo
  key: string
}

const ProductInfoItem = ({productInfo, onPress}: ProductInfoItemProps) => {
  const {id, name, quantity} = productInfo
  return (
    <View style={styles.productInfoItemWrapper}>
      <View style={[theme.styles.input, styles.itemView, {width: 200}]}>
        <Text>{name}</Text>
      </View>
      <View style={[theme.styles.input, styles.itemView, {width: STOCK_WIDTH}]}>
        <Text>{quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => onPress(id)} style={[styles.button]}>
        <MinusIcon onPress={() => onPress(id)} />
      </TouchableOpacity>
    </View>
  )
}

export const ProductInfo = ({productInfos, setProductInfos}: ProductInfoProps) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState<number>()
  const [limit, setLimit] = useState<number>()
  const onPressAdd = () => {
    console.log('clicked')
    // 이름이나 수량 중 하나만 값이 없어도 추가하지 않음
    if (name == '' || quantity == 0 || quantity == undefined) return
    // 인당 수량 제한 여부가 체크돼 있고, 그 값이 없어도 추가하지 않음

    const item: IProductInfo = {
      id: String(uuid.v1()),
      name: name,
      quantity: quantity,
    }

    setName('')
    setQuantity(undefined)
    // 인당 수량 제한 여부가 체크 돼 있으면

    setProductInfos(productInfos => productInfos.concat(item))
  }
  const onPressRemove = useCallback((id: string) => {
    setProductInfos(productInfos => productInfos.filter(item => item.id !== id))
  }, [])
  return (
    <View>
      <View style={[styles.header]}>
        <Text style={[theme.styles.label]}>상품 정보</Text>
      </View>
      <View style={[styles.productInfoItemWrapper]}>
        <TextInput
          style={[theme.styles.input, styles.input, {width: 200}]}
          placeholder="상품명"
          placeholderTextColor={theme.gray200}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[theme.styles.input, styles.input, {width: STOCK_WIDTH}]}
          placeholder="재고"
          placeholderTextColor={theme.gray200}
          keyboardType="numeric"
          value={quantity != undefined ? String(quantity) : undefined}
          onChangeText={text => setQuantity(Number(text))}
        />

        <TouchableOpacity style={[styles.button]} onPress={onPressAdd}>
          <PlusIcon onPress={onPressAdd} />
        </TouchableOpacity>
      </View>
      <View>
        {productInfos.map(productInfo => (
          <ProductInfoItem key={productInfo.id} productInfo={productInfo} onPress={onPressRemove}></ProductInfoItem>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: theme.main50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfoItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    marginRight: 8,
  },
  itemView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
})
