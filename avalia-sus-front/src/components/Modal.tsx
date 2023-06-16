import React from 'react'
import { Modal as NativeModal, ModalProps as NativeModalProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from './Text'
import { Button } from './Button'

export interface BaseModalProps extends NativeModalProps {
  message: string
  contentContainerStyle?: StyleProp<ViewStyle>
  onCloseModal: () => void
}

export const Modal: React.FC<BaseModalProps> = ({
  contentContainerStyle,
  message,
  style,
  ...rest
}) => {
  const { onCloseModal } = rest

  const _onCloseModal = () => {
    onCloseModal()
  }

  return (
    <NativeModal
      transparent
      statusBarTranslucent={false}
      animationType='fade'
      {...rest}>
      <View style={styles.container}>
        <View style={[styles.modal, style]}>
          <Text
            fontSize={16}
            style={styles.text}>
            {message}
          </Text>
          <Button onPress={_onCloseModal}>
            Entendi
          </Button>
        </View>
      </View>
    </NativeModal>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000AA",
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  },
  modal: {
    justifyContent: "space-evenly",
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: 300,
    padding: 20,
    height: 200,
  },
  text: {
    textAlign: "center"
  }
})