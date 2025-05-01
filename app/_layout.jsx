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
                <Stack.Screen name="index" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="Details" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="screens/apropos" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="Connexion" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="Admin" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="Inscription" options={{ headerShown: false, statusBarHidden: true }} />
            </Stack>  
        </UserProvider>
    </LangueProvider>
  );
}