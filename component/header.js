
import React, { useContext } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { LangueContext } from '../app/context/langue.tsx';

const Header = (props) => {
    const { langue, setLangue } = useContext(LangueContext);
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.nom}</Text>
            <Pressable style={styles.button} onPress={() => setLangue(langue === 'fr-CA' ? 'en-US' : 'fr-CA')}>
                <Text>TEST</Text>
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
        backgroundColor: "#F3F3F3",
        borderRadius: 5,
        padding: 10,
        margin: 10,
        marginLeft: 'auto',
    }
});


export default Header;


