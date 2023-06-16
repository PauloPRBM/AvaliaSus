import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Rating as RNRating } from 'react-native-ratings'
import { Touchable } from './Touchable'



interface RatingProps {
  imageSize?: number
  onPress?: () => void
  rating: number
  showRate?: boolean
}

export const Rating: React.FC<RatingProps> = ({
  imageSize = 24,
  onPress,
  rating,
  showRate
}) => {
  return (
    <Touchable onPress={onPress}>
      <View style={styles.container}>
        {!!showRate && (
          <Text>
            {rating}
          </Text>
        )}

        <RNRating
          ratingCount={5}
          startingValue={rating}
          fractions
          imageSize={imageSize}
          readonly
          minValue={0}
          style={styles.rating}
        />
      </View>
    </Touchable>
  )
}


const styles = StyleSheet.create({
  container: {
    gap: 5
  },
  rating: {
    alignItems: "flex-start",
  }
})