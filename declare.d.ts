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
    NanumDetailThroughWriterProfile: {
      nanumIdx: number
    }
    GoodsRequestError: undefined
    NanumList: undefined
    Login: undefined
    FindId: undefined
    FindPassword: undefined
    CreateAccount: undefined
    MainTabNavigator:
      | undefined
      | {
          screen: string
        }
    NanumDetail: {
      nanumIdx: number
    }
    WriteNanumFormStackNavigator: undefined
    WriteNanumFormOnline: {
      images: string[]
      category: {
        category: string
        job: '가수' | '배우'
        categoryIdx: number
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
        categoryIdx: number
      }
      title: string
      contents: string
      nanumMethod: INanumMethod
      firstDate: Date
    }
    GoodsRequestOffline: {
      nanumIdx: number
    }
    GoodsRequestOnline: {
      nanumIdx: number
    }
    GoodsRequestComplete: {
      screen: string
    }
    GoodsStackNavigator?:
      | {
          screen: string
          params: any
        }
      | {
          screen: string
        }
      | undefined
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
    SearchDetail: {
      keyword: string
    }
    HoldingSharing: undefined
    HoldingSharingStackNavigator?: {
      screen: string
      params?: any
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
    SendNotice: {
      nanumIdx: number
      accountIdxList: number[]
    }
    ParticipatingSharingStackNavigator:
      | undefined
      | {
          screen: string
          params?: any
        }
    ParticipatingSharingOnline: {
      nanumIdx: number
    }

    ParticipatingSharingOffline: {
      nanumIdx: number
    }
    ReportIssueStackNavigator?: {
      screen: string
      params: any
    }
    ReportIssueStep1: {
      nanumIdx: number
    }
    ReportIssueStep2: undefined
    AskAddStar: undefined
    AskAddStarComplete: undefined
    BlockedUsers: undefined
    MyPageStackNavigator:
      | {
          screen: string
        }
      | undefined
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
      writerAccountIdx: number
      nanumIdx: number
    }
    HoldingSharingList: undefined
    ParticipatingSharingList: undefined
    ParticipatingSharingStackNavigator: undefined
    GoodsList: undefined
    NoticeList: {
      nanumIdx: number
      writerAccountIdx: number
    }
    CustomerService: undefined
    EditCategory: undefined // 나눔 리스트 헤더에서 클릭했을 때
    EditCategoryMyPage: undefined // 마이 페이지에서 이동할 때
    SetCategoryNanumForm: undefined
    MyPageTabStackNavigator:
      | undefined
      | {
          screen: string
        }
    EditCategoryStackNavigator: undefined
    EditCategoryAskAddStar: undefined
    EditCategoryAskAddStarComplete: undefined
    WriteReview: {
      nanumIdx: number
      accountIdx: number
      imageuri: string
      category: string
      title: string
    }
  }
}
