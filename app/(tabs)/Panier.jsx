//Étienne La Rochelle

//----- IMPORTS -----//
import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Pressable,
    TextInput,
    Alert,
} from 'react-native';
import { collection, getDocs, deleteDoc, doc, addDoc, Timestamp, query, where } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import db from '../firebaseConfig';
import Header from '../../component/header.js';
import globalStyles from '@/assets/styles/globalStyles';

import { LangueContext } from '../context/langue.jsx';
import { UserContext } from '../context/user.jsx';


//----- COMPOSANTS -----//
//Image de l'item (si non trouver affiche une image par defaut)
const ItemPic = (props) =>
    <View>
        <Image style={globalStyles.imageFormat} source={{ uri: props.uriPic || "https://www.granitz.fr/images/image-not-found.jpg" }} />
    </View>

//Affiche la barre de prix total et le bouton d'achat pour tous les items du panier
const TotalPriceBar = ({ totalPrice, onBuyAllPress }) => {
    const { i18n } = useContext(LangueContext);
    return (
        <View style={styles.totalPriceBar}>
            <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
            <Pressable style={globalStyles.BiggerButton} onPress={onBuyAllPress}>
                <Text style={globalStyles.BiggerButtonText}>{i18n.t('buyAll')}:</Text>
            </Pressable>
        </View>
    );
}


//Container de l'item affiche le nom et l'image, contient egalement les inputs necessaire a l'achat et a la suppression de l'item
const Item = (props) => {
    const { i18n } = useContext(LangueContext);
    const navigation = useNavigation();
    const [removeQty, setRemoveQty] = useState(1); //definie la quantite d'item a acheter ou supprimer

    //Permet d'acheter un item du panier
    const buyItem = async () => {
        try{
            console.log(props.userId)
            await addDoc(collection(db, "Historique"), { //ajoute l'item dans l'historique
                idUser: props.userId,
                iditem: props.item.idItem,
                nom: props.item.nom,
                uriPic: props.item.uriPic,
                description: props.item.description,
                qty: removeQty,
                prix: props.item.prix,
                purchaseTime: Timestamp.now(),
            });
            await deleteDoc(doc(db, "Paniers", props.item.id)); //supprime l'item du panier
            Alert.alert(i18n.t('buyOne'));
        }catch (error) {
            console.log(error);
            Alert.alert(i18n.t('buyOneError'));
        }
    };

    //Permet de supprimer un item du panier et de notifier l'usager
    const DeleteItem = async () => {
        try{
            await deleteDoc(doc(db, "Paniers", props.item.id)); //supprime l'item du panier
            Alert.alert(i18n.t('deleteItem'));
        }catch (error) {
            Alert.alert(i18n.t('deleteItemError'));
        }
    };

    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Details', { itemId: props.item.idItem })}>
                <View style={globalStyles.ItemContainer}>
                    <ItemPic uriPic={props.item.uriPic} />
                    <View style={styles.Detail}>
                        <Text style={styles.Detail}>Nom: {String(props.item.nom)}</Text>
                        <Text style={styles.Detail}>{i18n.t('price')}: {String(props.item.prix)}$</Text>
                        <Text style={styles.Detail}>{i18n.t('quantity')}: {String(props.item.qty)}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.quantityInput}
                                keyboardType="number-pad" //<--- Pas vu en classe : affiche le clavier de nombre seulement
                                value={removeQty.toString()}
                                onChangeText={(text) => {
                                    const parsedQty = parseInt(text, 10); // 10 = base 10
                                    if (!isNaN(parsedQty) && parsedQty > 0) { //affiche la valeur si validd
                                        setRemoveQty(parsedQty);
                                    }
                                    else{ //sinon on met la valeur a 1
                                        setRemoveQty(1);
                                    }
                                    if (parsedQty > props.item.qty) { //empeche la valeur d'etre plus grande que la quantite d'item dans le panier
                                        setRemoveQty(props.item.qty);
                                    }
                                }}
                            />
                            <Pressable style={[styles.itemButton, styles.deleteButton]} onPress={DeleteItem}>
                                <Text style={styles.itemButtonText}>{i18n.t('delete')}</Text>
                            </Pressable>
                            <Pressable style={[styles.itemButton, styles.buyOneButton]} onPress={buyItem}>
                                <Text style={styles.itemButtonText}>{i18n.t('buyOne')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}



