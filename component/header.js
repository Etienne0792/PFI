
import React, { useContext } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { LangueContext } from '../app/context/langue.jsx';
import { UserContext } from '../app/context/user.jsx';
import { useNavigation } from 'expo-router';

const Header = (props) => {
    const navigation = useNavigation();
    const { langue, setLangue } = useContext(LangueContext);
    const { userId, setUserId, userName } = useContext(UserContext);

    //Permet de changer la langue de l'application
    const changeLanguage = () => {
        if (langue === 'fr-CA') {
            setLangue('en-US');
        }   
        else if (langue === 'en-US') {
            setLangue('fr-CA');
        }     
        else{
            setLangue('fr-CA');
        }  
    };

    //permet de deconnecter l'utilisateur
    const deconnexion = () => {
        setUserId('');
        navigation.navigate("Panier");
        console.log("Deconnexion de l'utilisateur: " + userId);
    };

    return (
        <View style={styles.header}>
            <View style={styles.titleSection}>
                <Text style={styles.title}>{props.nom}</Text>
                <Pressable style={styles.languageButton} onPress={changeLanguage}>
                    <Text>{langue.substring(0,2).toUpperCase()}</Text>
                </Pressable>
            </View>
            <View style={styles.userSection}>
                <Text>{userName}</Text>
                <Pressable onPress={deconnexion}>
                    <Text style={styles.deconexionText}>Deconnecter</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#c42116",
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
        width: '100%',
    },
    title: {
        color: "#F3F3F3",
        fontSize: 30,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    languageButton: {
        position: 'absolute',
        backgroundColor: "#F3F3F3",
        borderRadius: 5,
        padding: 10,
        margin: 20,
        width: 40,
        right: 0,
        alignItems: 'center',
    },
    titleSection:{
        backgroundColor: "#c42116",
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
        width: '100%',
        flex:2,
    },
    userSection:{
        backgroundColor: "white",
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex:1,
        paddingHorizontal: 20,
    },
    deconexionText:{
        color:'blue',
    }
});


export default Header;


