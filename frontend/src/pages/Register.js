// imports from react
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

// imports from dependencies
import {useNavigation} from '@react-navigation/native';
import {theme, container} from '../styles/main.styles';
import {useForm, Controller} from 'react-hook-form';

// imports from local files
import Inputs from '../components/Inputs';
import Buttons from '../components/CustomButtons';
import SignUpImage from '../assets/images/register.png';
import AccountCreationTitle from '../components/AccountCreationTitle';
import MainContainer from '../components/MainContainer';
import ButtonInText from '../components/ButtonInText';
import {useAuth} from '../context/authContext';

const Login = () => {
  const {height, width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const passwordValue = watch('password');
  const {register} = useAuth();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onLoginPressed = () => {
    navigation.navigate('Login');
  };

  onTermsConditionsPressed = () => {};

  const onSignUpPressed = async (data) => {
    register(data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainContainer>
        <Image
          source={SignUpImage}
          style={[
            styles.signUpImage,
            {height: height * 0.3, width: width * 0.8},
          ]}
          resizeMode="contain"
        />
        <AccountCreationTitle text="Register" />
        <Inputs
          name="email"
          placeholder="Email ID"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {value: emailRegex, message: 'Invalid email detected'},
          }}
          iconName="alternate-email"
        />
        <Inputs
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: 'Username is required',
            minLength: {
              value: 6,
              message: 'Username should be at least 6 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Username should be max 20 characters long',
            },
          }}
          iconName="supervised-user-circle"
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
        <Inputs
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            validate: value =>
              value === passwordValue ? true : 'Password do not match',
          }}
          iconName="lock"
        />
        <View style={container.centerFlex}>
          <ButtonInText
            style={styles.termsContainer}
            onPress={onLoginPressed}
            text="By registering, we assumed you have agreed to our "
            actionText="Terms & Conditions"
            type="SECONDARY"
          />
          <Buttons text="Sign Up" onPress={handleSubmit(onSignUpPressed)} />
          <ButtonInText
            style={styles.loginContainer}
            onPress={onLoginPressed}
            text="Already have an account? "
            actionText="Login here"
          />
        </View>
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signUpImage: {},
  termsContainer: {
    justifyContent: 'flex-start'
  },
  loginContainer: {
    marginBottom: theme.margin16,
  },
});

export default Login;
