import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Pokedex from './screens/Pokedex';
import PokemonDetails from './screens/PokemonDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={['#ff9966', '#ff5e62']} style={styles.container}>
      <Image source={require('./assets/pokemon-logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>¡Bienvenido a la App de Pokémon!</Text>
      <Text style={styles.instructions}>Explora la Pokédex y descubre todos los Pokémon.</Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Pokedex')}
      >
        <Text style={styles.exploreButtonText}>Explorar Pokédex</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function PokedexStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff5e62',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Pokedex" component={Pokedex} options={{ title: 'Pokédex' }} />
      <Stack.Screen 
        name="PokemonDetails" 
        component={PokemonDetails} 
        options={({ route }) => ({ title: route.params.pokemonName })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Pokedex') {
              iconName = focused ? 'list' : 'list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff5e62',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Pokedex" component={PokedexStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  instructions: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
  },
  exploreButtonText: {
    color: '#ff5e62',
    fontSize: 18,
    fontWeight: 'bold',
  },
});