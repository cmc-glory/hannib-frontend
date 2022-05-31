import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ListDetailNotice = () => {
  return (
    <View style={[styles.container]}>
      <Text>공지사항</Text>
    </View>
  )
}
export default ListDetailNotice

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
})
