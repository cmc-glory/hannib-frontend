import React from 'react'
import {View, Text, Platform, StyleSheet} from 'react-native'
import BookmarkIcon from '../assets/icons/bookmark_outlined.svg'
import {black, white, Button} from '../theme'

const ICON_SIZE = 20

type ListDetailFooterProps = {
  onPressRequest: () => void
}

const ListDetailFooter = ({onPressRequest}: ListDetailFooterProps) => {
  return (
    <View style={styles.container}>
      <Button style={styles.bookmarkButton}>
        <BookmarkIcon width={ICON_SIZE} height={ICON_SIZE} fill="#000" />
        <Text style={{color: black, marginLeft: 10}}>1234</Text>
      </Button>
      <Button style={styles.registerButton} onPress={onPressRequest}>
        <Text style={{color: white}}>신청하기</Text>
      </Button>
    </View>
  )
}

export default ListDetailFooter

const styles = StyleSheet.create({
  bookmarkButton: {
    flexDirection: 'row',
    borderColor: black,
    alignItems: 'center',
    width: '30%',
    borderWidth: 0.5,
  },
  registerButton: {
    flexDirection: 'row',
    borderColor: black,
    alignItems: 'center',
    width: '68%',
    backgroundColor: 'black',
    borderWidth: 0.5,
  },
  container: {
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    paddingHorizontal: 15,
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 10 : 0,
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
})
