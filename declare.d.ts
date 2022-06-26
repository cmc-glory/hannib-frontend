declare module '*.svg' {
  import React from 'react'
  import {SvgProps} from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '@env' {
  export const API_URL: string
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
    WriteGoodsOnline: {
      images: Asset[]
      categories: string[]
      title: string
      content: string
      hashtags: string[]
      type: ISharingType
      isOpenDateBooked: boolean
      openDate?: Date | undefined
    }
    WriteGoodsOffline: {
      images: Asset[]
      categories: string[]
      title: string
      content: string
      hashtags: string[]
      type: ISharingType
      isOpenDateBooked: boolean
      openDate?: Date | undefined
    }
    GoodsRequestOffline: undefined
    GoodsRequestOnline: undefined
    GoodsStackNavigator?: {
      screen: string
      params: any
    }
    SplashScreen: undefined
    LoginStackNavigator: undefined
    SelectCategory: {
      email: string
      name: string
      profileImage: Asset
    }
    WriteGoodsComplete: {
      id: string // 작성한 게시글의 id. "등록한 게시글로 이동"에서 사용한다.
    }
    NotificationStackNavigator: undefined
    NotificationContent: {
      id: string
    }
    SearchStackNavigator: undefined
    Search: undefined
    SearchContent: undefined
    HoldingSharing: undefined
    HoldingSharingStackNavigator: undefined
    HoldingSharingDetail: undefined
    SendNotice: undefined
    ParticipatingSharingStackNavigator: {
      screen: string
    }
    ParticipatingSharingOnline: undefined
    ParticipatingSharingOffline: undefined
    ReportIssueStackNavigator: undefined
    ReportIssueStep2: {
      issue: string
      reason?: string
      userName: string
    }
    ReportIssueStep3: {
      userName: stirng
    }
    AskAddStar: undefined
    AskAddStarComplete: undefined
    BlockedUsers: undefined
    MyPageStackNavigator: {
      screen: string
    }
    SetProfile: {
      email?: string
    }
    QnAList: {
      id: string
    }
    WriteQnA: {
      postid: string
      userid: string
      imageuri: string
      category: string
      title: string
    }
    WriterProfile: {
      writerid: string
    }
    HoldingSharingList: undefined
    ParticipatingSharingList: undefined
    ParticipatingSharingStackNavigator: undefined
    GoodsList: undefined
  }
}
