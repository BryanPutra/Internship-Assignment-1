import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, ActivityIndicator} from 'react-native';
import {theme} from '../styles/main.styles';
import {useAuth} from '../context/authContext';
import {useAxios} from '../context/axiosContext';

//pages
import Login from '../pages/Login';
import MainMenu from '../pages/MainMenu';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const screenNames = {
    
  }

  const {setAuthState, authState} = useAuth();
  const {getTokenCookie} = useAxios();
  const [status, setStatus] = useState('Loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await getTokenCookie() || null;
      setAuthState({
        accessToken: value || null,
        authenticated: value !== null,
      });
      setStatus('Success');
    } catch (err) {
      setStatus('Error');
      console.log(`Get token error: ${err.message}`);
      setAuthState({
        accessToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'Loading') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={theme.activityIndicatorColor} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      {authState?.authenticated === true ? (
          <>
            <Stack.Screen name="MainMenu" component={MainMenu} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
