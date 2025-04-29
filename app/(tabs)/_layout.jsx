import { Tabs } from 'expo-router';
import React, { useEffect, useState, useContext } from 'react';
import { Platform, StatusBar } from 'react-native';

// See MaterialIcons here: https://icons.expo.fyi
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { LangueContext } from '../context/langue.jsx';

export default function TabLayout() {
    const { i18n, setLangue } = useContext(LangueContext);
    
    return (
        <>
            <StatusBar hidden={true} />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: Platform.select({
                        ios: {
                            // Use a transparent background on iOS to show the blur effect
                            position: 'absolute',
                        },
                        default: {},
                    }),
                }}>

                <Tabs.Screen
                    name="index"
                    options={{
                        title: i18n.t('Tools'),
                        tabBarIcon: ({ color }) => <AntDesign name="appstore-o" size={24} color="black" />,
                    }}
                />

                <Tabs.Screen
                    name="Panier"
                    options={{
                        title: i18n.t('Panier'),
                        tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color="black" />,
                    }}
                />

                <Tabs.Screen
                    name="Historique"
                    options={{
                        title: i18n.t('History'),
                        tabBarIcon: ({ color }) => <AntDesign name="clockcircleo" size={24} color="black" />,
                    }}
                />

                <Tabs.Screen
                    name="Localisation"
                    options={{
                        title: i18n.t('Localisation'),
                        tabBarIcon: ({ color }) => <Feather name="map" size={24} color="black" />,
                    }}
                />

            </Tabs>
        </>
    );
}


