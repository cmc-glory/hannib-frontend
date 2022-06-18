import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import IonicIcons from 'react-native-vector-icons/Ionicons'
import * as theme from '../../theme'

type HashtagProps = {
  label: string
  onPressX?: () => void
}

export const HashTag = ({label, onPressX}: HashtagProps) => {
  return (
    <View style={[styles.hashtagContainer]}>
      <Text style={styles.hashtagText}>{label}</Text>
      <IonicIcons name="close-outline" size={14} color={theme.gray500} onPress={onPressX} />
    </View>
  )
}

const styles = StyleSheet.create({
  hashtagText: {
    color: theme.gray500,
    marginRight: 3,
  },
  hashtagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  hashtagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f9',
    borderRadius: 4,
    borderColor: theme.gray300,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 0.5,
  },
})
