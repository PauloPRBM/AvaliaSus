import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { HospitalItem, Modal, Screen, Touchable } from '../components'
import { useGetRequest } from '../hooks'
import { Hospital } from '../interfaces'


export const HomeScreen: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [message, setMessage] = useState<string>()
  const [showModal, setShowModal] = useState(false)

  const navigation = useNavigation<any>()


  const request = useGetRequest<Hospital[]>("/hospital", {
    onSuccess: (data) => {
      setHospitals(data)
    },
    onError: ({ response }) => {
      const { data: { message } } = response
      setShowModal(true)
      setMessage(message)
    }
  })

  useEffect(() => {
    request()
  }, [])

  const onCloseModal = () => {
    setMessage(undefined)
    setShowModal(false)
  }

  const renderItem = (item: Hospital) => {
    const onPress = () => {
      navigation.navigate("HospitalDetailsScreen", { id: item.id })
    }

    return (
      <Touchable onPress={onPress} style={styles.itemContainer} key={item.id}>
        <HospitalItem hospital={item} />
      </Touchable>
    )
  }

  return (
    <Screen>
      <ScrollView>
        {hospitals.map(renderItem)}
      </ScrollView>
      <Modal
        message={message}
        visible={showModal}
        onCloseModal={onCloseModal}
      />
    </Screen>
  )
}


const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
  }
})