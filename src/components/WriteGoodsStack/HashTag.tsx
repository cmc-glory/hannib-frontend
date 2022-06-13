import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import uuid from 'react-native-uuid'
import IonicIcons from 'react-native-vector-icons/Ionicons'
import type {IHashtag} from '../../types'
import * as theme from '../../theme'
import {useAutoFocus} from '../../contexts'

type HashTagProps = {
  hashtags: IHashtag[]
  setHashtags: React.Dispatch<React.SetStateAction<IHashtag[]>>
}

type HashtagItemProps = {
  item: IHashtag
  onPressX: (id: string) => void
}

const HashTagItem = ({item, onPressX}: HashtagItemProps) => {
  const {content, id} = item

  return (
    <View style={[styles.hashtagContainer]}>
      <Text style={[styles.hashtagText]}>#</Text>
      <Text style={styles.hashtagText}>{content}</Text>
      <IonicIcons name="close-outline" size={14} color={theme.gray500} onPress={() => onPressX(id)} />
    </View>
  )
}

export const HashTag = ({hashtags, setHashtags}: HashTagProps) => {
  const focus = useAutoFocus()
  const [content, setContent] = useState<string>('')
  const endEditing = useCallback(() => {
    const tempContent = content

    // do not create hashtag when content is empty
    if (tempContent == '') return
    setContent('')
    setHashtags(hashtags =>
      hashtags.concat({
        id: String(uuid.v1()),
        content: tempContent,
      }),
    )
  }, [content])

  const onPressX = useCallback((id: string) => {
    setHashtags(hashtags => hashtags.filter(hashtag => hashtag.id != id))
  }, [])

  return (
    <View>
      <TextInput
        style={theme.styles.input}
        onChangeText={setContent}
        value={content}
        onFocus={focus}
        onEndEditing={endEditing}
        placeholder="해시태그 입력"
        placeholderTextColor={theme.gray300}
      />
      <View style={[styles.hashtagWrapper]}>
        {hashtags?.map(hashtag => (
          <HashTagItem key={hashtag.id} item={hashtag} onPressX={onPressX} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hashtagText: {
    color: theme.gray500,
    marginRight: 3,
  },
  hashtagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  hashtagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f9',
    borderRadius: 4,
    borderColor: theme.gray300,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 0.5,
  },
})
