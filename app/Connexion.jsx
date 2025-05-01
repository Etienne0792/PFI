//Annabelle Marcotte

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import globalStyles from '../assets/styles/globalStyles.js';
import db from './firebaseConfig';
import Header from '../component/header.js';
import { useNavigation } from '@react-navigation/native';
import { LangueContext } from './context/langue.jsx';
import { UserContext } from './context/user.jsx';

import { useRouter } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';

const verifierUser = async (username, password, router, setUserId) => {

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
                    if (user.admin === true) {
                        Alert.alert('Succès', 'Connexion réussie !');
                        router.push('Admin');
                    } else {
                        Alert.alert('Succès', 'Connexion réussie !');

                        setUserId(doc.id);
                        router.push('Items');
                    }
                }
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

    const { setUserId } = useContext(UserContext);

    const handleConnexion = () => {
        verifierUser(username, password, router, setUserId);
    };

    const retour = () => {
        router.push('/');
    }
    return (
        <View style={globalStyles.background}>

            <Header nom={i18n.t('accueil')} />




            <View style={styles.formContainer}>

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.button} onPress={retour}>
                        <Text style={styles.buttonText}>{i18n.t('back')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>{i18n.t('userFile')}</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Nom d'utilisateur"
                    />

                    <Text style={styles.label}>{i18n.t('passwordFile')}</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Mot de passe"
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.connexionButton} onPress={handleConnexion}>
                        <Text style={styles.connexionButtonText}>{i18n.t('connect')}</Text>
                    </TouchableOpacity>
                </View>



            </View>

            <TouchableOpacity style={styles.footer} onPress={() => router.push('screens/apropos')}>
                <Text style={styles.footerText}>{i18n.t('apropos')}</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({

    formContainer: {
        width: '90%',
        padding: 20,
        height: '75%',
        alignContent: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '100%',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20
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
        height: '10%',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
    button: {
        position: 'absolute',
        backgroundColor: '#c42116',
        paddingHorizontal: 15,
        borderRadius: 5,
        padding: 5,
        zIndex: 1,
        top: -15,
        left: -10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'left',
    },
});
