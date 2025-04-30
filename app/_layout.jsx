import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { LangueProvider } from './context/langue';
import { UserProvider } from './context/user';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
    <LangueProvider>
        <UserProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="Details" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="screens/apropos" options={{ headerShown: false }} />
                <Stack.Screen name="Connexion" options={{ headerShown: false }} />
                <Stack.Screen name="Admin" options={{ headerShown: false }} />
                <Stack.Screen name="Inscription" options={{ headerShown: false }} />
            </Stack>  
        </UserProvider>
    </LangueProvider>
  );
}
