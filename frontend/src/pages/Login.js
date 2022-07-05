// imports from react
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

// imports from dependencies
import {useNavigation} from '@react-navigation/native';
import {theme, container} from '../styles/main.styles';
import {useForm, Controller} from 'react-hook-form';

// imports local components
import MainContainer from '../components/MainContainer';
import Inputs from '../components/Inputs';
import Buttons from '../components/CustomButtons';
import LoginImage from '../assets/images/login.png';
import AccountCreationTitle from '../components/AccountCreationTitle';
import ButtonInText from '../components/ButtonInText';
import {useAuth} from '../context/authContext';

const Login = () => {
  const {height, width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {login, setAuthState} = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onLoginPressed = data => {
    login(data);
  };

  const onForgotPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onLoginGoogle = () => {
    // login with google api
    setAuthState({
      authenticated: true,
    });
  };

  const onRegisterPressed = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView style={{height: height, backgroundColor: theme.white}} showsVerticalScrollIndicator={false}>
      <MainContainer>
        <Image
          source={LoginImage}
          style={{height: height * 0.3, width: width * 0.8}}
          resizeMode="contain"
        />
        <AccountCreationTitle text="Login" />
        <Inputs
          name="email"
          placeholder="Email ID"
          control={control}
          rules={{required: 'Email is required'}}
          iconName="alternate-email"
        />
        <Inputs
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be minimum 8 characters long',
            },
          }}
          iconName="lock"
        />
        <Buttons
          text="Forgot Password?"
          onPress={onForgotPressed}
          type="DIFF"
          containerType="TERTIARY"
          textType="TERTIARY2"
        />
        <View style={container.centerFlex}>
          <Buttons
            text={loading ? 'Logging In...' : 'Login'}
            onPress={handleSubmit(onLoginPressed)}
          />
          <Text style={styles.orDividier}>OR</Text>
          <Buttons
            text="Login with Google"
            onPress={onLoginGoogle}
            bgColor={theme.paleGrey}
            fgColor={theme.whiteGrey}
            type="SECONDARY"
          />
          <ButtonInText
            onPress={onRegisterPressed}
            text="Don't have an account? "
            actionText="Register Here"
          />
        </View>
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orDividier: {
    margin: theme.margin16,
  },

  accountBottomContainer: {
    flexDirection: 'row',
    marginTop: theme.margin16,
  },
});

export default Login;
