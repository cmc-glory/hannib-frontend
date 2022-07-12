declare module '*.svg' {
  import React from 'react'
  import {SvgProps} from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '@env' {
  export const API_URL: string
  export const BASE_URL: string
}
declare namespace ReactNavigation {
  interface RootParamList {
    Login: undefined
    FindId: undefined
    FindPassword: undefined
    CreateAccount: undefined
    MainTabNavigator: undefined
    NanumDetail: {
      nanumIdx: number
    }
    WriteNanumFormStackNavigator: undefined
    WriteNanumFormOnline: {
      images: string[]
      category: {
        category: string
        job: '가수' | '배우'
      }
      title: string
      contents: string
      nanumMethod: INanumMethod
      firstDate: Date
    }
    WriteNanumFormOffline: {
      images: string[]
      category: {
        category: string
        job: '가수' | '배우'
      }
      title: string
      contents: string
      nanumMethod: INanumMethod
      firstDate: Date
    }
    GoodsRequestOffline: undefined
    GoodsRequestOnline: undefined
    GoodsRequestComplete: undefined
    GoodsStackNavigator?: {
      screen: string
      params: any
    }
    SplashScreen: undefined
    LoginStackNavigator:
      | undefined
      | {
          screen: string
          params: any
        }
      | {
          screen: string
        }
    SelectCategory: {
      email: string
      name: string
      profileImage: string
    }
    WriteNanumFormComplete: {
      nanumIdx: number // 작성한 게시글의 id. "등록한 게시글로 이동"에서 사용한다.
    }
    NotificationStackNavigator:
      | undefined
      | {
          screen: string
          params: any
        }
    NotificationContent: {
      id: string
    }
    SearchStackNavigator: undefined
    Search: undefined
    SearchContent: undefined
    HoldingSharing: undefined
    HoldingSharingStackNavigator:
      | undefined
      | {
          screen: string
        }
    HoldingSharingDetail: undefined
    EditGoodsOnline: {
      images: Asset[]
      categories: string[]
      title: string
      content: string
      type: ISharingType
      isOpenDateBooked: boolean
      openDate?: Date | undefined
    }
    EditGoodsOffline: {
      images: Asset[]
      categories: string[]
      title: string
      content: string
      type: ISharingType
      isOpenDateBooked: boolean
      openDate?: Date | undefined
    }
    SendNotice: undefined
    ParticipatingSharingStackNavigator:
      | undefined
      | {
          screen: string
          params?: any
        }
    ParticipatingSharingOnline: undefined

    ParticipatingSharingOffline: undefined
    ReportIssueStackNavigator?: {
      screen: string
      params: any
    }

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
    QnAListCreator: {
      // 문의글 (나눔글 작성자)
      nanumIdx: number
    }
    QnAListUser: {
      // 문의글 (나눔 신청자)
      nanumIdx: number
    }
    WriteQnA: {
      nanumIdx: number
      accountIdx: number
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
    NoticeList: {
      postid: string
    }
    CustomerService: undefined
    EditCategory: undefined // 나눔 리스트 헤더에서 클릭했을 때
    EditCategoryMyPage: undefined // 마이 페이지에서 이동할 때
    SetCategoryNanumForm: undefined
    MyPageTabStackNavigator: undefined
  }
}
