import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import globalStyles from '../assets/styles/globalStyles.js';
import db from './firebaseConfig';
import Header from '../component/header.js';
import { LangueContext } from './context/langue.jsx';
import { useNavigation } from '@react-navigation/native';

import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';




export default function AppAdminScreen() {
  const router = useRouter();

  const navigation = useNavigation();
  const [produits, setProduits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [uri, setUri] = useState('');
  const [adminName, setAdminName] = useState('Admin');

  const fetchProduits = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Items'));
      const produitsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProduits(produitsList);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const ajouterProduit = async () => {
    if (!nom || !description || !prix || !uri) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis');
      return;
    }

    try {
      await addDoc(collection(db, 'Items'), {
        nom,
        description,
        prix,
        image: uri,
      });
      Alert.alert('Succès', 'Produit ajouté');
      setShowForm(false);
      setNom('');
      setDescription('');
      setPrix('');
      setUri('');
      fetchProduits();
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Échec de l\'ajout du produit');
    }
  };

  const supprimerProduit = async (id) => {
    Alert.alert(
      'Confirmation',
      'Supprimer ce produit ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'produits', id));
              Alert.alert('Supprimé');
              fetchProduits();
            } catch (err) {
              console.error(err);
              Alert.alert('Erreur', 'Impossible de supprimer le produit');
            }
          },
        },
      ]
    );
  };

  const deconnecter = () => {
    router.push('/');
  };

  const { i18n } = useContext(LangueContext);
  return (
    <View style={styles.container}>
      <Header nom={i18n.t('admin')}/>
      <View style={styles.scrollContainer}>
        <View style={styles.topControls}>
          {!showForm && (
            <TouchableOpacity style={styles.ajouterButton} onPress={() => setShowForm(true)}>
              <Text style={styles.ajouterButtonText}>Ajouter un produit</Text>
            </TouchableOpacity>
          )}

          {showForm && (
            <View style={styles.contentContainer}>
              <Text style={styles.ajoutProduitText}>Nom du produit:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
              />
              <Text style={styles.ajoutProduitText}>Description du produit:</Text>
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <Text style={styles.ajoutProduitText}>Prix du produit:</Text>
              <TextInput
                style={styles.input}
                placeholder="Prix"
                value={prix}
                onChangeText={setPrix}
                keyboardType="numeric"
              />
              <Text style={styles.ajoutProduitText}>L'image du produit:</Text>
              <TextInput
                style={styles.input}
                placeholder="Image URI"
                value={uri}
                onChangeText={setUri}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.smallButton} onPress={() => setShowForm(false)}>
                  <Text style={styles.ajoutProduitButton}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={ajouterProduit}>
                  <Text style={styles.ajoutProduitButton}>Valider</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <FlatList
          data={produits}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{item.nom}</Text>
                <Text style={styles.productPrice}>{item.prix}$</Text>
              </View>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productDescription}>{item.description}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => supprimerProduit(item.id)}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.footer} onPress={() => router.push('screens/apropos')}>
        <Text style={styles.footerText}>À propos</Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 10,
  },
  topControls: {
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    padding: 25,
    width: '100%',
    backgroundColor: '#063c7a',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    position: 'absolute',
    right: 1,
    top: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
//   buttonTextName:{
//     color: '#fff',
//     fontSize: 16,
//     textAlign:'flex-start',
//     },
  ajouterButton: {
    backgroundColor: '#064b9a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  ajouterButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#064b9a',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  ajoutProduitText: {
    fontSize: 15,
    margin: 5,
    textAlign: 'left',
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#064b9a',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  ajoutProduitButton: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 100,
  },
  productItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064b9a',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#c1121f',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0a4605',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});
