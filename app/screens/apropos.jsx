import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function AproposScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'À propos de moi', // Set the header title here
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Étienne La Rochelle</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});