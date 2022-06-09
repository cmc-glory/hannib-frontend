export type IListItem = {
  item: {imageUri?: string | null; type: string; description: string; writer: string; openDate: Date}
}
export type IHashtag = {
  id: string
  content: string
}

export type ISharingType = 'offline' | 'online' | ''
