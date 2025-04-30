//Étienne La Rochelle

import React, { createContext, useState } from 'react';
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
        buyOne:"Item Acheter",
        delete:"Supprimer",
        buyAll:"Acheter tout",
        deleteItem:"Item Supprimer",
        buyOneError:"Erreur l'item n'a pas pu être acheter",
        deleteItemError:"Erreur l'item n'a pas pu être supprimer",
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
        buyOne:"Item Bought",
        delete:"Delete",
        buyAll:"Buy all",
        deleteItem:"Item Deleted",
        buyOneError:"Error the item could not be bought",
        deleteItemError:"Error the item could not be deleted",
    },


};
// Create the context
export const LangueContext = createContext({
    i18n: new I18n(translations),
});

// Create the provider
export const LangueProvider = ({ children }) => {
    const [langue, setLangue] = useState(Localization.getLocales()[0].languageTag);

    const i18n = new I18n(translations);
    i18n.locale = langue;

    const value = { i18n, setLangue, langue };

    return (
        <LangueContext.Provider value={value}>
            {children}
        </LangueContext.Provider>
    );
};