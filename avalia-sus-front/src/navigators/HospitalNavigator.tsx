import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { NavigatorIcon } from '../components'
import { useUser } from '../hooks'
import { EvaluateScreen, HomeScreen, HospitalDetailsScreen, UpdateEvaluateScreen } from '../screens'
import { User } from '../interfaces'

const { Navigator, Screen } = createNativeStackNavigator()

const options = {
  title: "",
  headerStyle: {
    backgroundColor: "#2a9bf8",
  },
}

const formatTitle = (user: User) => {
  const [name, surname] = user.name.split(" ")
  const fullName = `${name} ${surname}`

  return `Bem vindo(a), ${fullName}`

}

export const HospitalNavigator: React.FC = () => {
  const [{ user }] = useUser()

  const title = formatTitle(user)

  return (
    <Navigator
      screenOptions={{
        headerTintColor: "#FFF",
      }}
    >
      <Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          ...options,
          title,
          headerRight: NavigatorIcon
        }}
      />

      <Screen
        name='HospitalDetailsScreen'
        component={HospitalDetailsScreen}
        options={{
          ...options,
          // headerTintColor: "#FFF",
          title: "Comentarios"
        }}
      />

      <Screen
        name='EvaluateScreen'
        component={EvaluateScreen}
        options={{
          ...options,
          title: "Avalie"
        }}
      />
      <Screen
        name='UpdateEvaluateScreen'
        component={UpdateEvaluateScreen}
        options={{
          ...options,
          title: "Edite sua avaliação"
        }}
      />
    </Navigator>
  )
}