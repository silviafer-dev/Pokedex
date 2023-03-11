import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigator/Navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { simplePokemon, color } = route.params;
  const { id, name, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  const { isLoading, pokemon } = usePokemon(id);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.headerContainer, backgroundColor: color }}>
        {/* Back button */}
        <View style={{ ...styles.backButton, top: top + 5 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.pop()}>
            <Icon name="arrow-back-outline" color="white" size={35} />
          </TouchableOpacity>
        </View>
        {/* Nombre del pokemon */}
        <Text style={{ ...styles.pokemonName, top: top + 40 }}>
          {name + '\n'}#{id}
        </Text>
        {/* Pokeball blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {/* Detallles Loading */}
      <View style={{ flex: 1 }}>
        <ActivityIndicator
          color={color}
          size={50}
          style={styles.activityIndicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
