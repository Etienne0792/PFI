import React, { createContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Define the translation object
const translations = {
    "fr-CA": {
        Tools: "Outils",
        Panier: "Panier",
        History: "Historique",
        Localisation: "Localisation",
        loading: "Chargement...",
        price: "Prix",
        quantity:"quantite",
        back:"Retour",
        addToCart:"Ajouter au panier",
        cost:"Coût",
        boughtOn:"Date d'achat",
        buyOne:"Acheter",
        delete:"Supprimer",
        buyAll:"Acheter tout",
    },
    "en-US": {
        Tools: "Tools",
        Panier: "Cart",
        History: "History",
        Localisation: "Localisation",
        loading: "Loading...",
        price: "Cost",
        quantity:"quantity",
        back:"Back",
        addToCart:"Add top cart",
        cost:"Cost",
        boughtOn:"bought on",
        buyOne:"Buy",
        delete:"Delete",
        buyAll:"Buy all",
    },


};
// Create the context
export const LangueContext = createContext({
    i18n: new I18n(translations),
    setLangue: (lang: string) => { }
});

// Create the provider
export const LangueProvider = ({ children }) => {
    const [langue, setLangue] = useState(Localization.getLocales()[0].languageTag);

    const i18n = new I18n(translations);
    i18n.locale = langue;


    const value = { i18n, setLangue };

    return (
        <LangueContext.Provider value={value}>
            {children}
        </LangueContext.Provider>
    );
};