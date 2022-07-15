import React, {useCallback} from 'react'
import {View, ScrollView, Text, StyleSheet, Linking} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader, FloatingBottomButton} from '../../components/utils'
import * as theme from '../../theme'

export const CustomerService = () => {
  // ******************** callbacks ********************
  const onPressButton = useCallback(() => {
    Linking.openURL('mailto:hannip.manager@gmail.com')
  }, [])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="문의하기" goBack />
      <ScrollView style={[styles.container]}>
        <View style={[styles.emailContainer]}>
          <Text style={{fontSize: 16}}>문의 이메일 : hannip.manager@gmail.com</Text>
        </View>
        <View style={[{marginTop: 24}]}>
          <View style={styles.spacing}>
            <Text style={[theme.styles.bold16, {marginBottom: 16}]}>카테고리 문의 팁!</Text>
            <Text style={theme.styles.text14}>카테고리에 있는 나의 최애 사진을 업데이트해 주세요!</Text>
            <Text style={theme.styles.text14}>64*64 사이즈의 정사각형 이미지로 최신이미지를 전달해주시면, 월 1회에 한해 이미지를 변경해드립니다.</Text>
            <Text>
              <Text style={[theme.styles.text14, {fontFamily: 'Pretendard-Bold'}]}>[ 카테고리문의 ] 카테고리명 </Text>
              으로 메일 제목을 작성해주시면 더욱 빠르게 처리가 가능합니다!
            </Text>
            <Text style={[theme.styles.text14, {color: theme.main, marginTop: 8}]}>* 공식 이미지로만 가능합니다.</Text>
          </View>
        </View>
        <View style={styles.spacing}>
          <Text style={[theme.styles.bold16, {marginBottom: 16}]}>홍보 배너 문의 팁!</Text>
          <Text style={[theme.styles.text14]}>최애 관련 팬들만의 이벤트를 무료로 홍보해보세요.</Text>
          <Text style={[theme.styles.text14]}>카테고리명 / 375*84 사이즈 배너 / 홍보 페이지 링크 를 전달해주시면, 2주간 이벤트 배너를 띄워드립니다.</Text>
          <Text style={[theme.styles.text14]}>
            <Text style={[theme.styles.text14, {fontFamily: 'Pretendard-Bold'}]}>[ 홍보배너 문의 ] 카테고리명 </Text>
            으로 메일 제목을 작성해주시면 더욱 빠르게 처리가 가능합니다!
          </Text>
          <Text style={[theme.styles.text14, {color: theme.main, marginTop: 8}]}>* 상업적 홍보는 별도로 문의 부탁드립니다.</Text>
        </View>
        <View style={styles.spacing}>
          <Text style={[theme.styles.bold16, {marginBottom: 16}]}>일반 문의</Text>
          <Text style={[theme.styles.text14]}>한입을 사용하시면서 불편한 점이나 아쉬운 점이 있으시다면 언제든 문의해주세요! 피드백은 언제나 환영합니다. </Text>
        </View>
      </ScrollView>
      <FloatingBottomButton enabled label="문의하기" onPress={onPressButton} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 24,
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
    flex: 1,
  },
  emailContainer: {
    backgroundColor: theme.gray50,
    height: 46,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
