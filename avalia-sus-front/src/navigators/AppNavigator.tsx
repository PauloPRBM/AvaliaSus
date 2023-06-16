import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../hooks';
import { AuthNavigator } from './AuthNavigator';
import { HospitalNavigator } from './HospitalNavigator';

const { Navigator, Screen } = createNativeStackNavigator()

export const AppNavigator = () => {
  const [{ isLoadingUserData, user }] = useUser()


  if (isLoadingUserData)
    return <></>

  return (
    <Navigator >
      {!user?.isLogged ?
        <Screen
          name='AuthNavigator'
          component={AuthNavigator}
          options={{ headerShown: false }}
        /> :
        <Screen
          name='HospitalNavigator'
          component={HospitalNavigator}
          options={{ headerShown: false }}
        />
      }
    </Navigator>
  );
}