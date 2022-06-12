declare module '*.svg' {
  import React from 'react'
  import {SvgProps} from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare namespace ReactNavigation {
  interface RootParamList {
    Login: undefined
    FindId: undefined
    FindPassword: undefined
    CreateAccount: undefined
    MainTabNavigator: undefined
    GoodsDetail: undefined
    WriteGoodsStackNavigator: undefined
    WriteGoodsOnline: undefined
    WriteGoodsOffline: undefined
    GoodsRequest: undefined
    GoodsStackNavigator: undefined
    SplashScreen: undefined
    LoginStackNavigator: undefined
  }
}
