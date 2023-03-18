import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  Text,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';

import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }
    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemonId = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonId ? [pokemonId] : []);
    }
  }, [simplePokemonList, term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}>
        <SearchInput
          onDebounce={value => setTerm(value)}
          style={{
            position: 'absolute',
            zIndex: 999,
            width: screenWidth - 40,
            top: Platform.OS === 'ios' ? top : top + 30,
          }}
        />
        <FlatList
          data={pokemonFiltered}
          keyExtractor={poke => poke.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // Header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                paddingBottom: 10,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              }}>
              {term}
            </Text>
          }
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
