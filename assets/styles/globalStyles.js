import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    header: {
        backgroundColor: "#c42116",
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
        zIndex: 1,
    },
    title: {
        color: "#F3F3F3",
        fontSize: 30,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    background: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fcf1f0",
    },
    imageFormat: {
        width: 90,
        height: 90,
        margin: 15,
        objectFit: 'contain',
    },
    ItemContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        margin: 15,
        backgroundColor: "#F3F3F3",
    },
    ItemList: {
        flex: 1
    },
});



export default globalStyles;