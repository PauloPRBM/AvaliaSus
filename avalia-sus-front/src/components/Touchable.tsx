import React from 'react'
import { TouchableHighlightProps, TouchableNativeFeedback, View } from 'react-native'


const DEFAULT_LIGHT_UNDERLAY_COLOR = "#FFFFFF42"

interface TouchableProps extends TouchableHighlightProps {
  children: React.ReactNode,
  onPress?: () => void
}

export const Touchable: React.FC<TouchableProps> = ({
  children,
  disabled,
  style,
  onPress,
  ...rest }) => {

  const _onPress = () => {
    if (!disabled && typeof onPress === 'function')
      onPress()
  }

  return (
    <TouchableNativeFeedback
      onPress={_onPress}
      background={TouchableNativeFeedback.Ripple(DEFAULT_LIGHT_UNDERLAY_COLOR, false)}
      {...rest}>
      <View style={style}>
        <View>{children}</View>
      </View>
    </TouchableNativeFeedback>
  )
}
