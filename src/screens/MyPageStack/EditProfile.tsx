import React from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import {launchImageLibrary} from 'react-native-image-picker'
import {CameraWhiteIcon, XIcon} from '../../components/utils'
import * as theme from '../../theme'

export const EditProfile = () => {
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <View style={[theme.styles.rowSpaceBetween, styles.headerContainer]}>
        <XIcon />
        <Text style={[theme.styles.bold20]}>프로필 수정</Text>
        <Pressable>
          <Text style={[theme.styles.bold16, {color: theme.gray300}]}>완료</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={{paddingVertical: 32, alignItems: 'center'}}>
          <View style={styles.imageOverlay} />
          <FastImage source={{uri: 'http://localhost:8081/src/assets/images/leedohyeon.png'}} style={styles.image} />
          <Pressable style={styles.cameraContainer}>
            <CameraWhiteIcon />
          </Pressable>
        </View>

        <Text>EditProfile</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(20,20,21, 0.16)',
    top: 32,
    zIndex: 1,
  },
  cameraContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.gray300,
    position: 'absolute',
    top: 68,
    zIndex: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.PADDING_SIZE,
  },
  headerContainer: {
    height: 56,
    paddingHorizontal: theme.PADDING_SIZE,
  },
  image: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 1,
    borderColor: theme.gray200,
  },
})
