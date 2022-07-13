import {showMessage} from 'react-native-flash-message'

export const useShowMessage = (msg: string) => {
  return showMessage({
    // 에러 안내 메세지
    message: msg,
    type: 'info',
    animationDuration: 300,
    duration: 1350,
    style: {
      backgroundColor: 'rgba(36, 36, 36, 0.9)',
    },
    titleStyle: {
      fontFamily: 'Pretendard-Medium',
    },
    floating: true,
  })
}
