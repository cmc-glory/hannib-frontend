import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Magnifier, StackHeader} from '../../components/utils'
import {RecentSearch} from '../../components/SearchStack'
import * as theme from '../../theme'

export const Search = () => {
  const [keyword, setKeyword] = useState<string>('')
  return (
    <SafeAreaView>
      <StackHeader title="검색" goBack />
      <View style={[theme.styles.wrapper]}>
        <TextInput
          style={[theme.styles.input, {marginBottom: 20}]}
          placeholder="검색어를 입력해 주세요"
          placeholderTextColor={theme.gray300}
          value={keyword}
          onChangeText={setKeyword}
        />
        {keyword == '' && (
          <View style={styles.maginifier}>
            <Magnifier />
          </View>
        )}
        <RecentSearch />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  maginifier: {
    position: 'absolute',
    right: 14,
    top: 10,
  },
})
