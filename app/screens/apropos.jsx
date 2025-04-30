import React, { useContext }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../component/header.js';
import globalStyles from '../../assets/styles/globalStyles.js';

import { LangueContext } from '../context/langue.jsx';


export default function AppProposScreen() {
    const router = useRouter();
    const goBackToIndex = () => {
      router.push('/');
    };
    const { i18n } = useContext(LangueContext);
  return (
    
<View style={globalStyles.background}>
    <Header nom={i18n.t('apropos')}/>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
        {i18n.t('about')}
        </Text>
        <TouchableOpacity style={styles.button} onPress={goBackToIndex}>
          <Text style={styles.buttonText}>{i18n.t('retour')}</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
      },
      header: {
        alignItems: 'center',
        padding: 25,
        width: '100%',
        backgroundColor: '#063c7a',
        marginBottom: 20,
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
    contentContainer: {
      width: '90%',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10,
      textAlign: 'center',
      borderWidth: 4,
      borderColor: 'black',
      marginTop: '45%',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
      textAlign: 'center',
      color: 'black',
    },
    button: {
      backgroundColor: '#c42116',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginVertical: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
});
