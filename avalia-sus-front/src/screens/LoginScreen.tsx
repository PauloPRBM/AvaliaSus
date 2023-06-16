import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, InputText, Logo, Modal, Screen } from '../components'
import { FieldValidation, validateCPF } from '../validations'
import { Login, User } from '../interfaces'
import { useForm, usePostRequest, useUser } from '../hooks'
import { useNavigation } from '@react-navigation/native'

const { string } = FieldValidation

const SING_UP_VALIDATION_SCHEMA = FieldValidation.object({
  cpf: string().label('CPF').required("CPF é obrigatorio").test('cpf', 'CPF inválido', validateCPF),
  password: string().min(6).required("A senha deve ter no minimo 6 digitos").label('Senha'),
})

const INITIAL_VALUES = {
  cpf: '',
  password: "",
}

export const LoginScreen: React.FC = () => {
  const [, { onLogin }] = useUser()
  const [message, setMessage] = useState<string>()
  const [showModal, setShowModal] = useState(false)

  const navigation = useNavigation<any>()

  const request = usePostRequest<Login, User>("/auth/login", {
    onSuccess: (data) => {
      onLogin(data)
      navigation.replace("HospitalNavigator")
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

  const onSubmit = (props: Login) => {
    request(props)
  }

  const { handleSubmit, getFieldProps } = useForm<Login>({
    onSubmit,
    validationSchema: SING_UP_VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  })

  const cpfProps = getFieldProps("cpf")
  const passwordProps = getFieldProps("password")

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>


      <View style={styles.bodyContainer}>
        <View style={styles.formContainer}>
          <InputText
            placeholder='CPF'
            {...cpfProps}
            keyboardType='numeric'
          />

          <InputText
            placeholder='Senha'
            secureTextEntry
            {...passwordProps}
          />
        </View>

        <Button
          onPress={handleSubmit}
        >
          Logar
        </Button>
      </View>
      <Modal
        message={message}
        visible={showModal}
        onCloseModal={onCloseModal}
      />
    </Screen>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  logoContainer: {
    justifyContent: "center",
    height: "40%"
  },
  bodyContainer: {
    justifyContent: "space-between",
    height: "50%",
  },
  formContainer: {
    gap: 15,
    paddingBottom: 15,
  }
})