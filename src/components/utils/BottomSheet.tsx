import React, {useEffect, cloneElement, useMemo} from 'react'
import {View, Text, StyleSheet, Modal, Animated, TouchableWithoutFeedback, Dimensions} from 'react-native'
import type {GestureResponderEvent, PanResponderGestureState} from 'react-native'
import {useAnimatedValue, usePanResponder} from '../../hooks'
import {getBottomSpace, isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper'

type BottomSheetProps = {
  children: React.ReactElement
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type Event = GestureResponderEvent
type State = PanResponderGestureState

const iosX = isIphoneX()
const STATUS_BAR_HEIGHT = getStatusBarHeight()

export const BottomSheet = ({children, modalVisible, setModalVisible}: BottomSheetProps) => {
  const screenHeight = useMemo(() => {
    return Dimensions.get('screen').height
  }, [])

  const bottomSpaceHeight = useMemo(() => getBottomSpace(), [])

  const panY = useAnimatedValue(screenHeight)
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
    //extrapolate: 'clamp',
  })

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 350,
    useNativeDriver: true,
  })

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 350,
    useNativeDriver: true,
  })

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false)
    })
  }

  const panResponders = usePanResponder({
    onMoveShouldSetPanResponder: (e: Event, s: State) => false,
    onPanResponderMove: (e: Event, s: State) => {
      panY.setValue(s.dy)
    },
    onPanResponderRelease: (e: Event, s: State) => {
      if (s.dy > 0 && s.vy > 1.5) {
        closeModal()
      }
    },
  })

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start()
    }
  }, [modalVisible])

  return (
    <Modal visible={modalVisible} animationType="fade" transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            paddingBottom: iosX ? bottomSpaceHeight : 10,
            maxHeight: screenHeight - STATUS_BAR_HEIGHT,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.bar} />
          {cloneElement(children, {
            close: closeModal,
          })}
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#020202',
    width: 38,
    height: 5,
    borderRadius: 100,
    marginTop: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    //height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    //paddingBottom: 30,
  },
})
