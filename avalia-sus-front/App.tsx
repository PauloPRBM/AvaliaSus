import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/providers';
import { AppNavigator } from './src/navigators';

const { Navigator, Screen } = createNativeStackNavigator()

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigator>
          <Screen
            name='AppNavigator'
            component={AppNavigator}
            options={{ headerShown: false }}
          />
        </Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

