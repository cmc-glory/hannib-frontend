import React from 'react'
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native'
import * as theme from '../../theme'

const {width, height} = Dimensions.get('window')

type LoadingScreenProps = {
  isLoading: boolean
}

export const LoadingScreen = ({isLoading}: LoadingScreenProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={isLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'transparent',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
