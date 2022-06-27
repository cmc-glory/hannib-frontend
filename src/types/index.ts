import type {Asset} from 'react-native-image-picker'

export type IHashtag = {
  id: string
  content: string
}

export type ISharingType = 'offline' | 'online'

export type IProductInfo = {
  name: string
  quantity: number
  id: string // 해당 상품의 id
  productLimit?: number
}

export type IRequestForm = {
  recieveDate: string
  name: string
  twitterid: string
  address: {postcode: string; roadAddress: string; detailedAddress: string}
  phonenumber: string
}

export type IStar = {
  id: string
  maincategory: 'singer' | 'actor'
  name: 'string'
  uri: string
  selected: boolean
}

export type ISharingInfo = {
  id: string
  uri: string | null
  type: ISharingType
  title: string
  writer: string
  openDate: Date
  isSecret: boolean
  secretKey?: string
  isFavorite: boolean
}

export type ISharingDetail = {
  id: string
  images: string[] | undefined
  type: ISharingType
  title: string
  writerName: string
  writerid: string
  writerProfileImageUri: string
  date: Date | undefined
  isSecret: boolean
  isFavorite: boolean
  favoriteNum: number
  products: IProductInfo[]
  schedule?: {
    time: Date | undefined
    location: string
  }[]
  description: string
  qnaNum: number
}

export type IAdditionalQuestion = {
  id: string
  necessary: boolean
  content: string
}

export type IReceiveInfo = {
  id: string
  receiveDate: Date | undefined
  receivePlace: string
}

export type ISharingForm = {
  images: Asset[]
  categories: string[]
  title: string
  content: string
  //hashtags: string[]
  type: ISharingType
  isOpenDateBooked: boolean
  openDate?: Date | undefined
  products: IProductInfo[]
  isSecretForm: boolean
  secretKey?: string
  additionalQuestions: IAdditionalQuestion[]
  receiveInfo?: IReceiveInfo[]
}

export type IQnAList = {
  id: string
  isSecret: boolean
  isAnswered: boolean
  writer: string
  content: string
  date: undefined | Date
  answer?: string
  answeredDate?: undefined | Date
}

export type IReview = {
  id: string
  writer: string
  date: Date | undefined
  product: IProductInfo[]
  content: string
  images?: string[]
}
export type IUserCategory = {
  id: string
  name: string
}

export type INotificationType =
  | '나눔 취소'
  | '나눔 신청 취소'
  | '공지사항 등록'
  | '운송장 등록'
  | '문의글 등록'
  | '문의글 답변'
  | '게시글 수정'
  | '신고하기로 인한 삭제'
  | '미수령 알림'

export type INotification = {
  id: string // 해당 알림의 id
  writer: string // 알림을 보낸 사람
  date: Date | undefined // 알림 작성 날짜
  type: INotificationType // 알림 타입
  isRead: boolean // 읽었는지
  relatedid: string // 관련 게시글 id
  relatedSharingid: string // 관련 상품 id
  relatedSharingTitle: string
  cancelReason?: string
}

export type ISearch = {
  recentSearch: string[]
  famousSearch: string[]
}
