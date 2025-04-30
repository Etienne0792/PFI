//Annabelle Marcotte

import React, { useState,useContext }  from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ImageBackground } from 'react-native';
import globalStyles from '../assets/styles/globalStyles.js';
import db from './firebaseConfig';
import Header from '../component/header.js';
import { useNavigation } from '@react-navigation/native';
import { LangueContext } from './context/langue.jsx';

import { useRouter } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';

const verifierUser = async (username, password, router) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
      } else {
        let found = false;
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.password === password) {
            found = true;
            if(user.admin === true)
            {
              Alert.alert('Succès', 'Connexion réussie !');
              router.push('Admin'); 
            }else{
            Alert.alert('Succès', 'Connexion réussie !');
            router.push('/');  
            }}
        });
  
        if (!found) {
          Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
        }
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
    }
  };
  

export default function AppConnexionScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  
    const { i18n } = useContext(LangueContext);
    const navigation = useNavigation();

    const handleConnexion = () => {
      verifierUser(username, password,router);
    };

    const retour = () => {
      router.push('/');
    }
    return (
    <View style={styles.container}>
          
          <Header nom={i18n.t('accueil')}/>

            <TouchableOpacity style={styles.button} onPress={retour}>
                <Text style={styles.buttonText}>{i18n.t('back')}</Text>
            </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{i18n.t('userFile')}</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Nom d'utilisateur"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{i18n.t('passwordFile')}</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
          />
        </View>
            <TouchableOpacity style={styles.connexionButton} onPress={handleConnexion}>
                  <Text style={styles.connexionButtonText}>{i18n.t('connect')}</Text>
            </TouchableOpacity>
            </View>
      <TouchableOpacity style={styles.footer} onPress={() => router.push('screens/apropos')}>
            <Text style={styles.footerText}>{i18n.t('apropos')}</Text>
        </TouchableOpacity>
        </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
      },
      formContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        borderWidth: 4,    
        borderColor: 'black',
        marginTop: '40%',
        height: '40%',
      },
      inputContainer: {
        width: '100%',
        marginTop: '10%',
      },
      label: {
        textAlign: 'left',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'flex-start',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        width: '100%',
      },
  connexionButton: {
    backgroundColor: '#c42116',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 30,
  },
  connexionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },   
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#c42116',
  marginTop: '45%',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  button: {
    position: 'absolute',
    top: '35%',
    left: '10%',
    backgroundColor: '#c42116',
    paddingHorizontal: 15,
    borderRadius: 5,
    padding: 5,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
  },
  });
  