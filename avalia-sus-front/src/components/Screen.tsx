import React, { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface ScreenProps {
  children: ReactNode,
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}

export const Screen: React.FC<ScreenProps> = ({
  contentContainerStyle,
  children,
  style
}) => {
  return (
    <SafeAreaView
      style={[styles.container, style]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[contentContainerStyle]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  subContainer: {
    flex: 1,
  }
})