import {faker} from '@faker-js/faker'

export const randomDate = (): Date => faker.date.recent()
//export const randomImage = (): string => faker.image.cats()
export const randomImage = (): string => 'https://source.unsplash.com/400x400/?cat'
export const randomSentence = (): string => faker.lorem.sentence()
export const randomName = (): string => faker.name.firstName()

export const createListItem = () => {
  return {imageUri: null, type: '오프라인', description: randomSentence(), writer: randomName(), openDate: randomDate()}
}
