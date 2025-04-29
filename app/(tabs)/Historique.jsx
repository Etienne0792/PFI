//Étienne La Rochelle

//----- IMPORTS -----//
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ImageBackground, FlatList } from 'react-native';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../assets/styles/globalStyles.js';
import db from '../firebaseConfig';
import Header from '../../component/header.js';

import { LangueContext } from '../context/langue.tsx';



//----- COMPOSANTS -----//
//Affiche l'image de l'item
const ItemPic = (props) => 
    <View>
        <Image style={styles.imageFormat} source={{uri:props.uriPic || "https://www.granitz.fr/images/image-not-found.jpg"}}/>
    </View>

//Affiche le nom et l'image de l'item, permet d'acceder a la page de details de l'item
const Item = (props) => {
    const { i18n } = useContext(LangueContext);
    const navigation = useNavigation();
    const purchaseDate = props.item.purchaseTime.substring(0, 10); //permet de garder seulement la date (sans l'heure)

    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Details', { itemId: props.item.idItem })}>
                <View style={styles.ItemContainer}>
                    <ItemPic uriPic={props.item.uriPic}/>
                    <View>
                        <Text style={styles.Detail}>Nom: {props.item.nom}</Text>        
                        <Text style={styles.Detail}>{i18n.t('cost')}: {props.item.qty * props.item.prix}</Text>        
                        <Text style={styles.Detail}>{i18n.t('boughtOn')}: {purchaseDate}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}



//----- PAGE PRINCIPALE -----//
export default function App() {
    //Translation
    const { i18n, setLangue } = useContext(LangueContext);

    //Definit les items a afficher
    const [displayItems, setItemList] = useState([]);
    
    const getItems = async () => {
        const itemsQuery = query(collection(db, "Historique"), orderBy("purchaseTime", "desc")); // Permet de trier les items par date d'achat (du plus recent au plus ancien)
        const itemsSnapshot = await getDocs(itemsQuery);
        const itemsData = itemsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        setItemList(itemsData);
    };

    useEffect(() => {getItems();}, [displayItems]); //initialise l'affichage des items

    return (
        <View style={globalStyles.background}>
            <Header nom={i18n.t('cost')} />
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
    Detail:{
        fontSize:20,
         padding:2
    }
});