import React from 'react'
import { StyleSheet, View } from 'react-native'
import BlueHospitalIllustration from "../../assets/svgs/BlueHospital.svg"

const SIZE = 200

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <BlueHospitalIllustration
        width={SIZE}
        height={SIZE}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  }
})