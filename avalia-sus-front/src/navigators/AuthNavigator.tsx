import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { LoginScreen, SingUpScreen, WelcomeScreen } from '../screens'

const { Navigator, Screen } = createNativeStackNavigator()

const options = {
  title: "",
  headerStyle: {
    backgroundColor: "#2a9bf8"
  }
}


export const AuthNavigator: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerTintColor: "#FFF",
      }}
    >
      <Screen
        name='WelcomeScreen'
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          ...options,
          title: "Login"
        }}
      />

      <Screen
        name='SingUpScreen'
        component={SingUpScreen}
        options={{
          ...options,
          title: "Cadastro"
        }}
      />
    </Navigator>
  )
}