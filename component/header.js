
import React, { useContext } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { LangueContext } from '../app/context/langue.jsx';

const Header = (props) => {
    const { langue, setLangue } = useContext(LangueContext);

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

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.nom}</Text>
            <Pressable style={styles.button} onPress={changeLanguage}>
                <Text>{langue.substring(0,2).toUpperCase()}</Text>
            </Pressable>
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
        zIndex: 1,
        flexDirection: 'row',
    },
    title: {
        color: "#F3F3F3",
        fontSize: 30,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    button: {
        position: 'absolute',
        backgroundColor: "#F3F3F3",
        borderRadius: 5,
        padding: 10,
        margin: 20,
        width: 40,
        right: 0,
        alignItems: 'center',
    }
});


export default Header;


