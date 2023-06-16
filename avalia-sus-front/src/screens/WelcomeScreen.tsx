import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Logo, Screen, Text } from '../components'
import { useNavigation } from '@react-navigation/native'


export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<any>()

  const goToLogin = () => navigation.navigate("LoginScreen")

  const goToSingUp = () => navigation.navigate("SingUpScreen")

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.bodyContainer}>

        <View style={styles.textContainer}>
          <Text
            fontSize={16}
            style={styles.textStyle}>
            Bem vindo ao AvaliaSus.{'\n\n'}
            Avalie e consulte aqui o serviço prestado nos 6 Grandes Hospitais de PE
          </Text>
        </View>


        <View style={styles.buttonContainer}>
          <Button onPress={goToLogin} >
            Login
          </Button>

          <Button onPress={goToSingUp} >
            Cadastro
          </Button>
        </View>

      </View>
    </Screen>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  logoContainer: {
    justifyContent: "center",
    height: "40%"
  },
  bodyContainer: {
    height: "60%",
    justifyContent: "space-between",
    paddingHorizontal: 40
  },
  textContainer: {
    paddingTop: "10%",
    alignItems: "center"
  },
  textStyle: {
    textAlign: "center",
  },
  buttonContainer: {
    gap: 20
  },
})