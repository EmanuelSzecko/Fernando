import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Telas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecoverScreen from './screens/RecoverScreen';

import HomeScreen from './screens/HomeScreen';
import MovieListScreen from './screens/MovieListScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AboutScreen from './screens/AboutScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121212' },
        tabBarActiveTintColor: '#0077b6',
        tabBarInactiveTintColor: '#aaa',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Filmes"
        component={MovieListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="film-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="heart-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Sobre"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="information-circle-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Recover" component={RecoverScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
