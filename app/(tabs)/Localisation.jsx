//Étienne La Rochelle


//----- IMPORTS -----//
import React, { useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Image } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';

import Header from '../../component/header.js';
import locations from '../entrepot.json';


//----- PAGE PRINCIPALE -----//
export default function App() {
    //definit l'emplacement de debut
    const initialRegion = {
        latitude: 45.590665,
        longitude: -73.8380597,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    };

    const mapRef = useRef(null);

    //deplace la carte sur la position de l'item selectionne
    const ItemPress = (id) => {
        const selectedLocation = locations.find((item) => item.id === id);
        if (mapRef.current && selectedLocation) {
            mapRef.current.animateToRegion({
                latitude: selectedLocation.coord.latitude,
                longitude: selectedLocation.coord.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        }
    };

    //Affiche le nom de l'item selectionne dans la liste
    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.listItem} onPress={() => ItemPress(item.id)}           >
                <Text style={styles.listText}>{item.nom}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.background}>
            <Header nom="Localisation" />
            <View style={styles.map}>
                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    provider={PROVIDER_DEFAULT}
                    initialRegion={initialRegion}
                >
                    {locations.map((item) => (
                        <Marker
                            key={item.id}
                            title={item.nom}
                            coordinate={item.coord}
                            onPress={() => ItemPress(item.id)}
                        >
                            <Image
                                source={item.id === 5 ? require('../../assets/images/house.png') : require('../../assets/images/warehouse.png')}
                                style={item.id === 5 ? { width: 50, height: 50 }: { width: 30, height: 30 }}
                                resizeMode="contain"
                            />
                        </Marker>
                    ))}
                </MapView>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={locations}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}



//----- STYLES -----//
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#0955ad',
    },
    map: {
        height: '65%'
    },
    listItem: {
        backgroundColor: '#bf4941',
        borderWidth: 1,
        borderColor: 'white',
    },
    listContainer: {
        height: '20%',
        justifyContent: 'space-around',
    },
    listText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        margin: 15,
    },
});