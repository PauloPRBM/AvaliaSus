import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, InputText, Logo, Modal, Screen } from '../components';
import { useForm, usePostRequest } from '../hooks';
import { SingUp } from '../interfaces';
import { FieldValidation, validateCPF, validateName } from '../validations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { string, ref } = FieldValidation;

const SING_UP_VALIDATION_SCHEMA = FieldValidation.object({
  name: string().label('name').required("Nome é obrigatório").test('name', 'Escreva seu nome completo', validateName),
  cpf: string().label('CPF').required("CPF é obrigatório").test('cpf', 'CPF inválido', validateCPF),
  password: string().min(6).required("A senha deve conter no mínimo 6 dígitos").label('Senha'),
  confirmPassword: string()
    .oneOf(
      [ref('password')],
      'Este campo deve ser igual ao campo de senha!',
    )
    .required("A confirmação da senha é obrigatória")
    .label('Confirmação de Senha'),
});

const INITIAL_VALUES = {
  name: '',
  cpf: '',
  password: "",
  confirmPassword: ""
};

type RootStackParamList = {
  LoginScreen: undefined
};

type SingUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SingUpScreen: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const request = usePostRequest<SingUp>("/auth/sign-up", {
    onSuccess: () => {
      goToLoginScreen();
    },
    onError: ({ response }) => {
      const { data: { message } } = response;
      setShowModal(true);
      setMessage(message);
    }
  });

  const navigation = useNavigation<SingUpScreenNavigationProp>();

  const onCloseModal = () => {
    setMessage(undefined);
    setShowModal(false);
  };

  const goToLoginScreen = () => {
    navigation.replace("LoginScreen");
  };

  const onSubmit = (props: SingUp) => {
    request(props);
  };

  const { handleSubmit, getFieldProps } = useForm<SingUp>({
    onSubmit,
    validationSchema: SING_UP_VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  });

  const nameProps = getFieldProps("name");
  const cpfProps = getFieldProps("cpf");
  const passwordProps = getFieldProps("password");
  const confirmPasswordProps = getFieldProps("confirmPassword");

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? 64 : 0}
    >
      <Screen>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.formContainer}>
            <InputText
              placeholder='Nome'
              {...nameProps}
            />

            <InputText
              placeholder='CPF'
              {...cpfProps}
              keyboardType='numeric'
            />

            <InputText
              placeholder='Senha'
              secureTextEntry
              {...passwordProps}
            />

            <InputText
              placeholder='Confirmar senha'
              secureTextEntry
              {...confirmPasswordProps}
            />
          </View>
          <Button
            onPress={handleSubmit}
          >
            Cadastrar
          </Button>
        </View>
      </Screen>

      <Modal
        message={message}
        visible={showModal}
        onCloseModal={onCloseModal}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  logoContainer: {
    justifyContent: "center",
    height: "40%",
  },
  bodyContainer: {
    justifyContent: "space-between",
    height: "50%",
  },
  formContainer: {
    paddingBottom: 15,
  },
});
