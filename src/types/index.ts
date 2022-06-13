export type IHashtag = {
  id: string
  content: string
}

export type ISharingType = 'offline' | 'online' | ''

export type IProductInfo = {
  name: string
  quantity: number
  id: string
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
}
