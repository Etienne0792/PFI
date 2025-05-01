import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform, StatusBar } from 'react-native';

// See MaterialIcons here: https://icons.expo.fyi
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { LangueContext } from '../context/langue.jsx';

export default function TabLayout() {
    const { i18n } = useContext(LangueContext);
    
    return (
        <>
            <StatusBar hidden={true} />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: Platform.select({
                        ios: {
                            position: 'absolute',
                        },
                        default: {},
                    }),
                }}>

                <Tabs.Screen
                    name="Items"
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


