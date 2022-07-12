import {StyleSheet} from 'react-native'
import {black, gray50, gray500, gray800, gray300, white, main} from './colors'

export const PADDING_SIZE = 20
export const INPUT_HEIGHT = 48
export const ICON_SIZE = 24
export const CAROUSEL_HEIGHT = 340

export const styles = StyleSheet.create({
  label: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: gray800,
    marginBottom: 10,
  },
  wrapper: {
    marginHorizontal: PADDING_SIZE,
  },
  input: {
    borderColor: gray300,
    borderWidth: 1,
    borderRadius: 4,
    height: INPUT_HEIGHT,
    paddingHorizontal: 16,
    color: gray800,
    //paddingHorizontal : 16,
    paddingVertical: 12,
  },
  safeareaview: {
    backgroundColor: white,
    flex: 1,
  },
  button: {
    backgroundColor: main,
    borderRadius: 24,
  },
  disabledButton: {
    backgroundColor: gray300,
    borderRadius: 24,
  },
  bold16: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  bold20: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    lineHeight: 30,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowFlexStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  plusMinusButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: gray50,
  },
  text12: {
    lineHeight: 16,
  },
  text14: {
    lineHeight: 20,
  },
  text16: {
    lineHeight: 24,
  },
})
