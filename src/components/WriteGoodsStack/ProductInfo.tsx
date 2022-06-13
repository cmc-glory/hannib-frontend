import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox' // checkbox
import uuid from 'react-native-uuid' // uuid
import Icons from 'react-native-vector-icons/Ionicons'
import {IProductInfo} from '../../types'
import * as theme from '../../theme'

type ProductInfoProps = {
  productInfos: IProductInfo[]
  setProductInfos: React.Dispatch<React.SetStateAction<IProductInfo[]>>
  quantityLimit: boolean
  setQuantityLimit: () => void
}

type ProductInfoItemProps = {
  onPress: (id: string) => void
  quantityLimit: boolean
  productInfo: IProductInfo
  key: string
}

const ProductInfoItem = ({productInfo, onPress, quantityLimit}: ProductInfoItemProps) => {
  const {id, name, quantity} = productInfo
  return (
    <View style={styles.productInfoItemWrapper}>
      <View style={[theme.styles.input, styles.itemView, {flex: 2}]}>
        <Text>{name}</Text>
      </View>
      <View style={[theme.styles.input, styles.itemView, {flex: 1}]}>
        <Text>{quantity}</Text>
      </View>
      {quantityLimit && productInfo.productLimit && <View style={[theme.styles.input, {flex: 1}, styles.itemView]}>{productInfo.productLimit}</View>}
      <Pressable onPress={() => onPress(id)} style={[theme.styles.input, {alignItems: 'center', justifyContent: 'center'}]}>
        <Icons name="remove-outline" color={theme.gray800} size={20} />
      </Pressable>
    </View>
  )
}

export const ProductInfo = ({productInfos, setProductInfos, quantityLimit, setQuantityLimit}: ProductInfoProps) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState<number>()
  const [limit, setLimit] = useState<number>()
  const onPressAdd = () => {
    // 이름이나 수량 중 하나만 값이 없어도 추가하지 않음
    if (name == '' || quantity == 0 || quantity == undefined) return
    // 인당 수량 제한 여부가 체크돼 있고, 그 값이 없어도 추가하지 않음
    else if (quantityLimit && (limit == 0 || limit == undefined)) return

    const item: IProductInfo = {
      id: String(uuid.v1()),
      name: name,
      quantity: quantity,
    }

    setName('')
    setQuantity(undefined)
    // 인당 수량 제한 여부가 체크 돼 있으면
    if (quantityLimit) {
      item.productLimit = limit
      setLimit(undefined)
    }
    setProductInfos(productInfos => productInfos.concat(item))
  }
  const onPressRemove = useCallback((id: string) => {
    setProductInfos(productInfos => productInfos.filter(item => item.id !== id))
  }, [])
  return (
    <View>
      <View style={[styles.header]}>
        <Text>상품 정보</Text>
        {/* <View style={[styles.checkboxWrapper]}>
          <BouncyCheckbox size={20} onPress={setQuantityLimit} iconStyle={{borderRadius: 2, borderColor: theme.gray500}} fillColor={theme.gray800} />
          <Text style={{color: theme.gray500}}>인당 수량 제한 여부</Text>
        </View> */}
      </View>
      <View style={[styles.productInfoItemWrapper]}>
        <TextInput
          style={[theme.styles.input, styles.input, {flex: 2}]}
          placeholder="상품명"
          placeholderTextColor={theme.gray200}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[theme.styles.input, {flex: 1}, styles.input]}
          placeholder="재고"
          placeholderTextColor={theme.gray200}
          keyboardType="numeric"
          value={quantity != undefined ? String(quantity) : undefined}
          onChangeText={text => setQuantity(Number(text))}
        />
        {quantityLimit && (
          <TextInput
            style={[theme.styles.input, {flex: 1}, styles.input]}
            placeholder="인당 수량"
            placeholderTextColor={theme.gray200}
            keyboardType="numeric"
            value={limit != undefined ? String(limit) : undefined}
            onChangeText={text => setLimit(Number(text))}
          />
        )}
        <Pressable style={[theme.styles.input, {alignItems: 'center', justifyContent: 'center'}]} onPress={onPressAdd}>
          <Icons name="add-outline" color={theme.gray800} size={20} />
        </Pressable>
      </View>
      <View>
        {productInfos.map(productInfo => (
          <ProductInfoItem key={productInfo.id} productInfo={productInfo} onPress={onPressRemove} quantityLimit={quantityLimit}></ProductInfoItem>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    marginTop: 8,
  },
  input: {
    marginRight: 10,
  },
  itemView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
})
