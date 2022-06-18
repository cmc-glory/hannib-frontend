import React, {useState, useEffect} from 'react'
import {View, Text, Pressable, StyleSheet, Animated} from 'react-native'
import * as theme from '../../theme'

type TopTabBarProps = {
  curTab: number
  setCurTab: React.Dispatch<React.SetStateAction<0 | 1>>
}

export const TopTabBar = ({curTab, setCurTab}: TopTabBarProps) => {
  const [translateValue] = useState(new Animated.Value(0))
  const [toValue, setToValue] = useState(0)

  useEffect(() => {
    Animated.spring(translateValue, {
      toValue,
      damping: 10,
      mass: 1,
      stiffness: 100,
      overshootClamping: true,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
      useNativeDriver: true,
    }).start()
  }, [translateValue, toValue])
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => {
          setCurTab(0)
        }}>
        <Text style={[styles.text, {fontFamily: curTab == 0 ? 'Pretendard-Bold' : undefined}]}>진행한 나눔</Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => {
          setCurTab(1)
        }}>
        <Text style={[styles.text, {fontFamily: curTab == 1 ? 'Pretendard-Bold' : undefined}]}>참여한 나눔</Text>
      </Pressable>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{translateX: translateValue}],
          },
        ]}></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: theme.gray200,
    borderBottomWidth: 2,
    paddingBottom: 11,
    flexDirection: 'row',
  },
  pressable: {
    width: '50%',
  },
  text: {
    fontSize: 16,
    borderColor: theme.gray800,
    textAlign: 'center',
  },
  indicator: {
    width: '50%',
    bottom: 0,
    position: 'absolute',
    height: 2,
    backgroundColor: theme.main,
    zIndex: 100,
  },
})
