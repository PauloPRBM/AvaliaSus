import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import GrayHospitalIllustration from "../../assets/svgs/GrayHospital.svg"
import { Button, EvaluateRating, InputText, Modal, Screen } from '../components'
import { useForm, usePutRequest, useUser } from '../hooks'
import { FieldValidation } from '../validations'

interface Evaluate {
  comment: string
}
interface Variables extends Evaluate {
  id: string
  rate: number
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


export const UpdateEvaluateScreen: React.FC = () => {
  const [{ user }] = useUser()
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState<string>()

  const navigation = useNavigation()
  const route = useRoute<any>()

  const { id, comment, rate: routerRate } = route.params

  const [rate, setRate] = useState(routerRate)

  const request = usePutRequest<Variables>("/evaluate", {
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
    request({ comment, rate, id })
  }

  const { handleSubmit, getFieldProps } = useForm<Evaluate>({
    onSubmit,
    validationSchema: EVALUATE_VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  })

  const onChangeRating = (value: number) => {
    setRate(value)
  }

  const commentFieldProps = getFieldProps("comment")

  useEffect(() => {
    console.log({ comment })
    if (comment) {
      commentFieldProps.onChangeText(comment)
    }
  }, [])

  return (
    <Screen contentContainerStyle={styles.container}>
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
              {...commentFieldProps}
            />
          </View>
        </View>

        <Button
          onPress={handleSubmit}
        >
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
    // paddingBottom: 24
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "35%",
  },
  separator: {
    backgroundColor: "#000",
    height: 0.5,
  },
  bodyContainer: {
    height: "50%",
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 24
  },
  formContainer: {
    gap: 24
  },
  ratingContainer: {
    alignItems: "center"
  }
})