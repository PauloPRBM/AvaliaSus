import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Comment } from '../interfaces'
import GrayUserIllustration from "../../assets/svgs/GrayUser.svg"
import { Rating } from './Rating'
import { Text } from './Text'
import { Icon } from './Icon'
import { useDeleteRequest, useUser } from '../hooks'
import { Modal } from './Modal'
import { useNavigation } from '@react-navigation/native'

interface CommentItemProps {
  comment: Comment
  refetch: () => void
}

const SIZE = 40
const ICON_SIZE = 24

export const CommentItem: React.FC<CommentItemProps> = ({ comment, refetch }) => {
  const [message, setMessage] = useState<string>()
  const [showModal, setShowModal] = useState(false)
  const [{ user }] = useUser()

  const navigation = useNavigation<any>()


  const onDelete = useDeleteRequest(`/evaluate/${comment.id}`, {
    onSuccess: () => {
      refetch()
    },
    onError: ({ response }) => {
      const { data: { message } } = response
      setShowModal(true)
      setMessage(message)
    }
  })

  const onCloseModal = () => {
    setMessage(undefined)
    setShowModal(false)
  }

  const goToEvaluateScreen = () => {
    navigation.navigate("UpdateEvaluateScreen", {
      id: comment.id,
      rate: comment.rate,
      comment: comment.message
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <GrayUserIllustration
          width={SIZE}
          height={SIZE}
        />
      </View>

      <View style={styles.textContainer}>
        <Rating imageSize={12} rating={comment.rate} />
        <Text>
          {comment.userName}
        </Text>
        <Text>
          {comment.message}
        </Text>
      </View>
      {comment.userId === user.id && (
        <View style={styles.iconsContainer}>
          <Icon
            name="edit"
            onPress={goToEvaluateScreen}
            size={ICON_SIZE}
          />

          <Icon
            name="delete"
            onPress={onDelete}
            size={ICON_SIZE}
          />
        </View>
      )}
      <Modal
        message={message}
        visible={showModal}
        onCloseModal={onCloseModal}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  iconContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    // backgroundColor: "#F11",
    borderLeftWidth: 1,
    width: "75%",
    padding: 5,
    gap: 5,
  },
  iconsContainer: {
    // backgroundColor: "#3c3"
  }
})