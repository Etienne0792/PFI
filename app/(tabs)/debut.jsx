// Annabelle Marcotte

import React, { useContext }  from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Header from '../../component/header.js';
import globalStyles from '../../assets/styles/globalStyles.js';

import { LangueContext } from '../context/langue.jsx';


export default function App() {
  const router = useRouter();
    const { i18n } = useContext(LangueContext);
  const navigation = useNavigation();
  return (
      <View style={globalStyles.background}>
          <Header nom={i18n.t('accueil')}/>

        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Connexion')}>
            <Text style={styles.buttonText}>{i18n.t('connect')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inscription')}>
            <Text style={styles.buttonText} >{i18n.t('inscription')}</Text>
          </TouchableOpacity>
        </View>

      <TouchableOpacity style={styles.footer} onPress={() => router.push('screens/apropos')}>
          <Text style={styles.footerText} >{i18n.t('apropos')}</Text>
        </TouchableOpacity>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fcf1f0',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  content: {
    flex:0.88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#c42116',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#c42116',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});
