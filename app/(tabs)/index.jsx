//Étienne La Rochelle

//----- IMPORTS -----//
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../assets/styles/globalStyles.js';
import db from '../firebaseConfig';
import Header from '../../component/header.js';

import { LangueContext } from '../context/langue.tsx';



//----- COMPOSANTS -----//
//Image de l'item (si non trouver affiche une image par defaut)
const ItemPic = (props) =>
    <View>
        <Image style={styles.imageFormat} source={{ uri: props.uriPic || "https://www.granitz.fr/images/image-not-found.jpg" }} />
    </View>

//Container de l'item affiche le nom et l'image
const Item = (props) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate('Details', { itemId: props.item.id })}>
            <View style={styles.ItemContainer}>
                <ItemPic uriPic={props.item.uriPic} />
                <Text style={styles.displayName}>{props.item.nom}</Text>
            </View>
        </Pressable>
    );
}



//----- PAGE PRINCIPALE -----//
export default function App() {
    //Translation
    const { i18n } = useContext(LangueContext);

    //Definit les items a afficher
    const [displayItems, setItemList] = useState([]);
    
    //Recupere les items de la base de donnee
    const getItems = async () => {
        const items = await getDocs(collection(db, "Items"))
        const itemsData = items.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        setItemList(itemsData);            
    };

    //initialise l'affichage des items
    useEffect(() => {getItems();}, []);

    return (
        <View style={globalStyles.background}>
            <Header nom={i18n.t('Tools')} />
            <View style={styles.ItemList}>
                <FlatList
                    data={displayItems}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                    refreshing={false}
                    onRefresh={()=>getItems()}
                />
            </View>
        </View>
    );
}



//----- STYLES -----//
const styles = StyleSheet.create({
    ItemContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        margin: 15,
        backgroundColor: "#F3F3F3",
    },
    displayName: {
        fontSize: 20,
        padding: 10
    },
    imageFormat: {
        width: 90,
        height: 90,
        margin: 15,
        objectFit: 'contain',
    },
    ItemList: {
        flex: 1
    },
});