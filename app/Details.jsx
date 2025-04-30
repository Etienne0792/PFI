//Étienne La Rochelle

//----- IMPORTS -----//
import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../assets/styles/globalStyles.js';
import db from './firebaseConfig';
import Header from '../component/header.js';

import { LangueContext } from './context/langue.jsx';



//----- COMPOSANTS -----//
//Image de l'item (si non trouver affiche une image par defaut)
const ItemPic = (props) => (
    <View>
        <Image style={styles.imageFormat} source={{ uri: props.uriPic || "https://www.granitz.fr/images/image-not-found.jpg" }} />
    </View>
);

//Container de l'item affiche le nom et l'image, permet egalement d'ajouter une quantite choisie au panier
const Item = (props) => {
    //Translation
    const { i18n } = useContext(LangueContext);

    //definit la quantite a ajouter au panier
    const [quantity, setQuantity] = useState(1);
    const navigation = useNavigation();

    //Fonction pour ajouter l'item au panier
    const addToCart = async () => {
        try {
            await addDoc(collection(db, "Paniers"), {
                idUser: 1,
                idItem: props.id,
                nom: props.nom,
                uriPic: props.uriPic,
                description: props.description,
                qty: quantity,
                prix: props.prix,
            });
            Alert.alert("Item ajouté au panier");
        } catch (e) {
            Alert.alert("L'item na pus être ajouté au panier");
        }
    };

    return (
        <KeyboardAvoidingView behavior={'padding'}> 
            <ScrollView contentContainerStyle={styles.scrollContainer}>     
                <View style={styles.ItemContainer}>
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>{i18n.t('back')}</Text>
                    </Pressable>
                    <ItemPic uriPic={props.uriPic} />    
                    <View style={styles.textContainer}>
                        <Text style={styles.detail}>{props.nom}</Text>
                        <Text style={styles.detail}>{props.description}</Text>
                        <Text style={styles.detail}>{i18n.t('price')}: {props.prix}$</Text>
                        <View style={styles.inputContainer}>
                            <Text style={{fontSize: 20}}>{i18n.t('quantity')}:</Text>
                            <TextInput
                                style={styles.quantityInput}
                                keyboardType="number-pad"
                                value={quantity.toString()}
                                onChangeText={(text) => {
                                    const parsedQuantity = parseInt(text, 10);
                                    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
                                        setQuantity(parsedQuantity);
                                    } else {
                                        setQuantity(1);
                                    }
                                    if (parsedQuantity > 100) {
                                        setQuantity(100);
                                    }
                                }}
                            />   
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable style={globalStyles.BiggerButton} onPress={addToCart}>
                                <Text style={globalStyles.BiggerButtonText}>{i18n.t('addToCart')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    //--- COMMENTAIRE: Les commentaire dans le return causait un warning lors du chargement de la page --- 
    //LIGNE 61: <--- Pas vu en classe : empeche keyboard de cacher input
    //ligne 62: Permet de tout voir même avec le keyboard
    //ligne 65: Image de l'item
    //ligne 86: Permet a l'usager de selecitoner une quantité a ajouter au panier (0 - 100) // keyboard number-pad pas vue en classe
    //ligne 93: Permet a l'usager d'ajouter au panier
};



//----- PAGE PRINCIPALE -----//
export default function App() {
    //Translation
    //Translation
    const { i18n, setLangue } = useContext(LangueContext);

    //recuperer l'id de l'item selectionne
    const { itemId } = useLocalSearchParams();

    //Definit l'item a afficher
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true); // Permet d'attendre que l'item soit recuperer

    //Recupere l'item de la base de donnee et attends de l'avoir recu avant de l'afficher
    const getItems = async () => {
        setLoading(true);
        try {
            const items = await getDoc(doc(db, "Items", itemId));
            setItem({ id: items.id, ...items.data() });
        } finally {
            setLoading(false);
        }
    };

    //initialise l'affichage de l'item
    useEffect(() => {getItems();}, [itemId]); //[itemId] permet d'aller chercher le nouvel item si l'item change

    //Permet d'afficher un message de chargement tant que l'item n'est pas recupere
    if (loading) {
        return (
            <View style={globalStyles.background}>
                <Header nom={i18n.t('Title')} />
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>{i18n.t('loading')}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={globalStyles.background}>
            <Header nom="Details" />
            <Item {...item} />
        </View>
    );
}



//----- STYLES -----//
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    ItemContainer: {
        flexDirection: "column",
        alignSelf: 'center',
        margin: 15,
        backgroundColor: "#F3F3F3",
        height: '90%',
        width: '90%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        alignContent: 'center',
    },
    imageFormat: {
        width: 300,
        height: 300,
        marginTop: 20,
        margin:'auto',
        objectFit: 'contain',
    },
    textContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        textAlign: 'center',
        flex: 1,
        paddingBottom: 20,
    },
    detail: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#063c7a',
        paddingHorizontal: 30,
        borderRadius: 5,
        padding: 5,
        zIndex: 1,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonContainer: {
        marginLeft: 10,
        width: '80%',
        padding: 10,
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityInput: {
        borderWidth: 1,
        padding: 5,
        width: 50,
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
    },
    loadingText:{
        fontSize: 75,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});