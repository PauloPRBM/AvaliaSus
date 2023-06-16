import React from 'react'
import { StyleSheet, View } from 'react-native'
import GrayHospitalIllustration from "../../assets/svgs/GrayHospital.svg"
import { Hospital } from '../interfaces';
import { Rating } from './Rating';
import { Text } from './Text';


const SIZE = 80

interface HospitalItemProps {
  hospital: Hospital
}

export const HospitalItem: React.FC<HospitalItemProps> = ({
  hospital
}) => {
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

        <Rating rating={rate} />

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  iconContainer: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    borderLeftWidth: 1,
    borderRightColor: "#000",
    width: "75%",
    padding: 10,
    gap: 5,
  },
})