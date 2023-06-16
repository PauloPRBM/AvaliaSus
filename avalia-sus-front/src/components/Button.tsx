import React from 'react'
import { StyleSheet, TouchableHighlightProps, View } from 'react-native'
import { Text } from './Text'
import { Touchable } from './Touchable'


interface ButtonProps extends TouchableHighlightProps {
  children: string,
  onPress?: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, style, disabled, ...rest }) => {

  return (
    <Touchable {...rest}>
      <View
        style={[styles.container, style, { backgroundColor: disabled ? "#90a9c2" : "#2a9bf8" }]}
      >
        <View style={styles.textContainer}>
          <Text>
            {children}
          </Text>
        </View>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})