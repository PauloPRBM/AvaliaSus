import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Hospital } from '../interfaces'
import { Rating } from './Rating'
import GrayHospitalIllustration from "../../assets/svgs/GrayHospital.svg"
import { Text } from './Text'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'


type RootStackParamList = {
  EvaluateScreen: { hospitalId: string }
};

type HospitalHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SIZE = 120

interface HospitalHeaderProps {
  hospital: Hospital
}

export const HospitalHeader: React.FC<HospitalHeaderProps> = ({ hospital }) => {
  const navigation = useNavigation<HospitalHeaderNavigationProp>()


  const onPress = () => {
    navigation.navigate("EvaluateScreen", { hospitalId: hospital.id })
  }

  const { name, address, rate } = hospital
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <GrayHospitalIllustration
          width={SIZE}
          height={SIZE}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>
          {name}
        </Text>
        <Text>
          {address}
        </Text>

        <View style={styles.ratingContainer}>
          <Rating
            showRate
            imageSize={20}
            rating={rate}
          />
          <Text
            style={styles.text}
            onPress={onPress}
          >
            Avalie aqui
          </Text>
        </View>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row"
  },
  iconContainer: {
    width: "30%",
    justifyContent: "center",
  },
  textContainer: {
    width: "70%",
    borderLeftWidth: 1,
    borderRightColor: "#000",
    paddingLeft: 10,
    paddingVertical: 10,
    paddingRight: 5,
    gap: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 25,
  },
  text: {
    color: "#2e98f0",
    textDecorationLine: "underline"
  }
})