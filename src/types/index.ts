import type {Asset} from 'react-native-image-picker'

export type IHashtag = {
  id: string
  content: string
}

export type ICalendar = {
  sharingid: string
  type: 'participating' | 'holding' // 참여, 진행
  title: string
  schedule: ISchedule[]
  products: IProductInfo[]
}

export type IScheduleItem = {sharingid: string; place: string; products: IProductInfo[]; time: Date; title: string; type: 'holding' | 'participating'}

export type ISchedule = {
  time: Date | undefined
  place: string
}

export type ISharingType = 'offline' | 'online'

export type IProductInfo = {
  name: string
  quantity: number
  id: string // 해당 상품의 id
  productLimit?: number
}

export type IRequestFormOffline = {
  product: {productid: string}[]
  receiveDate: string | Date | undefined
}

export type IRequestFormOnline = {
  product: {productid: string}[]
  address: {postcode: string; roadAddress: string; detailedAddress: string}
  phonenumber: {
    first: string
    second: string
    third: string
  }
  name: string
}

export type IStar = {
  id: string
  maincategory: 'singer' | 'actor'
  name: string
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

export type ISharingRequestInfo = {
  products: IProductInfo[]
  schedule?: ISchedule[]
  title: string
  additionalQuestions: IAdditionalQuestion[]
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
  writerId: string
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

// ******************** backend variable names below ********************
export type IInqueryNanumDto = {
  nanumIdx: number
  accountIdx: number
  creatorId: string
  comments: string // 질문
  answerComments: string // 답변
  secretYn: 'Y' | 'N'
}

export type IQuestionNanumDto = {
  nanumIdx: number
  accountIdx: number
  creatorId: string
  comments: string // 질문
  secretYn: 'Y' | 'N'
}

export type IAnswerNanumDto = {
  nanumIdx: number
  answerComments: string // 답변
}

// 나눔 방식
export type INanumMethod = 'O' | 'M'

// 나눔 리스트 띄울 때 타입들
export type INanumListItem = {
  nanumIdx: number // 나눔 id
  thumbnail: string // 썸네일 이미지 uri
  nanumMethod: INanumMethod // 나눔 방식
  title: string // 제목
  creatorId: string // 작성자 닉네임
  firstDate: Date // 나눔 시작일
  secretForm: 'Y' | 'N' // 시크릿폼 여부
  secretPwd?: string // 시크릿폼 비밀번호
  isFavorite: 'Y' | 'N' // 즐겨찾기 여부
}

// 모집폼 작성 시 기본 정보
export type INanumAskDto = {
  nanumIdx: number
  contents: string
  essential: 'Y' | 'N'
}

export type INanumDateDto = {
  nanumIdx: number
  acceptDate: string // example: 2022-07-01 12:43:15
  location: string
}

export type INanumGoodsDto = {
  nanumIdx: number
  goodsName: string
  goodsNumber: number
}
export type INanumImgDto = {
  nanumIdx: number
  imgUrl: string
}

export type INanumForm = {
  nanumAskList: INanumAskDto[]
  nanumDatelist: INanumDateDto[]
  nanumGoodslist: INanumGoodsDto[]
  nanumImglist: INanumImgDto[]
  accountIdx: number
  nanumIdx: number
  creatorId: string
  thumbnail: string
  category: string
  title: string
  contents: string
  nanumMethod: 'M' | 'O' // M : Mail(우편), O : Offline(오프라인)
  firstDate: string // example: 2022-07-01 12:43:15
  secretForm: 'Y' | 'N'
  secretPwd: number
  favorites: number
  accountDto: {
    accountCategoryDtoList: IAccountCategoryDto[]
    accountIdx: number
    creatorId: string
    creatorIdDatetime?: string
    accountImg?: string
    email: string
  }
  job: '가수' | '배우'
}

export type INanum = {
  nanumAskList: INanumAskDto[]
  nanumDateList: INanumDateDto[]
  nanumGoodslist: INanumGoodsDto[]
  nanumImglist: INanumImgDto[]
  nanumIdx: number // 나눔 db id
  accountIdx: number // 작성자 db id
  creatorId: string // 작성자 닉네임
  thmbnail: string // 썸네일 이미지 uri
  category: string // 카테고리
  title: string // 제목
  contents: string // 내용
  nanumMethod: INanumMethod // 나눔 방식
  firstDate: Date // 나눔 시작일
  secretForm: 'Y' | 'N' // 시크릿폼 여부
  secretPwd: number // 시크릿폼 패스워드
  createDatetime: Date // 작성 시간
  deletedYn: boolean // 삭제 여부
  deletedReason: string // 삭제한 이유
  qnaNumber: number // 문의 수
  isFavorite: 'Y' | 'N'
  favorites: number // 즐겨찾기한 사람 수
}

export type INanumGoodsInfo = {
  // 나눔폼 작성할 때 사용 (db id 없는 버전)
  id: string // 프론트에서만 사용
  goodsName: string
  goodsNumber: number
}

export type INanumGoods = {
  goodsIdx: number
  nanumIdx: number
  goodsName: string
  goodsNumber: number
}

export type INanumAskInfo = {
  // 나눔폼 작성할 때 사용 (db id 없는 버전)
  id: string // 프론트에서만 사용
  contents: string
  essential: boolean
}

export type INanumAsk = {
  askIdx: number // 추가사항 id
  nanumIdx: number // 해당 나눔 id
  contents: string
  essential: boolean
}

export type INanumDateInfo = {
  id: string
  acceptDate: Date | undefined
  location: string
}

export type INanumDate = {
  dateIdx: number
  acceptDate: Date | undefined
  location: string
}

export type IAccountCategoryDto = {
  accountIdx: number
  job: '가수' | '배우'
  categoryName: string
}

export type IAccountDto = {
  accountCategoryDtoList: IAccountCategoryDto[]
  accountIdx: number
  creatorId: string // 닉네임
  accountImg: string | null
  email: string
  creatorIdDatetime: string
}

export type ICategoryDto = {
  job: '가수' | '배우'
  nickName: string
  birth: string // format : "1995-03-21 12:43:15"
  imgUrl: string | undefined
  email: string
}
