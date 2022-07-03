import React, {useState, useRef, useCallback} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import uuid from 'react-native-uuid' // uuid
import {PlusIcon, MinusIcon, NeccesaryField} from '../utils'
import {INanumGoodsInfo} from '../../types'
import * as theme from '../../theme'

const STOCK_WIDTH = Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 8 * 2 - 200 - 48

type NanumGoodsInfoProps = {
  nanumGoodsInfos: INanumGoodsInfo[]
  setNanumGoodsInfos: React.Dispatch<React.SetStateAction<INanumGoodsInfo[]>>
}

type NanumGoodsInfoItemProps = {
  onPress: (id: string) => void
  nanumGoodsInfo: INanumGoodsInfo
  key: string
}

const NanumGoodsInfoItem = ({nanumGoodsInfo, onPress}: NanumGoodsInfoItemProps) => {
  const {id, goodsName, goodsNumber} = nanumGoodsInfo
  return (
    <View style={styles.nanumGoodsInfoItemWrapper}>
      <View style={[theme.styles.input, styles.itemView, {width: 200}]}>
        <Text>{goodsName}</Text>
      </View>
      <View style={[theme.styles.input, styles.itemView, {width: STOCK_WIDTH}]}>
        <Text>{goodsNumber}</Text>
      </View>
      <TouchableOpacity onPress={() => onPress(id)} style={[styles.button]}>
        <MinusIcon onPress={() => onPress(id)} />
      </TouchableOpacity>
    </View>
  )
}

export const NanumGoodsInfo = ({nanumGoodsInfos, setNanumGoodsInfos}: NanumGoodsInfoProps) => {
  // ******************** states ********************
  const [goodsName, setGoodsName] = useState('')
  const [goodsNumber, setGoodsNumber] = useState<string>('')

  // ******************** refs ********************
  const ref_input: Array<React.RefObject<TextInput>> = []
  ref_input[0] = useRef(null)
  ref_input[1] = useRef(null)

  const onFocusNext = useCallback((index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      console.log('reached')
      ref_input[index + 1].current?.focus()
    }
    if (ref_input[index + 1] && index == ref_input.length - 1) {
      ref_input[index].current?.blur()
    }
  }, [])

  // ******************** callbacks ********************
  const onPressAdd = () => {
    console.log('on press add reached')
    // 이름이나 수량 중 하나만 값이 없어도 추가하지 않음
    if (goodsName == '' || goodsNumber == '') return
    // 인당 수량 제한 여부가 체크돼 있고, 그 값이 없어도 추가하지 않음

    const item: INanumGoodsInfo = {
      id: String(uuid.v1()),
      goodsName,
      goodsNumber: parseInt(goodsNumber),
    }

    setGoodsName('')
    setGoodsNumber('')
    // 인당 수량 제한 여부가 체크 돼 있으면

    setNanumGoodsInfos(nanumGoodsInfos => nanumGoodsInfos.concat(item))
  }
  const onPressRemove = useCallback((id: string) => {
    setNanumGoodsInfos(nanumGoodsInfos => nanumGoodsInfos.filter(item => item.id !== id))
  }, [])
  return (
    <View>
      <View style={[styles.header]}>
        <View style={[theme.styles.rowFlexStart]}>
          <Text style={[theme.styles.label]}>상품 정보</Text>
          <NeccesaryField />
        </View>
      </View>
      <View style={[styles.nanumGoodsInfoItemWrapper]}>
        <TextInput
          ref={ref_input[0]}
          style={[theme.styles.input, styles.input, {width: 200}]}
          placeholder="상품명"
          onSubmitEditing={() => onFocusNext(0)}
          placeholderTextColor={theme.gray200}
          value={goodsName}
          onChangeText={setGoodsName}
        />
        <TextInput
          ref={ref_input[1]}
          style={[theme.styles.input, styles.input, {width: STOCK_WIDTH}]}
          placeholder="재고"
          placeholderTextColor={theme.gray200}
          keyboardType="numeric"
          onEndEditing={() => {
            if (/^\d+$/.test(goodsNumber) == false) {
              setGoodsNumber('')
              return
            }
            onPressAdd()
          }}
          value={goodsNumber}
          onChangeText={setGoodsNumber}
        />

        <TouchableOpacity style={[styles.button]} onPress={onPressAdd}>
          <PlusIcon onPress={onPressAdd} />
        </TouchableOpacity>
      </View>
      <View>
        {nanumGoodsInfos.map(nanumGoodsInfo => (
          <NanumGoodsInfoItem key={nanumGoodsInfo.id} nanumGoodsInfo={nanumGoodsInfo} onPress={onPressRemove}></NanumGoodsInfoItem>
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
  nanumGoodsInfoItemWrapper: {
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
