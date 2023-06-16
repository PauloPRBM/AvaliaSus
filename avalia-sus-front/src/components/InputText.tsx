import React, { forwardRef, useCallback, useState } from 'react'
import { StyleSheet, View, TextInput, TextInputProps } from 'react-native'
import { InputStatus } from '../interfaces'
import { Icon } from './Icon'
import { Text } from './Text'


const PLACE_HOLDER_TEXT_COLOR = '#AAA'


const statusColor = {
  'ERROR': '#FF0011',
  'SUCCESS': "#000",
  'IDLE': "#000",
}


interface InputTextProps extends TextInputProps {
  disabled?: boolean
  label?: string
  onPressOnDisabled?: () => void
  status?: InputStatus
  subtitle?: string
}

const Input: React.ForwardRefRenderFunction<TextInput, InputTextProps> = ({
  disabled,
  label,
  onPressOnDisabled,
  style,
  status = 'IDLE',
  subtitle,
  ...rest }, ref) => {
  const { secureTextEntry: initialSecureTextEntry = false } = rest
  const [secureTextEntry, setSecureTextEntryValue] = useState(initialSecureTextEntry)

  const toggleSecureTextEntry = useCallback(() => {
    if (disabled) return
    setSecureTextEntryValue((prevState) => !prevState)
  }, [disabled, setSecureTextEntryValue])

  const defaultSideElement = useCallback(() => {
    if (initialSecureTextEntry) {
      const name = secureTextEntry ? 'visibility-off' : 'visibility'

      return (
        <Icon
          name={name}
          onPress={toggleSecureTextEntry}
          size={20}
          color='#B3B9A3'
        />
      )
    }
  }, [secureTextEntry, toggleSecureTextEntry, initialSecureTextEntry])


  return (
    <View>
      <View style={[styles.container, { borderColor: statusColor[status] }]}>
        <View style={styles.textInputContainer}>
          <View style={styles.inputTextContainer}>
            <TextInput
              ref={ref}
              style={[styles.inputText, style]}
              editable={!disabled}
              placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
              {...rest}
              secureTextEntry={secureTextEntry}
            />
            {defaultSideElement()}
          </View>
        </View>
      </View>
      {
        !!subtitle && <View style={styles.subtitleContainer}>
          <Text fontSize={12} style={{ color: statusColor[status] }}>
            {subtitle}
          </Text>
        </View>
      }
    </View>
  )
}

export const InputText = forwardRef(Input)

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
  },
  textInputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
  },
  maskInputTextColor: {
    color: '#4F6047'
  },
  subtitleContainer: {
    paddingTop: 5,
    paddingHorizontal: 16,
  }
})