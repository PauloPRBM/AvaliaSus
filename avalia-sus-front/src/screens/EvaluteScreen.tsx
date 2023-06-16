import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, EvaluateRating, InputText, Modal, Screen } from '../components'
import GrayHospitalIllustration from "../../assets/svgs/GrayHospital.svg"
import { useForm, usePostRequest, useUser } from '../hooks'
import { FieldValidation } from '../validations'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

interface Evaluate {
  comment: string
}
interface Variables extends Evaluate {
  rate: number
  hospitalId: string
  comment: string
}

const SIZE = 200

const { string } = FieldValidation

const EVALUATE_VALIDATION_SCHEMA = FieldValidation.object({
  comment: string().label('comentario').required("Campo obrigatorio")
})

const INITIAL_VALUES = {
  comment: '',
}

export const EvaluateScreen: React.FC = () => {
  const [{ user }] = useUser()
  const [rate, setRate] = useState(0)
  const [message, setMessage] = useState<string>()
  const [showModal, setShowModal] = useState(false)

  const navigation = useNavigation()
  const route = useRoute<any>()

  const { hospitalId } = route.params


  const request = usePostRequest<Variables>("/hospital/evaluate", {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: ({ response }) => {
      const { data: { message } } = response
      setShowModal(true)
      setMessage(message)
    }
  },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )

  const onCloseModal = () => {
    setMessage(undefined)
    setShowModal(false)
  }

  const onSubmit = ({ comment }: Evaluate) => {
    request({ comment, rate, hospitalId })
  }

  const { handleSubmit, getFieldProps } = useForm<Evaluate>({
    onSubmit,
    validationSchema: EVALUATE_VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  })

  const onChangeRating = (value: number) => {
    setRate(value)
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.logoContainer}>
        <GrayHospitalIllustration
          width={SIZE}
          height={SIZE}
        />
      </View>
      <View style={styles.separator} />

      <View style={styles.bodyContainer}>
        <View style={styles.formContainer}>
          <View style={styles.ratingContainer}>
            <EvaluateRating
              imageSize={40}
              rating={rate}
              onChangeRating={onChangeRating}
            />
          </View>

          <View>
            <InputText
              placeholder='Comentario'
              {...getFieldProps("comment")}
            />
          </View>
        </View>

        <Button onPress={handleSubmit}>
          Avançar
        </Button>
      </View>
      <Modal
        message={message}
        visible={showModal}
        onCloseModal={onCloseModal}
      />
    </Screen >
  )
}


const styles = StyleSheet.create({
  container: {
    paddingBottom: 24
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
  },
  separator: {
    backgroundColor: "#000",
    height: 0.5,
  },
  bodyContainer: {
    height: "60%",
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  formContainer: {
    gap: 24
  },
  ratingContainer: {
    alignItems: "center"
  }
})