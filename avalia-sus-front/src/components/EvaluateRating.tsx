import React from 'react'
import { StyleSheet } from 'react-native'
import { Rating as RNRating } from 'react-native-ratings'


interface RatingProps {
  imageSize?: number
  onChangeRating: (value: number) => void
  rating: number
}

export const EvaluateRating: React.FC<RatingProps> = ({
  imageSize = 24,
  onChangeRating,
  rating,
}) => {
  return (
    <RNRating
      ratingCount={5}
      startingValue={rating}
      imageSize={imageSize}
      minValue={0}
      style={styles.rating}
      onFinishRating={onChangeRating}
    />
  )
}


const styles = StyleSheet.create({
  rating: {
    alignItems: "flex-start",
  }
})