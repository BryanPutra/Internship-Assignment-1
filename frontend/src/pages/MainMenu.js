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
import MainContainer from '../components/MainContainer';
import ClickableIcons from '../components/ClickableIcons';
import {useNavigation} from '@react-navigation/native';
import {theme, container} from '../styles/main.styles';
import Logo from '../assets/images/logoSimobi1.png';
import {useAuth} from '../context/authContext';
import AccountCreationTitle from '../components/AccountCreationTitle';
import AccountCard from '../components/AccountCard';
import AccountCardContainer from '../components/ProductCardContainer';

const MainMenu = () => {
  const {logout, testPostAuth} = useAuth();
  const {height, width} = useWindowDimensions();

  const onSettingsPressed = () => {
    console.log(testPostAuth.data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainContainer type="SECONDARY">
        {/* top container */}
        <View style={styles.topContainer}>
          <View style={{flex: 1}}>
            <Image
              source={Logo}
              style={{height: height * 0.05, width: width * 0.25}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.settingsLogoutContainer}>
            <ClickableIcons
              iconName="logout"
              onPress={logout}
              fontSize={theme.fontSize22}
            />
            <ClickableIcons
              iconName="settings"
              onPress={onSettingsPressed}
              fontSize={theme.fontSize22}
            />
          </View>
        </View>
        {/* cards container */}
        <View style={{marginTop: theme.margin16}}>
          <AccountCreationTitle  text="Bank Accounts"/>
          <AccountCardContainer>

          </AccountCardContainer>
        </View>
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
  },

  settingsLogoutContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
});

export default MainMenu;
