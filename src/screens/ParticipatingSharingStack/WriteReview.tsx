import React, {useState, useCallback, useEffect, useMemo} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Switch} from 'react-native-paper'
import {StackHeader, SharingPreview, RoundButton} from '../../components/utils'
import {WriteQnARouteProps} from '../../navigation/GoodsStackNavigator'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {ImagePicker} from '../../components/WriteGoodsStack'
import {Asset} from 'react-native-image-picker'

const ProductItem = ({name, quantity, spacing}: {name: string; quantity: number; spacing?: boolean}) => {
  return (
    <View style={[theme.styles.rowSpaceBetween, spacing && {marginBottom: 16}]}>
      <Text style={{fontSize: 16, color: theme.gray700}}>{name}</Text>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={{color: theme.gray500, marginRight: 5}}>주문 수량</Text>
        <Text style={{color: theme.secondary}}>{quantity}</Text>
      </View>
    </View>
  )
}

export const WriteReview = () => {
  const navigation = useNavigation()
  const route = useRoute<WriteQnARouteProps>()
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<Asset[]>([]) // 대표 이미지

  useEffect(() => {
    // 해당 사용자가 주문한 물건 받아오는 api
  }, [])

  const onPressSubmit = useCallback(() => {
    // 백으로 내용이랑 비밀 여부 post 하는 api

    // 백으로 보낸 다음에 전으로 이동
    navigation.goBack()
  }, [content])

  const {postid, userid, imageuri, category, title} = useMemo(() => route.params, [])
  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="후기 작성" goBack />
      <View style={styles.container}>
        <SharingPreview uri={imageuri} category={category} title={title} />
        <View style={{marginVertical: 20}}>
          <ProductItem name="BTS 뷔 컨셉의 하트 키링" quantity={1} spacing />
          <ProductItem name="BTS 지민 컨셉의 스페이드 키링" quantity={1} />
        </View>
        <ImagePicker images={images} setImages={setImages} />
        <View style={{marginBottom: 20}}>
          <Text style={[theme.styles.label]}>내용</Text>
          <TextInput
            autoCorrect={false}
            placeholder="내용 입력"
            placeholderTextColor={theme.gray300}
            textAlignVertical="top"
            multiline
            style={[theme.styles.input, {paddingTop: 16, height: 263}]}
            value={content}
            onChangeText={setContent}
          />
        </View>
        <RoundButton label="작성완료" style={{marginTop: 24}} enabled={content != ''} onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
    flex: 1,
  },
})
