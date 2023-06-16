import React from 'react'
import {
  Text as NativeText,
  TextProps as NativeTextProps,
} from 'react-native'

interface TextProps extends NativeTextProps {
  bold?: boolean
  color?: string
  fontSize?: number
}

export const Text: React.FC<TextProps> = ({
  fontSize = 14,
  style,
  ...rest
}) => {
  return (
    <NativeText style={[{ fontSize }, style]} {...rest} />
  )
}
