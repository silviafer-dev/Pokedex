import React from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles as globalStyles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();

  const { isFetching, simplePokemonList } = usePokemonSearch();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? top : top + 10,
        marginHorizontal: 20,
      }}>
      <SearchInput />
      <FlatList
        data={simplePokemonList}
        keyExtractor={poke => poke.id}
        numColumns={2}
        // Header
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyles.title,
              ...globalStyles.globalMargin,
              paddingBottom: 10,
            }}>
            Pokedex
          </Text>
        }
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
