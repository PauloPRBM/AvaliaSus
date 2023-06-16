import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { CommentItem, HospitalHeader, Modal, Screen } from '../components'
import { Comment, HospitalWithComments } from '../interfaces'
import { useGetRequest } from '../hooks'
import { useNavigation, useRoute } from '@react-navigation/native'


const Separator = () => <View style={styles.separator} />

export const HospitalDetailsScreen: React.FC = () => {
  const [hospital, setHospital] = useState<HospitalWithComments>()
  const [message, setMessage] = useState<string>()
  const [showModal, setShowModal] = useState(false)

  const navigation = useNavigation()
  const route = useRoute<any>()

  const { id } = route.params
  const { comments = [] } = hospital ?? {}

  const request = useGetRequest<HospitalWithComments>(`/hospital/${id}`, {
    onSuccess: (data) => {
      setHospital(data)
    },
    onError: ({ response }) => {
      const { data: { message } } = response
      setShowModal(true)
      setMessage(message)
    }
  })

  useEffect(() => navigation.addListener("focus", () => {
    if (id) {
      request()
    }
  }), [navigation, request, id])

  const onCloseModal = () => {
    setMessage(undefined)
    setShowModal(false)
  }

  const renderItem = (item: Comment) => {
    return (
      <View key={item.id} style={styles.itemContainer}>
        <CommentItem comment={item} refetch={request} />
        {<Separator />}
      </View>
    )
  }

  return (
    <Screen style={styles.container}>
      <ScrollView>
        {!!hospital && <HospitalHeader hospital={hospital} />}
        {comments.map(renderItem)}
        <Modal
          message={message}
          visible={showModal}
          onCloseModal={onCloseModal}
        />
      </ScrollView>
    </Screen>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#F11",
    paddingVertical: 10
  },
  itemContainer: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 0.8,
  }
})