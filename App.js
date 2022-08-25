import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';

export default function App() {
    return (
        <TailwindProvider>
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-red-900">Open up App.js to start working on your app!</Text>
                <StatusBar style="auto" />
            </View>
        </TailwindProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