//----- PAGE PRINCIPALE -----//
export default function App() {
    const { i18n } = useContext(LangueContext);
    const { userId } = useContext( UserContext );
    const [totalPrice, setTotalPrice] = useState(0); // initialize total price to 0
    const [displayItems, setItemList] = useState([]); // initialise les items a afficher

    //Recupere les items de la base de donnee
    const getItems = async () => {
        const items = await getDocs(collection(db, "Paniers"), where("idUser", "==", userId)); //recupere les items du panier de l'utilisateur
        const itemsData = items.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        setItemList(itemsData);            
    };

    //Calcul le prix total du panier
    const calculateTotal = async() => {
        const total = displayItems.reduce((sum, currentItem) => { //effectue l'operation sur chaque item du panier, sum = garde la valeur pour chaque enregistrement
            const price = parseFloat(currentItem.prix) || 0; //parseFloat = convertit le prix en nombre si null = 0
            const quantity = parseInt(currentItem.qty, 10) || 0; //parseInt = convertit le prix en nombre si null = 0
            return sum + (price * quantity);
        }, 0);
        setTotalPrice(total); //set le prix total
    };

    //Permet d'acheter tous les items du panier
    const handleBuyAll = async () => {
        try {
            const items = query(collection(db, "Paniers"), where("idUser", "==", userId)); //selectionne tous les item de l'utilisateur
            const querySnapshot = await getDocs(items);
            const itemData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            if (itemData.length === 0) { //verifie si le panier est vide
                Alert.alert("Aucun item dans le panier");
                return;
            }
            for (const dessert of itemData) {
                const { id, ...itemInfo } = dessert; //copie les valeurs de dessert dans dessertInfo
                const itemWithTime = { ...itemInfo, purchaseTime: Timestamp.now(), }; //ajouter la date d'achat a itemInfo
                await addDoc(collection(db, "Historique"), itemWithTime); //ajoute l'item dans l'historique
                await deleteDoc(doc(db, "Paniers", dessert.id)); //supprime l'item du panier
            }
            Alert.alert("Votre commande a été placer");
        } catch (error) {
            Alert.alert("Erreur lors de la commande");
        }
    };

    useEffect(() => {getItems();}, [displayItems]); //initialise l'affichage des items
    useEffect(() => {calculateTotal();}, [calculateTotal]); //initialise le prix total

    return (
        <View style={globalStyles.background}>
            <Header nom={i18n.t('Panier')} />
            <View style={globalStyles.ItemList}>
                <FlatList
                    data={displayItems}
                    renderItem={({item}) => <Item item={item} userId={userId} />}
                    keyExtractor={item => item.id}
                    refreshing={false}
                    onRefresh={()=>getItems()}
                />
            </View>
            <TotalPriceBar totalPrice={totalPrice} onBuyAllPress={handleBuyAll} />
        </View>
    );
}



//----- STYLES -----//
const styles = StyleSheet.create({
    itemButton:{
        width: 'auto',
        height: 30,
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemButtonText:{
        color: 'white',
        fontWeight: 'bold',
    },
    buyOneButton: {
        backgroundColor: 'green',
    },
    deleteButton: {
        backgroundColor: 'darkred',
    },
    buyAllButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buyAllButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    totalPriceBar: {
        backgroundColor: '#bf4941',
        padding: 15,
        alignItems: 'center',
        borderTopWidth: 2,
        borderColor: 'black',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalPriceText: {
        color: '#F3F3F3',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        margin: 10,
    },
    quantityInput: {
        borderWidth: 1,
        padding: 5,
        width: 50,
        height: 30,
        textAlign: 'center',
        fontSize: 15,
        borderRadius: 5,
    },
    Detail:{
        fontSize: 17,
        textAlign: 'left',
    },
});