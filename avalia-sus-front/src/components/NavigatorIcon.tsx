import React, { useState } from 'react'
import { Icon } from './Icon'
import { useDeleteRequest, useUser } from '../hooks'
import { Modal } from './Modal'


export const NavigatorIcon: React.FC = () => {
  const [, { onLogout }] = useUser()
  const [message, setMessage] = useState<string>()
  const [showModal, setShowModal] = useState(false)

  const request = useDeleteRequest("/auth/logout", {
    onSuccess: () => onLogout(),
    onError: ({ response }) => {
      const { data: { message } } = response
      setShowModal(true)
      console.log(message)
      setMessage(message)
    }
  })

  const onCloseModal = () => {
    setMessage(undefined)
    setShowModal(false)
  }

  return (
    <>
      <Icon
        name="exit-to-app"
        onPress={request}
        color='#FFF'
      />
      <Modal
        message={message}
        visible={showModal}
        onCloseModal={onCloseModal}
      />
    </>
  )
}